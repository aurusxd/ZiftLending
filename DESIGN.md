---
name: Zift
description: An AI software studio landing page built as a night sky answering one lightning strike.
colors:
  night: "#0a0a0a"
  surface: "#121212"
  ember: "#ff6a2e"
  ember-warm: "#ffb454"
  bone: "#f4f1ec"
  bone-muted: "rgb(244 241 236 / 0.62)"
  hairline: "rgb(244 241 236 / 0.1)"
  danger: "#ff7a70"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 8.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "0.035em"
    fontVariation: "width 125"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.8vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  field: "1rem"
  card: "1.25rem"
  panel: "2rem"
  pill: "9999px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  section-sm: "6rem"
  section-md: "9rem"
  card-pad: "1.75rem"
  panel-pad: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.night}"
  button-accent:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.25rem"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "2.5rem"
  badge:
    backgroundColor: "rgb(244 241 236 / 0.03)"
    textColor: "{colors.bone-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem 0.375rem 0.75rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.bone}"
    rounded: "{rounded.card}"
    padding: "1.75rem"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.bone}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
  input:
    backgroundColor: "{colors.night}"
    textColor: "{colors.bone}"
    rounded: "{rounded.field}"
    padding: "0 1rem"
    height: "3.25rem"
  choice-pill:
    backgroundColor: "{colors.night}"
    textColor: "rgb(244 241 236 / 0.85)"
    rounded: "{rounded.pill}"
    height: "2.75rem"
  tag:
    backgroundColor: "transparent"
    textColor: "rgb(244 241 236 / 0.7)"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
---

# Design System: Zift

## Overview

**Creative North Star: "The Night Sky After the Strike"**

The world is a single unlit ground with one source of light in it. Everything begins at near-black, and every warm value on the page is light arriving from somewhere: a lightning flash in the fixed strip at the top, a residual ember breathing behind the hero, a glow under a hovered card, a hairline igniting across a pipeline. Nothing is colored for decoration. If a surface is warm, something lit it.

Density is generous and centered. A single wide container (max 80rem) carries every section, sections breathe at 6rem of vertical padding on phones and 9rem from the medium breakpoint up, and the page moves in one column with occasional 12-column asymmetry at large widths. Type is the structure: one expanded, uppercase display register for the moments that matter and one tight, sentence-case register for everything that explains. There is no second accent hue, no photographic texture beyond the one lightning take, and no illustrated character; the geometric vocabulary is the diamond contour and the 1.5-stroke authored line icon.

Depth in the shipped build is deliberately thin. One accent glow token does nearly all the lifting, supported by near-black drop shadows used only to separate a stacked surface from the one behind it. This is recorded as it stands: the system reads as flat panels on a lit ground, not as a stack of elevated materials.

**Key Characteristics:**
- Night ground with a single ember accent used exclusively as light
- Two headline registers: expanded uppercase display, and tight sentence-case section headline
- Hairline structure at 10% warm white instead of solid dividers or boxes
- Pill geometry for controls, 1–2rem soft-rounded rectangles for surfaces
- Diamond contour as the recurring ornament; authored 24x24 line icons at 1.5 stroke
- Motion is a response to the strike, and everything is gated on `prefers-reduced-motion`

## Colors

A one-accent palette: a night ground, a warm off-white for type, and an ember that exists only as emitted light.

### Primary
- **Ember** (`colors.ember`): the accent at full strength. Used as the lightning flash gradient, the pipeline connector fill, the lit step frame border, the hover border on cards (35–40% alpha), the selection highlight (40%), the focus ring shadow (15%), and the ambient radial washes behind the hero and contact section (9–38%). Never a large flat fill.
- **Ember Warm** (`colors.ember-warm`): the light end of the accent gradient, and the accent's interface voice: focus-visible outline, caret color, icon accents, the "Choose another time" text link, and the glowing traces in the chip illustration.

The two are rarely used flat and alone; the canonical accent surface is the 100deg linear gradient from Ember to Ember Warm (`bg-accent-gradient`), which fills accent buttons, the badge diamond marker, the active nav underline, the success check disc, and the short 20px rules that lead list items.

