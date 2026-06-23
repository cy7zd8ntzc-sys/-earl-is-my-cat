# Prescribing and formulary framework

Status: internal clinician decision-support prototype. This document is not medical advice, not a protocol, not a standing order, and not an automated prescribing system.

## Purpose

The goal is to make the provider dashboard fast without making prescribing automatic. The dashboard should help the clinician move from intake/photos to a decisive plan on one page, while preserving the key safety steps:

1. Review diagnosis fit and red flags.
2. Review pregnancy, age, allergies, medications, and comorbidities.
3. Select commercial, compounded, OTC/supportive, request-more-info, or in-person pathway.
4. Edit the final diagnosis, plan, Rx handoff, patient message, follow-up, and close the consult.

## Key rule for compounded prescriptions

Compounded medications should be used as patient-specific prescriptions, not as a public ecommerce catalog. The formulary is framed around possible pathways and editable templates. In production, each compounded prescription should document the patient-specific reason for compounding, the active ingredients, strength, vehicle, quantity, refills, directions, pharmacy, and counseling.

## Preferred routing hierarchy

1. **Commercial Rx** when an FDA-approved product fits the need and the patient can access it through the selected pharmacy route.
2. **Compounded Rx** when a patient-specific reason exists, such as combination therapy, vehicle intolerance, allergy/excipient issue, dose/strength customization, or a clinically useful formulation not otherwise available.
3. **OTC / white-label / affiliate support** when no prescription is needed or as adjunctive routine support.
4. **Request more info/photos** when images/history are insufficient.
5. **In-person/urgent care** when red flags or procedure-level care are present.

## Safety screens that should stay global

- Pregnancy, trying to conceive, breastfeeding.
- Under 18.
- Drug allergies.
- Current medications and interaction-prone drugs.
- Immunosuppression.
- Renal/hepatic disease.
- Eye involvement.
- Severe pain, fever, rapidly spreading rash, systemic symptoms.
- Abscess/drainage/procedural need.
- Suspicious or changing lesion.
- Unclear diagnosis.

## Follow-up defaults

- Acne, rosacea, eczema, pigment: usually 8-12 weeks unless safety or severity requires earlier review.
- Infection/infestation: usually days to 2-4 weeks depending on condition.
- Hair loss: 3-6 months minimum for early assessment, 6-12 months for meaningful response.
- Nail fungus: requires longer horizon and often confirmatory testing/lab review before oral therapy.

## Conditions included in the JSON scaffold

- Acne
- Rosacea / redness
- Melasma
- Dark spots / hyperpigmentation
- Fine lines / aging
- Hair loss
- Eczema / dermatitis
- Perioral dermatitis
- Seborrheic dermatitis / dandruff
- Excessive sweating
- Cold sores / herpes
- Aphthous ulcers / canker sores
- Fungal infections
- Intertrigo / yeast rash
- Nail fungus
- Scabies
- Impetigo
- Folliculitis / ingrown hairs
- Hidradenitis suppurativa
- Warts
- Genital warts
- Molluscum
- Eyelash growth
- Keratosis pilaris

## Files added in Step 4

- `assets/data/formulary.json` - structured internal formulary data.
- `assets/js/formulary.js` - static preview loader for the JSON.
- `provider.html` - added the formulary assistant panel.
- `assets/js/provider.js` - added condition/template selection and apply-to-decision behavior.
- `assets/css/provider.css` - added formulary panel styling.

## Production requirements before use with patients

- Clinician approval of every template.
- Healthcare/pharmacy attorney review of compounding workflow, patient-specific documentation, state rules, corporate practice, fee-splitting, and pharmacy contracts.
- Pharmacy verification of formula availability, BUD, stability, state shipment coverage, and adverse-event handling.
- Backend audit logging for who selected/edited/sent each prescription.
- Versioned formulary releases with change history.
- No real PHI in local storage.
