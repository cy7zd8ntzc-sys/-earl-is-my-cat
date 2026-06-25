# Step 6 Summary — Production Architecture

Created a production architecture plan for:

- PHI-safe backend
- authentication
- encrypted photo storage
- Stripe payment sequence
- provider dashboard data model
- compounding pharmacy handoff
- deployment checklist
- vendor/BAA matrix
- API contracts
- SQL starter schema

## Recommended architecture

The public website remains a static, non-PHI marketing site. The clinical app/provider dashboard should be a separate authenticated PHI environment, preferably deployed on AWS with a BAA and HIPAA-eligible services.

## Key constraints

- No PHI in public marketing site.
- No PHI in Stripe metadata, receipt text, or product names.
- No public photo URLs.
- Provider MFA required.
- Adult-only gate before photo upload.
- Pharmacy handoff only through secure/eRx/portal methods.
- Compounded medications remain patient-specific provider decisions, not ecommerce products.

## Files added

- `docs/PRODUCTION_ARCHITECTURE_PLAN.md`
- `docs/architecture/SECURITY_COMPLIANCE_PLAN.md`
- `docs/architecture/PHOTO_STORAGE_PLAN.md`
- `docs/architecture/STRIPE_PAYMENT_SEQUENCE.md`
- `docs/architecture/PROVIDER_DASHBOARD_DATA_MODEL.md`
- `docs/architecture/COMPOUNDING_PHARMACY_HANDOFF_PRODUCTION.md`
- `docs/architecture/API_CONTRACTS.md`
- `docs/architecture/DEPLOYMENT_CHECKLIST.md`
- `docs/architecture/VENDOR_BAA_MATRIX.md`
- `architecture/schema.sql`
- `architecture/openapi-starter.yaml`
- `architecture/example.env`
