import { describe, it, expect } from "vitest";
import {
  acceleration,
  circularOrbitVelocity,
  stepSimulation,
  specificOrbitalEnergy,
} from "../src/physics.js";

describe("acceleration", () => {
  it("points toward the planet and follows inverse-square falloff", () => {
    const near = acceleration(100, 0);
    const far = acceleration(200, 0);
    expect(near.ax).toBeLessThan(0);
    expect(Math.abs(near.ax)).toBeCloseTo(Math.abs(far.ax) * 4, 5);
  });

  it("is symmetric under rotation of the offset vector", () => {
    const a = acceleration(0, 150);
    const b = acceleration(150, 0);
    expect(Math.hypot(a.ax, a.ay)).toBeCloseTo(Math.hypot(b.ax, b.ay), 10);
  });
});

describe("circularOrbitVelocity", () => {
  it("decreases as orbital radius grows", () => {
    expect(circularOrbitVelocity(100)).toBeGreaterThan(circularOrbitVelocity(400));
  });
});

describe("stepSimulation", () => {
  it("conserves specific orbital energy over many steps of a circular orbit", () => {
    const r = 300;
    const v = circularOrbitVelocity(r);
    let state = { x: r, y: 0, vx: 0, vy: v };
    const startEnergy = specificOrbitalEnergy(state);

    const dt = 0.01;
    for (let i = 0; i < 2000; i++) {
      state = stepSimulation(state, dt);
    }

    const endEnergy = specificOrbitalEnergy(state);
    expect(Math.abs(endEnergy - startEnergy) / Math.abs(startEnergy)).toBeLessThan(0.02);
  });
});
