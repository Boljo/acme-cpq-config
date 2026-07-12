import { definePriceRule, percentOff, tiered } from "@cpq/sdk";

// Volume discount on platform seats. A RevOps person can read this like a
// spreadsheet: 0–50 units → 0% off, 51–200 → 10%, 201+ → 20%.
export default definePriceRule({
  id: "platform-volume-discount",
  description: "Volume discount on platform products",
  appliesTo: (line) => line.product.family === "platform",
  priority: 100,
  adjust: tiered({
    basis: "quantity",
    tiers: [
      { upTo: 50, apply: percentOff(0) },
      { upTo: 200, apply: percentOff(10) },
      { upTo: Infinity, apply: percentOff(20) },
    ],
    mode: "whole-order", // vs "graduated" — both supported, named explicitly
  }),
});
