import { lucia as luciaBuilder } from "lucia";
import { astro } from "lucia/middleware";
import { postgres } from "@lucia-auth/adapter-postgresql";
import { google } from "@lucia-auth/oauth/providers";

import { client } from "@/lib/db";

export const auth = luciaBuilder({
  env: import.meta.env.DEV ? "DEV" : "PROD",
  middleware: astro(),
  sessionCookie: {
    expires: false,
  },
  adapter: postgres(client, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),

  getUserAttributes: (data) => {
    return {
      googleSub: data.google_sub,
      displayName: data.display_name,
      avatarUrl: data.avatar_url,
    };
  },
});

export const googleAuth = google(auth, {
  clientId: import.meta.env.GOOGLE_CLIENT_ID,
  clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
  redirectUri: import.meta.env.GOOGLE_REDIRECT_URI,
});

export type Auth = typeof auth;
