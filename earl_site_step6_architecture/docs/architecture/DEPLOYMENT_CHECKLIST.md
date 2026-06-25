# Production Deployment Checklist

## Legal/vendor prerequisites

- [ ] Confirm HIPAA covered entity / business associate posture with counsel.
- [ ] Execute BAA with PHI cloud host before PHI enters account.
- [ ] Execute BAA or approved agreement with auth/email/logging/support vendors as needed.
- [ ] Confirm Stripe can support the business model and any required due diligence.
- [ ] Confirm Stripe metadata/receipts contain no PHI.
- [ ] Execute pharmacy contract and data exchange agreement.
- [ ] Confirm pharmacy states served match provider licensure states.
- [ ] Review terms, privacy, telehealth consent, financial policy, refund policy.
- [ ] Define medical record retention by state.

## Infrastructure

- [ ] Dedicated production AWS account for PHI.
- [ ] AWS BAA accepted before PHI use.
- [ ] Only HIPAA-eligible services in PHI path.
- [ ] VPC with private subnets for app/database.
- [ ] RDS encrypted and private.
- [ ] S3 photo bucket private with block public access.
- [ ] KMS keys created and access limited.
- [ ] CloudTrail enabled all regions.
- [ ] GuardDuty/Security Hub/Config enabled.
- [ ] Backups encrypted and restore tested.
- [ ] WAF/rate limiting configured.

## Application security

- [ ] Provider MFA mandatory.
- [ ] Adult gate before photo upload.
- [ ] Unsupported states blocked before payment.
- [ ] CSRF protection.
- [ ] Secure cookies.
- [ ] No PHI in URLs.
- [ ] No PHI in app logs.
- [ ] No third-party analytics/session replay on clinical app.
- [ ] Photo upload validates file type and size.
- [ ] Display photos served by short-lived signed URLs.
- [ ] EXIF stripped from displayed derivatives.
- [ ] Audit logs for every PHI access.

## Payment

- [ ] Checkout Sessions or Payment Element implemented.
- [ ] Webhook signature verification.
- [ ] Webhook idempotency.
- [ ] Failed payment keeps visit out of provider queue.
- [ ] Refund path tested.
- [ ] Receipt line item is generic.

## Provider workflow

- [ ] Dashboard loads complete review bundle.
- [ ] Red flags visible.
- [ ] Photos visible only after auth.
- [ ] Diagnosis/plan/Rx required before close-Rx action.
- [ ] Compounding rationale required for compounded Rx.
- [ ] Ask-more-info flow works.
- [ ] Referral/urgent flow works.
- [ ] Close/no-Rx flow works.

## Pharmacy

- [ ] Pharmacy selected from approved state/license matrix.
- [ ] Handoff payload minimum necessary.
- [ ] No ordinary email PHI.
- [ ] Pharmacy clarification loop tested.
- [ ] Handoff status stored.
- [ ] Patient pharmacy instructions sent through portal.

## Operations

- [ ] Incident-response runbook finalized.
- [ ] Lost-device procedure finalized.
- [ ] Backup restore drill completed.
- [ ] Access review completed.
- [ ] Security training completed.
- [ ] Pen test/security review completed.
- [ ] Monitoring alerts route to responsible person.
- [ ] Downtime workflow documented.
