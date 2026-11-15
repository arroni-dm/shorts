import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const GoogleAdsShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene timing thresholds (300 frames total = 10 seconds at 30fps)
  // Scene 1: 0 - 90 frames (0 - 3s) -> Hook
  // Scene 2: 90 - 210 frames (3 - 7s) -> Strategy / 3 Steps
  // Scene 3: 210 - 300 frames (7 - 10s) -> CTA

  // Scene 1 animations
  const s1Progress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });
  const s1Opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s1Scale = interpolate(s1Progress, [0, 1], [0.8, 1]);

  // Scene 2 animations
  const s2Frame = frame - 90;
  const s2Progress = spring({
    frame: s2Frame,
    fps,
    config: { damping: 14 },
  });
  const s2Opacity = interpolate(frame, [90, 105, 195, 210], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 animations
  const s3Frame = frame - 210;
  const s3Progress = spring({
    frame: s3Frame,
    fps,
    config: { damping: 12 },
  });
  const s3Opacity = interpolate(frame, [210, 225, 300], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Scale = interpolate(s3Progress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0C",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: "#FFFFFF",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}
    >
      {/* Background ambient glow matching Google's vibrant palette */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(66, 133, 244, 0.25) 0%, rgba(10, 10, 12, 0) 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52, 168, 83, 0.2) 0%, rgba(10, 10, 12, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top Brand Header */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: 0.9,
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "20px",
            boxShadow: "0 4px 12px rgba(66, 133, 244, 0.4)",
          }}
        >
          G
        </div>
        <span style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
          Google Ads Masterclass
        </span>
      </div>

      {/* ================= SCENE 1: HOOK (0 - 3s) ================= */}
      {frame >= 0 && frame < 90 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: s1Opacity,
            transform: `scale(${s1Scale})`,
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(234, 67, 53, 0.15)",
              border: "1px solid rgba(234, 67, 53, 0.4)",
              color: "#EA4335",
              padding: "10px 24px",
              borderRadius: "30px",
              fontSize: "22px",
              fontWeight: 700,
              marginBottom: "30px",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            ⚠️ Stop Wasting Budget
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: "0 0 30px 0",
              letterSpacing: "-1.5px",
              background: "linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Are Your Google Ads Getting Clicks... <br />
            <span style={{ color: "#EA4335", WebkitTextFillColor: "#EA4335" }}>
              But Zero Sales?
            </span>
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#94A3B8",
              maxWidth: "800px",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Most advertisers make this 1 critical mistake that destroys ROAS.
          </p>
        </div>
      )}

      {/* ================= SCENE 2: STRATEGY (3 - 7s) ================= */}
      {frame >= 90 && frame < 210 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: s2Opacity,
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(66, 133, 244, 0.15)",
              border: "1px solid rgba(66, 133, 244, 0.4)",
              color: "#4285F4",
              padding: "10px 24px",
              borderRadius: "30px",
              fontSize: "22px",
              fontWeight: 700,
              marginBottom: "24px",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            📈 The 3-Step Winning Formula
          </div>

          <h2
            style={{
              fontSize: "52px",
              fontWeight: 800,
              margin: "0 0 40px 0",
              letterSpacing: "-1px",
            }}
          >
            How To 5x Your ROAS
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              maxWidth: "850px",
            }}
          >
            {[
              {
                step: "01",
                title: "High-Intent Keywords",
                desc: "Target buyers, not browsers.",
                color: "#4285F4",
              },
              {
                step: "02",
                title: "Laser-Focused Landing Page",
                desc: "Match ad copy to exact offer.",
                color: "#FBBC05",
              },
              {
                step: "03",
                title: "Smart Max Conversion Bidding",
                desc: "Let AI optimize your cost per acquisition.",
                color: "#34A853",
              },
            ].map((item, idx) => {
              const itemDelay = 90 + idx * 15;
              const itemProgress = spring({
                frame: frame - itemDelay,
                fps,
                config: { damping: 12 },
              });
              const itemOpacity = interpolate(
                frame,
                [itemDelay, itemDelay + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const itemY = interpolate(itemProgress, [0, 1], [30, 0]);

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    padding: "24px 32px",
                    opacity: itemOpacity,
                    transform: `translateY(${itemY}px)`,
                    textAlign: "left",
                    gap: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 900,
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                      padding: "16px 20px",
                      borderRadius: "14px",
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "26px",
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#94A3B8",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SCENE 3: CTA (7 - 10s) ================= */}
      {frame >= 210 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: s3Opacity,
            transform: `scale(${s3Scale})`,
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "rgba(52, 168, 83, 0.15)",
              border: "2px solid #34A853",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              marginBottom: "30px",
              boxShadow: "0 0 40px rgba(52, 168, 83, 0.3)",
            }}
          >
            🚀
          </div>

          <h2
            style={{
              fontSize: "58px",
              fontWeight: 900,
              margin: "0 0 20px 0",
              letterSpacing: "-1px",
            }}
          >
            Scale Your Business Today
          </h2>

          <p
            style={{
              fontSize: "26px",
              color: "#94A3B8",
              marginBottom: "45px",
            }}
          >
            Master Google Ads & dominate your market.
          </p>

          <div
            style={{
              backgroundColor: "#4285F4",
              color: "#FFFFFF",
              padding: "20px 50px",
              borderRadius: "40px",
              fontSize: "28px",
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(66, 133, 244, 0.5)",
              letterSpacing: "0.5px",
            }}
          >
            Subscribe for More Tips 🔥
          </div>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / 300) * 100}%`,
            background: "linear-gradient(90deg, #4285F4 0%, #34A853 50%, #FBBC05 75%, #EA4335 100%)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
