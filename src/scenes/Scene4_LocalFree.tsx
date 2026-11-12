import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

export const Scene4_LocalFree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // CPU badge pop (frame 20)
  const cpuSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Cloud crossed out (frame 40-60)
  const cloudOpacity = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 100% Local shield pop (frame 70)
  const shieldSpring = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // AGPL badge scale (frame 90)
  const agplSpring = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        opacity: interpolate(entrance, [0, 1], [0, 1]),
      }}
    >
      {/* Top Badges Row */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {/* CPU Badge */}
        <div
          style={{
            ...theme.glassCard,
            padding: "16px 32px",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 14,
            transform: `scale(${interpolate(cpuSpring, [0, 1], [0.5, 1])})`,
            opacity: interpolate(cpuSpring, [0, 1], [0, 1]),
            boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 30px ${theme.colors.cyanGlow}`,
          }}
        >
          <span style={{ fontSize: 28 }}>⚡</span>
          <span style={{ fontFamily: theme.fonts.hind, fontSize: 28, fontWeight: 700, color: theme.colors.white }}>
            CPU-তেই চলে
          </span>
        </div>

        {/* GPU Optional Badge */}
        <div
          style={{
            ...theme.glassCard,
            padding: "16px 28px",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            transform: `scale(${interpolate(cpuSpring, [0, 1], [0.5, 1])})`,
            opacity: interpolate(cpuSpring, [0, 1], [0, 1]) * 0.7,
            border: `1px solid rgba(255, 255, 255, 0.08)`,
          }}
        >
          <span style={{ fontSize: 24 }}>🎮</span>
          <span style={{ fontFamily: theme.fonts.sans, fontSize: 22, fontWeight: 600, color: theme.colors.textMuted }}>
            GPU Optional
          </span>
        </div>
      </div>

      {/* Center Row: Cloud Crossed Out vs 100% Local Shield */}
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* Cloud with dollar crossed out */}
        <div
          style={{
            position: "relative",
            width: 180,
            height: 180,
            ...theme.glassCard,
            borderRadius: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: cloudOpacity,
            border: "1px solid rgba(239, 68, 68, 0.3)",
          }}
        >
          <span style={{ fontSize: 64 }}>☁️💵</span>
          <div
            style={{
              position: "absolute",
              width: "80%",
              height: 4,
              backgroundColor: "#EF4444",
              transform: "rotate(-45deg)",
              boxShadow: "0 0 10px #EF4444",
            }}
          />
        </div>

        {/* VS Arrow */}
        <div style={{ fontSize: 40, color: theme.colors.textMuted, opacity: 0.5 }}>➡️</div>

        {/* Lock + Shield 100% Local */}
        <div
          style={{
            width: 220,
            height: 180,
            ...theme.glassCard,
            borderRadius: 35,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            transform: `scale(${interpolate(shieldSpring, [0, 1], [0.5, 1])})`,
            opacity: interpolate(shieldSpring, [0, 1], [0, 1]),
            boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${theme.colors.violetGlow}`,
          }}
        >
          <span style={{ fontSize: 52 }}>🔒🛡️</span>
          <span style={{ fontFamily: theme.fonts.hind, fontSize: 24, fontWeight: 700, color: theme.colors.white }}>
            ১০০% লোকাল
          </span>
        </div>
      </div>

      {/* Bottom AGPL Badge */}
      <div
        style={{
          ...theme.glassCard,
          padding: "12px 30px",
          borderRadius: 16,
          transform: `scale(${interpolate(agplSpring, [0, 1], [0.5, 1])})`,
          opacity: interpolate(agplSpring, [0, 1], [0, 1]),
          boxShadow: `0 10px 30px rgba(0,0,0,0.4), 0 0 25px ${theme.colors.cyanGlow}`,
        }}
      >
        <span style={{ fontFamily: theme.fonts.sans, fontSize: 20, fontWeight: 700, color: theme.colors.cyan, letterSpacing: "1px" }}>
          AGPL-3.0 Open Source
        </span>
      </div>
    </div>
  );
};
