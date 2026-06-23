# Intake architecture

This file has been superseded by `VISIT_INTAKE_ARCHITECTURE.md`.

Use that document as the canonical Step 3 workflow, data model, and implementation note.


## Adult-only gate

The launch prototype is 18+ only. The first step must confirm adult eligibility before any photo upload is presented. If the patient is under 18, the flow hard-stops and instructs the user not to continue or submit photos. A future pediatric workflow would require a separate guardian-consent and state-law review path.
