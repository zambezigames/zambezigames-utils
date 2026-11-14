/** Uniform-grid helpers — tile coords, neighbors, BFS flood and A* pathfinding. */
export interface Cell { x: number; y: number }
const key = (c: Cell) => `${c.x},${c.y}`;

export const manhattan = (a: Cell, b: Cell) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export function neighbors(c: Cell, diagonal = false): Cell[] {
  const out = [
    { x: c.x + 1, y: c.y }, { x: c.x - 1, y: c.y },
    { x: c.x, y: c.y + 1 }, { x: c.x, y: c.y - 1 },
  ];
  if (diagonal) out.push(
    { x: c.x + 1, y: c.y + 1 }, { x: c.x - 1, y: c.y + 1 },
    { x: c.x + 1, y: c.y - 1 }, { x: c.x - 1, y: c.y - 1 },
  );
  return out;
}

/** A* over a uniform grid; `passable` decides walkable cells. Returns path or null. */
export function findPath(
  start: Cell, goal: Cell, passable: (c: Cell) => boolean, maxVisits = 10000,
): Cell[] | null {
  const open: (Cell & { f: number })[] = [{ ...start, f: 0 }];
  const g = new Map<string, number>([[key(start), 0]]);
  const came = new Map<string, Cell>();
  const closed = new Set<string>();
  let visits = 0;

  while (open.length) {
    let bi = 0;
    for (let i = 1; i < open.length; i++) if (open[i].f < open[bi].f) bi = i;
    const cur = open.splice(bi, 1)[0];
    if (++visits > maxVisits) return null;
    if (cur.x === goal.x && cur.y === goal.y) {
      const path: Cell[] = [{ x: cur.x, y: cur.y }];
      let k = key(cur);
      while (came.has(k)) { const p = came.get(k)!; path.unshift(p); k = key(p); }
      return path;
    }
    closed.add(key(cur));
    const curG = g.get(key(cur))!;
    for (const n of neighbors(cur)) {
      if (!passable(n) || closed.has(key(n))) continue;
      const ng = curG + 1;
      if (ng < (g.get(key(n)) ?? Infinity)) {
        g.set(key(n), ng);
        came.set(key(n), { x: cur.x, y: cur.y });
        open.push({ ...n, f: ng + manhattan(n, goal) });
      }
    }
  }
  return null;
}
