import { defineBundle, fixed, line } from "@cpq/sdk";

// SUITE-STARTER expands into platform, seats, and free standard support.
// Generated lines carry provenance automatically; if the trigger line's quantity
// changes, the engine (not this rule) handles regeneration.
export default defineBundle({
  id: "starter-suite",
  description: "SUITE-STARTER expands into platform, seats, and free support",
  trigger: { productCode: "SUITE-STARTER" },
  generate: ({ trigger }) => [
    line("PLATFORM-BASE", { quantity: 1 }),
    line("SEATS-STD", { quantity: trigger.quantity }),
    line("SUPPORT-STD", { quantity: 1, price: fixed(0), note: "Included in Starter" }),
  ],
});
