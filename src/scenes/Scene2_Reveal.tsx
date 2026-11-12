import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

export const Scene2_Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for logo container
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Wordmark fade + slide up
  const textEntrance = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Light sweep position (frame 30 to 60 relative)
  const sweepProgress = interpolate(frame, [30, 60], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 9 waveform bars
  const bars = Array.from({ length: 9 });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        opacity,
      }}
    >
      {/* Logo Card */}
      <div
        style={{
          position: "relative",
          width: 180,
          height: 180,
          ...theme.glassCard,
          borderRadius: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
          boxShadow: `0 25px 60px rgba(0,0,0,0.5), 0 0 50px ${theme.colors.cyanGlow}`,
          overflow: "hidden",
        }}
      >
        {/* Microphone icon and waveform bars */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 2 }}>
          {bars.map((_, i) => {
            const heightFactor = Math.sin(frame * 0.2 + i * 0.5) * 0.5 + 0.5;
            const barHeight = heightFactor * 50 + 15;
            return (
              <div
                key={i}
                style={{
                  width: 6,
                  height: barHeight,
                  borderRadius: 3,
                  background: i % 2 === 0 ? theme.colors.cyan : theme.colors.primary,
                  boxShadow: `0 0 10px ${i % 2 === 0 ? theme.colors.cyan : theme.colors.primary}`,
                }}
              />
            );
          })}
        </div>

        {/* Light sweep overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sweepProgress}%`,
            width: "50%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            transform: "skewX(-20deg)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      </div>

      {/* Wordmark */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${interpolate(textEntrance, [0, 1], [20, 0])}px)`,
          opacity: interpolate(textEntrance, [0, 1], [0, 1]),
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: theme.fonts.hind,
            fontWeight: 700,
            fontSize: 72,
            color: theme.colors.white,
            letterSpacing: "-1px",
            textShadow: `0 0 30px ${theme.colors.cyanGlow}`,
          }}
        >
          VoiceStudio
        </h1>
        <div
          style={{
            color: theme.colors.cyan,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Open Source AI Audio Suite
        </div>
      </div>
    </div>
  );
};
