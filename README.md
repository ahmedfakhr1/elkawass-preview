# Elkawass Group: site notes

Plain static site. `index.html` at the root, relative paths only, no build step. Serve the folder with any static host.
Cache version is `?v=1` on `fonts.css`, `css/style.css` and `js/site.js`: bump all three together on every deploy.

## Swap the temporary wordmark for the real group logo

The wordmark ELKAWASS GROUP is drawn once, as the `<symbol id="wordmark">` at the top of `index.html`.
The hero, the top bar and the footer only reference it with `<use href="#wordmark"/>`.

1. Replace the `<text>` inside the symbol with the logo artwork (paths or an inline SVG), and set the symbol's `viewBox` to the logo's own shape.
2. In `css/style.css` set `--wm-ratio` (in `:root`) to the logo's width / height, for example `4 / 1`.
3. If the logo is one colour, keep `fill="currentColor"` on its paths so it follows the page colour. Size is set by CSS (`.hero__name .wm`, `.bar__wm`, `.foot__wm`).

## Media slots

Every picture on the page is a slot with a fixed file name in `img/`. An empty slot shows a calm gradient panel with a small label (for example `IMAGE · SERVICE IN MOTION · 3000×1700`).
To fill one: save a WebP photograph under the same file name (220 KB or less is a good target, the sizes below are the ideal pixel sizes) and reload.
The label and the hairline disappear by themselves, nothing in the code changes. Until then the file is a one-pixel transparent placeholder.
If a new file has a different shape, keep the same orientation; the picture is cropped to the slot with `object-fit: cover`.
Add a short description for screen readers in the `alt` attribute of that `<img>` in `index.html` when the photograph arrives (the slots are decorative while empty).

| File | Where it shows | Orientation | Ideal size | Notes for the shoot |
|---|---|---|---|---|
| `hero.webp` | Hero, full screen behind the wordmark | Landscape 16:10 | 2880 x 1800 | A calm, dark-leaning frame with space in the middle for the wordmark. For a film see "Hero film" below |
| `service-in-motion.webp` | Full-bleed band under the statement | Landscape, wide (about 16:9) | 3000 x 1700 | Service in motion: the kitchen pass or a waiter mid-step. Subject in the middle half, the top and bottom edges melt into the page |
| `restaurant-charlies.webp` | Restaurant card, Charlie's | Portrait 5:6.7 | 1500 x 2010 | A night interior of Charlie's (stand-in today: the facade at night, a customer photo from Maps). The lower third fades into the navy card, keep it calm |
| `restaurant-tokyo.webp` | Restaurant card, Tokyo | Portrait 5:6.7 | 1500 x 2010 | A night interior of Tokyo (stand-in today: the long room). The lower third fades into the black card |
| `founder-portrait.webp` | Founder portrait | Vertical 4:5 | 1200 x 1500 | The founder, calm light, plain background |
| `detail-glassware.webp` | Details, left | Vertical 3:4 | 1200 x 1600 | Glassware on a set table |
| `detail-linen.webp` | Details, middle | Vertical 3:4 | 1200 x 1600 | Linen, napkin, table setting |
| `detail-hands.webp` | Details, right | Vertical 3:4 | 1200 x 1600 | Hands at work: pouring, plating, folding |
| `grain.png` | Fine grain over the whole page | Square tile | 256 x 256 | Leave as is |
| `og.jpg` | Share card | 1200 x 630 | 1200 x 630 | Not linked yet: once the live address is known add `<meta property="og:image" content="https://LIVE-ADDRESS/img/og.jpg">` |
| `icon.png`, `apple-touch-icon.png` | Browser and home-screen icons | Square | 64 and 180 | A temporary monogram; replace with the group mark |

The restaurant logos (`charlies-cream.svg`, `tokyo-gold.svg`) are the restaurants' own artwork.
Photographs for the two cards are graded to the page by `prep_images.py` (outside the site folder); proper photographs can simply replace the files.

## Hero film (optional)

The hero looks finished with no media: a deep ink field with slow soft light and fine grain. When a photograph is saved as `img/hero.webp`, the light dims behind it.
For a muted looping film instead of a photograph: save `img/hero.mp4` (and, if available, `img/hero.webm`), 1920 x 1080, under 4 MB, no sound needed, then add this line inside `<div class="hero__media">` in `index.html` (it is also written there as a comment):

    <video autoplay muted loop playsinline preload="metadata" poster="img/hero.webp"><source src="img/hero.webm" type="video/webm"><source src="img/hero.mp4" type="video/mp4"></video>

## Founder name and note

The two marked slots under the portrait ("Founder's name" and "A note from the founder") are placeholders. When the owner supplies them, replace the first with
`<h2 class="founder__name">Name</h2>` and the second with `<p class="founder__note">The note</p>` (both styles are ready in the CSS). Nothing about the founder is written yet, on purpose.
"Group email to come" in the contact section is the same kind of slot: replace the `<p class="tslot tslot--small">` with a mail link when the address exists.

## Arabic

The English page is complete. The `العربية` buttons (top bar, phone menu, footer) open a small pop-up saying Arabic is coming. The Arabic label uses a tiny self-hosted font file (`fonts/amiri-ar.woff2`) that contains only that one word. When Arabic goes live, add the full Arabic font set and a right-to-left page.

## Fonts

Bodoni Moda (display) and Manrope (text), self-hosted in `fonts/`, declared in `fonts.css` with `font-display: block`. The head preloads each file and holds the page for a moment so letters never flash in a fallback face.

## Links

The two restaurant cards and the footer links point to the restaurants' current sites and open in a new tab. Update them when the restaurants move to their own domains.
