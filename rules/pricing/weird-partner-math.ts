import { definePriceRule } from "@cpq/sdk";

// The escape hatch: arbitrary pure TS when the primitives don't fit.
// `money` is the safe integer-math helper; the result is recorded in the ledger.
export default definePriceRule({
  id: "weird-partner-math",
  description: "Bespoke partner discount driven by a custom quote field",
  appliesTo: (line) => line.product.code === "PARTNER-X",
  priority: 200,
  adjust: ({ line, quote, money }) =>
    money.percentOff(line.netTotal, quote.custom?.partnerTier === "gold" ? 25 : 10),
});
