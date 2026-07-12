import { defineVisibilityRule } from "@cpq/sdk";

// Legacy SKUs are only visible to grandfathered accounts.
export default defineVisibilityRule({
  id: "hide-legacy-skus",
  description: "Legacy SKUs only visible to grandfathered accounts",
  hide: ({ product, account }) =>
    (product.tags ?? []).includes("legacy") && account.custom?.legacyCustomer !== true,
});
