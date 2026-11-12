import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, random } from "remotion";
import { theme } from "../theme";

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]) * interpolate(frame, [0, 90], [1, 1.08]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Crack line progress (frame 40 to 60)
  const crackProgress = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Split and dissolve after frame 65
  const isSplit = frame > 65;
  const splitProgress = isSplit
    ? interpolate(frame, [65, 85], [0, 1], { extrapolateRight: "clamp" })
    : 0;

  // Dissolve particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      angle: random(`hook-p-${i}`) * Math.PI * 2,
      speed: random(`hook-spd-${i}`) * 150 + 50,
      size: random(`hook-size-${i}`) * 6 + 3,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale})`,
        opacity: isSplit ? interpolate(frame, [65, 90], [1, 0], { extrapolateRight: "clamp" }) : opacity,
      }}
    >
      {/* Glowing Subscription Card */}
      <div
        style={{
          position: "relative",
          width: 520,
          height: 320,
          ...theme.glassCard,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 40,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${theme.colors.violetGlow}`,
          overflow: "hidden",
          transform: isSplit
            ? `perspective(1000px) rotateY(${splitProgress * 25}deg) translateX(${splitProgress * 150}px)`
            : "none",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Card Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 28,
                color: "#EF4444",
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
              }}
            >
              $
            </div>
            <div>
              <div style={{ color: theme.colors.textMuted, fontSize: 16, fontWeight: 600 }}>MONTHLY BILL</div>
              <div style={{ color: theme.colors.white, fontSize: 24, fontWeight: 700 }}>AI Voice Subscription</div>
            </div>
          </div>
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              color: "#EF4444",
              padding: "6px 14px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            RECURRING
          </div>
        </div>

        {/* Card Body */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ color: theme.colors.textMuted, fontSize: 14 }}>Monthly Cost</div>
            <div style={{ color: "#EF4444", fontSize: 44, fontWeight: 700, letterSpacing: "-1px" }}>
              $49.00 <span style={{ fontSize: 18, color: theme.colors.textMuted }}>/mo</span>
            </div>
          </div>
          <div style={{ fontSize: 36, color: theme.colors.textMuted }}>🔄</div>
        </div>

        {/* Crack Line SVG */}
        {crackProgress > 0 && (
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <path
              d={`M 100 0 L 150 100 L 120 180 L 220 320`}
              fill="none"
              stroke="#22D3EE"
              strokeWidth="4"
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - crackProgress)}
              style={{ filter: "drop-shadow(0 0 8px #22D3EE)" }}
            />
          </svg>
        )}
      </div>

      {/* Explosion Particles on Split */}
      {isSplit &&
        particles.map((p, i) => {
          const dist = splitProgress * p.speed;
          const x = Math.cos(p.angle) * dist;
          const y = Math.sin(p.angle) * dist;
          const pOpacity = 1 - splitProgress;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: i % 2 === 0 ? theme.colors.cyan : theme.colors.primary,
                transform: `translate(${x}px, ${y}px)`,
                opacity: pOpacity,
                boxShadow: `0 0 10px ${i % 2 === 0 ? theme.colors.cyan : theme.colors.primary}`,
              }}
            />
          );
        })}
    </div>
  );
};
