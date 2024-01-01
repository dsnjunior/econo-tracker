import { PostHog } from "posthog-node";

export const posthogApiKey = import.meta.env.POSTHOG_API_KEY;

export const posthogHost = "https://app.posthog.com";

export const posthog = new PostHog(posthogApiKey, {
	host: posthogHost,
});