### Neutral
- **Night** (`colors.night`): the page ground and the body of every section. Also the text color on top of accent-filled buttons and the success disc.
- **Surface** (`colors.surface`): the one raised tone, a barely-perceptible step above the ground. Cards, the services tab bar and panel, the portfolio preview frame, the contact form container.
- **Bone** (`colors.bone`): primary type, the primary button fill, the active tab pill, star points.
- **Bone Muted** (`colors.bone-muted`): all secondary copy, supporting paragraphs, inactive tab labels, footer links, metadata.
- **Hairline** (`colors.hairline`): every border, divider and section rule in the system.

### Tertiary
- **Danger** (`colors.danger`): field validation messages and the submit error banner only. Used as text, a 40% border and a 10% tint; never a filled surface.

### Named Rules
**The Light-Only Rule.** The ember accent may appear only where the page is being lit: a flash, a glow, a fill sweep, a hover response, the active state of a control, or a primary call to action. It is never a background panel, never body text, never a decorative stripe.

**The Hairline Rule.** Structure is drawn at 10% warm white, one pixel, and nothing heavier. When a boundary needs more presence it gets an accent-gradient hairline fading to transparent at both ends, not a thicker or brighter line.

**The One Ramp Rule.** There is no tonal scale. Depth between neutrals is the single step from night to surface; anything in between is warm white at an alpha, not a new gray.

## Typography

**Display Font:** Archivo Variable, width axis 125% (with `ui-sans-serif`, `system-ui`, `sans-serif`)
**Body Font:** Archivo Variable at normal width (same stack)

**Character:** One family, two personalities. Pushed to its expanded width cut and set in uppercase, Archivo is broad, structural and loud, like signage caught in a flash. At normal width with negative tracking it is quiet and modern in the right way, so paragraphs read as information rather than as branding.

### Hierarchy
- **Display** (800, `clamp(2.1rem, 8.4vw, 6rem)`, line-height 0.94, +0.035em, uppercase, width 125%): the expanded-caps register. The hero headline in three stacked lines, plus the Portfolio and Contact headings at smaller clamps (`clamp(1.6rem, 3.5vw, 3.1rem)` and `clamp(1.7rem, 3.8vw, 3.4rem)`). Also the mobile menu links and the chip illustration label.
- **Headline** (600, `clamp(2.1rem, 4.8vw, 4.25rem)`, line-height 1.02, -0.025em, sentence case): the normal-width section heading used in Who We Are, What We Do and How We Work. Accepts one accent-colored clause inside it for emphasis.
- **Subhead** (600, `clamp(1.75rem, 3.2vw, 3rem)`, -0.02em): the service panel title and the form success heading.
- **Title** (600, 1.25rem, -0.01em): card and step headings.
- **Body** (400, 1rem rising to 1.125rem from medium up, line-height ~1.63): all paragraphs, held to `max-w-xl` for column copy and `max-w-2xl` for centered intros.
- **Label** (500, 0.7rem, +0.16em, uppercase): section badges and the weekday caps inside date pills. The only tracked-out uppercase small text in the system.

### Named Rules
**The Two Registers Rule.** A heading is either expanded uppercase display or normal-width sentence case. Never mix the two treatments inside one heading, and never set body copy in the expanded width.

