# Earl Is My Cat

Static website prototype for **Earl Is My Cat**, a physician-led online dermatology and skincare brand built around simple routines, condition-specific education, and dermatologist-reviewed telehealth visits.

> **Status:** prototype / pre-launch. This repository is not yet a production telehealth system and should not be used to collect real patient information until the security, legal, regulatory, and clinical workflows are finalized.

---

## Overview

This project contains static HTML pages for a direct-to-consumer dermatology platform. The current site concept includes:

- A consumer homepage for online dermatology and skincare.
- Condition-specific education pages.
- A prototype visit intake flow.
- OTC skincare and supplement storefront pages.
- Draft legal pages for terms, privacy / notice of privacy practices, and telehealth consent.
- Brand positioning around honest, minimalist, physician-reviewed care.

The site is intentionally lightweight: plain HTML, CSS, and vanilla JavaScript. There is no backend, database, authentication layer, payment integration, or secure file upload system yet.

---

## Current Tech Stack

- **HTML:** static pages
- **CSS:** inline page-level styling using shared design tokens
- **JavaScript:** small vanilla JS interactions, primarily for the visit-flow prototype and mobile navigation
- **Fonts:** Google Fonts
- **Images:** some pages currently embed images as base64 data URIs
- **Backend:** none yet
- **Build system:** none yet

---

## Local Development

Because this is currently a static site, you can preview it directly in a browser.

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Run a simple local server

From the project root:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

Using a local server is preferred because it more closely matches how links, scripts, and assets will behave after deployment.

---


### Condition expansion in this update

This bundle adds the following condition pages and intake options:

- `eczema.html`
- `perioral-dermatitis.html`
- `folliculitis.html`
- `fungal-infections.html`
- `intertrigo.html`
- `impetigo.html`
- `scabies.html`
- `genital-warts.html`
- `nail-fungus.html`
- `aphthous-ulcers.html`

The public `conditions.html` page now uses a featured list plus a collapsible **More conditions** section to avoid an overly long visible list.

## Recommended File Structure

The uploaded prototype files are currently flat HTML files. For the GitHub repo, use clean filenames without upload suffixes such as `(1)` or `(2)`.

Recommended structure:

```text
.
├── README.md
├── index.html
├── about.html
├── conditions.html
├── visit.html
├── otc.html
├── pills.html
├── terms.html
├── privacy.html
├── consent.html
├── acne.html
├── aging.html
├── dark-spots.html
├── eyelash.html
├── hairloss.html
├── herpes.html
├── hs.html
├── keratosis-pilaris.html
├── melasma.html
├── molluscum.html
├── rosacea.html
├── seb-derm.html
├── sweating.html
└── warts.html
```

Future refactor target:

```text
.
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── conditions/
│   ├── acne.html
│   ├── aging.html
│   ├── dark-spots.html
│   ├── rosacea.html
│   └── ...
├── legal/
│   ├── terms.html
│   ├── privacy.html
│   └── consent.html
├── shop/
│   ├── otc.html
│   └── pills.html
└── visit.html
```

If you move files into folders, update all internal links before deployment.

---

## Page Map

| Page | Purpose |
|---|---|
| `index.html` | Main landing page for the brand and teledermatology service |
| `about.html` | Founder / physician / Earl brand story |
| `conditions.html` | Index page for treated or discussed conditions |
| `visit.html` | Prototype online visit intake flow |
| `otc.html` | OTC skincare shop concept |
| `pills.html` | Supplement shop concept |
| `terms.html` | Draft terms and conditions |
| `privacy.html` | Draft privacy policy / notice of privacy practices |
| `consent.html` | Draft telehealth informed consent |
| `acne.html` | Acne education page |
| `aging.html` | Fine lines and aging education page |
| `dark-spots.html` | Dark spots / hyperpigmentation education page |
| `eyelash.html` | Eyelash growth education page |
| `hairloss.html` | Hair loss education page |
| `herpes.html` | Cold sores / herpes education page |
| `hs.html` | Hidradenitis suppurativa education page |
| `keratosis-pilaris.html` | Keratosis pilaris education page |
| `melasma.html` | Melasma education page |
| `molluscum.html` | Molluscum contagiosum education page |
| `rosacea.html` | Rosacea education page |
| `seb-derm.html` | Seborrheic dermatitis education page |
| `sweating.html` | Excessive sweating / hyperhidrosis education page |
| `warts.html` | Warts education page |

---

## Important Production Warnings

### 1. Do not collect real patient information yet

The visit intake page is currently a front-end prototype. It is not connected to a secure backend, EHR, HIPAA-compliant storage system, identity system, audit log, or encrypted clinical workflow.

Before collecting real patient information, build and validate:

- Secure user authentication.
- Encrypted data storage.
- Encrypted image upload and storage.
- Access controls and role-based permissions.
- Audit logging.
- Secure messaging or notification workflows.
- Business Associate Agreements with vendors touching PHI.
- A backend workflow for clinician review and documentation.
- State-specific telehealth eligibility checks.

