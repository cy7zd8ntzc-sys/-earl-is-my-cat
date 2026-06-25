# Vendor / BAA Matrix

This matrix should be completed before production launch.

| Vendor | Purpose | PHI/ePHI exposure? | BAA needed? | Status | Notes |
|---|---|---:|---:|---|---|
| AWS | Hosting, storage, database, logs | Yes | Yes | Pending | Execute BAA before PHI. Use only eligible services in PHI path. |
| Stripe | Visit payment | Avoid PHI | Counsel review | Pending | Do not send PHI in metadata/product/receipt. Telehealth may require due diligence. |
| Email vendor | Account/portal notifications | Ideally no | Maybe | Pending | No PHI in email. Portal-link only. |
| SMS vendor | Optional reminders | Ideally no | Maybe | Deferred | Avoid initially. |
| Pharmacy partner | Prescription fulfillment | Yes | Counsel review | Pending | Treatment disclosure vs BAA/contract analysis. |
| eRx vendor | Prescription transmission | Yes | Yes | Pending | Required if used. |
| Error monitoring | App errors | Should be no | Maybe | Pending | Scrub payloads; avoid PHI. |
| Analytics | Marketing analytics | No PHI | No for public site | Allowed public only | Do not use on clinical app unless BAA/no PHI. |
| Support/helpdesk | Patient support | Possible | Maybe | Pending | Restrict support visibility. |
| Domain/DNS | DNS | No PHI | No | Pending | Avoid PHI in subdomain paths/query strings. |
| Github | Code repository | No PHI | No | Allowed | Never commit PHI/secrets. |

## Vendor rules

1. No PHI goes to a vendor until vendor status is known.
2. No vendor gets PHI unless the vendor is in the approved list.
3. BAAs/contracts must be stored centrally.
4. Vendor access must be reviewed quarterly.
5. Any new tool that sees logs, screenshots, files, or support tickets must be reviewed for PHI exposure before use.
