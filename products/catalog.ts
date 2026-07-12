import { defineCatalog } from "@cpq/sdk";

// Catalog as data-in-code. Prices are integer MINOR units (US cents).
// Large/fast-changing catalogs move to the DB later; the manifest hides the swap.
export default defineCatalog([
  {
    code: "PLATFORM-BASE",
    name: "Platform (base license)",
    family: "platform",
    list: 1_200_000, // $12,000
  },
  {
    code: "SEATS-STD",
    name: "Standard Seats",
    family: "platform",
    list: 20_000, // $200 / seat
  },
  {
    code: "SUPPORT-STD",
    name: "Standard Support",
    family: "support",
    list: 50_000, // $500
  },
  {
    code: "SUITE-STARTER",
    name: "Starter Suite (bundle)",
    family: "suite",
    list: 0, // priced via its generated children
  },
  {
    code: "PARTNER-X",
    name: "Partner Integration X",
    family: "partner",
    list: 100_000, // $1,000
  },
  {
    code: "LEGACY-WIDGET",
    name: "Legacy Widget (grandfathered)",
    family: "legacy",
    list: 99_900, // $999
    tags: ["legacy"],
  },
]);
