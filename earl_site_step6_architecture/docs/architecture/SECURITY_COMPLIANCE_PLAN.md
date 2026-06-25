# Security and Compliance Plan

This plan assumes the clinical app will handle adult patient intake answers, dermatology photos, provider notes, prescriptions, and pharmacy handoff data. Treat all clinical-app data as PHI/ePHI unless proven otherwise.

---

## 1. HIPAA posture

Because the business model involves medical evaluation and prescriptions, build the production system as if HIPAA applies. Whether the practice is formally a HIPAA covered entity may depend on electronic transactions, insurance/billing practices, and other operations, but the safer engineering posture is HIPAA-grade from day one.

### Required vendor posture

| Vendor type | BAA needed before PHI? | Notes |
|---|---:|---|
| Cloud host for clinical app | Yes | Includes database, object storage, compute, logs. |
| Auth provider | Yes if it receives PHI or user identifiers tied to care | Prefer auth inside HIPAA cloud boundary. |
| Email/SMS vendor | Yes if message content or templates include PHI | Avoid PHI in email/SMS. |
| Error tracking/logging | Yes if it may receive PHI | Better: block PHI at source and self-host/BAA. |
| Analytics/session replay | Avoid | Session replay is high-risk for PHI leakage. |
| Payment processor | Avoid PHI in processor | Use generic line items and opaque IDs. |
| Pharmacy/eRx partner | Contract/BAA or treatment disclosure path | Confirm legal pathway and transmission method. |
| Support/helpdesk | BAA if support sees PHI | Better: support sees ticket IDs only, not clinical content. |

---

## 2. Technical safeguards

| Control | MVP implementation |
|---|---|
| Unique user identification | One account per patient/provider/admin. No shared provider logins. |
| Emergency access | Break-glass admin role with reason capture and enhanced audit. |
| Automatic logoff | Patient 30 minutes idle; provider 15 minutes idle. |
| Encryption/decryption | TLS 1.2+ in transit; KMS-backed encryption at rest. |
| Audit controls | Audit every PHI read/write/export/pharmacy send. |
| Integrity controls | Immutable audit events; DB constraints; hashes for stored photo objects. |
| Person/entity authentication | Email OTP or passkey for patient; provider MFA mandatory. |
| Transmission security | HTTPS only, HSTS, no PHI in URL query strings. |

---

## 3. Administrative safeguards

| Control | MVP implementation |
|---|---|
| Security management process | Written risk analysis before launch; quarterly review. |
| Assigned security responsibility | Named owner for privacy/security and incident response. |
| Workforce security | Provider/admin accounts only; least-privilege roles. |
| Information access management | Role-based access controls by visit/state/status. |
| Security awareness | Annual HIPAA/security training; onboarding checklist. |
| Incident procedures | Security incident runbook and breach-notification decision tree. |
| Contingency plan | Encrypted backups, restore testing, downtime procedure. |
| Evaluation | Pen test/security review before launch; dependency scanning. |

---

## 4. Physical safeguards

For cloud infrastructure, physical safeguards are largely handled by the cloud vendor under its compliance program and BAA. For the practice side:

- Provider devices must use full-disk encryption.
- Provider dashboard access only from approved devices.
- Require OS screen lock and password/passkey.
- No PHI downloads to local machine unless operationally necessary.
- No printing by default.
- Lost-device process must exist before launch.

---

## 5. Application security requirements

### Authentication

- Patient: passwordless email OTP or passkey. Optional SMS only for non-PHI notifications.
- Provider/admin: MFA mandatory, preferably passkey/TOTP/hardware key.
- Session cookies: `HttpOnly`, `Secure`, `SameSite=Lax` or stricter.
- CSRF protection on all state-changing endpoints.

### Authorization

- Patient can access only their own visits.
- Provider can access only visits in licensed/supported states unless admin override.
- Admin can access operational data but not full clinical content by default.
- Support role sees billing/status metadata only unless explicit break-glass.

### Logging

Never log:

- symptoms/free text
- diagnoses
- medication names tied to a patient
- photo filenames containing patient data
- presigned URLs
- DOB/full address
- prescription payloads

Log instead:

- event type
- internal user ID
- visit ID
- role
- timestamp
- IP/user agent
- success/failure
- reason code

### Secure defaults

- Content Security Policy.
- No third-party trackers on clinical app.
- Disable browser caching on PHI pages.
- Signed URLs expire in 5 minutes or less.
- Rate-limit login, upload, and webhook endpoints.
- Malware scan uploaded files before provider view if feasible.
- Strip EXIF from display derivatives.

---

## 6. Audit-event model

Audit events should be append-only.

```json
{
  "id": "audit_evt_...",
  "occurred_at": "2026-06-23T18:24:00Z",
  "actor_type": "provider|patient|admin|system|pharmacy",
  "actor_id": "user_...",
  "visit_id": "visit_...",
  "patient_id": "patient_...",
  "event_type": "visit.viewed|photo.viewed|rx.sent|message.sent|payment.updated",
  "ip_address": "...",
  "user_agent": "...",
  "reason": "treatment|support|break_glass|system",
  "metadata": {
    "status_from": "provider_review",
    "status_to": "closed_rx"
  }
}
```

---

## 7. Incident-response minimum

Before launch, define:

1. How suspicious access is detected.
2. Who receives security alerts.
3. How to disable accounts quickly.
4. How to revoke presigned URLs.
5. How to rotate keys/secrets.
6. How to determine whether PHI was accessed.
7. Legal/counsel notification path.
8. Patient notification decision path.
9. Pharmacy notification path if Rx payloads are affected.
10. Post-incident corrective-action record.

---

## 8. No-go launch criteria

Do not launch if any are true:

- PHI is stored on a service without a BAA or equivalent healthcare agreement.
- Photos are publicly accessible or CDN-indexable.
- Provider login lacks MFA.
- Stripe metadata contains PHI.
- Logs contain intake answers, diagnosis, prescription, or photo URLs.
- Pharmacy handoff occurs by ordinary email.
- No tested backup restore.
- No written incident-response process.
