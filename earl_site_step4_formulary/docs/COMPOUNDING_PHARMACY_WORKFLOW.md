# Compounding pharmacy workflow

Status: architecture note for implementation planning.

## Intake to pharmacy flow

1. Patient completes intake, uploads photos, signs consent, and pays.
2. Case enters provider dashboard.
3. Provider reviews safety flags, photos, and history.
4. Provider selects a pathway: no Rx, commercial Rx, compounded Rx, request more info, or in-person/urgent care.
5. If compounded Rx is selected, the clinician edits the exact formula and documents the patient-specific reason.
6. Backend sends prescription and required demographics/allergy data to the pharmacy via the selected workflow.
7. Pharmacy confirms eligibility, availability, state shipment, pricing, and fulfillment status.
8. Patient receives medication instructions and pharmacy support information.
9. Provider dashboard stores final note, patient message, Rx record, pharmacy routing, and follow-up interval.

## Data needed for pharmacy handoff

- Patient legal name, DOB, address, phone/email.
- Patient state at time of encounter and shipping state.
- Allergies.
- Current medications and relevant medical conditions.
- Pregnancy/breastfeeding status when applicable.
- Diagnosis.
- Formula/medication, strength, vehicle, quantity, directions, refills.
- Patient-specific compounding rationale when compounded.
- Prescriber name, credentials, license/NPI/DEA if applicable.
- Pharmacy identifier and state coverage confirmation.

## Formula governance

Each compounded formula should have a versioned internal record:

- Formula ID.
- Condition/pathway.
- Ingredients and strengths.
- Vehicle/base.
- Rationale.
- Contraindications and counseling.
- Stability/BUD status from pharmacy.
- States where pharmacy can dispense.
- Last reviewed by clinician.
- Last reviewed by pharmacy/regulatory counsel if applicable.

## Avoid in the public site

- Do not list compounded formulas as buyable products.
- Do not promise a specific prescription before evaluation.
- Do not state compounded drugs are FDA-approved.
- Do not imply OTC cosmetics treat disease.
- Do not structure pharmacy economics as a per-prescription kickback.

## Provider dashboard principle

The provider should be able to close a routine case on one page, but the page should still force the essential cognitive checks: diagnosis fit, safety gate, contraindications, photo sufficiency, medication route, edited Rx, edited patient message, and follow-up.
