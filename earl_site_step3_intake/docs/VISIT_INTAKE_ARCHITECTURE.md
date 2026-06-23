# Visit Intake Architecture - Step 3

This document defines the Step 3 intake layer for Earl Is My Cat: a minimal patient intake, basic red-flag triage, consent/payment sequence, photo upload workflow, and one-page provider review model.

## Core principles

1. Ask the fewest questions needed for a safe prescription decision.
2. Keep the patient flow short: one concern, one concise description, duration, severity, prior treatments, photos, medication safety, red flags, identity/state, consent/payment.
3. Capture red flags separately from ordinary history so the provider dashboard can surface them immediately.
4. Treat uploaded photos as clinical records in production.
5. Capture consent before payment authorization.
6. Keep diagnosis, condition, medication, and other PHI out of payment metadata.
7. Let the provider review the case, document the impression, send/request Rx, message the patient, and close the consult from one page.

## Current patient flow in `visit.html`

1. Concern and brief HPI
2. Photos
3. Medical snapshot
4. Safety check
5. Identity and state
6. Consent/payment/submit

The current prototype uses `localStorage` to pass demo data to the provider dashboard. Production should replace this with authenticated, encrypted server-side storage and audit logging.

## Photo workflow

The prototype uses a 3-photo operational target for most visits:

- Close-up, in focus.
- Mid-distance showing surrounding skin.
- One additional angle or comparison area.

This is a clinical design choice, not a universal federal photo-count rule. Production should allow provider/team override for conditions where 3 photos are not relevant, but the default should encourage enough views to assess distribution, anatomic context, and morphology.

## Safety gates

Universal safety gates include:

- Fever, feeling very ill, or rapidly spreading rash/infection.
- Severe pain, rapidly worsening swelling, red streaking, or drainage.
- Eye involvement, vision changes, or rash/blisters near the eye.
- Trouble breathing, swallowing, or swelling of lips/tongue/throat.
- A changing, bleeding, painful, or suspicious mole/spot that may need biopsy.
- Large open wound, burn, severe injury, abscess, or procedure need.
- Major immunosuppression or similar high-risk condition.

Condition-specific flags are defined in `assets/js/visit.js` and summarized in `assets/data/intake-schema.json`.

Production behavior should be conservative: flags should not necessarily block submission, but should change the default provider disposition toward urgent care, in-person care, video visit, more information, or non-prescribing advice.

## Consent/payment sequence

Current prototype sequence:

1. Patient completes intake.
2. Patient reviews safety notice if any red flags are checked.
3. Patient accepts telehealth, Rx-not-guaranteed, compounded-medication, cash-pay, and photo/privacy acknowledgements.
4. Static payment placeholder appears.
5. Demo consult is saved locally for provider-dashboard preview.

Production sequence should be:

1. Account/session creation.
2. Patient identity and physical state capture.
3. Telehealth consent and photo consent.
4. Non-emergency acknowledgement.
5. Rx-not-guaranteed acknowledgement.
6. Compounded-medication acknowledgement if compounded prescriptions may be used.
7. Payment authorization or checkout.
8. Payment success webhook creates a consult in the provider queue.

Do not collect card numbers directly in the app. Use a PCI-compliant processor such as Stripe Checkout or Stripe Payment Element, and do not place PHI in payment metadata.

## Provider dashboard concept

The primary provider dashboard prototype is `provider.html`. `provider-dashboard.html` is only a redirect/alias.

The provider dashboard is a single-page closeout view with:

- Patient identity, DOB, state, photo count, consent/payment status.
- Chief concern and concise HPI.
- Duration, severity, and prior treatments.
- Red-flag status.
- Medication-safety snapshot.
- Photo viewer.
- Working diagnosis.
- Disposition selector.
- Assessment/plan note.
- Rx action, pharmacy, and prescription/formula text.
- Patient message.
- Required safety/consent/photo adequacy checkboxes.
- Buttons: save draft, request info, send plan and close consult.

## Production data object

```json
{
  "consult_id": "uuid",
  "status": "draft|paid|ready_for_review|needs_more_info|closed|triage_redirected",
  "patient": {
    "first_name": "",
    "last_name": "",
    "dob": "",
    "email": "",
    "state": ""
  },
  "intake": {
    "concern_key": "",
    "chief_concern": "",
    "duration": "",
    "severity": "",
    "tried": "",
    "medical_snapshot": "",
    "pregnancy_status": "",
    "red_flags": []
  },
  "photos": [
    {"object_key": "secure-storage-key", "type": "overview|medium|closeup|other", "uploaded_at": "ISO-8601"}
  ],
  "payment": {
    "processor": "stripe",
    "checkout_session_id": "",
    "status": "unpaid|paid|refunded|waived_triage",
    "amount_cents": 7500
  },
  "provider_decision": {
    "diagnosis": "",
    "decision": "ready_to_treat|request_more_info|in_person|urgent|no_rx",
    "plan": "",
    "rx_action": "none|compound|commercial|otc_support",
    "pharmacy": "",
    "rx_text": "",
    "patient_message": "",
    "closed_at": "ISO-8601"
  }
}
```

## Files changed in Step 3

- `visit.html`
- `assets/css/visit.css`
- `assets/js/visit.js`
- `provider.html`
- `provider-dashboard.html` redirect alias
- `assets/css/provider.css`
- `assets/js/provider.js`
- `assets/data/intake-schema.json`
- `docs/VISIT_INTAKE_ARCHITECTURE.md`
- `docs/PROVIDER_DASHBOARD_SPEC.md`
- `intake-config.json`
