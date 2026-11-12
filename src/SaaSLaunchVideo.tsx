import React from "react";
import {
  Audio,
  Composition,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Background with dark navy gradient, grid lines, and floating particles
const LaunchBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = Math.sin(frame / (fps * 2)) * 20;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 50% 40%, #0B1020 0%, #05070F 100%)",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Glowing ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "25%",
          width: 600 + pulse,
          height: 600 + pulse,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 92, 255, 0.12) 0%, rgba(34, 211, 238, 0.04) 70%, transparent 100%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 700 - pulse,
          height: 700 - pulse,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, rgba(124, 92, 255, 0.03) 70%, transparent 100%)",
          filter: "blur(100px)",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.7,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i * 137) % 1920;
        const baseY = (i * 93) % 1080;
        const y = (baseY + Math.sin(frame / 30 + i) * 25) % 1080;
        const size = (i % 3) + 2;
        const opacity = 0.2 + (i % 5) * 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "#22D3EE" : "#7C5CFF",
              boxShadow: `0 0 ${size * 3}px ${i % 2 === 0 ? "#22D3EE" : "#7C5CFF"}`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

// Scene 1 (0-3s): Hook - Subscription card with coin & recurring arrow, cracking and dissolving
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const dissolve = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const cardScale = 0.85 + entrance * 0.15;
  const cardOpacity = 1 - dissolve;
  const crackOpacity = spring({
    frame: frame - 60,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${cardScale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 560,
          height: 340,
          background: "rgba(18, 24, 38, 0.75)",
          border: "1px solid rgba(124, 92, 255, 0.4)",
          borderRadius: 28,
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(124, 92, 255, 0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 45,
          opacity: cardOpacity,
          transform: `translate(${dissolve * 60}px, ${dissolve * -40}px) rotate(${dissolve * 18}deg)`,
          transition: "transform 0.1s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Dollar symbol icon */}
          <div
            style={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22D3EE 0%, #7C5CFF 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 900, color: "#0B1020" }}>$</div>
          </div>

          {/* Recurring payment arrow symbol */}
          <div
            style={{
              width: 55,
              height: 55,
              borderRadius: "50%",
              border: "3px dashed rgba(255, 255, 255, 0.4)",
              borderTopColor: "#22D3EE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRight: "3px solid #22D3EE",
                borderBottom: "3px solid #22D3EE",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ width: "65%", height: 18, background: "rgba(255, 255, 255, 0.15)", borderRadius: 9 }} />
          <div style={{ width: "45%", height: 14, background: "rgba(34, 211, 238, 0.35)", borderRadius: 7 }} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "2px solid #22D3EE",
            borderRadius: 28,
            boxShadow: "0 0 50px #22D3EE",
            pointerEvents: "none",
            opacity: crackOpacity,
          }}
        />
      </div>

      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i * 12) * (Math.PI / 180);
        const dist = dissolve * 350 + (i * 8);
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        const pOpacity = Math.max(0, 1 - dissolve);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: (i % 4) + 5,
              height: (i % 4) + 5,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "#22D3EE" : "#7C5CFF",
              boxShadow: "0 0 12px #22D3EE",
              transform: `translate(${px}px, ${py}px)`,
              opacity: pOpacity,
            }}
          />
        );
      })}
    </div>
  );
};

