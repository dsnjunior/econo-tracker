import { sellRegisterForms } from "@/modules/sell/sell-register-form";
import { db, schema } from "@/lib/db";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, locals, params }) => {
  const session = await locals.auth.validate()

  const { sellId } = params;

  if (!session || !sellId) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    })
  }

  const isSellFromCurrentUser = await db.query.sell.findFirst({
    where: and(
      eq(schema.sell.id, sellId),
      eq(schema.sell.userId, session.user.userId)
    )
  })


  if (!isSellFromCurrentUser) {
    return new Response(null, {
      status: 403,
      statusText: "Forbidden",
    })
  }

  const data = await request.json()

  const parsed = sellRegisterForms.safeParse(data)

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

  const currentSellRegisters = await db.query.sellRegister.findMany({
    where: eq(schema.sellRegister.sellId, sellId)
  })

  const updatingAndDeleting = currentSellRegisters.map(async (csr) => {
    const updatingRegister = registers.find((r) =>
      r.productColorId === csr.productColorId
      && r.productSizeId === csr.productSizeId
      && r.productTypeId === csr.productTypeId
    )

    const existingPis = await db.query.productInStock.findFirst({
      where: and(
        eq(schema.productInStock.productColorId, csr.productColorId),
        eq(schema.productInStock.productSizeId, csr.productSizeId),
        eq(schema.productInStock.productTypeId, csr.productTypeId),
        eq(schema.productInStock.userId, session.user.userId)
      )
    })

    if (!existingPis) {
      throw new Error("Product in stock not found");
    }

    if (!updatingRegister) {
      // then deleting
      await db.update(schema.productInStock)
        .set({ quantity: existingPis.quantity + csr.quantity })
        .where(
          and(
            eq(schema.productInStock.productColorId, csr.productColorId),
            eq(schema.productInStock.productSizeId, csr.productSizeId),
            eq(schema.productInStock.productTypeId, csr.productTypeId),
            eq(schema.productInStock.userId, session.user.userId)
          )
        )

      await db.delete(schema.sellRegister)
        .where(and(
          eq(schema.sellRegister.productColorId, csr.productColorId),
          eq(schema.sellRegister.productSizeId, csr.productSizeId),
          eq(schema.sellRegister.productTypeId, csr.productTypeId),
          eq(schema.sellRegister.sellId, sellId),
        ))
      return;
    }

    await db.update(schema.productInStock)
      .set({ quantity: existingPis.quantity - updatingRegister.quantity + csr.quantity })
      .where(
        and(
          eq(schema.productInStock.productColorId, csr.productColorId),
          eq(schema.productInStock.productSizeId, csr.productSizeId),
          eq(schema.productInStock.productTypeId, csr.productTypeId),
          eq(schema.productInStock.userId, session.user.userId)
        )
      )


    await db.update(schema.sellRegister)
      .set({ quantity: updatingRegister.quantity, amount: updatingRegister.amount })
      .where(
        and(
          eq(schema.sellRegister.productColorId, updatingRegister.productColorId),
          eq(schema.sellRegister.productSizeId, updatingRegister.productSizeId),
          eq(schema.sellRegister.productTypeId, updatingRegister.productTypeId),
          eq(schema.sellRegister.sellId, sellId),
        )
      )
  })

  const inserting = registers.filter((r) =>
    !currentSellRegisters.some((csr) =>
      r.productColorId === csr.productColorId
      && r.productSizeId === csr.productSizeId
      && r.productTypeId === csr.productTypeId
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

    if (!existingPis) {
      throw new Error("Product in stock not found");
    }

    await db.update(schema.productInStock)
      .set({ quantity: existingPis.quantity - r.quantity })
      .where(
        and(
          eq(schema.productInStock.productColorId, r.productColorId),
          eq(schema.productInStock.productSizeId, r.productSizeId),
          eq(schema.productInStock.productTypeId, r.productTypeId),
          eq(schema.productInStock.userId, session.user.userId)
        )
      )

    await db.insert(schema.sellRegister)
      .values({
        productColorId: r.productColorId,
        productSizeId: r.productSizeId,
        productTypeId: r.productTypeId,
        sellId,
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