**The Balanced Heading Rule.** `h1`, `h2` and `h3` wrap with `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Never hard-break a heading with `<br>` to force a shape; the hero's three lines are semantic spans, not manual breaks.

**The Tabular Numbers Rule.** Any number that sits in a row with other numbers (step numerals, date pills, time slots) is set `tabular-nums`.

## Layout

One centered container at 80rem with 1.25rem side gutters, widening to 2rem from the medium breakpoint (768px). Sections stack in a single column and carry 6rem of vertical padding, rising to 9rem from medium up. Most sections open with a hairline top rule spanning the container, which is the only separator between them.

Section-internal grids appear only at the large breakpoint (1024px): a 12-column grid for heading/paragraph pairs (8+4 or 7+5, bottom-aligned), a three-column feature row, a four-column process row, and a 5fr/7fr split in Portfolio where the preview is source-ordered second but placed first visually and made sticky at `top-7rem`. Below large all of these collapse to a single column and the process connector rotates from horizontal to vertical.

The header is fixed, 4.5rem tall on phones and 5rem from medium up, laid out as a three-column grid (logo / nav / actions) so the nav stays optically centered. The hero compensates with matching top padding and fills `min-h-svh`. Below medium the primary nav is replaced by a full-height overlay at 95% ground with a heavy backdrop blur, anchored below the header bar.

Breakpoints actually used: 640 (`sm`, button rows and form column splits), 768 (`md`, the main phone/desktop switch: gutters, type step, nav, the lightning video, hero pinning), 1024 (`lg`, multi-column grids and the horizontal pipeline).

**The Rhythm Rule.** Vertical spacing steps through a small fixed set: 0.75rem between siblings in a list, 1.5–2rem between a badge and its heading, 4rem between a heading block and the content beneath it (6rem from medium), and 6/9rem between sections. Don't invent intermediate section padding.

## Elevation & Depth

The system is flat by material and lit by color. Surfaces are separated by a single tonal step and a hairline border; they do not stack. What depth exists comes from one repeated accent glow and a small number of near-black shadows whose only job is to let a foreground plane occlude the one behind it.

This is a thin depth vocabulary and it is recorded as shipped rather than as an aspiration: one accent glow does nearly all interactive elevation across buttons, cards, list items and selected date pills.

### Shadow Vocabulary
- **Accent glow** (`box-shadow: 0 18px 50px -18px rgb(255 106 46 / 0.5)`): the single interactive elevation token. Applied on hover to every button variant and feature card, on the selected portfolio list item and selected date pill, and at rest on the success check disc.
- **Step frame glow** (`box-shadow: 0 12px 32px -12px rgb(255 106 46 / calc(var(--lit) * 0.55))`): the scrub-driven variant on pipeline step frames, interpolated by a `--lit` custom property from 0 to 1 as the connector fill reaches each step.
- **Overlap shadow** (`0 -40px 80px -30px rgb(0 0 0 / 0.9)` upward under the Who We Are lip; `0 30px 80px -40px rgb(0 0 0 / 0.9)` under the portfolio preview; `0 18px 44px -26px rgb(0 0 0 / 0.95)` under the header once scrolled): black, wide and soft, used only where one plane genuinely passes in front of another.

**The Glow-On-Response Rule.** Nothing glows at rest except the success confirmation. The accent glow is a reply to hover, selection or scroll progress; a surface that always glows has nothing left to say when the user touches it.

## Shapes

Two shape families, strictly separated. **Controls are pills**: buttons, badges, tags, nav links, time slots, tab pills, icon discs and the menu button are all fully rounded. **Surfaces are soft rectangles**: cards at 1.25rem, fields and date pills at 1rem, panels and the form container at 2rem, the portfolio preview at 1.5rem rising to 2rem from medium. The Who We Are section rounds only its top corners (2rem, 3rem from medium) so it reads as a sheet sliding up over the hero.

The recurring ornament is the **diamond**: a square rotated 45 degrees. It appears as two symmetric clusters of four nested stroke-only polygons flanking the hero at 24% opacity (the outer ring dropped below medium), as the 6px gradient marker inside every section badge, and as the marker before the footer copyright. Icons are authored 24x24 paths on a 1.5 stroke with round caps and joins, drawn with `currentColor` and no fill.

**The Diamond-Or-Nothing Rule.** Decorative geometry is the diamond contour or a hairline. No blobs, no circles-as-decoration, no floating gradient orbs.

## Components

### Buttons
Confident, wide-set pills that respond with warmth rather than movement.
- **Shape:** full pill. Two heights: 3.25rem with 1.75rem side padding (default) and 2.5rem with 1.25rem (small, used in the header).
- **Primary:** bone fill on night text. Hover goes to pure white and adds the accent glow.
- **Accent:** the ember gradient fill on night text; hover adds the accent glow and lifts 1px.
- **Outline:** transparent with a 30% bone border. Hover shifts the border to 80% ember, tints the interior at 10% ember, and adds the glow.
- **Shared behavior:** 500ms transition on color, border, shadow and transform with the expo-out easing; `active:scale(0.98)`; disabled drops to 50% opacity and ignores pointer events. Focus uses the global ring.
- **Loading:** the submit button swaps its label for a spinning 1rem ring on a 2px border plus "Booking…", keeping its width.

### Badge
The section marker: an uppercase, wide-tracked label in a hairline pill at 3% bone, preceded by a small rotated gradient diamond with a tight ember glow. One per section, above the heading. Per the pinned spec this badge intentionally acts as the section kicker; it is a fixed one-per-section marker with a named label, not a free editorial eyebrow.

### Cards / Containers
- **Corner Style:** 1.25rem for feature and portfolio list cards; 2rem for the services and contact panels.
- **Background:** surface tone on a night ground, hairline border.
- **Internal padding:** 1.75rem rising to 2rem on feature cards; 1.5rem rising to 2rem and then 2.5–4rem on the large panels.
- **Hover (feature card):** the border warms to 35% ember, the accent glow appears, a gradient hairline sweeps open across the top edge from the center (700ms), and the icon disc's border and glyph shift to ember.
- **Icon disc:** 3rem circle, grid-centered, hairline border, ember-warm glyph.
- Who We Are ships three same-size feature cards in one row; the equal-weight row is mandated by the pinned spec, not an accident of the grid.

### Inputs / Fields
- **Style:** 3.25rem tall, 1rem radius, night fill inside the surface panel, hairline border, placeholder at 55% bone.
- **Hover:** border to 25% bone. **Focus:** border to 70% ember plus a 4px ember ring at 15%; the native outline is suppressed only where this ring replaces it.
- **Error:** `aria-invalid` drives a 70% danger border; the message renders below in danger text and is wired through `aria-describedby`. Errors surface on blur or after the first submit attempt, never on first keystroke. A failed submit focuses the first invalid field.
- **Select:** the same field with the native arrow removed and an authored chevron placed at the right inset.
- **Choice pills (time slots):** 2.75rem pill, hairline border; checked takes a 60% ember border, a 10% ember tint and full-strength text.
- **Date pills:** 4.5 x 5.75rem tiles at 1rem radius stacking weekday label / day numeral / month; checked takes the ember border, tint and accent glow. Before the client computes dates, eight pulsing skeleton tiles at 5% bone hold the row.
- **Hidden radios:** every radio is `sr-only` with a `peer`-styled visual pill; focus is mirrored onto the pill via `peer-focus-visible` in ember-warm. Each group sits in a `fieldset` with a legend (visible for Time, `sr-only` for Day) and its error is bound with `aria-describedby`.

### Navigation
Small (0.875rem), quiet links at 70% bone in a pill hit area; hover raises them to full bone. The active section link goes full bone and grows a 1px accent-gradient underline scaling in from the left over 500ms. Active state is driven by an IntersectionObserver watching the upper third of the viewport and exposed as `aria-current="location"`. Below medium the links collapse into a hamburger of two 2px bars that cross into an X, opening a blurred full-height overlay of oversized display-caps links; the open menu locks page scroll, closes on Escape or on growing to desktop, and returns focus to the toggle. In-page anchors scroll with GSAP, offset by the header height, then move focus to the target section (each section carries `tabindex="-1"` with its outline suppressed).

### Tabs (Services)
A pill tab bar with a sliding bone indicator measured from the selected tab's box and animated on transform, width and height (500ms, expo-out). Below medium the bar is a two-column rounded grid; from medium it is a single scrollable pill row whose leading and trailing edges fade via a mask only when content is actually hidden past that edge. Full `role="tablist"` / `tab` / `tabpanel` wiring with roving tabindex and Arrow/Home/End keys; the selected tab is scrolled to center on change. Content cross-fades: outgoing content lifts 12px and fades over 220ms, then incoming content rises 20px and settles over 900ms with a per-element stagger.

### Pipeline (How We Work)
Four numbered steps (01–04, zero-padded, expanded-width, tabular; the numbering is mandated by the pinned spec). Each numeral sits in a 3.5rem frame at 1rem radius whose border, text color and glow are all interpolated from a single `--lit` custom property, so an unlit step is a dim hairline frame and a lit step is an ember frame with a warm glow beneath it. A hairline connector runs between frames, vertical below large and horizontal from large, with an accent-gradient fill scaling from 0 to 1 on scroll scrub; each frame lights immediately after the fill reaches it. The connector and frames carry no world-specific device beyond this fill: that is the shipped state, not a placeholder.

### Portfolio Selector
A list of hairline cards paired with a sticky preview frame. Selection is driven by click and, on mouse pointers only, by hover; the selected card takes a 40% ember border, the surface fill and the accent glow, its icon disc turns ember, and its corner arrow shifts up-right in ember-warm. Cards expose `aria-pressed` and `aria-controls` pointing at the preview. The preview cross-fades stacked images (incoming 900ms expo-out to scale 1, outgoing 500ms to scale 1.04) and re-announces its caption through an `aria-live="polite"` region. Placeholder work carries a "Sample project" chip pinned to the preview's top-left on a blurred 75% night fill.

### Sky Strip
The signature component: a fixed full-bleed strip behind the header holding a single lightning take. The video plays once on desktop with motion allowed; everyone else gets the poster still. At the two measured flash moments the strip runs a four-beat flash on a screen-blended radial (0.85, 0.15, 0.6, 0), and a shared state module broadcasts the strike so the hero glow and the diamond clusters answer in the same frame. When the video ends it fades out over 1s and an ambient layer takes over: an ember radial breathing on a 6.5s sine yoyo, a deterministic star field, and heat lightning re-firing every 8–20 seconds at randomized strength. The strip is closed at the bottom by a single accent hairline fading to transparent at both ends.

**The Shared Strike Rule.** Every reaction to a strike reads from the one shared sky state. A new surface that wants to answer the lightning subscribes to that state; it never re-times the video itself.

**The Motion Gate Rule.** Every animation is gated on `prefers-reduced-motion`; pinning, the lightning video and hero parallax are additionally gated at 768px, and the horizontal pipeline at 1024px. A reduced-motion visitor gets the poster still, instant tab and preview swaps, zero-duration scrolling and a static chip illustration, and loses no information.

**The Deterministic Sky Rule.** Star fields are generated from a seeded PRNG so server and client paint the same sky, and only part of the field twinkles. A new starred surface passes a seed; it never uses `Math.random` at render.

## Do's and Don'ts

### Do:
- **Do** put every new section inside the 80rem container with 1.25rem/2rem gutters and 6rem/9rem vertical padding, opened by a hairline top rule.
- **Do** open a section with the badge marker, then the heading, then at most one supporting paragraph capped at `max-w-xl`.
- **Do** choose one of the two headline registers deliberately: expanded uppercase display for a moment, sentence-case 600 at -0.025em for an explanation.
- **Do** express accent presence as light: a gradient fill, a hairline sweep, a 10% tint, or the accent glow on response.
- **Do** carry state on the border first (hairline to 40–60% ember), the tint second, and the glow last.
- **Do** author new icons as 24x24 paths in the icon module at 1.5 stroke with round caps, and reference them by name from config.
- **Do** gate every new animation on `prefers-reduced-motion`, and gate anything that pins or reflows on the 768px/1024px queries already in use.
- **Do** give every new control a visible focus path: the global 2px ember-warm outline at 3px offset, or a mirrored `peer-focus-visible` outline when the real input is `sr-only`.
- **Do** set numbers in aligned rows `tabular-nums`.

### Don't:
- **Don't** introduce a second accent hue, a cool accent, or a tonal gray ramp. One ember, one night, one bone.
- **Don't** fill a large surface with the ember gradient; it belongs to controls, markers, hairlines and small discs.
- **Don't** thicken or brighten a divider past the 10% hairline; use a fading accent hairline when a boundary needs more weight.
- **Don't** put a shadow on a resting surface for decoration; black shadows exist only where planes actually overlap.
- **Don't** use a corner radius outside the established set (1rem fields, 1.25rem cards, 1.5–2rem panels, full pills).
- **Don't** add decorative geometry other than the diamond contour and hairlines.
- **Don't** re-time the lightning video in a new component; subscribe to the shared sky state.
- **Don't** ship an interaction whose only affordance is hover; the portfolio hover-to-select is paired with click and a pressed state for exactly that reason.
