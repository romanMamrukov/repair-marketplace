# Phase 1 — Interactive Demo Scope

## Goal

Demonstrate the complete marketplace proposition through a polished, shareable frontend without creating operational or compliance risk from real transactions.

## Implemented user journeys

### Customer

1. Review the value proposition.
2. Select a repair category.
3. Describe the issue.
4. Simulate photo upload.
5. Select approximate location.
6. Set urgency and budget.
7. Publish locally.
8. Review simulated matches.
9. Compare provider offers.
10. Accept an offer locally.

### Provider

1. Review a provider value proposition.
2. Open a provider dashboard.
3. Review matched local requests.
4. Inspect match quality and request context.
5. Simulate sending an offer.

### Researcher

1. Review market hypotheses.
2. Record role and likelihood score.
3. Capture useful and missing elements.
4. Store feedback in localStorage.

## Explicit exclusions

- Real accounts or identity
- Real provider onboarding
- Exact customer addresses
- Real maps or geocoding
- Server storage
- Real image upload
- Messaging
- Notifications
- Payments
- Provider verification
- Moderation
- Legal agreement acceptance

## Definition of done

- Works on current desktop and mobile browsers
- All primary navigation paths are usable
- Request wizard validates core fields
- Demo data is coherent across pages
- Local requests persist after refresh
- Build succeeds without TypeScript errors
- GitHub Pages workflow is included
- Documentation supports independent testing
