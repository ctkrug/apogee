// Scaled world units, not SI: GM below is the gravitational strength the
// simulation actually integrates with, chosen so the numbers stay friendly
// for a canvas at typical screen sizes rather than modeling real meters/kg.
export const DEFAULT_GM = 4000;

export function acceleration(x, y, gm = DEFAULT_GM) {
  const r2 = x * x + y * y;
  const r = Math.sqrt(r2);
  const factor = -gm / (r2 * r);
  return { ax: factor * x, ay: factor * y };
}
