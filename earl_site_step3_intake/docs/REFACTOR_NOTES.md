# Step 2 Refactor Notes

This pass converts the static prototype into a more maintainable repository structure.

## What changed

- Moved repeated inline `<style>` blocks into external CSS files under `assets/css/`.
- Moved page JavaScript into `assets/js/`.
- Extracted embedded base64 Earl images into `assets/images/` and replaced data URLs with file references.
- Added `partials/header.html` and `partials/footer.html` as canonical copies for future template/build use.
- Added `templates/condition-page.html` for cloning future condition pages.
- Added `site-manifest.json` mapping each HTML page to its stylesheet and script dependencies.
- Preserved a no-build static HTML deployment path: open `index.html` locally or deploy the repo as static files.

## Current structure

```text
assets/
  css/
    about.css
    condition.css
    home.css
    legal.css
    shop.css
    visit.css
  js/
    home.js
    site.js
    visit.js
  images/
partials/
  header.html
  footer.html
templates/
  condition-page.html
docs/
  CLAIMS_AUDIT.md
  REFACTOR_NOTES.md
*.html
README.md
site-manifest.json
```

## Remaining recommended cleanup

- Move to a true templating/build step if the site grows beyond static HTML.
- Replace placeholder product cards with real product data from Shopify/headless commerce or another catalog source.
- Replace the demo visit flow with a secure HIPAA-compatible intake implementation before collecting PHI.
- Have counsel review privacy, terms, telehealth consent, affiliate disclosure, and compounded-medication disclosure before launch.
