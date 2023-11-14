import { auth } from "@/lib/auth";

import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const session = context.locals.session;
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);
  context.locals.auth.setSession(null);
  return context.redirect('/', 302);
};