// Scene 2 (3-6s): Reveal - Particles reform into microphone & waveform logo with light sweep
const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - 90;
  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scale = 0.5 + spr * 0.5;
  const opacity = spr;
  const sweepProgress = Math.max(0, Math.min(1, (localFrame - 25) / 45));
  const sweepX = -250 + sweepProgress * 750;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 260,
          height: 260,
          background: "linear-gradient(135deg, rgba(124, 92, 255, 0.25) 0%, rgba(34, 211, 238, 0.25) 100%)",
          border: "2px solid rgba(34, 211, 238, 0.7)",
          borderRadius: 52,
          backdropFilter: "blur(30px)",
          boxShadow: "0 0 80px rgba(34, 211, 238, 0.5), inset 0 0 40px rgba(124, 92, 255, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 64,
              borderRadius: 19,
              background: "linear-gradient(180deg, #22D3EE 0%, #7C5CFF 100%)",
              boxShadow: "0 0 25px #22D3EE",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {[18, 36, 54, 30, 48].map((h, i) => {
              const currentH = h + Math.sin(frame / 6 + i) * 12;
              return (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: `${Math.max(10, currentH)}px`,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 3,
                    boxShadow: "0 0 12px rgba(255,255,255,0.9)",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: -60,
            left: sweepX,
            width: 90,
            height: 380,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            transform: "rotate(25deg)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
};

// Scene 3 (6-12s): Features - Floating desktop window with 3 feature cards & animated icons
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - 180;
  const windowSpr = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const card1Spr = spring({ frame: localFrame - 30, fps, config: { damping: 12, stiffness: 130 } });
  const card2Spr = spring({ frame: localFrame - 90, fps, config: { damping: 12, stiffness: 130 } });
  const card3Spr = spring({ frame: localFrame - 150, fps, config: { damping: 12, stiffness: 130 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${0.9 + windowSpr * 0.1})`,
        opacity: windowSpr,
      }}
    >
      <div
        style={{
          width: 1500,
          height: 800,
          background: "rgba(11, 16, 32, 0.9)",
          border: "1px solid rgba(34, 211, 238, 0.4)",
          borderRadius: 32,
          backdropFilter: "blur(35px)",
          boxShadow: "0 35px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(124, 92, 255, 0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: "perspective(1400px) rotateX(4deg)",
        }}
      >
        <div
          style={{
            height: 65,
            background: "rgba(255, 255, 255, 0.03)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 28px",
            gap: 14,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#27C93F" }} />
        </div>

        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 35,
            padding: 60,
            alignItems: "center",
          }}
        >
          {/* Card 1: Voice Clone (Waveform Morph) */}
          <div
            style={{
              height: 560,
              background: "rgba(18, 24, 38, 0.65)",
              border: card1Spr > 0.8 ? "2px solid #22D3EE" : "1px solid rgba(124, 92, 255, 0.3)",
              borderRadius: 24,
              padding: 35,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${(1 - card1Spr) * 60}px)`,
              opacity: card1Spr,
              boxShadow: card1Spr > 0.8 ? "0 0 45px rgba(34, 211, 238, 0.45)" : "none",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: "rgba(34, 211, 238, 0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgba(34, 211, 238, 0.4)",
              }}
            >
              <div style={{ fontSize: 24 }}>🎙️</div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {Array.from({ length: 9 }).map((_, i) => {
                  const morph = Math.sin(frame / 7 + i * 0.6) * 35 + 40;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 9,
                        height: `${Math.max(12, morph)}px`,
                        background: i % 2 === 0 ? "#22D3EE" : "#7C5CFF",
                        borderRadius: 4,
                        boxShadow: "0 0 15px rgba(34, 211, 238, 0.6)",
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ width: 80, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3 }} />
            </div>
            <div style={{ height: 45, background: "rgba(255,255,255,0.05)", borderRadius: 12 }} />
          </div>

          {/* Card 2: Video Dubbing (Timeline & Subtitle Swap) */}
          <div
            style={{
              height: 560,
              background: "rgba(18, 24, 38, 0.65)",
              border: card2Spr > 0.8 ? "2px solid #22D3EE" : "1px solid rgba(124, 92, 255, 0.3)",
              borderRadius: 24,
              padding: 35,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${(1 - card2Spr) * 60}px)`,
              opacity: card2Spr,
              boxShadow: card2Spr > 0.8 ? "0 0 45px rgba(34, 211, 238, 0.45)" : "none",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: "rgba(124, 92, 255, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgba(124, 92, 255, 0.4)",
              }}
            >
              <div style={{ fontSize: 24 }}>🎬</div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  height: 90,
                  background: "rgba(124, 92, 255, 0.15)",
                  borderRadius: 14,
                  border: "1px solid rgba(124, 92, 255, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    width: `${(Math.sin(frame / 10) + 1) * 45 + 25}%`,
                    height: 12,
                    background: "#22D3EE",
                    borderRadius: 6,
                    boxShadow: "0 0 15px #22D3EE",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, height: 36, background: "rgba(34, 211, 238, 0.25)", borderRadius: 10 }} />
                <div style={{ flex: 1, height: 36, background: "rgba(124, 92, 255, 0.25)", borderRadius: 10 }} />
              </div>
            </div>
            <div style={{ height: 45, background: "rgba(255,255,255,0.05)", borderRadius: 12 }} />
          </div>

          {/* Card 3: Audiobook (Book Opening into Sound Waves) */}
          <div
            style={{
              height: 560,
              background: "rgba(18, 24, 38, 0.65)",
              border: card3Spr > 0.8 ? "2px solid #22D3EE" : "1px solid rgba(124, 92, 255, 0.3)",
              borderRadius: 24,
              padding: 35,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${(1 - card3Spr) * 60}px)`,
              opacity: card3Spr,
              boxShadow: card3Spr > 0.8 ? "0 0 45px rgba(34, 211, 238, 0.45)" : "none",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: "rgba(34, 211, 238, 0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgba(34, 211, 238, 0.4)",
              }}
            >
              <div style={{ fontSize: 24 }}>🎧</div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 25,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 80,
                  background: "linear-gradient(135deg, #7C5CFF 0%, #22D3EE 100%)",
                  borderRadius: 12,
                  boxShadow: "0 0 25px rgba(124, 92, 255, 0.6)",
                  transform: `perspective(500px) rotateY(${Math.sin(frame / 15) * 25}deg)`,
                }}
              />
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: `${Math.sin(frame / 5 + i * 0.8) * 18 + 24}px`,
                      background: "#22D3EE",
                      borderRadius: 2.5,
                      boxShadow: "0 0 10px #22D3EE",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ height: 45, background: "rgba(255,255,255,0.05)", borderRadius: 12 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Scene 4 (12-16s): Local & Free - Laptop with glowing chip, CPU/GPU badge, crossed-out cloud dollar, privacy shield, open source badge
const LocalFreeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - 360;
  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 70,
        padding: 90,
        opacity: spr,
        transform: `scale(${0.92 + spr * 0.08})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 650,
          height: 540,
          background: "rgba(18, 24, 38, 0.75)",
          border: "1px solid rgba(34, 211, 238, 0.45)",
          borderRadius: 32,
          backdropFilter: "blur(25px)",
          boxShadow: "0 25px 70px rgba(0,0,0,0.7)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 35,
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 28,
            background: "linear-gradient(135deg, #22D3EE 0%, #7C5CFF 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 60px rgba(34, 211, 238, 0.7)",
          }}
        >
          <div style={{ width: 80, height: 80, border: "4px solid #0B1020", borderRadius: 14 }} />
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              padding: "14px 28px",
              background: "rgba(34, 211, 238, 0.2)",
              border: "1px solid #22D3EE",
              borderRadius: 18,
              color: "#22D3EE",
              fontSize: 24,
              fontWeight: 700,
              boxShadow: "0 0 25px rgba(34, 211, 238, 0.5)",
            }}
          >
            CPU READY
          </div>
          <div
            style={{
              padding: "14px 28px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 18,
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            GPU OPTIONAL
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, justifyContent: "center" }}>
        <div
          style={{
            position: "relative",
            width: 500,
            height: 130,
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            padding: "0 35px",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 44 }}>☁️</div>
          <div style={{ flex: 1, height: 4, background: "#EF4444", transform: "rotate(-10deg)", boxShadow: "0 0 12px #EF4444" }} />
          <div style={{ fontSize: 36, fontWeight: 900, color: "#EF4444" }}>$</div>
        </div>

        <div
          style={{
            width: 500,
            height: 130,
            background: "rgba(34, 211, 238, 0.1)",
            border: "1px solid rgba(34, 211, 238, 0.45)",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            padding: "0 35px",
            gap: 24,
            boxShadow: "0 0 35px rgba(34, 211, 238, 0.25)",
          }}
        >
          <div style={{ fontSize: 44 }}>🛡️</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#22D3EE" }}>PRIVACY SECURE</div>
        </div>

        <div
          style={{
            width: 500,
            height: 130,
            background: "rgba(124, 92, 255, 0.15)",
            border: "1px solid rgba(124, 92, 255, 0.55)",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            padding: "0 35px",
            gap: 24,
            boxShadow: "0 0 35px rgba(124, 92, 255, 0.35)",
          }}
        >
          <div style={{ fontSize: 44 }}>🔓</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#C084FC" }}>OPEN SOURCE</div>
        </div>
      </div>
    </div>
  );
};

// Scene 5 (16-20s): CTA - Pull back to centered layout, glowing logo, GitHub cat icon, button pulsing
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - 480;
  const spr = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const pulse = Math.sin(frame / 8) * 12;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 55,
        opacity: spr,
        transform: `scale(${0.95 + spr * 0.05})`,
      }}
    >
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(135deg, #22D3EE 0%, #7C5CFF 100%)",
          borderRadius: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 80px rgba(34, 211, 238, 0.8)",
          transform: `translateY(${pulse}px)`,
        }}
      >
        <div style={{ fontSize: 80 }}>🎙️</div>
      </div>

      <div style={{ display: "flex", gap: 35, alignItems: "center" }}>
        <div
          style={{
            padding: "22px 40px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: 26,
            display: "flex",
            alignItems: "center",
            gap: 18,
            backdropFilter: "blur(15px)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ fontSize: 40 }}>🐱</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF" }}>GITHUB</div>
        </div>

        <div
          style={{
            padding: "22px 54px",
            background: "linear-gradient(135deg, #22D3EE 0%, #7C5CFF 100%)",
            borderRadius: 26,
            fontSize: 28,
            fontWeight: 800,
            color: "#0B1020",
            boxShadow: "0 0 60px rgba(34, 211, 238, 0.9)",
            transform: `scale(${1 + Math.sin(frame / 6) * 0.04})`,
          }}
        >
          LAUNCH 🚀
        </div>
      </div>
    </div>
  );
};

export const SaaSLaunchVideoComposition: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        width: "1920px",
        height: "1080px",
        backgroundColor: "#05070F",
        overflow: "hidden",
      }}
    >
      <LaunchBackground />

      {/* Background Tech Beat Audio at Low Volume */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.25} loop />

      {/* Scene 1: Hook (0 - 90 frames / 0-3s) */}
      <Sequence durationInFrames={90}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Reveal (90 - 180 frames / 3-6s) */}
      <Sequence from={90} durationInFrames={90}>
        <RevealScene />
      </Sequence>

      {/* Scene 3: Features (180 - 360 frames / 6-12s) */}
      <Sequence from={180} durationInFrames={180}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 4: Local & Free (360 - 480 frames / 12-16s) */}
      <Sequence from={360} durationInFrames={120}>
        <LocalFreeScene />
      </Sequence>

      {/* Scene 5: CTA (480 - 600 frames / 16-20s) */}
      <Sequence from={480} durationInFrames={120}>
        <CtaScene />
      </Sequence>
    </div>
  );
};

export const SaaSLaunchVideoRoot = () => {
  return (
    <Composition
      id="SaaSLaunchVideo"
      component={SaaSLaunchVideoComposition}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
