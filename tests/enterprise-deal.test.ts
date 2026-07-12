import assert from "node:assert/strict";
import { test } from "node:test";
import type { MoneyHelper, RuleLine } from "@cpq/sdk";
import volumeRule from "../rules/pricing/platform-volume.js";

// Customer-owned golden test. Under GitOps these run in a validation gate before
// a config can deploy. Run locally with:  npx tsx --test tests
// Only depends on @cpq/sdk — the platform's standard library.
const money: MoneyHelper = {
  percentOff: (b, p) => b - Math.round((b * Math.abs(p)) / 100),
  percentDelta: (b, p) => Math.round((b * p) / 100),
  multiply: (u, q) => Math.round(u * q),
  roundHalfEven: (v) => Math.round(v),
};

function seatLine(quantity: number): RuleLine {
  const listUnit = 20_000;
  const listTotal = money.multiply(listUnit, quantity);
  return {
    productCode: "SEATS-STD",
    product: { code: "SEATS-STD", name: "Standard Seats", family: "platform", list: listUnit },
    quantity,
    listUnit,
    listTotal,
    netTotal: listTotal,
  };
}

const runTier = (qty: number) =>
  (volumeRule.adjust({
    line: seatLine(qty),
    quote: { currency: "USD" },
    account: {},
    money,
    now: "2026-07-12T00:00:00Z",
  }) as { kind: string; value: number }[])[0];

test("100 seats land in the 10% tier", () => {
  const op = runTier(100);
  assert.equal(op.kind, "percent");
  assert.equal(op.value, -10);
});

test("300 seats land in the 20% tier", () => {
  assert.equal(runTier(300).value, -20);
});
