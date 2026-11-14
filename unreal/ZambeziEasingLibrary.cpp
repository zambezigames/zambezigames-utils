#include "ZambeziEasingLibrary.h"

float UZambeziEasingLibrary::Remap(float Value, float InMin, float InMax, float OutMin, float OutMax)
{
	const float T = FMath::Clamp((Value - InMin) / (InMax - InMin), 0.f, 1.f);
	return FMath::Lerp(OutMin, OutMax, T);
}

float UZambeziEasingLibrary::EaseOutBounce(float Alpha)
{
	const float N = 7.5625f, D = 2.75f;
	if (Alpha < 1.f / D) return N * Alpha * Alpha;
	if (Alpha < 2.f / D) { Alpha -= 1.5f / D;  return N * Alpha * Alpha + 0.75f; }
	if (Alpha < 2.5f / D) { Alpha -= 2.25f / D; return N * Alpha * Alpha + 0.9375f; }
	Alpha -= 2.625f / D; return N * Alpha * Alpha + 0.984375f;
}
