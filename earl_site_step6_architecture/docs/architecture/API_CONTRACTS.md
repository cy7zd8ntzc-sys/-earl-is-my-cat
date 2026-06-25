# API Contracts — Production MVP

These are conceptual contracts for the clinical app. They are not implemented in the static prototype.

---

## Authentication

### `POST /auth/start`

Purpose: start patient login or account creation.

Request:

```json
{ "email": "patient@example.com" }
```

Response:

```json
{ "status": "otp_sent" }
```

### `POST /auth/verify`

Request:

```json
{ "email": "patient@example.com", "code": "123456" }
```

Response:

```json
{ "session": "httpOnly-cookie-set" }
```

---

## Visit creation and intake

### `POST /visits`

Creates a draft visit after adult eligibility and state check.

Request:

```json
{
  "dob": "1988-04-01",
  "patient_state": "TX",
  "adult_attestation": true
}
```

Response:

```json
{ "visit_id": "visit_...", "status": "draft" }
```

### `PATCH /visits/{visit_id}/intake`

Request:

```json
{
  "concern_slug": "acne",
  "chief_concern": "...",
  "duration": "1-6 months",
  "severity": "moderate",
  "tried_already": "...",
  "medications": "...",
  "allergies": "...",
  "medical_conditions": "...",
  "pregnancy_breastfeeding": "no",
  "red_flags": []
}
```

Response:

```json
{ "visit_id": "visit_...", "status": "photos_pending", "red_flags": [] }
```

---

## Photo upload

### `POST /visits/{visit_id}/photos/presign`

Request:

```json
{
  "photo_type": "overview",
  "content_type": "image/jpeg",
  "size_bytes": 3456789
}
```

Response:

```json
{
  "photo_id": "photo_...",
  "upload_url": "https://...",
  "fields": {},
  "expires_at": "2026-06-23T18:30:00Z"
}
```

### `POST /visits/{visit_id}/photos/{photo_id}/confirm`

Response:

```json
{ "photo_id": "photo_...", "status": "processing" }
```

---

## Consent and payment

### `POST /visits/{visit_id}/consents`

Request:

```json
{
  "telehealth_consent_version": "2026-06-23",
  "privacy_version": "2026-06-23",
  "terms_version": "2026-06-23",
  "financial_policy_version": "2026-06-23",
  "adult_attestation": true,
  "rx_not_guaranteed": true,
  "photo_consent": true
}
```

Response:

```json
{ "status": "consented" }
```

### `POST /visits/{visit_id}/payment-session`

Response:

```json
{
  "checkout_session_id": "cs_...",
  "client_secret": "...",
  "amount_cents": 5900,
  "description": "Online dermatology visit"
}
```

### `POST /webhooks/stripe`

- Verify Stripe signature.
- Enforce idempotency on event ID.
- Update `payments` and `visits`.
- Do not log raw event if it contains customer data beyond what is necessary.

---

## Provider dashboard

### `GET /provider/visits/{visit_id}/review-bundle`

Response:

```json
{
  "visit": {},
  "patient": {},
  "intake_summary": {},
  "photos": [
    { "photo_id": "photo_...", "type": "overview", "signed_url": "expires quickly" }
  ],
  "red_flags": [],
  "payment": {},
  "formulary_options": []
}
```

### `POST /provider/visits/{visit_id}/decision`

Request:

```json
{
  "diagnosis_text": "...",
  "plan_text": "...",
  "rx_needed": true,
  "rx": {
    "medication_name": "...",
    "is_compounded": true,
    "formulation_text": "...",
    "sig": "...",
    "quantity": "...",
    "refills": 0,
    "compounding_rationale": "..."
  },
  "patient_message": "...",
  "action": "send_rx_and_close"
}
```

Response:

```json
{ "status": "rx_pending", "decision_id": "decision_..." }
```

---

## Pharmacy handoff

### `POST /provider/prescriptions/{prescription_id}/send`

Request:

```json
{
  "pharmacy_id": "pharm_...",
  "method": "secure_portal",
  "external_reference": "optional"
}
```

Response:

```json
{ "handoff_id": "handoff_...", "status": "sent" }
```

### `PATCH /provider/pharmacy-handoffs/{handoff_id}`

Request:

```json
{
  "status": "accepted",
  "external_reference": "pharmacy_order_...",
  "note": "No PHI in logs; stored in DB only"
}
```
