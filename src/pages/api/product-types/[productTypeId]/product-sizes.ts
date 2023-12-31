import { productSizeForms } from "@/modules/product/product-size-form";
import { db, schema } from "@/lib/db";
import { createId } from "@/lib/id";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, locals, params }) => {
  const session = await locals.auth.validate()

  const { productTypeId } = params;

  if (!session || !productTypeId) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    })
  }

  const isProductTypeFromCurrentUser = await db.query.productType.findFirst({
    where: and(
      eq(schema.productType.id, productTypeId),
      eq(schema.productType.userId, session.user.userId)
    )
  })


  if (!isProductTypeFromCurrentUser) {
    return new Response(null, {
      status: 403,
      statusText: "Forbidden",
    })
  }

  const data = await request.json()

  const parsed = productSizeForms.safeParse(data)

  if (!parsed.success) {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    })
  }

  const newData = parsed.data.filter((pt) => !pt.id)

  if (newData.length) {
    await db.insert(schema.productSize)
      .values(
        parsed.data
          .filter((pt) => !pt.id)
          .map(
            (pt) => ({
              name: pt.name,
              id: createId('productSize'),
              productTypeId,
              userId: session.user.userId,
            })
          )
      )
  }

  await Promise.all(
    parsed.data
      .filter((pt) => !!pt.id)
      .map(
        (pt) =>
          db.update(schema.productSize)
            .set({ name: pt.name })
            .where(
              and(
                eq(schema.productSize.id, pt.id!),
                eq(schema.productSize.userId, session.user.userId)
              )
            )
      )
  )

  return new Response(null, {
    status: 200,
    statusText: "OK",
  })
}

