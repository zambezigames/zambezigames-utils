/** Easing curves and scalar interpolation. All easings map t∈[0,1] → [0,1]. */
export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const remap = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  lerp(outMin, outMax, clamp((v - inMin) / (inMax - inMin)));

export const linear = (t: number) => t;
export const easeInQuad = (t: number) => t * t;
export const easeOutQuad = (t: number) => t * (2 - t);
export const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => --t * t * t + 1;
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));
export const easeOutBack = (t: number) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
export const easeOutBounce = (t: number) => {
  const n = 7.5625, d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
  if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
  return n * (t -= 2.625 / d) * t + 0.984375;
};

/** Move toward target with max delta — frame-rate independent when fed dt-scaled step. */
export const approach = (current: number, target: number, step: number) =>
  current < target ? Math.min(current + step, target) : Math.max(current - step, target);
