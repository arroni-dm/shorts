import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

export const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]) * interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing effect for CTA button
  const pulseScale = 1 + Math.sin(frame * 0.15) * 0.03;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 36,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Glowing Logo Badge */}
      <div
        style={{
          width: 140,
          height: 140,
          ...theme.glassCard,
          borderRadius: 35,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 64,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 60px ${theme.colors.cyanGlow}`,
        }}
      >
        🎙️
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            margin: "0 0 12px 0",
            fontFamily: theme.fonts.hind,
            fontWeight: 700,
            fontSize: 64,
            color: theme.colors.white,
            textShadow: `0 0 30px ${theme.colors.violetGlow}`,
          }}
        >
          VoiceStudio
        </h1>
        <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: 24, fontWeight: 600 }}>
          সাবস্ক্রিপশনকে বিদায় বলুন। আজই ডাউনলোড করুন।
        </p>
      </div>

      {/* GitHub Button */}
      <div
        style={{
          ...theme.glassCard,
          padding: "20px 48px",
          borderRadius: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "linear-gradient(135deg, rgba(124, 92, 255, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)",
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          transform: `scale(${pulseScale})`,
          boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${theme.colors.violetGlow}`,
        }}
      >
        <span style={{ fontSize: 32 }}>🐱</span>
        <span style={{ fontFamily: theme.fonts.hind, fontSize: 32, fontWeight: 700, color: theme.colors.white, letterSpacing: "0.5px" }}>
          GitHub-এ পাবেন
        </span>
      </div>
    </div>
  );
};
