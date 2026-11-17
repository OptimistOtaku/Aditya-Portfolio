# Aditya Singh — Arrakis portfolio

A Next.js and TypeScript portfolio that descends from the surface of Arrakis into a sietch. GSAP coordinates the layered scroll transitions; a Three.js scene blends a sandworm and its traveling wake into the hero landscape. Content remains server-rendered and usable without WebGL.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Sound is off until explicitly enabled. Reduced-motion visitors receive the static environment. Rendering pauses when scenes are off-screen or the tab is hidden.

## Validate

```sh
npm run lint
npx tsc --noEmit
npm run build
```

When building alongside an active development server, set `PORTFOLIO_DIST_DIR=.next-production` for both build and production start to isolate the output. PowerShell: `$env:PORTFOLIO_DIST_DIR='.next-production'`.

## Content and assets

Edit `src/lib/content.ts` for projects, archive entries, and social links. Featured projects have static `/projects/[slug]` case studies. The sitemap is generated from those records.

Project images in `public/images/cloudswitch.png` and `greg.png`, and the Ego Gate benchmark figure, come from Aditya's public source repositories. Other project visuals are explicitly labeled explanatory diagrams. Environmental geometry and ambient audio are generated locally; there are no external audio services or autoplay.

Recognition labels include user-confirmed team placements at Innovortex 3.0 and AICraft 3.1, the linked Code Cubicle team announcement, and user-confirmed finalist appearances. The unverified event participation count is omitted.

## Arrakis visual system

The centered name uses original SVG letterforms informed by the geometric 2021 film title, with a hover glow. The name remains an accessible heading. A shared sandstone environment and a fixed upward-flowing spice layer continue through the homepage. Particle density is reduced on mobile; reduced-motion visitors receive a static composition. The procedural Three.js worm travels horizontally beneath the dunes during the opening descent.

Film lettering reference: https://commons.wikimedia.org/wiki/File:Dune_2021_logo.png

## Living daylight and the sandworm

A one-minute solar cycle runs across the site, including project pages. It counts active viewing time only and pauses in hidden tabs. Night lasts six seconds; most of the cycle is daylight, with dawn and dusk between them. The suns rise in the east, follow a forward arc, and set in the west. Their position resets while they are fully hidden at night. Lighting affects the sky, both suns, stars, dunes, the worm, and light entering the sietch. There are no daylight controls.

The sandworm is a long continuous mesh with a mostly buried head and a briefly exposed armored back. GSAP smooths its scroll-driven passage. GPU deformation bends the body along the same dune field as the surrounding sand, with pressure mounds, trailing wakes, and cascading dust. Geometry and normals are not rebuilt on the CPU each frame, and rendering follows the display refresh rate without a frame-skipping cap. It has no click action, label, or menu. Reduced motion uses a static composition; when WebGL is unavailable, the layered desert remains intact.

Motion reference: [DNEG’s sandworm and sand simulation breakdown for Dune: Part Two](https://www.dneg.com/news/return-to-arrakis-for-a-closer-look-at-our-work-on-dune-part-two). Film imagery is referenced, not shipped with the site.

The existing solar checks cover timing, phase continuity, and hidden-tab behavior.
