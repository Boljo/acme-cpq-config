# acme-cpq-config

This is a **customer's CPQ config repo** — an example of pricing-as-code deployed to the
[Stripe-for-CPQ platform](https://github.com/Boljo/stripe-for-cpq). It is intentionally a
**separate repo** from the platform: the customer owns and versions their pricing logic
here; the vendor owns the engine that runs it.

## Layout

```
cpq.config.ts          org settings (currency, doc defaults)
products/              catalog as data-in-code
rules/
  pricing/*.ts         definePriceRule — discounts, tiers, escape-hatch TS
  bundles/*.ts         defineBundle — line generation
  visibility/*.ts      defineVisibilityRule — hide SKUs by context
schemas/*.ts           defineSchema — custom fields per object (drive the UI forms)
tests/*.test.ts        customer-owned golden tests
```

Everything is a default-exported definition from `@cpq/sdk`, discovered by convention.

## How it deploys

The platform loads this repo (today: cloned on boot via `CONFIG_REPO_URL`; under GitOps:
cloned at the merged commit SHA). Every quote is priced against — and pinned to — the
exact config SHA, so pricing is reproducible. Change a rule, and the platform re-reads it.

## Local development

`@cpq/sdk` is provided by the platform at runtime (it is not yet published to npm). To run
the golden tests standalone you need `@cpq/sdk` resolvable — the simplest path is to run
them from within a checkout of the platform, or once `@cpq/sdk` is published, `npm install`
here and `npm test`.

## Rules you'll find here

- `platform-volume-discount` — tiered volume discount (a primitive)
- `weird-partner-math` — the raw-TS escape hatch, driven by a custom quote field
- `starter-suite` — a bundle that expands `SUITE-STARTER` into child lines
- `hide-legacy-skus` — legacy SKUs visible only to grandfathered accounts

## License

[MIT](./LICENSE) — this is an example/template config, free to fork as a starting point.
It depends on `@cpq/sdk`, which is also MIT.
