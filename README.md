# zambezigames-utils

**English** | [Português](README.pt.md)

Dependency-free TypeScript utilities for game development.

| File | Contents |
|---|---|
| `rng.ts` | Seeded PRNG (mulberry32), range/int/pick/shuffle, weighted rolls — deterministic replays and procedural generation |
| `easing.ts` | Easing curves (quad/cubic/expo/back/bounce), `lerp`, `clamp`, `remap`, `approach` |
| `collision.ts` | Point/AABB/circle overlap tests and circle-vs-rect pushout resolution |
| `loop.ts` | Fixed-timestep game loop with render interpolation (Gaffer-style) |
| `grid.ts` | Tile neighbors, Manhattan distance, A* pathfinding over uniform grids |
| `soaring.ts` | Soaring flight model — drifting lifecycle thermals, wing polar curve (sink/stall/best-glide), wind shear |
| `unity/Easing.cs` | Unity (C#) — the easing/interpolation suite, drop into `Assets/Scripts/` |
| `unreal/ZambeziEasingLibrary.h/.cpp` | Unreal (C++) — same suite as a `UBlueprintFunctionLibrary`, callable from Blueprint graphs |

## License

MIT — see [LICENSE](LICENSE).
