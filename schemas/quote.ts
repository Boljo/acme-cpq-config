import { defineSchema, z } from "@cpq/sdk";

// Custom fields on the Quote object, validated against customer payloads at
// write time — never blocked on the vendor.
export default defineSchema({
  object: "quote",
  fields: {
    partnerTier: z.enum(["gold", "silver"]).optional(),
    region: z.string().optional(),
  },
});
