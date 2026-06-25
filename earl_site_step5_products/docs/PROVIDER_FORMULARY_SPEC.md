# Provider Dashboard Formulary Quick-Pick Spec

## Goal

Keep the provider workflow on one screen:

1. Review intake snapshot.
2. Review photos.
3. Check safety flags.
4. Select formulary template.
5. Edit diagnosis, plan, prescription handoff, and patient message.
6. Check safety/photos/consent reviewed.
7. Send/close consult.

## Current implementation

The static prototype reads demo intake from `localStorage` and matches `visit.concern` against `assets/data/formulary.json`. The matched condition renders:

- condition summary,
- automatic Rx flags,
- condition-specific guardrails,
- prescription/supportive-care options,
- template application buttons.

## Production data model

A production backend should store:

```json
{
  "consult_id": "uuid",
  "patient_id": "uuid",
  "condition_id": "acne",
  "decision": "Ready to treat",
  "rx_action": "Send compounded prescription",
  "diagnosis": "Acne vulgaris",
  "plan_note": "...",
  "rx_handoff": "...",
  "patient_message": "...",
  "safety_reviewed": true,
  "photos_reviewed": true,
  "consent_payment_reviewed": true,
  "provider_id": "uuid",
  "closed_at": "timestamp"
}
```

## Production controls still needed

- Authentication and role-based provider access.
- Encrypted image storage and audit logging.
- Immutable clinical record after close/sign.
- Pharmacy API/e-fax/portal handoff.
- Stripe payment confirmation before consult creation.
- State-specific consent/licensure enforcement.
- Manual override reasons for red-flag cases.
- Template versioning: store formulary version used for each decision.
