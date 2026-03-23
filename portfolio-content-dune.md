# PORTFOLIO CONTENT FILE — DUNE EDITION
# Aditya Singh
# Design Theme: Full-immersion Dune cinematic — Arrakis · Fremen · Imperial · Deep Desert
# For use in Cursor alongside DUNE_DESIGN_SPEC.md
# Last updated: March 2026

---

## ═══════════════════════════════════════
## META / SEO
## ═══════════════════════════════════════

- **Page Title:**       Aditya Singh — AI Engineer & Full-Stack Developer
- **Meta Description:** Full-stack engineer and AI builder crafting intelligent,
                        scalable systems. Available for AI integrations, full-stack
                        web apps, API development, and ML engineering.
- **OG Title:**         Aditya Singh — AI Engineer & Full-Stack Developer
- **OG Description:**   I build AI-powered products that innovate.
                        Open to freelance & serious projects.
- **Canonical URL:**    (add your domain when live)
- **OG Image:**         1200×630px — dark sand background, Cinzel name in spice gold,
                        title line in Share Tech Mono below. No photos.

---

## ═══════════════════════════════════════
## FONTS — IMPORT IN <HEAD>
## ═══════════════════════════════════════

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Share+Tech+Mono&display=swap" rel="stylesheet">
```

| Role                        | Font                  | Weight       |
|-----------------------------|-----------------------|--------------|
| Name / Section headings     | Cinzel                | 700, 900     |
| Body paragraphs / prose     | Cormorant Garamond    | 300, 300i    |
| Labels / tags / code / nav  | Share Tech Mono       | 400          |

---

## ═══════════════════════════════════════
## CSS VARIABLES — PASTE INTO :root {}
## ═══════════════════════════════════════

```css
:root {
  /* Global base */
  --void:           #06080A;
  --sand-deep:      #100D08;
  --text-primary:   #F2E8D0;
  --text-muted:     #7A6A4A;
  --border-warm:    #2A2015;
  --border-cold:    #1A2430;

  /* Spice gold — the throughline across ALL sections */
  --spice:          #C8860A;
  --spice-pale:     #E8C46A;
  --spice-glow:     rgba(200, 134, 10, 0.15);
  --spice-border:   rgba(200, 134, 10, 0.25);

  /* Fremen blue — About section accent */
  --fremen:         #1E6B8A;
  --fremen-glow:    rgba(30, 107, 138, 0.12);

  /* Guild blue — Projects section accent */
  --guild:          #4A7FA5;
  --guild-glow:     rgba(74, 127, 165, 0.10);
}
```

---

## ═══════════════════════════════════════
## NAVIGATION
## ═══════════════════════════════════════

**Left — House emblem + name:**
> ◈  ADITYA SINGH
- Font: Share Tech Mono, 0.8rem, letter-spacing 0.25em
- ◈ symbol: spice gold (#C8860A)
- "ADITYA SINGH": var(--text-primary)

**Right — Nav links (styled as coordinates):**

| Display label         | Anchor target |
|-----------------------|---------------|
| I. THE OPERATIVE      | #about        |
| II. THE MISSIONS      | #projects     |
| III. TRANSMIT         | #contact      |

- Font: Share Tech Mono, 0.72rem, var(--text-muted)
- Hover: color shifts to var(--spice), no underline, transition 0.3s

**Scroll behaviour (triggers at > 80px):**
- background: rgba(6, 8, 10, 0.92)
- backdrop-filter: blur(16px) saturate(120%)
- border-bottom: 1px solid rgba(200, 134, 10, 0.2)
- transition: 0.4s ease

---

## ═══════════════════════════════════════
## SECTION 01 — HERO
## World: Arrakis Surface
## Atmosphere: Vast. Blinding. Brutal. The desert before you.
## ═══════════════════════════════════════

### Eyebrow label
```
◈ HOUSE OPERATIVE // ARRAKIS SECTOR // YEAR 10191
```
- Font: Share Tech Mono, 0.7rem, var(--spice), letter-spacing 0.25em

---

### Name — giant display, two lines, centered
```
ADITYA
SINGH
```
- Font: Cinzel 900
- Size: clamp(4.5rem, 9vw, 9rem)
- Color: var(--text-primary)
- Letter-spacing: -0.02em
- Line-height: 0.92

---

### Divider
- 120px wide, centered, 1px solid rgba(200,134,10,0.4)
- Margin: 1.5rem auto

---

### Classification line
```
AI ENGINEER  ·  FULL-STACK  ·  ML SYSTEMS
```
- Font: Share Tech Mono, 0.8rem, var(--spice), letter-spacing 0.2em

---

### Hero body copy
```
I build AI-powered products that innovate.
Driven by love of the game — I work with precision,
adapt relentlessly, and don't stop until the vision
is exactly what it needs to be.
```
- Font: Cormorant Garamond 300, 1.1rem, var(--text-muted)
- Max-width: 480px, centered
- Line-height: 2.0

---

### CTA Buttons — side by side, centered

| Button        | Label                  | Action               | Style                                              |
|---------------|------------------------|----------------------|----------------------------------------------------|
| Primary       | [ VIEW THE MISSIONS ]  | scrolls to #projects | 1px var(--spice) border, bg rgba(200,134,10,0.1)  |
| Secondary     | [ GITHUB ARCHIVE ↗ ]  | github.com/OptimistOtaku | 1px rgba(242,232,208,0.2) border, muted text  |

- Font: Share Tech Mono, 0.78rem
- Padding: 1rem 2.2rem
- Zero border-radius
- Hover primary: bg rgba(200,134,10,0.2), border-color var(--spice)
- Hover secondary: border-color rgba(242,232,208,0.4), color var(--text-primary)

---

### Status stamp — bottom-left corner
```
LAT: 28.4°N  ·  LONG: 14.7°E  ·  SPICE LEVEL: CRITICAL
STATUS: AVAILABLE FOR MISSIONS_
```
- Font: Share Tech Mono, 0.65rem, var(--text-muted)
- The trailing underscore _ blinks at 1.2s interval
- CSS: `animation: blink 1.2s step-end infinite;`

---

### Hero background layers (CSS only, no images)
1. Base: #100D08 solid
2. Horizon gradient: linear-gradient(to top, #3D2408 0%, #1A0F05 35%, #100D08 65%, #06080A 100%)
3. Spice bloom: two overlapping radial gradients at 30%/85% and 70%/90% — rgba(200,134,10,0.18) and rgba(200,134,10,0.10)
4. Two CSS suns top-right (binary star system): 120px + 60px circles, gold radial gradient, amber box-shadow glow
5. Sand ripple lines: 3–4 thin horizontal curves in lower third, rgba(200,134,10,0.06)
6. Spice dust particles: 80–100 dots, 1–3px, drifting upward, 15–30s loop, staggered

---

### Hero entrance animation — slow, cinematic
| Element            | Delay   |
|--------------------|---------|
| Eyebrow            | 0.3s    |
| Name               | 0.6s    |
| Divider            | 0.9s    |
| Classification     | 1.1s    |
| Body copy          | 1.3s    |
| CTAs               | 1.6s    |
| Status stamp       | 2.0s    |

- Each: opacity 0→1, translateY 30px→0, duration 1s
- Easing: cubic-bezier(0.16, 1, 0.3, 1)

---

## ═══════════════════════════════════════
## SECTION 02 — ABOUT
## World: Fremen Sietch
## Atmosphere: Underground. Hidden. Tactical. Ancient knowledge.
## ═══════════════════════════════════════

### Section label
```
◈ SIETCH RECORD // MODULE: OPERATIVE_PROFILE
```
- Font: Share Tech Mono, 0.7rem, var(--fremen), letter-spacing 0.2em

---

### Section heading
```
I Work Until
The Vision Is Real.
```
- Font: Cinzel 700, clamp(2rem, 3.5vw, 3rem), var(--text-primary)

---

### Pull quote — full width, above columns
```
"The mystery of life isn't a problem to solve,
 but a reality to experience."
