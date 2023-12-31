import { buyRegisterForms } from "@/modules/buy/buy-register-form";
import { db, schema } from "@/lib/db";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, locals, params }) => {
  const session = await locals.auth.validate()

  const { buyId } = params;

  if (!session || !buyId) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    })
  }

  const isBuyFromCurrentUser = await db.query.buy.findFirst({
    where: and(
      eq(schema.buy.id, buyId),
      eq(schema.buy.userId, session.user.userId)
    )
  })


  if (!isBuyFromCurrentUser) {
    return new Response(null, {
      status: 403,
      statusText: "Forbidden",
    })
  }

  const data = await request.json()

  const parsed = buyRegisterForms.safeParse(data)

  if (!parsed.success) {

    console.log(JSON.stringify(parsed.error))
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    })
  }

  const registers = parsed.data.flatMap((br) =>
    br.sizes.flatMap((s) => s.colors.filter((c) => !!c.quantity).map((c) => ({
      productColorId: c.productColorId,
      productSizeId: s.productSizeId,
      productTypeId: br.productTypeId,
      quantity: c.quantity,
      amount: br.amount,
    })))
  );

  const currentBuyRegisters = await db.query.buyRegister.findMany({
    where: eq(schema.buyRegister.buyId, buyId)
  })

  const updatingAndDeleting = currentBuyRegisters.map(async (cbr) => {
    const updatingRegister = registers.find((r) =>
      r.productColorId === cbr.productColorId
      && r.productSizeId === cbr.productSizeId
      && r.productTypeId === cbr.productTypeId
    )

    const existingPis = await db.query.productInStock.findFirst({
      where: and(
        eq(schema.productInStock.productColorId, cbr.productColorId),
        eq(schema.productInStock.productSizeId, cbr.productSizeId),
        eq(schema.productInStock.productTypeId, cbr.productTypeId),
        eq(schema.productInStock.userId, session.user.userId)
      )
    })

    if (!updatingRegister) {
      // then deleting

      if (existingPis) {
        await db.update(schema.productInStock)
          .set({ quantity: existingPis.quantity - cbr.quantity })
          .where(
            and(
              eq(schema.productInStock.productColorId, cbr.productColorId),
              eq(schema.productInStock.productSizeId, cbr.productSizeId),
              eq(schema.productInStock.productTypeId, cbr.productTypeId),
              eq(schema.productInStock.userId, session.user.userId)
            )
          )
      }

      await db.delete(schema.buyRegister)
        .where(and(
          eq(schema.buyRegister.productColorId, cbr.productColorId),
          eq(schema.buyRegister.productSizeId, cbr.productSizeId),
          eq(schema.buyRegister.productTypeId, cbr.productTypeId),
          eq(schema.buyRegister.buyId, buyId),
        ))
      return;
    }

    if (existingPis) {
      await db.update(schema.productInStock)
        .set({ quantity: existingPis.quantity + updatingRegister.quantity - cbr.quantity })
        .where(
          and(
            eq(schema.productInStock.productColorId, cbr.productColorId),
            eq(schema.productInStock.productSizeId, cbr.productSizeId),
            eq(schema.productInStock.productTypeId, cbr.productTypeId),
            eq(schema.productInStock.userId, session.user.userId)
          )
        )
    } else {
      await db.insert(schema.productInStock)
        .values({
          productColorId: updatingRegister.productColorId,
          productSizeId: updatingRegister.productSizeId,
          productTypeId: updatingRegister.productTypeId,
          userId: session.user.userId,
          quantity: updatingRegister.quantity,
        })
    }

    await db.update(schema.buyRegister)
      .set({ quantity: updatingRegister.quantity, amount: updatingRegister.amount })
      .where(
        and(
          eq(schema.buyRegister.productColorId, updatingRegister.productColorId),
          eq(schema.buyRegister.productSizeId, updatingRegister.productSizeId),
          eq(schema.buyRegister.productTypeId, updatingRegister.productTypeId),
          eq(schema.buyRegister.buyId, buyId),
        )
      )
  })

  const inserting = registers.filter((r) =>
    !currentBuyRegisters.some((cbr) =>
      r.productColorId === cbr.productColorId
      && r.productSizeId === cbr.productSizeId
      && r.productTypeId === cbr.productTypeId
    )
  ).map(async (r) => {
    const existingPis = await db.query.productInStock.findFirst({
      where: and(
        eq(schema.productInStock.productColorId, r.productColorId),
        eq(schema.productInStock.productSizeId, r.productSizeId),
        eq(schema.productInStock.productTypeId, r.productTypeId),
        eq(schema.productInStock.userId, session.user.userId)
      )
    })

    if (existingPis) {
      await db.update(schema.productInStock)
        .set({ quantity: existingPis.quantity + r.quantity })
        .where(
          and(
            eq(schema.productInStock.productColorId, r.productColorId),
            eq(schema.productInStock.productSizeId, r.productSizeId),
            eq(schema.productInStock.productTypeId, r.productTypeId),
            eq(schema.productInStock.userId, session.user.userId)
          )
        )
    } else {
      await db.insert(schema.productInStock)
        .values({
          productColorId: r.productColorId,
          productSizeId: r.productSizeId,
          productTypeId: r.productTypeId,
          userId: session.user.userId,
          quantity: r.quantity,
        })
    }

    await db.insert(schema.buyRegister)
      .values({
        productColorId: r.productColorId,
        productSizeId: r.productSizeId,
        productTypeId: r.productTypeId,
        buyId,
        quantity: r.quantity,
        amount: r.amount,
      })
  })

  await Promise.all([
    ...updatingAndDeleting,
    ...inserting,
  ]);

  return new Response(null, {
    status: 200,
    statusText: "OK",
  })
}