Do not commit real patient data, test PHI, API keys, credentials, environment files, or production secrets to this repository.

### 2. Legal pages are draft templates

The terms, privacy / notice of privacy practices, and telehealth consent pages are draft scaffolds. They need healthcare attorney review before use.

Before launch, complete and verify:

- Legal entity names.
- Provider entity names.
- Effective dates.
- Contact information.
- State-specific telehealth requirements.
- Privacy-policy and HIPAA applicability language.
- Refund, cancellation, subscription, and pharmacy fulfillment terms.
- Emergency and urgent-care disclaimers.
- Age / minor-consent requirements.
- Arbitration, venue, governing law, and consumer-protection language.

### 3. Medical, FDA, FTC, and state-board claim review is required

The site discusses skin conditions, prescription options, cosmetics, and supplements. That creates regulatory risk if copy implies that cosmetic or supplement products diagnose, treat, cure, prevent, or mitigate disease.

Before launch, review all public-facing copy for:

- FDA cosmetic vs drug claim boundaries.
- FTC substantiation requirements.
- Supplement structure/function claim requirements and disclaimers.
- State medical-board advertising rules.
- Telehealth prescribing rules.
- Financial-interest and conflict-of-interest disclosures.
- Compounded medication consent and risk language.

A key content principle: condition pages can provide education and route users to a medical visit, but OTC cosmetic products should be framed as supportive cosmetic basics unless they are legally marketed as OTC drugs under an applicable monograph or other lawful pathway.

---

## Pre-Launch Checklist

### Content and brand

- [ ] Pick the final brand name and confirm trademark clearance.
- [ ] Normalize filenames and remove duplicate uploaded copies.
- [ ] Replace all placeholder legal text.
- [ ] Add final entity names and contact details.
- [ ] Confirm all claims with regulatory counsel.
- [ ] Check spelling, tone, and consistency across all condition pages.
- [ ] Confirm that product descriptions do not create unintended drug claims.
- [ ] Add final product names, prices, ingredients, and disclaimers.

### Technical

- [ ] Extract repeated CSS into a shared stylesheet.
- [ ] Extract repeated navigation and footer markup into reusable components or templates.
- [ ] Replace base64 images with optimized image files in `assets/images/`.
- [ ] Add responsive QA across mobile, tablet, and desktop.
- [ ] Add accessibility checks for labels, focus states, color contrast, and keyboard navigation.
- [ ] Add analytics only after privacy review.
- [ ] Add form backend only after security review.
- [ ] Add secure image upload only after HIPAA / PHI architecture is complete.

### Clinical and operational

- [ ] Define eligible states and patient-location logic.
- [ ] Define conditions that can be treated asynchronously vs requiring video or in-person care.
- [ ] Add red-flag triage and emergency escalation language.
- [ ] Define clinician review SLA.
- [ ] Finalize pharmacy / compounding workflow.
- [ ] Finalize refill and follow-up policies.
- [ ] Finalize adverse-event and patient-message workflows.

### Legal and compliance

- [ ] Healthcare attorney review.
- [ ] FDA / FTC claim review.
- [ ] Privacy / HIPAA review.
- [ ] Terms of service review.
- [ ] Telehealth consent review.
- [ ] State-specific advertising and telemedicine review.
- [ ] Malpractice carrier review if required.

---

## Deployment Options

This static prototype can be deployed with:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any static web host

For GitHub Pages, keep the final `index.html` at the repo root unless using a custom static-site build pipeline.

Do not connect production intake forms or patient uploads to a static-only deployment without a secure backend architecture.

---

## Suggested Next Refactor

The current prototype repeats a large amount of CSS, navigation, footer markup, and product-card markup across pages. The next practical engineering step is to reduce duplication.

Recommended sequence:

1. Move shared CSS into `assets/css/styles.css`.
2. Move shared JavaScript into `assets/js/main.js`.
3. Normalize all file names and links.
4. Replace embedded base64 images with optimized image files.
5. Choose a static-site framework or templating approach if the site continues growing.
6. Build the secure backend separately from the public marketing site.

Potential future frameworks:

- Astro
- Next.js
- Eleventy
- Plain HTML with shared partials via a simple build script

For a healthcare startup prototype, a clean static marketing site plus a separate HIPAA-aware application backend is usually easier to reason about than mixing everything into one codebase too early.

---

## Security Notes

Never commit:

- `.env` files
- API keys
- Payment processor secrets
- PHI or test PHI
- Patient photos
- Exported intake submissions
- Production database dumps
- Vendor credentials
- Private signing keys

Recommended `.gitignore` additions once backend work begins:

```gitignore
.env
.env.*
!.env.example
node_modules/
dist/
build/
.DS_Store
*.log
uploads/
patient-data/
secrets/
```

---

## License

No open-source license has been selected yet. Until a license is added, treat this repository as proprietary and not licensed for reuse.

---

## Maintainer Notes

This repository is an early prototype for the public-facing experience. Before launch, the site needs legal review, medical/regulatory copy review, security architecture, and a production backend for any clinical workflow.

Earl is a cat. He is not a doctor.
