/// <reference types="astro/client" />

/// <reference types="lucia" />
declare namespace App {
  interface Locals {
    auth: import("lucia").AuthRequest;
    session: import("lucia").Session | null;
    lang: ReturnType<typeof import("./lib/i18n/utils").getLangFromUrl>;
    t: ReturnType<typeof import("./lib/i18n/utils").useTranslations>;
    translatePath: ReturnType<typeof import("./lib/i18n/utils").useTranslatedPath>;
  }
}

declare namespace Lucia {
  type Auth = import("./lib/auth").Auth;
  type DatabaseUserAttributes = {
    avatar_url: string | null;
    display_name: string | null;
    google_sub: string;
  };
  type DatabaseSessionAttributes = {};
}

interface ImportMetaEnv {
  readonly DATABASE_CONNECTION_STRING: string;

  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
