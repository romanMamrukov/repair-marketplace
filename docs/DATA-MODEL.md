# Preliminary Data Model

## Core entities

### User

- id
- role: customer, provider, admin
- name
- email
- phone
- locale
- status
- created_at

### ProviderProfile

- user_id
- legal_name
- display_name
- description
- verification_status
- service_radius_km
- base_location
- availability_status
- rating_summary

### Category

- id
- parent_id
- slug
- name
- schema_version
- active

### ProviderCategory

- provider_id
- category_id
- specialties
- minimum_price

### RepairRequest

- id
- customer_id
- category_id
- title
- description
- approximate_location
- exact_location_encrypted
- urgency
- budget_band
- status
- created_at

### RequestAttachment

- id
- request_id
- storage_key
- mime_type
- moderation_status

### Offer

- id
- request_id
- provider_id
- amount
- currency
- arrival_window
- message
- warranty_terms
- status
- created_at

### Conversation

- id
- request_id
- customer_id
- provider_id

### Message

- id
- conversation_id
- sender_id
- body
- attachment_key
- created_at

### Review

- id
- request_id
- reviewer_id
- provider_id
- rating
- body
- moderation_status

## Design constraints

- Keep approximate and exact location separate.
- Reveal exact address only after an explicit customer action.
- Use immutable audit events for offer acceptance and status changes.
- Do not calculate ratings from editable aggregate fields alone.
- Version category-specific request schemas.
- Treat attachments as untrusted content.
