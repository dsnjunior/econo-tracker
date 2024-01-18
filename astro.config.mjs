import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import simpleStackForm from "simple-stack-form";
import simpleStackStream from "simple-stack-stream";

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [
		react(),
		tailwind({ applyBaseStyles: false }),
		simpleStackForm(),
		simpleStackStream(),
	],
	adapter: netlify(),
	prefetch: false,
});
