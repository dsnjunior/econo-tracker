import type { MiddlewareResponseHandler } from "astro";

import { auth } from "@/lib/auth";
import { getLangFromUrl, useTranslations, useTranslatedPath } from "@/lib/i18n/utils";

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  context.locals.auth = auth.handleRequest(context);
  context.locals.session = await context.locals.auth.validate();

  context.locals.lang = getLangFromUrl(context.url);
  context.locals.t = useTranslations(context.locals.lang);
  context.locals.translatePath = useTranslatedPath(context.locals.lang);

  return next();
};
