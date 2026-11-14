// ZambeziGames — easing curves exposed to C++ and Blueprint.
// Drop into your module's Public/ + Private/ and recompile.
#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "ZambeziEasingLibrary.generated.h"

UCLASS()
class UZambeziEasingLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()

public:
	/** Map a value from one range to another. */
	UFUNCTION(BlueprintPure, Category = "Zambezi|Easing")
	static float Remap(float Value, float InMin, float InMax, float OutMin, float OutMax);

	/** Quadratic ease in/out — the default curve for UI and camera moves. */
	UFUNCTION(BlueprintPure, Category = "Zambezi|Easing")
	static float EaseInOutQuad(float Alpha) { return Alpha < 0.5f ? 2.f * Alpha * Alpha : -1.f + (4.f - 2.f * Alpha) * Alpha; }

	/** Overshoot-then-settle — button presses, pickups, menu pops. */
	UFUNCTION(BlueprintPure, Category = "Zambezi|Easing")
	static float EaseOutBack(float Alpha) { return 1.f + 2.70158f * FMath::Cube(Alpha - 1.f) + 1.70158f * FMath::Square(Alpha - 1.f); }

	/** Bounce settle — landing impacts, balls, heavy arrivals. */
	UFUNCTION(BlueprintPure, Category = "Zambezi|Easing")
	static float EaseOutBounce(float Alpha);

	/** Ease Alpha and interpolate between A and B in one call. */
	UFUNCTION(BlueprintPure, Category = "Zambezi|Easing")
	static float EaseInterp(float A, float B, float Alpha) { return A + (B - A) * EaseInOutQuad(FMath::Clamp(Alpha, 0.f, 1.f)); }
};
