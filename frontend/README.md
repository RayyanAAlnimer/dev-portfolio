# Portfolio v2.0 — React frontend

The original portfolio has been migrated into this Vite app. It keeps the
responsive layout, animated ASCII chip, scroll reveals,
mobile menu, project downloads, skill icons, and visitor counter.

## Run locally

```sh
cd frontend
npm ci
npm run dev
```

## Editing the page

- `src/App.jsx` assembles the page sections in order.
- `src/components/` contains Navigation, Hero, About, Experience, Projects,
  Skills, and Contact. Edit these for section-specific markup.
- `src/data/portfolio.js` contains the experience, projects, skill groups, and
  certifications. Add an entry to an array to add another item to the page.
- `Section` provides the shared section heading and container. `Reveal` handles
  scroll animation. Project cards, timeline entries, and skill groups are small
  components alongside the sections that use them.
- `src/styles.css` defines the NieR:Automata-inspired theme, responsive layouts,
  and interaction states. Change the variables at the top to adjust its palette.
- `InterfaceBorder` adds reusable decorative trim to the hero and footer.
- `src/lib/chipAnimation.js` draws the original ASCII artwork. `HeroChip` starts
  it when mounted and cleans up observers, listeners, and animation frames.
- `public/resources/` contains local copies of the favicon, reports, and presentation.
  These files are ignored by Git. Restore them from your own copies when
  setting up this app locally; CI preserves the existing S3 `resources/` files.
- `index.html` loads the fonts and icon stylesheet.

`VisitorCount` uses the existing API and shares one request per page load so
React Strict Mode does not increment the counter twice. It displays a dash if
the request fails. Fonts and icons still require internet access, as before.

## Build

```sh
npm run build
npm run preview
```

The build creates `dist/`. GitHub Actions runs `npm ci` and `npm run build`,
saves the build as an artifact, and deploys it to S3 after all checks pass.
Frontend deployment excludes `resources/*` to preserve separately uploaded documents.

## Visual direction

The React version uses a warm beige and charcoal menu aesthetic inspired by
NieR:Automata and [levise’s CodePen](https://codepen.io/levise/pen/vMzEwr).
The CSS is implemented locally, with no dependency on the Pen or game assets.
It includes fine screen texture, geometric borders, square markers, title bars,
and animated hover fills. Keyboard focus and reduced-motion preferences remain
supported. Interface sounds start muted. The navigation's Sound button enables a short
confirmation effect for button and link clicks, including keyboard activation.
Muting stops playback immediately. No hover sounds or background music play.

## Audio

`src/hooks/useInterfaceSound.js` handles clicks in one place and plays at 35%
volume. `SoundToggle` exposes the setting in the navigation. Replace
`src/assets/audio/ui-confirm.wav` to change the effect; Vite bundles it locally.

The sound is `deck_ui_default_activation.wav` from the community
[NieR Perfect YoRHa OS Sound FX pack](https://github.com/WhoTheFlower/Steam-Deck-UI-Components),
maintained by WhoDaDev / WhoTheFlower, at commit
`ba6b6955732369c08ca2c097a6ffb7a98fdf5075`. The source attributes NieR: Automata
sound effects to Square Enix. This is a community-sourced game effect, not an
officially licensed website audio pack. Attribution does not grant reuse rights.
