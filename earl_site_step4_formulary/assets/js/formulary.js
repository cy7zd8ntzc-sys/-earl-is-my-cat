// Generated from assets/data/formulary.json for static preview use.
// Production should load this from the backend and version it with clinician approval.
window.EARL_FORMULARY = {
  "version": "2026-06-step4-formulary-prototype",
  "status": "internal_clinician_decision_support_only",
  "disclaimer": "Prototype only. Not medical advice, not an order set, and not an automated prescribing system. Every medication requires clinician review, patient-specific assessment, contraindication screening, state-law compliance, and pharmacy verification before prescribing.",
  "globalRules": [
    "Do not present prescriptions as ecommerce products. Route all prescription decisions through a completed medical visit and clinician review.",
    "Prefer FDA-approved commercially available products when clinically appropriate and available; use compounding only when there is a patient-specific reason such as combination therapy, vehicle intolerance, allergy, dose/formulation need, or access/fulfillment constraints that are lawful in the applicable state.",
    "Compounded prescriptions should be documented as patient-specific, edited by the clinician, and transmitted only to a licensed pharmacy that is permitted to dispense into the patient's state.",
    "Document pregnancy/breastfeeding status and reproductive risk before retinoids, spironolactone, finasteride/dutasteride, tetracyclines, oral antifungals, oral tranexamic acid, and other higher-risk therapies.",
    "If the patient has fever, rapidly spreading rash, severe pain, eye involvement, mucosal involvement beyond the stated condition, systemic symptoms, immunosuppression, unstable medical history, or concern for malignancy, pause prescribing and triage to in-person/urgent care as appropriate.",
    "For minors, pregnancy, lactation, significant renal/hepatic disease, immunosuppression, complex systemic therapy, or unclear diagnosis, require additional review before prescribing."
  ],
  "routing": {
    "compounded": "Third-party compounding pharmacy after valid patient-specific prescription. Verify state coverage, BAA/PHI workflow, formula availability, BUD, inactive ingredients, shipping, and adverse-event reporting process.",
    "commercial": "Commercial prescription through partner pharmacy or local pharmacy. Use when a standard FDA-approved drug fits the clinical need.",
    "supportive": "OTC/white-label/affiliate recommendations only. Do not imply these products diagnose, treat, cure, or prevent disease unless they are compliant OTC drugs with appropriate labeling."
  },
  "conditions": {
    "acne": {
      "label": "Acne",
      "diagnosisSet": [
        "Acne vulgaris, comedonal",
        "Acne vulgaris, inflammatory",
        "Acne vulgaris with PIH",
        "Acneiform eruption - needs review"
      ],
      "safetyScreen": [
        "Pregnant, trying to conceive, or breastfeeding",
        "Severe nodulocystic acne, scarring, or marked psychosocial distress",
        "Concern for drug-induced acne, endocrine features, or hidradenitis overlap",
        "Isotretinoin candidate - do not handle in this lightweight flow"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "acne-retinoid-niacinamide",
          "title": "Comedonal/mixed acne - retinoid base",
          "route": "compounded-topical",
          "diagnosis": "Acne vulgaris",
          "plan": "Start low-irritation topical regimen. Keep cleanser/moisturizer simple. Reassess tolerability and response.",
          "rx": "Compound: tretinoin 0.025% + niacinamide 4% cream/gel. Sig: pea-sized amount to acne-prone areas nightly or every other night for 2 weeks, then nightly as tolerated. Qty/refills per pharmacy standard.",
          "counseling": "Dryness, peeling, stinging, and purging can occur early. Use moisturizer and daily sunscreen. Avoid abrasive scrubs and stacking strong acids/benzoyl peroxide at the same time of day until tolerated.",
          "avoidIf": [
            "Pregnancy/TTC unless clinician selects an appropriate alternative",
            "Severe dermatitis or open/eroded skin",
            "Known retinoid hypersensitivity"
          ],
          "tags": [
            "compounded",
            "retinoid",
            "irritation",
            "pregnancy-caution"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": [
            "AAD acne guideline supports topical retinoids and combination topical therapy."
          ]
        },
        {
          "id": "acne-azelaic-sensitive",
          "title": "Sensitive/PIH-prone acne - azelaic acid option",
          "route": "commercial-or-compounded",
          "diagnosis": "Acne vulgaris with post-inflammatory pigment change or sensitive skin",
          "plan": "Use azelaic-forward regimen when pigment change or retinoid intolerance is central.",
          "rx": "Azelaic acid 15-20% cream/gel/foam or compounded azelaic acid 15-20% in tolerated vehicle. Sig: apply thin layer once daily x 1-2 weeks, then twice daily as tolerated.",
          "counseling": "May sting or tingle. Use moisturizer. Improvement is gradual.",
          "avoidIf": [
            "Significant irritation",
            "Unclear diagnosis or widespread rash"
          ],
          "tags": [
            "commercial-preferred",
            "compounded-if-vehicle-needed",
            "pregnancy-review"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        },
        {
          "id": "acne-inflammatory-antibiotic",
          "title": "Inflammatory acne - limited antibiotic course",
          "route": "commercial-or-compounded",
          "diagnosis": "Inflammatory acne vulgaris",
          "plan": "Use anti-inflammatory/antimicrobial treatment only when clinically appropriate; limit antibiotic duration and pair with non-antibiotic maintenance.",
          "rx": "Example: doxycycline [dose per clinician] for limited course plus topical benzoyl peroxide/retinoid plan. Alternative topical antibiotic should not be used as monotherapy. Edit before use.",
          "counseling": "Photosensitivity, GI upset, esophagitis risk. Take with water and avoid lying down immediately. Maintain non-antibiotic topical regimen.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding without clinician-specific review",
            "Age under 8",
            "Tetracycline allergy",
            "Severe reflux/esophagitis or interacting medications"
          ],
          "tags": [
            "commercial",
            "antibiotic-stewardship",
            "pregnancy-avoid"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Gentle cleanser",
        "Barrier moisturizer",
        "Non-comedogenic sunscreen",
        "Benzoyl peroxide wash/gel if tolerated and properly labeled as OTC acne drug"
      ]
    },
    "rosacea": {
      "label": "Rosacea / redness",
      "diagnosisSet": [
        "Rosacea, papulopustular",
        "Rosacea, erythematotelangiectatic",
        "Periorificial dermatitis overlap",
        "Ocular rosacea - needs review"
      ],
      "safetyScreen": [
        "Eye pain, vision change, severe ocular symptoms",
        "Unilateral facial swelling/pain",
        "Steroid-induced or perioral dermatitis overlap",
        "Pregnancy/lactation before oral antibiotics"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "rosacea-ivermectin",
          "title": "Papulopustular rosacea - topical ivermectin/azelaic",
          "route": "commercial-or-compounded",
          "diagnosis": "Papulopustular rosacea",
          "plan": "Start anti-inflammatory topical plan and trigger avoidance. Consider low-dose oral anti-inflammatory antibiotic only for more severe inflammatory disease.",
          "rx": "Commercial: ivermectin 1% cream OR azelaic acid 15% gel/foam. Compounded alternative: ivermectin 1% + niacinamide 4% cream if clinically justified. Sig: apply thin layer once daily.",
          "counseling": "Avoid topical steroids unless specifically directed. Use gentle cleanser, moisturizer, sunscreen. Rosacea management is chronic; improvement is gradual.",
          "avoidIf": [
            "Ocular symptoms needing in-person/eye evaluation",
            "Pregnancy/lactation requires medication-specific review"
          ],
          "tags": [
            "commercial-preferred",
            "compounded-if-combination-needed",
            "chronic-care"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        },
        {
          "id": "rosacea-doxy",
          "title": "Severe inflammatory rosacea - oral anti-inflammatory option",
          "route": "commercial",
          "diagnosis": "Moderate to severe inflammatory rosacea",
          "plan": "Add oral anti-inflammatory antibiotic only if inflammatory burden justifies it and safety screen is acceptable.",
          "rx": "Example: doxycycline modified-release or low-dose anti-inflammatory regimen per clinician preference. Edit dose/duration before use.",
          "counseling": "Photosensitivity/GI/esophagitis counseling. Do not combine with isotretinoin. Reassess and step down to topical maintenance.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding without review",
            "Age under 8",
            "Tetracycline allergy",
            "Severe ocular disease needs separate evaluation"
          ],
          "tags": [
            "commercial",
            "antibiotic-stewardship",
            "pregnancy-avoid"
          ],
          "followUp": "6-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Mineral/tinted sunscreen",
        "Gentle cleanser",
        "Barrier moisturizer",
        "Avoidance of personal triggers when identifiable"
      ]
    },
    "melasma": {
      "label": "Melasma",
      "diagnosisSet": [
        "Melasma",
        "Post-inflammatory hyperpigmentation",
        "Solar lentigines - needs lesion review",
        "Pigmented lesion concern - in-person if suspicious"
      ],
      "safetyScreen": [
        "Changing, bleeding, painful, irregular, or new pigmented lesion",
        "Pregnancy/TTC/breastfeeding",
        "History of ochronosis or hydroquinone reaction",
        "Oral tranexamic acid risk factors: clotting history, estrogen therapy, smoking, migraine with aura"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "melasma-azelaic",
          "title": "Pigment support - non-hydroquinone option",
          "route": "commercial-or-compounded",
          "diagnosis": "Melasma",
          "plan": "Emphasize photoprotection first. Use non-hydroquinone brightening option when hydroquinone is not appropriate or maintenance is needed.",
          "rx": "Azelaic acid 15-20% +/- niacinamide 4% in tolerated vehicle. Sig: apply once daily then increase as tolerated.",
          "counseling": "Daily tinted broad-spectrum sunscreen is the core intervention. Pigment changes improve slowly and relapse is common.",
          "avoidIf": [
            "Suspicious lesion",
            "Significant irritation",
            "Unclear diagnosis"
          ],
          "tags": [
            "commercial-or-compounded",
            "photoprotection",
            "pregnancy-review"
          ],
          "followUp": "12 weeks",
          "evidenceNotes": []
        },
        {
          "id": "melasma-triple",
          "title": "Melasma - supervised short course triple-style therapy",
          "route": "compounded-topical",
          "diagnosis": "Melasma",
          "plan": "Short, supervised pigment regimen when melasma diagnosis is appropriate and safety screen is acceptable. Plan maintenance after the course.",
          "rx": "Compound example: hydroquinone [strength] + tretinoin [strength] + mild corticosteroid [strength] in cream. Sig: nightly to affected areas for limited course only. Edit exact formula/duration before prescribing.",
          "counseling": "Use only on directed areas. Stop for significant irritation. Avoid prolonged unsupervised use. Daily tinted sunscreen required.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding",
            "History of ochronosis",
            "Active dermatitis/open skin",
            "Suspicious pigmented lesion"
          ],
          "tags": [
            "compounded",
            "limited-course",
            "pregnancy-avoid",
            "photoprotection"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Tinted mineral sunscreen with iron oxides",
        "Gentle cleanser",
        "Barrier moisturizer",
        "Hat/visible-light avoidance counseling"
      ]
    },
    "dark-spots": {
      "label": "Dark spots / hyperpigmentation",
      "diagnosisSet": [
        "Melasma",
        "Post-inflammatory hyperpigmentation",
        "Solar lentigines - needs lesion review",
        "Pigmented lesion concern - in-person if suspicious"
      ],
      "safetyScreen": [
        "Changing, bleeding, painful, irregular, or new pigmented lesion",
        "Pregnancy/TTC/breastfeeding",
        "History of ochronosis or hydroquinone reaction",
        "Oral tranexamic acid risk factors: clotting history, estrogen therapy, smoking, migraine with aura"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "dark-spots-azelaic",
          "title": "Pigment support - non-hydroquinone option",
          "route": "commercial-or-compounded",
          "diagnosis": "Dark spots / hyperpigmentation",
          "plan": "Emphasize photoprotection first. Use non-hydroquinone brightening option when hydroquinone is not appropriate or maintenance is needed.",
          "rx": "Azelaic acid 15-20% +/- niacinamide 4% in tolerated vehicle. Sig: apply once daily then increase as tolerated.",
          "counseling": "Daily tinted broad-spectrum sunscreen is the core intervention. Pigment changes improve slowly and relapse is common.",
          "avoidIf": [
            "Suspicious lesion",
            "Significant irritation",
            "Unclear diagnosis"
          ],
          "tags": [
            "commercial-or-compounded",
            "photoprotection",
            "pregnancy-review"
          ],
          "followUp": "12 weeks",
          "evidenceNotes": []
        },
        {
          "id": "dark-spots-triple",
          "title": "Melasma - supervised short course triple-style therapy",
          "route": "compounded-topical",
          "diagnosis": "Melasma",
          "plan": "Short, supervised pigment regimen when melasma diagnosis is appropriate and safety screen is acceptable. Plan maintenance after the course.",
          "rx": "Compound example: hydroquinone [strength] + tretinoin [strength] + mild corticosteroid [strength] in cream. Sig: nightly to affected areas for limited course only. Edit exact formula/duration before prescribing.",
          "counseling": "Use only on directed areas. Stop for significant irritation. Avoid prolonged unsupervised use. Daily tinted sunscreen required.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding",
            "History of ochronosis",
            "Active dermatitis/open skin",
            "Suspicious pigmented lesion"
          ],
          "tags": [
            "compounded",
            "limited-course",
            "pregnancy-avoid",
            "photoprotection"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Tinted mineral sunscreen with iron oxides",
        "Gentle cleanser",
        "Barrier moisturizer",
        "Hat/visible-light avoidance counseling"
      ]
    },
    "aging": {
      "label": "Fine lines / aging",
      "diagnosisSet": [
        "Photoaging / texture concerns",
        "Acne plus photoaging",
        "Pigment/texture concern"
      ],
      "safetyScreen": [
        "Pregnancy/TTC/breastfeeding",
        "Active dermatitis/rosacea flare",
        "Recent procedure/peel/laser",
        "Suspicious lesion concern"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "aging-tretinoin",
          "title": "Photoaging/acne overlap - tretinoin base",
          "route": "commercial-or-compounded",
          "diagnosis": "Photoaging / acne overlap",
          "plan": "Use gradual retinoid introduction with barrier support. Keep OTC routine minimal.",
          "rx": "Tretinoin 0.025% cream or compounded tretinoin 0.025% + niacinamide 4%. Sig: pea-sized amount nightly or every other night, advance as tolerated.",
          "counseling": "Irritation is dose-limiting. Use moisturizer and daily sunscreen. Do not use in pregnancy unless clinician determines otherwise.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding without review",
            "Active dermatitis",
            "Known retinoid intolerance"
          ],
          "tags": [
            "commercial-preferred",
            "compounded-if-vehicle-needed",
            "pregnancy-caution"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Daily sunscreen",
        "Gentle cleanser",
        "Moisturizer",
        "Vitamin C/niacinamide optional if tolerated"
      ]
    },
    "hairloss": {
      "label": "Hair loss",
      "diagnosisSet": [
        "Androgenetic alopecia",
        "Telogen effluvium - lab/PCP consideration",
        "Alopecia areata - refer/in-person",
        "Scarring alopecia concern - urgent dermatology"
      ],
      "safetyScreen": [
        "Patchy sudden hair loss",
        "Scalp pain, pustules, scale, scarring, or inflammation",
        "Pregnancy/TTC/breastfeeding",
        "Low blood pressure/cardiac history before oral minoxidil",
        "Women of childbearing potential before finasteride/dutasteride"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "hair-minoxidil-topical",
          "title": "AGA - topical minoxidil base",
          "route": "otc-or-commercial",
          "diagnosis": "Androgenetic alopecia",
          "plan": "Start standard evidence-based hair support when photos/history fit pattern hair loss and no red flags.",
          "rx": "Topical minoxidil 5% foam/solution OTC or commercial. Sig: apply to affected scalp once daily (or per label/clinician plan).",
          "counseling": "Shedding can occur early. Benefit takes 6-12 months. Continue to maintain results. Avoid contact with pets until dry.",
          "avoidIf": [
            "Scarring/inflammatory alopecia concern",
            "Pregnancy/lactation without review",
            "Irritation or allergy"
          ],
          "tags": [
            "otc",
            "commercial",
            "long-horizon"
          ],
          "followUp": "6 months",
          "evidenceNotes": []
        },
        {
          "id": "hair-finasteride",
          "title": "Male-pattern hair loss - finasteride option",
          "route": "commercial-or-compounded",
          "diagnosis": "Androgenetic alopecia",
          "plan": "Use only when reproductive and contraindication screening is complete and patient understands sexual/psychiatric/teratogenic counseling.",
          "rx": "Finasteride 1 mg PO daily or topical finasteride/minoxidil compounded formula if clinically justified. Edit exact formulation before use.",
          "counseling": "Discuss sexual side effects, mood effects, PSA interpretation, pregnancy exposure precautions, and need for ongoing use.",
          "avoidIf": [
            "Pregnant or may become pregnant",
            "Pediatric patient",
            "Unclear sex/reproductive risk without counseling",
            "Scarring alopecia concern"
          ],
          "tags": [
            "commercial-preferred",
            "compounded-if-topical-combo",
            "pregnancy-contraindicated"
          ],
          "followUp": "6-12 months",
          "evidenceNotes": []
        },
        {
          "id": "hair-oral-minoxidil",
          "title": "Selected AGA - low-dose oral minoxidil review",
          "route": "commercial",
          "diagnosis": "Androgenetic alopecia",
          "plan": "Only for selected patients after BP/cardiac/edema review and counseling.",
          "rx": "Low-dose oral minoxidil: clinician-specific dosing only. Do not auto-send. Document BP/cardiac screen and counseling.",
          "counseling": "Counsel hypertrichosis, edema, tachycardia, dizziness, rare cardiac effects. Follow up for tolerability.",
          "avoidIf": [
            "Pregnancy/lactation",
            "Cardiac disease/arrhythmia/pericardial disease",
            "Hypotension",
            "Significant edema",
            "Unreliable follow-up"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "cardiac-screen"
          ],
          "followUp": "3-6 months",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Topical minoxidil OTC",
        "Dandruff/scalp care if seb derm present",
        "Labs/PCP workup if shedding pattern suggests telogen effluvium"
      ]
    },
    "eczema": {
      "label": "Eczema / dermatitis",
      "diagnosisSet": [
        "Atopic dermatitis",
        "Irritant/contact dermatitis",
        "Nummular dermatitis",
        "Steroid-responsive dermatitis - needs location/potency review"
      ],
      "safetyScreen": [
        "Eye/face/genital involvement requiring potency caution",
        "Infection signs: honey crust, pus, fever, rapidly worsening pain",
        "Pregnancy/lactation if newer agents considered",
        "Extensive/severe disease or erythroderma"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "eczema-tcs",
          "title": "Localized eczema - topical corticosteroid",
          "route": "commercial",
          "diagnosis": "Eczematous dermatitis",
          "plan": "Use moisturizer-first plan with short course appropriate-potency topical steroid by site/severity.",
          "rx": "Topical corticosteroid: select potency by site/severity. Sig: thin layer to active rash once/twice daily for limited course, then stop or step down. Edit before use.",
          "counseling": "Use moisturizer generously. Avoid using stronger steroids on face/groin/skin folds unless specifically directed. Watch for infection.",
          "avoidIf": [
            "Possible fungal infection",
            "Untreated bacterial/viral infection",
            "Perioral dermatitis/steroid-triggered rash",
            "Face/groin/folds without potency review"
          ],
          "tags": [
            "commercial",
            "site-potency-review",
            "infection-screen"
          ],
          "followUp": "2-4 weeks",
          "evidenceNotes": []
        },
        {
          "id": "eczema-tci",
          "title": "Face/folds or steroid-sparing eczema",
          "route": "commercial",
          "diagnosis": "Eczematous dermatitis",
          "plan": "Use steroid-sparing option when location or chronicity favors avoiding repeated topical steroid exposure.",
          "rx": "Tacrolimus/pimecrolimus or other clinician-selected nonsteroid topical. Sig: apply to affected areas per product/clinician instructions.",
          "counseling": "Burning/stinging can occur initially. Sun protection and limited use on directed areas.",
          "avoidIf": [
            "Active infection",
            "Unclear diagnosis",
            "Immunocompromised patient without review"
          ],
          "tags": [
            "commercial",
            "steroid-sparing",
            "manual-review"
          ],
          "followUp": "4-8 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Fragrance-free cleanser",
        "Thick moisturizer/ointment",
        "Trigger avoidance",
        "Wet wrap education for selected patients"
      ]
    },
    "perioral-dermatitis": {
      "label": "Perioral dermatitis",
      "diagnosisSet": [
        "Periorificial dermatitis",
        "Steroid-induced perioral dermatitis",
        "Rosacea/periorificial overlap"
      ],
      "safetyScreen": [
        "Eye involvement",
        "Pregnancy/lactation before oral therapy",
        "Steroid use on face",
        "Severe pustular or painful eruption"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "pod-zero-therapy",
          "title": "Perioral dermatitis - zero therapy + topical",
          "route": "commercial-or-compounded",
          "diagnosis": "Periorificial dermatitis",
          "plan": "Stop facial topical steroids if safe and simplify routine. Add topical anti-inflammatory/antimicrobial option when appropriate.",
          "rx": "Metronidazole/azelaic acid/ivermectin or compounded combination in non-irritating base. Sig: thin layer once daily or twice daily per clinician selection.",
          "counseling": "Flares can occur after stopping steroids. Keep routine bland. Avoid heavy occlusive products and irritants.",
          "avoidIf": [
            "Eye symptoms",
            "Pregnancy/lactation before selecting medication",
            "Severe painful eruption"
          ],
          "tags": [
            "commercial-preferred",
            "steroid-withdrawal",
            "compounded-if-combo-needed"
          ],
          "followUp": "6-8 weeks",
          "evidenceNotes": []
        },
        {
          "id": "pod-doxy",
          "title": "Perioral dermatitis - oral antibiotic when moderate",
          "route": "commercial",
          "diagnosis": "Periorificial dermatitis",
          "plan": "Short limited oral anti-inflammatory antibiotic course when topical-only plan is insufficient or disease is moderate.",
          "rx": "Doxycycline or alternative per clinician. Edit dose/duration before use.",
          "counseling": "Photosensitivity/GI/esophagitis counseling. Avoid in pregnancy and young children unless clinician selects alternative.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding",
            "Age under 8",
            "Tetracycline allergy"
          ],
          "tags": [
            "commercial",
            "antibiotic-stewardship",
            "pregnancy-avoid"
          ],
          "followUp": "6-8 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Bland cleanser",
        "Light moisturizer",
        "Sunscreen that does not sting",
        "Stop nonessential actives temporarily"
      ]
    },
    "seb-derm": {
      "label": "Seborrheic dermatitis / dandruff",
      "diagnosisSet": [
        "Seborrheic dermatitis",
        "Dandruff",
        "Facial seb derm"
      ],
      "safetyScreen": [
        "Diffuse hair loss/scarring scalp concern",
        "Severe pain, pus, fever",
        "Immunosuppression with severe/widespread disease",
        "Psoriasis/tinea capitis differential"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "seb-keto",
          "title": "Seb derm - antifungal shampoo/cream",
          "route": "commercial",
          "diagnosis": "Seborrheic dermatitis",
          "plan": "Use antifungal wash/cream plan; add low-potency anti-inflammatory briefly only if inflamed and diagnosis is clear.",
          "rx": "Ketoconazole shampoo/cream or ciclopirox product per clinician. Sig: use on affected scalp/face as directed; leave shampoo on scalp several minutes before rinsing.",
          "counseling": "Chronic relapsing condition. Maintenance use may be needed. Avoid strong steroids on face long-term.",
          "avoidIf": [
            "Possible tinea capitis",
            "Severe infection signs",
            "Unclear diagnosis"
          ],
          "tags": [
            "commercial",
            "maintenance",
            "fungal-differential"
          ],
          "followUp": "4-8 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Anti-dandruff shampoo affiliate/OTC",
        "Gentle facial cleanser",
        "Moisturizer"
      ]
    },
    "sweating": {
      "label": "Excessive sweating",
      "diagnosisSet": [
        "Primary focal hyperhidrosis",
        "Secondary sweating - needs medical workup"
      ],
      "safetyScreen": [
        "Night sweats, fever, weight loss",
        "New generalized sweating",
        "Chest pain, palpitations, endocrine symptoms",
        "Pregnancy/lactation",
        "Glaucoma, urinary retention, severe constipation, arrhythmia before anticholinergic therapy"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "sweat-aluminum",
          "title": "Focal sweating - topical antiperspirant base",
          "route": "otc-or-commercial",
          "diagnosis": "Primary focal hyperhidrosis",
          "plan": "Start topical antiperspirant strategy for focal sweating if no secondary red flags.",
          "rx": "Aluminum chloride antiperspirant product. Sig: apply to completely dry area at night, wash off in morning; reduce frequency when controlled.",
          "counseling": "Irritation is common; apply only to dry skin and avoid right after shaving.",
          "avoidIf": [
            "Open/irritated skin",
            "Secondary sweating symptoms"
          ],
          "tags": [
            "otc",
            "commercial",
            "local-care"
          ],
          "followUp": "4-6 weeks",
          "evidenceNotes": []
        },
        {
          "id": "sweat-glycopyrrolate",
          "title": "Selected focal sweating - oral anticholinergic review",
          "route": "commercial",
          "diagnosis": "Primary focal hyperhidrosis",
          "plan": "Manual review only. Use when focal hyperhidrosis is significant and contraindication screen is acceptable.",
          "rx": "Glycopyrrolate: clinician-specific dosing only. Do not auto-send. Document anticholinergic contraindication review.",
          "counseling": "Dry mouth, constipation, blurry vision, urinary retention, heat intolerance, tachycardia. Avoid overheating/dehydration.",
          "avoidIf": [
            "Glaucoma",
            "Urinary retention/BPH",
            "GI obstruction/severe constipation",
            "Arrhythmia",
            "Elderly/frail",
            "Renal impairment without review",
            "Pregnancy/lactation without review"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "anticholinergic"
          ],
          "followUp": "2-6 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Clinical strength antiperspirant",
        "Sweat-wicking clothing",
        "Avoid heat triggers where possible"
      ]
    },
    "herpes": {
      "label": "Cold sores / herpes",
      "diagnosisSet": [
        "Herpes labialis",
        "Genital herpes",
        "HSV vs aphthous/other ulcer - needs review"
      ],
      "safetyScreen": [
        "Eye involvement",
        "First severe genital outbreak",
        "Pregnancy",
        "Immunosuppression",
        "Meningitis/systemic symptoms",
        "Ulcers not typical for HSV or concern for syphilis/other STI"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "hsv-episodic",
          "title": "HSV - episodic antiviral",
          "route": "commercial",
          "diagnosis": "Herpes simplex outbreak",
          "plan": "Use episodic antiviral if history/photos fit recurrent HSV and no red flags.",
          "rx": "Valacyclovir/acyclovir/famciclovir episodic regimen per clinician and site. Edit dose/duration before use.",
          "counseling": "Start as early as possible at prodrome/onset. Avoid kissing/sexual contact during active lesions. Consider STI testing/counseling for genital symptoms.",
          "avoidIf": [
            "Eye involvement",
            "Pregnancy without OB/clinician review",
            "Immunosuppression",
            "Atypical ulcer needing STI workup"
          ],
          "tags": [
            "commercial",
            "episodic",
            "sti-counseling"
          ],
          "followUp": "as needed",
          "evidenceNotes": []
        },
        {
          "id": "hsv-suppressive",
          "title": "HSV - suppressive antiviral",
          "route": "commercial",
          "diagnosis": "Recurrent herpes simplex",
          "plan": "Consider daily suppressive therapy for frequent recurrences or transmission reduction after counseling.",
          "rx": "Valacyclovir/acyclovir suppressive regimen per clinician. Edit dose, renal adjustment, and follow-up before use.",
          "counseling": "Daily medication reduces recurrences but does not cure HSV. Discuss transmission, condoms/barriers, and partner disclosure.",
          "avoidIf": [
            "Renal impairment without review",
            "Pregnancy without review",
            "Atypical or severe disease"
          ],
          "tags": [
            "commercial",
            "suppressive",
            "renal-review"
          ],
          "followUp": "6-12 months",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Plain petrolatum/barrier support for cold sore discomfort",
        "Avoid irritants",
        "Sun/lip SPF if trigger"
      ]
    },
    "aphthous-ulcers": {
      "label": "Aphthous ulcers / canker sores",
      "diagnosisSet": [
        "Recurrent aphthous stomatitis",
        "Traumatic oral ulcer",
        "HSV/other ulcer - differential"
      ],
      "safetyScreen": [
        "Ulcers on lips/skin suggesting HSV",
        "Fever/systemic symptoms",
        "Genital ulcers",
        "Eye inflammation",
        "GI symptoms/IBD concern",
        "Ulcer lasting >2-3 weeks",
        "Immunosuppression or cancer therapy"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "aphthous-triamcinolone",
          "title": "Aphthous ulcer - topical steroid paste",
          "route": "commercial",
          "diagnosis": "Recurrent aphthous stomatitis",
          "plan": "Use topical anti-inflammatory therapy for typical recurrent aphthous ulcers after excluding HSV/systemic red flags.",
          "rx": "Triamcinolone acetonide dental paste 0.1%. Sig: apply small amount to ulcer after meals and at bedtime as directed. Edit before use.",
          "counseling": "Apply to dried ulcer surface; do not rub in aggressively. Seek evaluation if ulcer persists, worsens, or systemic symptoms occur.",
          "avoidIf": [
            "Pregnancy/lactation without review",
            "Child without pediatric dosing review",
            "Suspected HSV, thrush, or systemic disease"
          ],
          "tags": [
            "commercial",
            "oral-mucosa",
            "pregnancy-review"
          ],
          "followUp": "1-3 weeks",
          "evidenceNotes": []
        },
        {
          "id": "aphthous-rinse",
          "title": "Aphthous ulcer - steroid rinse for multiple ulcers",
          "route": "commercial-or-compounded",
          "diagnosis": "Recurrent aphthous stomatitis",
          "plan": "Manual review for multiple painful oral ulcers; consider rinse if diagnosis is typical and no systemic red flags.",
          "rx": "Dexamethasone oral rinse or compounded alternative per clinician. Swish and spit; do not swallow unless explicitly directed. Edit before use.",
          "counseling": "Do not swallow unless prescribed that way. Monitor for thrush/secondary infection. Reassess if persistent.",
          "avoidIf": [
            "Immunosuppression",
            "Oral candidiasis",
            "Pregnancy/lactation without review",
            "Ulcer >2-3 weeks"
          ],
          "tags": [
            "manual-review",
            "compounded-if-needed",
            "infection-screen"
          ],
          "followUp": "1-3 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Avoid sodium lauryl sulfate toothpaste if trigger",
        "Topical oral anesthetic OTC if appropriate",
        "B12/iron/folate workup if frequent/severe"
      ]
    },
    "fungal-infections": {
      "label": "Fungal infections",
      "diagnosisSet": [
        "Tinea corporis",
        "Tinea cruris",
        "Tinea pedis",
        "Tinea versicolor",
        "Tinea incognito - steroid worsened"
      ],
      "safetyScreen": [
        "Scalp/beard involvement",
        "Genital/perianal inflammatory lesions",
        "Widespread/severe/refractory disease",
        "Immunosuppression",
        "Secondary bacterial infection",
        "Steroid-combination use"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "tinea-topical",
          "title": "Localized tinea - topical antifungal",
          "route": "otc-or-commercial",
          "diagnosis": "Tinea corporis/cruris/pedis",
          "plan": "Use topical antifungal and avoid steroids when localized and diagnosis is likely.",
          "rx": "Terbinafine 1% or azole antifungal topical per label/clinician. Apply to rash and surrounding skin for directed duration.",
          "counseling": "Avoid steroid-containing combination creams. Keep area dry. Continue for full course even if improving.",
          "avoidIf": [
            "Scalp/nail/extensive disease",
            "Severe inflammatory genital/perianal lesions",
            "Immunosuppression",
            "Treatment failure"
          ],
          "tags": [
            "otc",
            "commercial",
            "avoid-steroids"
          ],
          "followUp": "2-4 weeks",
          "evidenceNotes": []
        },
        {
          "id": "tinea-oral-review",
          "title": "Extensive/refractory tinea - oral antifungal review",
          "route": "commercial",
          "diagnosis": "Tinea infection, extensive/refractory",
          "plan": "Manual review only. Consider KOH/culture/testing and systemic antifungal when extensive, follicular, refractory, scalp/beard, or emerging resistant pattern.",
          "rx": "Oral terbinafine/itraconazole/fluconazole per clinician and diagnosis. Edit exact drug/dose/duration after testing/risk review.",
          "counseling": "Discuss liver/drug-interaction risks and need for follow-up. Avoid steroids.",
          "avoidIf": [
            "Liver disease",
            "Pregnancy/lactation without review",
            "Major drug interactions",
            "Unconfirmed diagnosis when testing feasible"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "liver-review",
            "testing-preferred"
          ],
          "followUp": "2-8 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "OTC terbinafine/clotrimazole product",
        "Keep skin dry",
        "Laundry/towels hygiene",
        "Avoid steroid-combination creams"
      ]
    },
    "intertrigo": {
      "label": "Intertrigo / yeast rash",
      "diagnosisSet": [
        "Intertrigo",
        "Candidal intertrigo",
        "Tinea cruris differential",
        "Inverse psoriasis/contact dermatitis differential"
      ],
      "safetyScreen": [
        "Severe pain, ulceration, spreading cellulitis",
        "Diabetes/immunosuppression with severe disease",
        "Genital/perianal ulcer differential",
        "Recurrent severe disease"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "intertrigo-antifungal",
          "title": "Intertrigo - topical antifungal/barrier",
          "route": "otc-or-commercial",
          "diagnosis": "Intertrigo with suspected yeast/fungal component",
          "plan": "Keep folds dry and reduce friction. Add antifungal when candidal/tinea features present.",
          "rx": "Clotrimazole/ketoconazole/nystatin topical per clinician. Barrier paste/powder strategy as appropriate.",
          "counseling": "Dry thoroughly after bathing. Avoid chronic steroid use in folds unless specifically directed.",
          "avoidIf": [
            "Cellulitis/systemic symptoms",
            "Ulceration",
            "Unclear diagnosis or refractory disease"
          ],
          "tags": [
            "otc-or-commercial",
            "folds",
            "avoid-steroids"
          ],
          "followUp": "2-4 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Barrier cream",
        "Drying measures",
        "Loose breathable clothing",
        "Weight/friction counseling if appropriate"
      ]
    },
    "nail-fungus": {
      "label": "Nail fungus",
      "diagnosisSet": [
        "Onychomycosis",
        "Traumatic nail dystrophy differential",
        "Psoriasis/lichen planus nail differential"
      ],
      "safetyScreen": [
        "Diabetes with foot ulcer/infection",
        "Liver disease or heavy alcohol use",
        "Pregnancy/lactation",
        "Many interacting medications",
        "No confirmatory testing available"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "onycho-topical",
          "title": "Mild nail fungus - topical option",
          "route": "commercial",
          "diagnosis": "Onychomycosis, mild",
          "plan": "Use when nail involvement is limited or oral therapy is not appropriate. Confirmatory testing preferred.",
          "rx": "Efinaconazole/tavaborole/ciclopirox or other topical per clinician. Sig: apply daily for long course per product instructions.",
          "counseling": "Nails grow slowly; visible improvement can take months. Treat tinea pedis if present.",
          "avoidIf": [
            "Diagnostic uncertainty",
            "Severe nail involvement",
            "Diabetes/high-risk feet without in-person care"
          ],
          "tags": [
            "commercial",
            "long-course",
            "testing-preferred"
          ],
          "followUp": "3-6 months",
          "evidenceNotes": []
        },
        {
          "id": "onycho-terbinafine",
          "title": "Confirmed onychomycosis - oral terbinafine review",
          "route": "commercial",
          "diagnosis": "Onychomycosis",
          "plan": "Manual review only after confirmatory testing and liver/drug-interaction screen.",
          "rx": "Terbinafine 250 mg PO daily: 6 weeks fingernail or 12 weeks toenail per label. Verify labs and contraindications before use.",
          "counseling": "Baseline liver testing is expected. Stop and seek care for liver symptoms, rash, taste/smell changes, or severe reaction.",
          "avoidIf": [
            "Active/chronic liver disease",
            "No confirmatory testing",
            "Pregnancy/lactation without review",
            "Pediatric onychomycosis without specialist review",
            "Major interactions"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "labs",
            "testing-required"
          ],
          "followUp": "6-12 weeks plus nail-growth follow-up",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Treat athlete's foot if present",
        "Keep feet dry",
        "Avoid shared nail tools",
        "Expect slow growth"
      ]
    },
    "scabies": {
      "label": "Scabies",
      "diagnosisSet": [
        "Scabies",
        "Post-scabetic itch",
        "Crusted scabies concern - urgent/in-person"
      ],
      "safetyScreen": [
        "Crusted scabies concern",
        "Infant/young child",
        "Pregnancy/lactation",
        "Immunosuppression/institutional outbreak",
        "Secondary infection"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "scabies-permethrin",
          "title": "Classic scabies - permethrin",
          "route": "commercial",
          "diagnosis": "Scabies",
          "plan": "Treat patient and coordinate household/close contact management. Provide laundry/contact instructions.",
          "rx": "Permethrin 5% cream. Sig: apply from neck down (and scalp/face in infants/elderly if directed), leave 8-14 hours, then wash off. Repeat if clinically indicated.",
          "counseling": "Itching can persist after treatment. Wash/dry bedding, towels, clothing hot or seal items. Avoid close contact until treatment completed.",
          "avoidIf": [
            "Crusted scabies",
            "Infant/pregnancy/lactation without review",
            "Secondary infection needing antibiotics"
          ],
          "tags": [
            "commercial",
            "household",
            "public-health"
          ],
          "followUp": "2 weeks",
          "evidenceNotes": []
        },
        {
          "id": "scabies-ivermectin",
          "title": "Scabies - oral ivermectin manual review",
          "route": "commercial",
          "diagnosis": "Scabies",
          "plan": "Manual review when topical therapy is impractical, outbreak/household circumstances require, or clinician prefers oral therapy.",
          "rx": "Ivermectin oral regimen per clinician, typically weight-based and repeated. Edit before use.",
          "counseling": "Oral therapy needs weight, pregnancy/lactation/pediatric review, interaction review, and contact management.",
          "avoidIf": [
            "Pregnancy/lactation without review",
            "Young child/low body weight",
            "Severe neurologic disease",
            "Crusted scabies without specialist/public health plan"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "weight-based"
          ],
          "followUp": "2 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Laundry/household instructions",
        "Anti-itch supportive care",
        "Treat close contacts as appropriate"
      ]
    },
    "impetigo": {
      "label": "Impetigo",
      "diagnosisSet": [
        "Impetigo",
        "Ecthyma - oral therapy/in-person consideration",
        "HSV/contact dermatitis differential"
      ],
      "safetyScreen": [
        "Fever, rapidly spreading redness, severe pain",
        "Periorbital involvement",
        "Immunosuppression",
        "Numerous lesions/outbreak",
        "Abscess/cellulitis",
        "Age/pregnancy needing tailored antibiotics"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "impetigo-mupirocin",
          "title": "Localized impetigo - topical antibiotic",
          "route": "commercial",
          "diagnosis": "Localized impetigo",
          "plan": "Use topical therapy for few localized lesions when no cellulitis/systemic signs.",
          "rx": "Mupirocin 2% ointment or retapamulin per clinician. Apply to affected lesions as directed for short course.",
          "counseling": "Cover draining lesions. Wash hands and avoid sharing towels. Seek care if spreading, fever, pain, or eye area involvement.",
          "avoidIf": [
            "Cellulitis/systemic symptoms",
            "Numerous lesions/outbreak",
            "Ecthyma",
            "MRSA risk requiring oral therapy"
          ],
          "tags": [
            "commercial",
            "infection",
            "contagion"
          ],
          "followUp": "3-7 days",
          "evidenceNotes": []
        },
        {
          "id": "impetigo-oral",
          "title": "Impetigo extensive - oral antibiotic review",
          "route": "commercial",
          "diagnosis": "Impetigo, extensive",
          "plan": "Manual review when lesions are numerous, outbreak, ecthyma, or topical therapy is impractical.",
          "rx": "Cephalexin/dicloxacillin or MRSA-active alternative per clinician and local risk/culture. Edit before use.",
          "counseling": "Complete course; cover lesions; hygiene. Return if worsening or no improvement.",
          "avoidIf": [
            "Severe cellulitis/systemic toxicity",
            "Allergy/interactions",
            "Need culture/in-person evaluation"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "infection"
          ],
          "followUp": "3-7 days",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Gentle cleansing",
        "Cover lesions",
        "Do not share towels/linens"
      ]
    },
    "folliculitis": {
      "label": "Folliculitis / ingrown hairs",
      "diagnosisSet": [
        "Bacterial folliculitis",
        "Pseudofolliculitis barbae",
        "Malassezia folliculitis",
        "Furuncles/abscesses - in-person if fluctuant"
      ],
      "safetyScreen": [
        "Abscess/fluctuance",
        "Fever or spreading cellulitis",
        "Immunosuppression",
        "Recurrent boils/MRSA history",
        "Genital/perianal severe lesions"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "folliculitis-topical",
          "title": "Folliculitis/ingrowns - topical plan",
          "route": "commercial-or-otc",
          "diagnosis": "Folliculitis or pseudofolliculitis",
          "plan": "Use hygiene/behavior changes plus topical antiseptic or anti-inflammatory/antibiotic strategy based on likely cause.",
          "rx": "Benzoyl peroxide wash +/- topical clindamycin/mupirocin if clinician selects. Edit before use.",
          "counseling": "Avoid picking. Adjust shaving technique. Seek in-person care for boils/abscesses or spreading redness.",
          "avoidIf": [
            "Abscess",
            "Cellulitis",
            "Severe pain/systemic symptoms",
            "Unclear diagnosis"
          ],
          "tags": [
            "commercial",
            "otc",
            "abscess-triage"
          ],
          "followUp": "2-4 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Benzoyl peroxide wash",
        "Shaving modification",
        "Loose clothing",
        "Warm compresses for early tender bumps"
      ]
    },
    "hs": {
      "label": "Hidradenitis suppurativa",
      "diagnosisSet": [
        "Hidradenitis suppurativa, likely Hurley I",
        "HS flare",
        "Abscess requiring drainage - in-person"
      ],
      "safetyScreen": [
        "Fluctuant abscess needing drainage",
        "Fever/systemic symptoms",
        "Severe pain",
        "Perianal disease/fistula concern",
        "Pregnancy/lactation before systemic therapy",
        "Moderate/severe disease needing biologic/surgical care"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "hs-topical",
          "title": "Mild HS - topical/cleanser plan",
          "route": "commercial-or-otc",
          "diagnosis": "Hidradenitis suppurativa, mild",
          "plan": "For mild recurrent HS-like lesions without drainable abscess or systemic symptoms. Counsel that HS is chronic and may need in-person management.",
          "rx": "Topical clindamycin 1% solution/gel or antiseptic wash strategy per clinician. Consider benzoyl peroxide wash to reduce resistance if topical antibiotic used.",
          "counseling": "Do not squeeze lesions. Seek in-person care for abscess drainage, severe pain, fever, or rapidly worsening lesions.",
          "avoidIf": [
            "Drainable abscess",
            "Severe disease/tunnels",
            "Fever/systemic symptoms",
            "Pregnancy/lactation before oral therapy"
          ],
          "tags": [
            "commercial",
            "mild-hs",
            "abscess-triage"
          ],
          "followUp": "4-8 weeks",
          "evidenceNotes": []
        },
        {
          "id": "hs-doxy",
          "title": "Mild/moderate HS - oral tetracycline review",
          "route": "commercial",
          "diagnosis": "Hidradenitis suppurativa",
          "plan": "Manual review for recurrent inflammatory lesions when topical plan insufficient and no urgent procedural need.",
          "rx": "Doxycycline or tetracycline-class regimen per clinician. Edit dose/duration before use.",
          "counseling": "GI/photosensitivity/esophagitis counseling; recurrence common; assess lifestyle/comorbidities and need for derm follow-up.",
          "avoidIf": [
            "Pregnancy/TTC/breastfeeding",
            "Age under 8",
            "Drainable abscess needing procedure",
            "Severe HS/tunnels"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "antibiotic-stewardship"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Benzoyl peroxide or antiseptic wash",
        "Friction reduction",
        "Smoking/weight counseling when appropriate",
        "Pain/supportive care"
      ]
    },
    "warts": {
      "label": "Warts",
      "diagnosisSet": [
        "Verruca vulgaris",
        "Plantar wart",
        "Molluscum vs wart differential",
        "Atypical lesion - in-person/biopsy"
      ],
      "safetyScreen": [
        "Genital/anogenital location",
        "Immunosuppression",
        "Painful rapidly growing or bleeding lesion",
        "Pigmented/atypical lesion",
        "Diabetes/neuropathy for foot lesions"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "warts-salicylic",
          "title": "Common/plantar wart - OTC salicylic support",
          "route": "otc",
          "diagnosis": "Verruca vulgaris/plantar wart",
          "plan": "Use home keratolytic regimen only when photos fit benign wart and no high-risk location/features.",
          "rx": "OTC salicylic acid wart product per label. No prescription needed unless clinician chooses another therapy.",
          "counseling": "Consistency matters. Avoid use on face/genitals, irritated skin, diabetes/neuropathy feet, or uncertain lesions.",
          "avoidIf": [
            "Face/genital location",
            "Diabetes/neuropathy foot",
            "Atypical/pigmented/bleeding lesion",
            "Immunosuppression"
          ],
          "tags": [
            "otc",
            "in-person-procedure-often",
            "avoid-high-risk-sites"
          ],
          "followUp": "6-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "OTC salicylic acid",
        "Duct tape optional counseling",
        "In-person cryotherapy if persistent or painful"
      ]
    },
    "genital-warts": {
      "label": "Genital warts",
      "diagnosisSet": [
        "External anogenital warts",
        "Condyloma differential",
        "Atypical genital lesion - biopsy/STI workup"
      ],
      "safetyScreen": [
        "Pregnancy",
        "Cervical/vaginal/urethral/intra-anal lesions",
        "Pigmented/indurated/fixed/bleeding/ulcerated lesion",
        "Immunosuppression/HIV",
        "Syphilis/HSV/monkeypox differential"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "genital-warts-imiquimod",
          "title": "External genital warts - patient-applied option review",
          "route": "commercial",
          "diagnosis": "External anogenital warts",
          "plan": "Manual review only. Confirm external accessible lesions and STI counseling needs. In-person exam may be more appropriate.",
          "rx": "Imiquimod or podofilox per clinician and site/pregnancy screen. Edit before use; avoid auto-send.",
          "counseling": "Treatment removes visible warts but does not cure HPV. Avoid sex while medication is on skin/lesions active. Discuss STI testing and HPV vaccination.",
          "avoidIf": [
            "Pregnancy",
            "Internal/cervical/urethral/anal lesions",
            "Atypical lesion needing biopsy",
            "Immunosuppression without in-person plan"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "sti-counseling",
            "pregnancy-restrict"
          ],
          "followUp": "4-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "HPV vaccine counseling",
        "STI testing referral",
        "Condom/barrier counseling",
        "In-person gynecology/colorectal/urology as indicated"
      ]
    },
    "molluscum": {
      "label": "Molluscum",
      "diagnosisSet": [
        "Molluscum contagiosum",
        "Wart/folliculitis differential"
      ],
      "safetyScreen": [
        "Genital adult lesions needing STI context",
        "Eye involvement",
        "Immunosuppression",
        "Severe inflammation/infection",
        "Uncertain diagnosis"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "molluscum-observe",
          "title": "Molluscum - observe/supportive",
          "route": "no-rx",
          "diagnosis": "Molluscum contagiosum",
          "plan": "Often no prescription is needed. Focus on counseling, avoiding spread, and in-person procedural options if desired.",
          "rx": "No prescription by default. Consider topical/procedural options only after clinician review.",
          "counseling": "Avoid picking/shaving over lesions. Cover lesions when contact sports/skin contact. Seek in-person care if infected, near eye, or diagnosis uncertain.",
          "avoidIf": [
            "Eye involvement",
            "Immunosuppression",
            "Genital adult lesions with STI concern"
          ],
          "tags": [
            "no-rx",
            "supportive",
            "spread-prevention"
          ],
          "followUp": "as needed",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Cover lesions",
        "Avoid sharing towels",
        "In-person treatment if bothersome"
      ]
    },
    "eyelash": {
      "label": "Eyelash growth",
      "diagnosisSet": [
        "Eyelash hypotrichosis",
        "Alopecia areata/lid disease - refer"
      ],
      "safetyScreen": [
        "Eye disease, eye pain, vision change",
        "Pregnancy/lactation",
        "History of uveitis/macular edema risk",
        "Contact lens/cosmetic tattoo irritation",
        "Unilateral lash loss"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "lash-bimatoprost",
          "title": "Lash growth - bimatoprost review",
          "route": "commercial",
          "diagnosis": "Eyelash hypotrichosis",
          "plan": "Manual review only; screen ocular history and counsel cosmetic/ocular risks.",
          "rx": "Bimatoprost ophthalmic solution for lash application per approved product instructions. Edit before use.",
          "counseling": "Can cause eyelid darkening, irritation, unwanted hair growth where applied, and iris color changes. Avoid if eye symptoms or pregnancy/lactation without review.",
          "avoidIf": [
            "Pregnancy/lactation",
            "Eye pain/vision change/active eye disease",
            "Unilateral lash loss",
            "History of ocular inflammation without eye clinician review"
          ],
          "tags": [
            "commercial",
            "manual-review",
            "ocular-screen"
          ],
          "followUp": "8-16 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Avoid irritant lash serums",
        "Remove eye makeup gently",
        "Ophthalmology if eye symptoms"
      ]
    },
    "keratosis-pilaris": {
      "label": "Keratosis pilaris",
      "diagnosisSet": [
        "Keratosis pilaris",
        "Follicular eczema differential"
      ],
      "safetyScreen": [
        "Painful pustules/folliculitis",
        "Rapid change",
        "Severe inflammation",
        "Pregnancy before retinoid/acid stacking"
      ],
      "defaultFollowUp": "4-12 weeks",
      "rxTemplates": [
        {
          "id": "kp-otc",
          "title": "KP - supportive keratolytic/moisturizer",
          "route": "otc-or-white-label",
          "diagnosis": "Keratosis pilaris",
          "plan": "Usually supportive OTC care. No prescription needed unless severe/inflamed or patient-specific reason.",
          "rx": "No prescription by default. Consider lactic acid/urea/salicylic acid moisturizer or compounded gentle keratolytic if needed.",
          "counseling": "This is common and chronic. Products smooth texture while used; irritation can worsen bumps.",
          "avoidIf": [
            "Significant inflammation/pustules",
            "Pregnancy before retinoid use"
          ],
          "tags": [
            "otc",
            "white-label",
            "cosmetic-support"
          ],
          "followUp": "8-12 weeks",
          "evidenceNotes": []
        }
      ],
      "supportiveCare": [
        "Urea/lactic acid moisturizer",
        "Gentle body wash",
        "Avoid aggressive scrubbing"
      ]
    }
  }
};