```
```
— DUNE · FRANK HERBERT
```
- Quote: Cormorant Garamond 300 italic, ~1.4rem, var(--spice-pale)
- Attribution: Share Tech Mono, 0.65rem, var(--text-muted)
- Left border: 3px solid rgba(200,134,10,0.5), padding-left: 1.5rem

---

### Body copy — LEFT column (55%)
*(Cormorant Garamond 300, 1.05rem, var(--text-primary), line-height 2.1)*

**Paragraph 1:**
```
I'm a full-stack engineer and AI builder — focused on systems
that actually matter. Not demos. Not experiments. Products with
real architecture and real stakes behind them.
```

**Paragraph 2:**
```
What drives me is love of the game. I work with precision,
I adapt fast, and I don't ship until I've overpowered the problem.
Every project is a chance to mold a vision exactly in my image.
```

**Paragraph 3:**
```
I'm targeting the kind of work that pushes limits — AI integrations,
ML systems, full-stack platforms. If the problem is hard
and the stakes are real, I'm interested.
```

**Freelance line** *(below paragraphs, Share Tech Mono, var(--spice), 0.72rem)*:
```
OPEN FOR: AI INTEGRATIONS · FULL-STACK · API DEV · ML ENGINEERING
```

---

### Systems Manifest — RIGHT column (45%)

**Panel border:** 1px solid rgba(30, 107, 138, 0.3), padding 1.5rem

**Panel header:**
```
// SYSTEMS ONLINE — 14 MODULES ACTIVE
```
*(Share Tech Mono, var(--fremen), 0.7rem, letter-spacing 0.15em)*

**Skill rows** *(Share Tech Mono, 0.72rem — ▸ in var(--fremen), dots muted at 0.3 opacity, [ ACTIVE ] in var(--spice))*:

```
▸  TYPESCRIPT ··············· [ ACTIVE ]
▸  PYTHON ··················· [ ACTIVE ]
▸  REACT / NEXT.JS ·········· [ ACTIVE ]
▸  NODE.JS / EXPRESS ········ [ ACTIVE ]
▸  FASTAPI ·················· [ ACTIVE ]
▸  MACHINE LEARNING ········· [ ACTIVE ]
▸  DEEP LEARNING / CNNs ····· [ ACTIVE ]
▸  DIFFUSION MODELS ········· [ ACTIVE ]
▸  LLM INTEGRATION ·········· [ ACTIVE ]
▸  AI AGENTS ················ [ ACTIVE ]
▸  SYSTEM DESIGN ············ [ ACTIVE ]
▸  POSTGRESQL / MONGODB ····· [ ACTIVE ]
▸  BLOCKCHAIN / WEB3 ········ [ ACTIVE ]
▸  DOCKER ··················· [ ACTIVE ]
```

**Row hover:** background rgba(30,107,138,0.06), full-width highlight
**On section enter:** rows load sequentially, 60ms stagger,
translateX -12px→0 + opacity 0→1 per row

---

## ═══════════════════════════════════════
## SECTION 03 — PROJECTS
## World: Imperial / Spacing Guild
## Atmosphere: Cold. Ceremonial. Classified. Every project a CHOAM contract.
## ═══════════════════════════════════════

### Section label
```
◈ CHOAM REGISTRY // MODULE: MISSION_LOG
```
- Font: Share Tech Mono, 0.7rem, var(--guild), letter-spacing 0.2em

---

### Section heading
```
Selected Operations.
```
- Font: Cinzel 700, clamp(2rem, 3.5vw, 3rem), var(--text-primary)

---

### Bento grid layout

```
┌─────────────────────────────┬──────────────────┐
│  OP-01: RETINAI  (2/3)      │  OP-02: BUDAI    │
│  FEATURED · AI/ML           │  (1/3) AI AGENT  │
├──────────────────┬──────────┴──────────────────┤
│  OP-03: GLADIATOR│  OP-04: FRAUDEYE            │
│  ARENA  (1/2)    │  (1/2) ML SYSTEMS           │
├──────────────────┴─────────────────────────────┤
│  OP-05: HANGOUT-HERO  (full width, short)       │
└─────────────────────────────────────────────────┘
```

- Grid gap: 2px (dark gap lines = sealed chamber doors)
- Zero border-radius on all cards

---

### PROJECT 01 — RETINAI
**Role:** Featured, largest card (2/3 width, full height)

| Field            | Content |
|------------------|---------|
| Mission code     | OP-01 // CLASSIFIED |
| Category badge   | [ AI · ML ] — spice gold border + gold text |
| Name             | RETINAI |
| One-liner        | Multi-disease retinal classification using diffusion model-based anomaly maps. |
| GitHub           | https://github.com/OptimistOtaku/RetinAI *(confirm URL)* |

**Description:**
```
A medical AI system that detects multiple retinal diseases from fundus images.
Built on a diffusion model pipeline for anomaly map generation, paired with
specialised CNNs per disease class and a meta-classifier that aggregates
outputs for final prediction. Designed for real diagnostic utility — not a toy model.
```

**Stack tags:**
`PYTHON` · `PYTORCH` · `DIFFUSION MODELS` · `CNN` · `META-CLASSIFIER` · `MEDICAL AI`

**Archive link:** `>> ACCESS ARCHIVE ↗` → https://github.com/OptimistOtaku/RetinAI

---

### PROJECT 02 — BUDAI
**Role:** Featured, secondary card (1/3 width)

| Field            | Content |
|------------------|---------|
| Mission code     | OP-02 // ACTIVE |
| Category badge   | [ AI AGENT ] — spice gold |
| Name             | BUDAI |
| One-liner        | Real-time intelligent AI agent — makes calls, manages tasks, operates autonomously. |
| GitHub           | https://github.com/OptimistOtaku/BudAi |

**Description:**
```
A live AI agent that operates in real-time — capable of making calls,
managing tasks, and acting as an always-on personal assistant.
Built for actual utility, not just chat. Processes live context
and takes action autonomously.
```

**Stack tags:**
`JAVASCRIPT` · `AI AGENT` · `REAL-TIME` · `VOICE` · `LLM` · `AUTOMATION`

**Archive link:** `>> ACCESS ARCHIVE ↗` → https://github.com/OptimistOtaku/BudAi

---

### PROJECT 03 — GLADIATOR ARENA
**Role:** Standard card (1/2 width)

| Field            | Content |
|------------------|---------|
| Mission code     | OP-03 // DEPLOYED |
| Category badge   | [ WEB3 ] — guild blue border + blue text |
| Name             | GLADIATOR ARENA |
| One-liner        | On-chain PvP game — win fights, claim opponents' weapons as NFTs. |
| GitHub           | https://github.com/OptimistOtaku/Gladiator-Arena *(confirm URL)* |

**Description:**
```
A fully on-chain PvP battle game with real economic stakes.
Win a fight and claim your opponent's weapon as an NFT.
Lose and watch its value deducted from your wallet.
P2P architecture with smart contract enforcement — no middleman, no rollbacks.
```

**Stack tags:**
`TYPESCRIPT` · `BLOCKCHAIN` · `SMART CONTRACTS` · `NFT` · `P2P` · `WEB3`

**Archive link:** `>> ACCESS ARCHIVE ↗` → https://github.com/OptimistOtaku/Gladiator-Arena

---

### PROJECT 04 — FRAUDEYE
**Role:** Standard card (1/2 width)

| Field            | Content |
|------------------|---------|
| Mission code     | OP-04 // OPERATIONAL |
| Category badge   | [ ML SYSTEMS ] — muted border |
| Name             | FRAUDEYE |
| One-liner        | Hybrid ML + rule-based fraud detection API. High precision, production-ready. |
| GitHub           | https://github.com/OptimistOtaku/fraudeye |

**Description:**
```
A fraud detection system combining machine learning models with deterministic
rule engines — capturing both pattern-based anomalies and hard business logic
violations. Production API with low-latency inference served via FastAPI.
```

**Stack tags:**
`PYTHON` · `FASTAPI` · `SCIKIT-LEARN` · `ML` · `RULE ENGINE` · `REST API`

**Archive link:** `>> ACCESS ARCHIVE ↗` → https://github.com/OptimistOtaku/fraudeye

---

### PROJECT 05 — HANGOUT-HERO
**Role:** Full-width accent card (shorter height)

| Field            | Content |
|------------------|---------|
| Mission code     | OP-05 // DEPLOYED |
| Category badge   | [ FULL-STACK ] — muted border |
| Name             | HANGOUT-HERO |
| One-liner        | AI itinerary generator — real-time plans built on mood, location, and group preferences. |
| GitHub           | https://github.com/OptimistOtaku/HangOut-Hero |

**Description:**
```
Generates personalised real-time hangout itineraries by combining user mood,
live location data, group size, and preferences.
Powered by OpenAI with live maps integration.
Because planning shouldn't be the hard part.
```

**Stack tags:**
`TYPESCRIPT` · `OPENAI` · `MAPS API` · `NEXT.JS` · `REAL-TIME`

**Archive link:** `>> ACCESS ARCHIVE ↗` → https://github.com/OptimistOtaku/HangOut-Hero

---

### Card hover state (apply to all cards)
- Left border: 2px solid rgba(200,134,10,0.6), scaleY 0→1 from top, 0.3s
- Background: lifts to #0C0E12
- box-shadow: inset 0 0 40px rgba(200,134,10,0.03)
- Project name color: shifts to var(--spice)
- Archive link arrow: translateX 4px

---

## ═══════════════════════════════════════
## SECTION 04 — CONTACT
## World: Deep Desert
## Atmosphere: Stripped back. Alone with the sand. Elemental. Final.
## ═══════════════════════════════════════

### Section label
```
◈ DEEP DESERT // MODULE: OPEN_CHANNEL
```
- Font: Share Tech Mono, 0.7rem, var(--spice), letter-spacing 0.2em

---

### Section heading
```
Transmit a Signal.
```
- Font: Cinzel 700, clamp(2rem, 3.5vw, 3rem), var(--text-primary)
- Layout: centered, max-width 560px, generous vertical padding

---

### Body copy
```
Available for AI integrations, full-stack web apps,
API development, and ML engineering.
If the problem is hard and the build is real — let's talk.
```
- Font: Cormorant Garamond 300 italic, 1.1rem, var(--text-muted), centered

---

### Contact links — three bordered blocks, centered

| Icon | Label              | Destination                                    |
|------|--------------------|------------------------------------------------|
| ◈    | GITHUB ARCHIVE     | https://github.com/OptimistOtaku               |
| ◈    | EMAIL CHANNEL      | optimistotaku@gmail.com                        |
| ◈    | LINKEDIN RELAY     | https://www.linkedin.com/in/adityasinghop/     |

- Font: Share Tech Mono, 0.78rem, var(--text-primary)
- Border: 1px solid rgba(200,134,10,0.25)
- Padding: 0.9rem 2rem
- Zero border-radius
- ◈ prefix: var(--spice)
- Hover: border-color rgba(200,134,10,0.7), bg rgba(200,134,10,0.06), text var(--spice)

---

### Closing epigraph — below contact links
```
"He who controls the spice controls the universe."
```
```
— DUNE · FRANK HERBERT
```
- Font: Cormorant Garamond 300 italic, 0.9rem, very muted, centered
- Margin-top: 3rem

---

## ═══════════════════════════════════════
## FOOTER
## ═══════════════════════════════════════

- Border-top: 1px solid rgba(200, 134, 10, 0.15)
- Padding: 1.8rem 3rem

**Left:**
```
© 10191 A.G. — ADITYA SINGH — ALL RIGHTS RESERVED
```

**Right:**
```
DESIGNED & BUILT IN THE SIETCH
```

- Font: Share Tech Mono, 0.68rem, var(--text-muted)
- Note: "10191 A.G." is the Dune calendar year — intentional world detail

---

## ═══════════════════════════════════════
## QUICK REFERENCE — ALL LINKS
## ═══════════════════════════════════════

| Purpose              | URL                                                  |
|----------------------|------------------------------------------------------|
| GitHub Profile       | https://github.com/OptimistOtaku                     |
| LinkedIn             | https://www.linkedin.com/in/adityasinghop/           |
| Email                | optimistotaku@gmail.com                              |
| RetinAI repo         | https://github.com/OptimistOtaku/RetinAI *(confirm)* |
| BudAi repo           | https://github.com/OptimistOtaku/BudAi               |
| Gladiator Arena repo | https://github.com/OptimistOtaku/Gladiator-Arena *(confirm)* |
| FraudEye repo        | https://github.com/OptimistOtaku/fraudeye            |
| HangOut-Hero repo    | https://github.com/OptimistOtaku/HangOut-Hero        |

---

## ═══════════════════════════════════════
## NOTES FOR CURSOR
## ═══════════════════════════════════════

### Dune vocabulary — use these terms throughout the UI
| Generic term     | Dune equivalent to use in labels/UI         |
|------------------|---------------------------------------------|
| Projects         | Operations / Missions / CHOAM Contracts     |
| About            | Operative Profile / Sietch Record           |
| Skills           | Systems Manifest / Modules Online           |
| Contact          | Open Channel / Transmit / Deep Desert       |
| Navigation links | Coordinates (I. / II. / III.)               |
| GitHub           | Archive / Uplink                            |
| Email            | Channel                                     |
| LinkedIn         | Relay                                       |
| Status           | Clearance / Spice Level / Stardate          |
| Featured badge   | CLASSIFIED / HIGH IMPACT                    |

---

### Tone rules — non-negotiable
1. No filler phrases: never "passionate about", "I love to", "enthusiastic"
2. Every line sounds like someone who knows exactly what they're doing
3. Body prose in Cormorant Garamond feels literary and precise — not corporate
4. Labels/UI in Share Tech Mono feel like mission readouts — not menus
5. Audience: Big tech recruiters (Meta, Google) + serious technical clients

---

### Section atmosphere summary — for background/color transitions
| Section   | World          | Temperature | Primary accent   |
|-----------|----------------|-------------|------------------|
| Hero      | Arrakis        | Warm        | Spice gold       |
| About     | Fremen Sietch  | Cold        | Fremen blue      |
| Projects  | Imperial/Guild | Cold        | Guild blue       |
| Contact   | Deep Desert    | Warm        | Spice gold       |

The color temperature shift from warm→cold→warm across the scroll
is the core atmospheric arc. Do not flatten this with a single palette.

---

### URLs to confirm before going live
- [ ] RetinAI exact GitHub repo name
- [ ] Gladiator-Arena exact GitHub repo name
- [ ] Personal domain (add to canonical URL + OG)
- [ ] Test all mailto: and external links

---

### Hard rules reminder (from design spec)
- ✗ Zero border-radius anywhere — every edge sharp
- ✗ No images or photos — CSS/SVG only
- ✗ No purple, cyan, or neon
- ✗ No sans-serif for body prose
- ✓ var(--spice) #C8860A appears in every single section
- ✓ Grain texture overlay present at all times
- ✓ All animations slow and cinematic — never snappy
