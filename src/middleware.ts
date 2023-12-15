import type { MiddlewareResponseHandler } from "astro";

import { auth } from "@/lib/auth";
import { getLangFromUrl, useTranslations, useTranslatedPath } from "@/lib/i18n/utils";
import { posthog, posthogApiKey } from "@/lib/posthog";

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  context.locals.auth = auth.handleRequest(context);
  context.locals.session = await context.locals.auth.validate();

  context.locals.lang = getLangFromUrl(context.url);
  context.locals.t = useTranslations(context.locals.lang);
  context.locals.translatePath = useTranslatedPath(context.locals.lang);

  context.locals.posthog = {
    client: posthog,
    distinctId: context.cookies.get(`ph_${posthogApiKey}_posthog`)?.json().distinct_id ?? crypto.randomUUID(),
  }

  return next();
};
