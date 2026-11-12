import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../theme";

export const Scene3_Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Desktop window entrance with 3D tilt
  const windowEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const rotateX = interpolate(windowEntrance, [0, 1], [15, 0]);
  const rotateY = interpolate(windowEntrance, [0, 1], [-20, 0]);
  const windowScale = interpolate(windowEntrance, [0, 1], [0.8, 1]);
  const windowOpacity = interpolate(windowEntrance, [0, 1], [0, 1]);

  // Card 1 landing at frame 30 (absolute 210)
  const card1Entrance = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Card 2 landing at frame 90 (absolute 270)
  const card2Entrance = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Card 3 landing at frame 150 (absolute 330)
  const card3Entrance = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200,
        opacity: windowOpacity,
      }}
    >
      {/* Desktop App Window */}
      <div
        style={{
          width: 1400,
          height: 720,
          ...theme.glassCard,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: `scale(${windowScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${theme.colors.violetGlow}`,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: 60,
            borderBottom: `1px solid ${theme.colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 12,
            background: "rgba(255, 255, 255, 0.03)",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#EF4444" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F59E0B" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10B981" }} />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.sans,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            VoiceStudio Workspace v2.4
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 30,
            padding: 40,
            alignItems: "center",
          }}
        >
          {/* Card 1: Voice Clone */}
          <div
            style={{
              height: "100%",
              ...theme.glassCard,
              padding: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${interpolate(card1Entrance, [0, 1], [60, 0])}px) scale(${interpolate(card1Entrance, [0, 1], [0.9, 1])})`,
              opacity: interpolate(card1Entrance, [0, 1], [0, 1]),
              boxShadow: frame >= 30 && frame < 45 ? `0 0 40px ${theme.colors.cyan}` : theme.glassCard.boxShadow,
            }}
          >
            <div>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: "rgba(34, 211, 238, 0.15)",
                  border: `1px solid rgba(34, 211, 238, 0.3)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  marginBottom: 20,
                  boxShadow: `0 0 20px ${theme.colors.cyanGlow}`,
                }}
              >
                🎙️
              </div>
              <h3 style={{ margin: "0 0 10px 0", color: theme.colors.white, fontFamily: theme.fonts.hind, fontSize: 32, fontWeight: 700 }}>
                ভয়েস ক্লোন
              </h3>
              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: 16, lineHeight: 1.5 }}>
                Clone any voice instantly with crystal-clear neural synthesis.
              </p>
            </div>
            {/* Morphing waveform visual */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, height: 60, marginTop: 20 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const h = Math.abs(Math.sin(frame * 0.15 + i * 0.4)) * 40 + 10;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: h,
                      borderRadius: 3,
                      background: i % 2 === 0 ? theme.colors.cyan : theme.colors.primary,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Card 2: Video Dubbing */}
          <div
            style={{
              height: "100%",
              ...theme.glassCard,
              padding: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${interpolate(card2Entrance, [0, 1], [60, 0])}px) scale(${interpolate(card2Entrance, [0, 1], [0.9, 1])})`,
              opacity: interpolate(card2Entrance, [0, 1], [0, 1]),
              boxShadow: frame >= 90 && frame < 105 ? `0 0 40px ${theme.colors.primary}` : theme.glassCard.boxShadow,
            }}
          >
            <div>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: "rgba(124, 92, 255, 0.15)",
                  border: `1px solid rgba(124, 92, 255, 0.3)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  marginBottom: 20,
                  boxShadow: `0 0 20px ${theme.colors.violetGlow}`,
                }}
              >
                🎬
              </div>
              <h3 style={{ margin: "0 0 10px 0", color: theme.colors.white, fontFamily: theme.fonts.hind, fontSize: 32, fontWeight: 700 }}>
                ভিডিও ডাবিং
              </h3>
              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: 16, lineHeight: 1.5 }}>
                Auto-sync audio and translate video tracks across languages.
              </p>
            </div>
            {/* Timeline subtitle bars visual */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
              <div style={{ height: 16, borderRadius: 6, background: "rgba(34, 211, 238, 0.3)", width: "80%" }} />
              <div style={{ height: 16, borderRadius: 6, background: "rgba(124, 92, 255, 0.3)", width: "60%" }} />
            </div>
          </div>

          {/* Card 3: Audiobook */}
          <div
            style={{
              height: "100%",
              ...theme.glassCard,
              padding: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${interpolate(card3Entrance, [0, 1], [60, 0])}px) scale(${interpolate(card3Entrance, [0, 1], [0.9, 1])})`,
              opacity: interpolate(card3Entrance, [0, 1], [0, 1]),
              boxShadow: frame >= 150 && frame < 165 ? `0 0 40px ${theme.colors.cyan}` : theme.glassCard.boxShadow,
            }}
          >
            <div>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: "rgba(34, 211, 238, 0.15)",
                  border: `1px solid rgba(34, 211, 238, 0.3)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  marginBottom: 20,
                  boxShadow: `0 0 20px ${theme.colors.cyanGlow}`,
                }}
              >
                📚
              </div>
              <h3 style={{ margin: "0 0 10px 0", color: theme.colors.white, fontFamily: theme.fonts.hind, fontSize: 32, fontWeight: 700 }}>
                অডিওবুক
              </h3>
              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: 16, lineHeight: 1.5 }}>
                Convert entire books into natural expressive audiobooks effortlessly.
              </p>
            </div>
            {/* Book pages turning visual */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20 }}>
              <div style={{ fontSize: 32 }}>📖</div>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ width: 6, height: 24, borderRadius: 3, background: theme.colors.cyan }} />
                <div style={{ width: 6, height: 36, borderRadius: 3, background: theme.colors.primary }} />
                <div style={{ width: 6, height: 20, borderRadius: 3, background: theme.colors.cyan }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
