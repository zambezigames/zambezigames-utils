/** Fixed-timestep game loop — deterministic simulation, render interpolation. */
export interface LoopCallbacks {
  update: (dt: number) => void;
  render: (alpha: number) => void;
}

export function createLoop(
  { update, render }: LoopCallbacks,
  opts: { step?: number; maxFrame?: number; now?: () => number } = {},
): { start: () => void; stop: () => void } {
  const step = opts.step ?? 1 / 60;
  const maxFrame = opts.maxFrame ?? 0.25;
  const now = opts.now ?? (() => performance.now() / 1000);
  let running = false, last = 0, acc = 0, raf = 0;

  const frame = () => {
    if (!running) return;
    const t = now();
    acc += Math.min(t - last, maxFrame);
    last = t;
    while (acc >= step) { update(step); acc -= step; }
    render(acc / step);
    raf = requestAnimationFrame(frame);
  };

  return {
    start() { if (!running) { running = true; last = now(); raf = requestAnimationFrame(frame); } },
    stop() { running = false; cancelAnimationFrame(raf); },
  };
}
