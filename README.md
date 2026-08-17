# FixNear

Latvia-first validation product for matching repair requests with suitable local providers.

FixNear is intentionally built as a **marketplace-learning system before a marketplace infrastructure system**. The current phase tests whether customers will submit useful requests and whether providers will respond with comparable offers.

[Open the interactive demo](https://romanmamrukov.github.io/repair-marketplace/) · [Read the validation plan](./docs/PHASE-0-VALIDATION.md) · [Review the Phase 2 backlog](./docs/PHASE-2-BACKLOG.md)

## Product hypothesis

Customers often do not know which specialist can repair a specific item, what information to provide, or whether a quote is reasonable. Providers spend time qualifying incomplete enquiries and competing in channels that do not reflect availability or fit.

FixNear tests a structured loop:

1. a customer describes the problem and location;
2. the request is normalised into useful provider information;
3. suitable providers return comparable offers;
4. the customer chooses based on fit, not only the lowest price;
5. the completed job improves future matching signals.

## Implemented in the validation build

- six repair categories;
- six-step customer request wizard;
- simulated provider matching;
- provider profiles and comparable offers;
- customer and provider dashboards;
- Phase 0 feedback capture;
- responsive interface;
- browser persistence through `localStorage`;
- GitHub Pages deployment support;
- product, data-model, testing, and roadmap documentation.

## Current status

**Phase:** validation prototype.

Authentication, geocoding, file uploads, provider verification, messaging, notifications, payments, and server-side persistence are deliberately excluded. Building them before proving demand would increase cost without proving marketplace liquidity.

## Evidence required before Phase 2

The next infrastructure phase should begin only after one repair vertical reaches a minimum manual validation threshold:

- 15–20 customer interviews;
- 10 provider interviews;
- at least 5 real customer requests;
- at least 3 provider offers;
- at least 1 request completed through manual coordination;
- documented reasons for abandoned requests and rejected offers.

These are decision gates, not traction claims.

## Run locally

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Repository guide

- [`docs/PHASE-0-VALIDATION.md`](./docs/PHASE-0-VALIDATION.md)
- [`docs/PHASE-1-SCOPE.md`](./docs/PHASE-1-SCOPE.md)
- [`docs/USER-TESTING.md`](./docs/USER-TESTING.md)
- [`docs/DATA-MODEL.md`](./docs/DATA-MODEL.md)
- [`docs/PHASE-2-BACKLOG.md`](./docs/PHASE-2-BACKLOG.md)
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)

## Security and privacy

The prototype is not designed for real personal data, precise addresses, or sensitive photographs. See [`SECURITY.md`](./SECURITY.md) for the supported-use boundary.

## Licence

No open-source licence is currently declared. The public source may be evaluated but not assumed reusable or redistributable.
