# Vision — Escape Velocity

## The problem

Gravity toys on the web are usually one of two things: a canned animation that just plays a
loop, or a full N-body sandbox you have to learn (add bodies, tune masses, understand the UI)
before anything satisfying happens. Neither delivers a single, immediate, physically real
moment. There's no "drag, release, watch real physics resolve" experience that works in five
seconds with zero explanation.

## Who it's for

Anyone who lands on the page cold — a portfolio visitor, someone bored for thirty seconds, a
space/physics-curious tinkerer. No prior knowledge of orbital mechanics required; the three
possible outcomes (crash, orbit, escape) teach the intuition by watching, not reading.

## The core idea

One tiny planet. One satellite. One interaction: click-drag from the planet, release. The
satellite's post-release trajectory is governed by real inverse-square gravity, numerically
integrated frame by frame — not a scripted or pre-baked animation. Where the drag vector lands
the initial velocity determines one of three real outcomes:

- **crash** — insufficient velocity; the trajectory arcs back into the planet in a debris burst.
- **orbit** — velocity in the stable range; it snaps into a closed elliptical loop that keeps
  going, rendered with a persistent glowing trace.
- **escape** — velocity exceeds the local escape velocity; the satellite breaks free on a
  hyperbolic trajectory and flies off-screen. This ties directly to the project's name and is
  the "bonus" outcome worth making feel special.

## Key design decisions

- **Semi-implicit (symplectic) Euler integration**, not naive explicit Euler — it keeps orbital
  energy bounded over long-running loops instead of drifting, so a "stable" orbit actually stays
  stable for as long as someone watches it.
- **Scaled world units**, not SI meters/kg — the planet's GM is tuned so trajectories read well
  on a canvas at typical screen sizes, not for real-world accuracy.
- **Outcome classification via specific orbital energy and periapsis** (see `src/physics.js`),
  not distance thresholds alone — this is what makes "orbit" mean something physically real
  (a bound ellipse whose periapsis clears the planet) rather than an arbitrary heuristic.
- **Single planet, single satellite** for v1. No multi-body chaos, no camera pan/zoom, no level
  progression — the wow moment is the whole point, and scope stays narrow so it ships polished.
- **Static, self-contained site** — no server, no build step, no framework. Ships as
  `index.html` + `src/` + `styles/`, deployable to a static subpath
  (`apps.charliekrug.com/escape-velocity`) with relative asset paths throughout.

## What "v1 done" looks like

- Drag-to-launch works with mouse and touch, producing a live-integrated trajectory.
- All three outcomes (crash, orbit, escape) are reachable, physically correct, and each has its
  own distinct visual and audio feedback per `docs/DESIGN.md`.
- A HUD shows live velocity/altitude/orbital readouts during flight.
- The page matches the blueprint/technical direction in `docs/DESIGN.md`: fonts, tokens, motion,
  and the signature detail are all implemented, not just planned.
- Fully responsive at 390px/768px/1440px, keyboard-accessible, and honors
  `prefers-reduced-motion`.
- `npm test` is green in CI on every push; the physics engine has unit coverage for the
  integrator and the outcome classifier.
