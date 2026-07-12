import { defineSchema, z } from "@cpq/sdk";

// Custom fields on the Account object.
export default defineSchema({
  object: "account",
  fields: {
    legacyCustomer: z.boolean().optional(),
  },
});
