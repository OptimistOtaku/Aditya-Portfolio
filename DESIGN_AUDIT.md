# Arrakis portfolio — design audit

Reviewed 17 November 2026. This audit covers the local Next.js portfolio, its mobile layouts, the gallery, recognition, contact, and the Ego Gate case-study flow. It preserves the Dune art direction and the illustrations the owner identified as keepers.

## Preserve

- Centered geometric Aditya Singh lettering and its restrained hover glow.
- Twin suns, a mostly daytime one-minute cycle, rising spice, and the surface-to-sietch journey.
- The small diamond brand mark and star / Roman numeral award emblems. These are the visual accents; navigation and actions stay typographic.
- Ego Gate's orbital learning illustration, Recall Loop's graph, and authentic project screenshots and logos.
- Warm sandstone, quiet olive shadows, fine rules, and the serif / sans / mono type hierarchy.
- Four equally prominent featured projects and separate recognition for competition, research, and open-source work.

## Corrections applied

| Priority | Finding | Correction |
| --- | --- | --- |
| P1 | The upright worm read as a separate object; rebuilding terrain normals and skipping render frames added avoidable motion cost. | A long, mostly buried body follows the terrain. GPU displacement produces a bow mound, trailing wakes, and a briefly exposed back. Sand and creature share their path, depth buffer, and lighting. ScrollTrigger smooths progress; rendering follows available display frames. |
| P1 | The suns visibly traveled backwards during the night-to-dawn transition. | A forward orbital arc ends in the west. The coordinate reset occurs while both suns are fully hidden; they rise again from the east. The cycle remains 60 seconds with a six-second night. |
| P1 | Mobile navigation offered small text-sized targets and no current-section indication. | Navigation targets measure at least 44 × 44 CSS pixels on the checked phones. A restrained underline and `aria-current` identify the section. |
| P2 | Project actions could sit at different heights, and reveal transforms competed with hover tilt. | Flex layout aligns actions across each desktop row. Reveal transforms are cleared after completion so the CSS interaction can take over. |
| P2 | Research and open-source evidence became narrow columns on small phones. | Those blocks stack below 480px; the award emblems and recognition hierarchy are retained. |
| P2 | Case-study returns went to the gallery heading rather than the project the reader opened. | Native project anchors return to the corresponding card. Case-study links explicitly target the reading surface at entry. |
| P2 | Contact hid the address behind a generic sentence. | The email address is now visible and remains a direct mail link. Case-study paragraphs have a 68ch maximum measure. |
| P2 | A background-tone step was visible between Writing and Contact. | The adjoining surface colors now match and the contact light shaft fades in. |

## Next visual priorities

1. **Balance the project artwork.** Cloudswitch's bright interface attracts more attention than the darker illustrated projects. Keep the authentic screenshot and its logo, then refine the surrounding art frame and lighting. Keep the four projects equally prominent.
2. **Give each case study one specific architecture figure.** Retain the existing illustrations and benchmark evidence, and add a diagram of the actual system and the owner's contribution. Diagrams must follow the repository's architecture and credits.
3. **Curate direct writing destinations.** The old `/p/the-ego-gate` Substack address could not be verified: the automated lookup returned a 404 and a focused search did not locate the article. The current research link remains working internally. A confirmed article permalink should be used before presenting it as a published essay.
4. **Refine environmental transitions conservatively.** The long descent is intentional and navigation bypasses it. Any later shortening should focus on small phones while retaining the continuous lighting and rock passage.
5. **Consolidate the legacy CSS.** Several older overrides remain in the stylesheet. A future cleanup should consolidate selectors while preserving the reviewed composition and breakpoints.

## Review evidence

- Desktop gallery and recognition reviewed at 1440px; motion also inspected at 1280px.
- Phone layouts reviewed at 390px and 320px. The document widths were 375px and 305px respectively, accounting for the scrollbar; no horizontal overflow was observed.
- Mobile navigation targets measured 44px high and at least 44px wide.
- First-row project action positions matched exactly in the DOM measurement.
- WebGL shaders compiled without browser console errors during the inspected traversal. No FPS benchmark is claimed.
- Existing solar checks cover cycle continuity, brief night, hidden-tab pause, and the hidden sun reset. No new test cases were added.
- Production build, ESLint, TypeScript, and the four existing solar tests passed. All changes remain local and uncommitted.
- Reduced-motion and unavailable-WebGL paths remain in code. Failure injection and a formal accessibility or Lighthouse audit were not performed in this pass.

Screenshots from this review:

- [Recognition — desktop](artifacts/audit-recognition-desktop.png)
- [Recognition — phone](artifacts/audit-recognition-mobile.png)
- [Gallery — desktop](artifacts/audit-gallery-desktop.png)
- [Contact — small phone](artifacts/audit-contact-small-phone.png)

Sand and creature motion reference: [DNEG's Dune: Part Two breakdown](https://www.dneg.com/news/return-to-arrakis-for-a-closer-look-at-our-work-on-dune-part-two). Film imagery is used as a reference, not distributed with the portfolio.
