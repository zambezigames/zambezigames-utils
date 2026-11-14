/** Axis-aligned collision primitives — no physics engine required for most games. */
export interface Vec2 { x: number; y: number }
export interface Rect { x: number; y: number; w: number; h: number }
export interface Circle { x: number; y: number; r: number }

export const pointInRect = (p: Vec2, r: Rect) =>
  p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

export const rectsOverlap = (a: Rect, b: Rect) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export const circlesOverlap = (a: Circle, b: Circle) => {
  const dx = a.x - b.x, dy = a.y - b.y, r = a.r + b.r;
  return dx * dx + dy * dy < r * r;
};

export const circleRect = (c: Circle, r: Rect) => {
  const cx = Math.max(r.x, Math.min(c.x, r.x + r.w));
  const cy = Math.max(r.y, Math.min(c.y, r.y + r.h));
  const dx = c.x - cx, dy = c.y - cy;
  return dx * dx + dy * dy < c.r * c.r;
};

/** Push a circle out of a rect — returns corrected position, or null if no overlap. */
export function resolveCircleRect(c: Circle, r: Rect): Vec2 | null {
  if (!circleRect(c, r)) return null;
  const cx = Math.max(r.x, Math.min(c.x, r.x + r.w));
  const cy = Math.max(r.y, Math.min(c.y, r.y + r.h));
  let dx = c.x - cx, dy = c.y - cy;
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return { x: c.x, y: r.y - c.r };
  return { x: cx + (dx / dist) * c.r, y: cy + (dy / dist) * c.r };
}
