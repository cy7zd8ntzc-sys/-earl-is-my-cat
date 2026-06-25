# Adult-only safety patch

This patch configures the prototype for an 18+ launch scope.

## Changes

- Added an adult eligibility gate before the photo-upload step in `visit.html`.
- Added DOB-based under-18 blocking in `assets/js/visit.js`.
- Removed the under-18/pediatric intake field to avoid conflicting with the 18+ Terms.
- Added an adult confirmation checkbox to the final consent step.
- Removed eczema and molluscum from active condition lists, intake schema, and formulary data.
- Deleted `eczema.html` and `molluscum.html` from this bundle.
- Added red-flag sections to `herpes.html` and `hs.html`.
- Reworded the photo instructions so the UI no longer includes research-note language.

## Production note

Do not collect PHI, images, or payment for minors in this version. A pediatric version should be built as a separate workflow with guardian identity, guardian consent, minor assent where appropriate, state-specific consent review, and stricter image-submission rules.
