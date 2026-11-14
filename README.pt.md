# zambezigames-utils

[English](README.md) | **Português**

Utilitários TypeScript sem dependências para desenvolvimento de jogos.

| Ficheiro | Conteúdo |
|---|---|
| `rng.ts` | PRNG com semente (mulberry32), range/int/pick/shuffle, sorteios ponderados — replays determinísticos e geração procedural |
| `easing.ts` | Curvas de easing (quad/cubic/expo/back/bounce), `lerp`, `clamp`, `remap`, `approach` |
| `collision.ts` | Testes de sobreposição ponto/AABB/círculo e resolução de colisão círculo-retângulo |
| `loop.ts` | Loop de jogo com timestep fixo e interpolação de renderização |
| `grid.ts` | Vizinhos de grelha, distância de Manhattan, pathfinding A* em grelhas uniformes |
| `unity/Easing.cs` | Unity (C#) — a suite de easing/interpolação, direto em `Assets/Scripts/` |
| `unreal/ZambeziEasingLibrary.h/.cpp` | Unreal (C++) — a mesma suite como `UBlueprintFunctionLibrary`, utilizável em Blueprints |

## Licença

MIT — ver [LICENSE](LICENSE).
