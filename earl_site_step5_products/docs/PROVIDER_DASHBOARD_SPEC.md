# Provider Dashboard Specification - Step 3

Primary static mockup: `provider.html`.

`provider-dashboard.html` is only a redirect/alias for compatibility.

## Product principle

The provider dashboard should not feel like an EHR scavenger hunt. It should be a single decision screen: review photos, HPI, medication-safety snapshot, and safety flags; choose a decision; edit the plan/Rx/message; and close the consult.

## Current prototype behavior

- Reads the latest demo visit from browser `localStorage`.
- Displays a case header with concern, state, DOB, and photo count.
- Shows safety-gate status prominently.
- Displays a photo viewer and thumbnails.
- Provides one action card for diagnosis, decision, plan, Rx action, pharmacy, Rx text, patient message, and closeout.
- Includes quick action buttons for common outcomes: treat, request more photos, in-person route, and no Rx.

## One-page layout

### Left column: intake evidence

- Patient identity line.
- Concern and short HPI.
- Duration, severity, and prior treatments.
- Medication-safety summary.
- Safety flags.
- Photo viewer.

### Right column: action panel

- Working diagnosis.
- Decision selector.
- Assessment/plan note.
- Rx action selector.
- Pharmacy selector.
- Prescription/formula text.
- Patient message.
- Safety/consent/photo adequacy checkboxes.
- Action buttons: save draft, request info, send plan and close consult.

## Minimal editable fields

For most consults, the provider should only need:

1. Working diagnosis.
2. Decision.
3. Assessment/plan.
4. Rx action/pharmacy/Rx text if prescribing.
5. Patient message.
6. Three final review checkboxes.

Everything else should be read-only summary content.

## Dispositions

- Ready to treat.
- Request more info/photos.
- Needs in-person care.
- Urgent care / ER guidance.
- No prescription needed.

## Rx composer

Initial implementation can be a textarea plus templates. Later implementation can map templates into structured pharmacy payloads.

Suggested structured fields once integrated:

- Pharmacy partner.
- Medication/formula ID.
- Sig.
- Quantity.
- Refills.
- Substitution/dispense notes.
- Patient counseling text.

## Close consult rules

Before closeout, production should require:

- Licensed-state check passed or non-prescribing disposition selected.
- Consent/payment status checked.
- Photos adequate or limitations documented.
- Medication safety reviewed.
- Rx reviewed if prescription is being sent.
- Patient message present.
- Audit event written.

## AI assistant placement

AI should draft, not decide.

Suggested AI functions:

- Summarize intake into HPI.
- Draft assessment/plan.
- Draft patient message.
- Suggest red-flag follow-up questions.
- Generate pharmacy handoff text.

Provider must approve final diagnosis, plan, message, and Rx before close.
