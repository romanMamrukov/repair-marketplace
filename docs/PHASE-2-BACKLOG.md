# Phase 2 — Functional MVP Backlog

## Milestone 1 — Foundation

- Production repository rules
- Environment strategy
- Database migrations
- API conventions
- Error monitoring
- CI quality gates

## Milestone 2 — Identity and profiles

- Email authentication
- Customer profile
- Provider profile
- Provider categories and radius
- Basic provider approval

## Milestone 3 — Real requests

- Request CRUD
- Category-specific fields
- Secure image upload
- Approximate map location
- Request lifecycle

## Milestone 4 — Matching and offers

- Provider eligibility query
- Provider notifications
- Offer creation
- Offer comparison
- Offer acceptance

## Milestone 5 — Communication

- Request-linked conversations
- Read state
- Email notifications
- Abuse reporting

## Milestone 6 — Pilot operations

- Admin request view
- Provider approval queue
- Moderation tools
- Analytics events
- Pilot data export

## Recommended technical direction

- Frontend: React + TypeScript + Vite
- API: TypeScript service with explicit domain modules
- Database: PostgreSQL with PostGIS
- File storage: S3-compatible object storage
- Authentication: managed auth or audited self-hosted implementation
- Maps: OpenStreetMap-compatible provider with usage review
- Queue: managed queue for matching and notifications
- Observability: structured logs, traces and error monitoring

## Phase 2 entry criteria

Do not start full implementation until Phase 0 identifies one initial vertical, one city-level launch area, five pilot providers and a credible request-acquisition channel.
