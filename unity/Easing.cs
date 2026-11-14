// ZambeziGames — easing curves and scalar interpolation for Unity.
// Drop this file into Assets/Scripts/. No dependencies, no packages.
using UnityEngine;

namespace ZambeziGames
{
    public static class Easing
    {
        public static float Clamp01(float t) => Mathf.Clamp01(t);
        public static float Lerp(float a, float b, float t) => Mathf.LerpUnclamped(a, b, t);
        public static float Remap(float v, float inMin, float inMax, float outMin, float outMax)
            => Mathf.LerpUnclamped(outMin, outMax, Mathf.InverseLerp(inMin, inMax, v));

        public static float Linear(float t) => t;
        public static float InQuad(float t) => t * t;
        public static float OutQuad(float t) => t * (2f - t);
        public static float InOutQuad(float t) => t < 0.5f ? 2f * t * t : -1f + (4f - 2f * t) * t;
        public static float InCubic(float t) => t * t * t;
        public static float OutCubic(float t) => (--t) * t * t + 1f;
        public static float OutExpo(float t) => Mathf.Approximately(t, 1f) ? 1f : 1f - Mathf.Pow(2f, -10f * t);
        public static float OutBack(float t)
            => 1f + 2.70158f * Mathf.Pow(t - 1f, 3f) + 1.70158f * Mathf.Pow(t - 1f, 2f);
        public static float OutBounce(float t)
        {
            const float n = 7.5625f, d = 2.75f;
            if (t < 1f / d) return n * t * t;
            if (t < 2f / d) return n * (t -= 1.5f / d) * t + 0.75f;
            if (t < 2.5f / d) return n * (t -= 2.25f / d) * t + 0.9375f;
            return n * (t -= 2.625f / d) * t + 0.984375f;
        }

        /// <summary>Move toward target by step — call with step * Time.deltaTime.</summary>
        public static float Approach(float current, float target, float step)
            => current < target ? Mathf.Min(current + step, target) : Mathf.Max(current - step, target);
    }
}
