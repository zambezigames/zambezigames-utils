/** Soaring model — thermals, wing polar, wind.
 *  Adaptable to any unpowered flight: gliders, kites, birds — tune presets per craft.
 *  Convention: y = altitude (three.js-style). Speeds in m/s. */
export interface Vec3 { x: number; y: number; z: number }

// ---------- Thermals ----------

export interface Thermal {
  pos: Vec3;          // core position
  radius: number;     // effective radius m
  strength: number;   // peak lift m/s at core
  age: number;        // seconds since spawn
  life: number;       // total lifecycle seconds
}

export function createThermal(
  pos: Vec3, strength = 4, radius = 150, life = 600,
): Thermal {
  return { pos, strength, radius, life, age: 0 };
}

/** Lifecycle: ramps up over first 20%, decays over last 30%. Mutates + returns t. */
export function tickThermal(t: Thermal, wind: Vec3, dt: number): Thermal {
  t.age += dt;
  t.pos.x += wind.x * dt;
  t.pos.z += wind.z * dt;
  return t;
}

const lifecycleFactor = (t: Thermal) => {
  const f = t.age / t.life;
  if (f >= 1) return 0;
  const grow = Math.min(1, f / 0.2);
  const fade = f > 0.7 ? 1 - (f - 0.7) / 0.3 : 1;
  return grow * fade;
};

export const thermalAlive = (t: Thermal) => t.age < t.life;

/** Net vertical air movement at a point — gaussian lift cores, slight ambient sink. */
export function liftAt(p: Vec3, thermals: readonly Thermal[], ambientSink = 0.3): number {
  let lift = -ambientSink;
  for (const t of thermals) {
    const f = lifecycleFactor(t);
    if (f === 0) continue;
    const dx = p.x - t.pos.x, dz = p.z - t.pos.z;
    const r2 = dx * dx + dz * dz;
    if (r2 > (t.radius * 2.5) ** 2) continue;
    // cylindrical thermal: lift strongest at core, zero above cloudbase (~2000m model)
    const altFade = Math.max(0, 1 - p.y / 2000);
    lift += t.strength * f * Math.exp(-r2 / (t.radius * t.radius)) * altFade;
  }
  return lift;
}

// ---------- Wing polar ----------
// Sink rate vs airspeed fitted as a parabola through min-sink, trim, and stall points.

export interface PolarSpec {
  stallSpeed: number;   // below this the wing stalls, sink blows up
  minSinkSpeed: number; // airspeed of lowest sink
  minSink: number;      // sink rate at minSinkSpeed (positive = descending)
  trimSpeed: number;    // hands-up cruise speed
  trimSink: number;     // sink rate at trim speed
}

export interface Polar {
  sinkAt: (airspeed: number) => number;
  glideRatio: (airspeed: number) => number;
  bestGlideSpeed: number;
  stallSpeed: number;
}

export function createPolar(s: PolarSpec): Polar {
  // s(v) = a*v² + b*v + c through (minSinkSpeed, minSink), (trimSpeed, trimSink);
  // vertex sits at minSinkSpeed → b = -2*a*minSinkSpeed.
  const dv = s.trimSpeed - s.minSinkSpeed;
  const a = (s.trimSink - s.minSink) / (dv * dv);
  const b = -2 * a * s.minSinkSpeed;
  const c = s.minSink - a * s.minSinkSpeed * s.minSinkSpeed - b * s.minSinkSpeed;
  const stallPenalty = 8; // sink multiplier blow-up below stall

  const sinkAt = (v: number) => {
    const base = a * v * v + b * v + c;
    if (v >= s.stallSpeed) return base;
    const under = s.stallSpeed - v;
    return base + stallPenalty * under * under;
  };
  return {
    sinkAt,
    glideRatio: (v: number) => v / sinkAt(v),
    bestGlideSpeed: Math.sqrt(c / a), // tangent from origin: v² = c/a
    stallSpeed: s.stallSpeed,
  };
}

/** A mid-range EN-A/B wing — sane defaults for arcade soaring. */
export const clubWing = () =>
  createPolar({ stallSpeed: 6, minSinkSpeed: 8, minSink: 1.1, trimSpeed: 10.5, trimSink: 1.3 });

// ---------- Wind ----------

/** Wind with shear — speed grows with altitude: w(y) = base * (1 + gradient*y/1000). */
export const windAt = (base: Vec3, altitude: number, gradient = 0.5): Vec3 => {
  const k = 1 + (gradient * Math.max(0, altitude)) / 1000;
  return { x: base.x * k, y: 0, z: base.z * k };
};

/** Ground track = air velocity + wind. For HUD/physics integration. */
export const groundVelocity = (air: Vec3, wind: Vec3): Vec3 => ({
  x: air.x + wind.x, y: air.y, z: air.z + wind.z,
});
