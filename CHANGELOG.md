# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Drag-to-launch (mouse and touch) from a standoff launch pad above the planet, with a live
  drag indicator and a numerically-integrated flight rendered as a real-time trajectory trace.
- Outcome resolution for all three physical outcomes — crash (debris burst, screen shake,
  danger flash), orbit (glow-pulse ring after 2 held orbital periods, "ORBIT LOCKED" HUD), and
  escape ("ESCAPED") — each with a themed overlay showing the run's stats and a "Launch
  Another" CTA.
- Live HUD: velocity, altitude, apoapsis/periapsis, orbital period, and a lifetime orbit count
  persisted in `localStorage`.
- Synthesized WebAudio SFX (drag-charge, launch, crash, orbit-lock, UI-click) behind a mute
  toggle that persists across reloads.
- Adjustable gravity (GM) slider, locked during flight so it can't rewrite a trajectory in
  progress.
- Reduced-motion support (suppresses shake/particles, keeps physics/HUD running) and themed
  hover/focus-visible/active/disabled states across all controls.
- `docs/ARCHITECTURE.md` module map and state-machine reference.
- Project scaffold: static HTML/CSS/JS app with a Vitest-tested two-body gravity engine
  (`src/physics.js`) and a physics-backed placeholder canvas render.
- `docs/VISION.md`, `docs/BACKLOG.md`, and `docs/DESIGN.md` planning docs.
- GitHub Actions CI running the test suite on every push and pull request.
