import type { SSTConfig } from "sst";
import { AstroSite, Bucket } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "econo-tracker",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");

      const site = new AstroSite(stack, "site", { bind: [bucket] });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
