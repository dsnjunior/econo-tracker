import type { APIRoute } from "astro";
import { OAuthRequestError } from "@lucia-auth/oauth";

import { auth, googleAuth } from "@/lib/auth";
import { createId } from "@/lib/id";

export const GET: APIRoute = async (context) => {
  const storedState = context.cookies.get("google_oauth_state")?.value;
  const lang = context.cookies.get("lang")?.value;
  const state = context.url.searchParams.get("state");
  const code = context.url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) {
        context.locals.posthog.client.capture({
          event: 'login',
          distinctId: context.locals.posthog.distinctId,
        })
        return existingUser;
      }
      const user = await createUser({
        userId: createId("user"),
        attributes: {
          avatar_url: googleUser.picture ?? null,
          display_name: googleUser.name ?? null,
          google_sub: googleUser.sub,
        },
      });
      context.locals.posthog.client.capture({
        event: 'signup',
        distinctId: context.locals.posthog.distinctId,
      })
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
      sessionId: createId("session"),
    });
    context.locals.auth.setSession(session);
    return context.redirect(`/${lang}/app`, 302);
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
