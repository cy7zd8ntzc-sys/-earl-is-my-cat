# Prescribing & Formulary Framework — Internal Draft

This document defines the internal prescribing architecture for the Earl Is My Cat cash-pay teledermatology prototype. It is designed to keep the patient-facing site simple while giving the clinician one condensed screen for diagnosis, plan, pharmacy handoff, patient message, and consult closure.

## Operating model

1. Patient completes minimal intake, uploads photos, consents, and pays.
2. Dashboard shows the whole case on one page.
3. Clinician selects a disposition: treat, request more information, no prescription, in-person, or urgent care.
4. If treatment is appropriate, clinician uses a formulary template as a starting point only.
5. Clinician edits diagnosis, plan, prescription handoff, and patient message before closing.
6. Prescription is routed to a third-party pharmacy only after clinician review.

## Prescription lanes

| Lane | Use case | Dashboard behavior |
|---|---|---|
| Compounded topical | Custom vehicle, multi-active dermatology formula, intolerance/allergen issue, concentration not well served commercially | Quick-pick template fills a pharmacy handoff draft |
| Commercial prescription | Standard oral antivirals, topical steroids, topical antifungals, terbinafine, etc. | Quick-pick template holds key safety checks and final SIG |
| OTC/supportive | KP, simple body care, sunscreen, moisturizer, affiliate products | No Rx handoff; patient message and product recommendations only |
| Hold/request info | Missing photos, pregnancy flag, labs needed, unclear diagnosis | No prescription until resolved |
| In-person/urgent | Procedure, biopsy, abscess, cellulitis, ocular risk, systemic illness | No prescription from simple pathway |

## Compounding guardrails

- Do not display compounded prescriptions as ecommerce products.
- Do not send a compounded prescription unless tied to a valid individual patient evaluation.
- Document the patient-specific reason for compounding when a comparable commercial option exists.
- Confirm pharmacy state coverage, ingredient availability, beyond-use dating, packaging, shipping, and patient counseling before launch.
- Do not let templates obscure the final clinician decision. Every formula, strength, direction, quantity, and refill must be edited or confirmed manually.

## High-yield first formulary areas

1. Acne and acne-associated PIH
2. Rosacea
3. Melasma / hyperpigmentation
4. Fine lines / retinoid maintenance
5. Perioral dermatitis
6. Seborrheic dermatitis
7. Hair loss topical options
8. Hyperhidrosis topical options

These are best suited to a cash-pay dermatology model because they are recurring, image-reviewable, and compatible with compounded topical or focused commercial therapy.

## Higher-friction pathways

- Nail fungus: confirm diagnosis and review liver/medication risk before oral therapy.
- Scabies: contact treatment and household instructions are as important as the prescription.
- Genital warts: STI counseling, lesion location, pregnancy, and biopsy triggers matter.
- HSV: distinguish oral/genital, first/recurrent, episodic/suppressive, renal/pregnancy status.
- Impetigo/cellulitis: avoid telehealth-only treatment when infection appears spreading/systemic.
- HS: do not manage abscess drainage through the simple online pathway.

## Files added in Step 4

- `assets/data/formulary.json` — canonical draft condition/formulary map.
- `assets/js/formulary-data.js` — static-site wrapper for local demo use.
- `provider.html` — updated with formulary quick-pick panel.
- `assets/js/provider.js` — renders condition-matched formulary options and applies templates.
- `docs/FORMULARY_GUARDRAILS.md` — safety and operational rules.
