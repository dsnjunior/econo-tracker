import type { APIRoute } from "astro";

import { googleAuth } from "@/lib/auth";

export const GET: APIRoute = async (context) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();

	context.cookies.set("google_oauth_state", state, {
		httpOnly: true,
		secure: !import.meta.env.DEV,
		path: "/",
		maxAge: 60 * 60,
	});

	context.cookies.set("lang", context.locals.lang, {
		httpOnly: true,
		secure: !import.meta.env.DEV,
		path: "/",
		maxAge: 60 * 60,
	});

	return context.redirect(url.toString(), 302);
};
