import { productColorForms } from "@/modules/product/product-color-form";
import { db, schema } from "@/lib/db";
import { createId } from "@/lib/id";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, locals }) => {
  const session = await locals.auth.validate()

  if (!session) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    })
  }

  const data = await request.json()

  const parsed = productColorForms.safeParse(data)

  if (!parsed.success) {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    })
  }

  const newData = parsed.data.filter((pt) => !pt.id)

  if (newData.length) {
    await db.insert(schema.productColor)
      .values(
        newData
          .map(
            (pt) => ({
              name: pt.name,
              color: pt.color,
              id: createId('productColor'),
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
          db.update(schema.productColor)
            .set({ name: pt.name, color: pt.color })
            .where(
              and(
                eq(schema.productColor.id, pt.id!),
                eq(schema.productColor.userId, session.user.userId)
              )
            )
      )
  )

  return new Response(null, {
    status: 200,
    statusText: "OK",
  })
}

