# Step 4 summary - prescribing/formulary scaffold

This step adds an internal prescribing framework to the static prototype.

## Added

- `assets/data/formulary.json`
- `assets/js/formulary.js`
- `docs/FORMULARY_FRAMEWORK.md`
- `docs/COMPOUNDING_PHARMACY_WORKFLOW.md`
- Formulary assistant panel in `provider.html`
- Template application logic in `assets/js/provider.js`
- Formulary panel styling in `assets/css/provider.css`

## Design choices

- Prescriptions are not public ecommerce products.
- Templates are editable decision-support prompts, not automatic prescriptions.
- Commercial, compounded, OTC/supportive, request-more-info, and in-person pathways remain separate.
- Compounded prescriptions are framed as patient-specific and pharmacy-verified.
- Safety tags and avoid/pause language are surfaced directly in the provider dashboard.

## Next step

Step 5 should define the first OTC/white-label and affiliate product strategy: product categories, claims boundaries, affiliate disclosure language, and what should stay affiliate-only versus owned inventory.
