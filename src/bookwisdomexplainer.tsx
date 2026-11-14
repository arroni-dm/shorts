import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/HindSiliguri";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700"],
  subsets: ["bengali"],
});

const VOICE_FILE = "boi-pora.wav";

interface VerticalScene {
  start: number;
  end: number;
  tag: string;
  headlineTop: string;
  highlightWord: string;
  headlineBottom: string;
  caption: string;
  accent: string;
  mode: "split" | "compare" | "decline" | "expansion";
}

const SCENES: VerticalScene[] = [
  {
    start: 0,
    end: 7.2,
    tag: "INFORMATION VS WISDOM",
    headlineTop: "ইন্টারনেট দেয় তথ্য,",
    highlightWord: "কিন্তু বই দেয় প্রজ্ঞা!",
    headlineBottom: "",
    caption: "তথ্য জানা আর গভীরভাবে উপলব্ধি করার মধ্যে রয়েছে বিশাল পার্থক্য",
    accent: "#F59E0B",
    mode: "split",
  },
  {
    start: 7.2,
    end: 16.5,
    tag: "DEPTH COMPARISON",
    headlineTop: "৩ মিনিটের সার্চ বনাম",
    highlightWord: "৩০০ পৃষ্ঠার গভীর পাঠ",
    headlineBottom: "",
    caption: "Google-এ তাৎক্ষণিক উত্তর মেলে, কিন্তু বই তৈরি করে গভীর জ্ঞান",
    accent: "#38BDF8",
    mode: "compare",
  },
  {
    start: 16.5,
    end: 23.0,
    tag: "THE SKIMMING ERA",
    headlineTop: "তথ্য সংগ্রহের যুগে",
    highlightWord: "কমছে গভীরে যাওয়ার অভ্যাস",
    headlineBottom: "",
    caption: "দ্রুত স্ক্রলিং ও স্কিমিং আমাদের গভীর মনোযোগকে দুর্বল করে দিচ্ছে",
    accent: "#EF4444",
    mode: "decline",
  },
  {
    start: 23.0,
    end: 30.0,
    tag: "COGNITIVE GROWTH",
    headlineTop: "রিলস বা শর্টসের চেয়ে",
    highlightWord: "বই পড়া বহু গুণে এগিয়ে",
    headlineBottom: "",
    caption: "মনস্তাত্ত্বিক বিকাশ ও চিন্তার পরিধি বাড়াতে বই পড়ার বিকল্প নেই",
    accent: "#10B981",
    mode: "expansion",
  },
];

const VerticalMotionCard: React.FC<{
  mode: VerticalScene["mode"];
  accent: string;
  localFrame: number;
  fps: number;
}> = ({ mode, accent, localFrame, fps }) => {
  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const floatY = Math.sin(localFrame / 14) * 7;

  if (mode === "split") {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 24,
          justifyContent: "center",
          alignItems: "stretch",
          transform: `scale(${pop}) translateY(${floatY}px)`,
        }}
      >
        {/* Internet Box */}
        <div
          style={{
            flex: 1,
            height: 360,
            borderRadius: 28,
            backgroundColor: "rgba(56, 189, 248, 0.08)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 2.5, color: "#38BDF8", fontWeight: 700 }}>
            INTERNET
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#FFFFFF" }}>তথ্য</div>
          <div style={{ fontSize: 24, color: "#94A3B8", lineHeight: 1.4 }}>
            দ্রুত ডেটা ও ইনফরমেশন
          </div>
        </div>

        {/* Book Box */}
        <div
          style={{
            flex: 1,
            height: 360,
            borderRadius: 28,
            backgroundColor: "rgba(245, 158, 11, 0.14)",
            border: `3px solid ${accent}`,
            boxShadow: `0 24px 60px ${accent}33`,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 2.5, color: accent, fontWeight: 700 }}>
            BOOKS
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: accent }}>প্রজ্ঞা</div>
          <div style={{ fontSize: 24, color: "#FDE68A", lineHeight: 1.4 }}>
            গভীর উপলব্ধি ও প্রজ্ঞা
          </div>
        </div>
      </div>
    );
  }

  if (mode === "compare") {
    const bar1 = interpolate(localFrame, [0, 22], [0, 18], { extrapolateRight: "clamp" });
    const bar2 = interpolate(localFrame, [6, 42], [0, 100], { extrapolateRight: "clamp" });
    return (
      <div
        style={{
          width: "100%",
          borderRadius: 32,
          backgroundColor: "rgba(255,255,255,0.04)",
          border: `2px solid ${accent}55`,
          padding: "40px 42px",
          display: "flex",
          flexDirection: "column",
          gap: 38,
          transform: `scale(${pop})`,
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, marginBottom: 14 }}>
            <span style={{ color: "#94A3B8" }}>Google সার্চ (তাৎক্ষণিক)</span>
            <span style={{ color: "#94A3B8", fontWeight: 700 }}>৩ মিনিট</span>
          </div>
          <div style={{ height: 26, backgroundColor: "#1E293B", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${bar1}%`, height: "100%", backgroundColor: "#64748B", borderRadius: 99 }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, marginBottom: 14 }}>
            <span style={{ color: "#FFFFFF", fontWeight: 700 }}>বই পাঠ (গভীর জ্ঞান)</span>
            <span style={{ color: accent, fontWeight: 700 }}>৩০০ পৃষ্ঠা</span>
          </div>
          <div style={{ height: 34, backgroundColor: "#1E293B", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                width: `${bar2}%`,
                height: "100%",
                background: `linear-gradient(90deg, #0284C7, ${accent})`,
                borderRadius: 99,
                boxShadow: `0 0 30px ${accent}66`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (mode === "decline") {
    const dashOffset = interpolate(localFrame, [0, 42], [780, 0], { extrapolateRight: "clamp" });
    return (
      <div
        style={{
          width: "100%",
          borderRadius: 32,
          backgroundColor: "rgba(239, 68, 68, 0.07)",
          border: `2px solid ${accent}66`,
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          transform: `scale(${pop})`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700 }}>
          <span style={{ color: "#FCA5A5" }}>SKIMMING ERA • গভীর মনোযোগ</span>
          <span style={{ color: accent }}>↘ কমছে</span>
        </div>
        <svg width="100%" height="230" viewBox="0 0 760 230">
          <path
            d="M 20 35 Q 250 45, 420 130 T 730 205"
            fill="none"
            stroke={accent}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray="780"
            strokeDashoffset={dashOffset}
          />
          <circle cx="20" cy="35" r="12" fill="#FFFFFF" />
          <circle cx="730" cy="205" r="15" fill={accent} />
        </svg>
      </div>
    );
  }

  // Expansion Mode
  const ringScale = interpolate(localFrame, [0, 32], [0.45, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        width: "100%",
        height: 410,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `scale(${pop})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: `3px dashed ${accent}88`,
          transform: `scale(${ringScale}) rotate(${localFrame * 0.7}deg)`,
        }}
      />
      <div
        style={{
          width: 295,
          height: 295,
          borderRadius: "50%",
          backgroundColor: `${accent}1A`,
          border: `3px solid ${accent}`,
          boxShadow: `0 0 80px ${accent}55`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, color: accent }}>বই পাঠ</div>
        <div style={{ fontSize: 24, color: "#FFFFFF", marginTop: 8, lineHeight: 1.4 }}>
          চিন্তার পরিধি ও মনস্তাত্ত্বিক বিকাশ
        </div>
      </div>
    </div>
  );
};

export const BookWisdomExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;

  const idx = Math.max(
    0,
    SCENES.findIndex((s) => sec >= s.start && sec < s.end)
  );
  const scene = SCENES[idx] ?? SCENES[SCENES.length - 1];
  const localFrame = Math.max(0, frame - Math.round(scene.start * fps));

  const fade = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(localFrame, [0, 12], [32, 0], { extrapolateRight: "clamp" });
  const markerWidth = interpolate(localFrame, [4, 20], [0, 100], { extrapolateRight: "clamp" });
  const progressPct = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070B12",
        fontFamily,
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Main Voiceover */}
      <Audio src={staticFile(VOICE_FILE)} volume={1} />

      {/* Whoosh Transition SFX */}
      {SCENES.map((s, i) =>
        i === 0 ? null : (
          <Sequence key={i} from={Math.round(s.start * fps)} durationInFrames={15}>
            <Audio src={staticFile("sfx-whoosh.wav")} volume={0.22} />
          </Sequence>
        )
      )}

      {/* Editorial Grid & Ambient Glow */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 62%, ${scene.accent}24 0%, transparent 55%)`,
        }}
      />

      {/* Safe-Zone Aware Vertical Container (Top 130px, Bottom 260px clear for Shorts UI) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          bottom: 260,
          left: 72,
          right: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Tag Pill & Progress */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 22,
            }}
          >
            <div
              style={{
                padding: "10px 26px",
                borderRadius: 10,
                border: `2px solid ${scene.accent}`,
                backgroundColor: "rgba(0,0,0,0.55)",
                color: scene.accent,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {scene.tag}
            </div>
            <div style={{ fontSize: 24, color: "#94A3B8", fontWeight: 700 }}>
              {Math.round(progressPct)}%
            </div>
          </div>

          <div style={{ height: 8, backgroundColor: "#1E293B", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: "100%",
                backgroundColor: scene.accent,
                borderRadius: 99,
              }}
            />
          </div>
        </div>

        {/* Center-Top Kinetic Typography + Vox Highlighter */}
        <div
          style={{
            opacity: fade,
            transform: `translateY(${slideY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#FFFFFF",
              marginBottom: 14,
            }}
          >
            {scene.headlineTop}
          </div>

          {/* Vox-Style Animated Highlighter Bar */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
            <div
              style={{
                position: "absolute",
                left: -10,
                right: -10,
                bottom: 6,
                height: "46%",
                width: `${markerWidth}%`,
                backgroundColor: `${scene.accent}44`,
                borderRadius: 8,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.22,
                color: scene.accent,
                zIndex: 1,
              }}
            >
              {scene.highlightWord}
            </div>
          </div>

          <div
            style={{
              fontSize: 34,
              lineHeight: 1.5,
              color: "#CBD5E1",
            }}
          >
            {scene.caption}
          </div>
        </div>

        {/* Center-Bottom Data-Viz / Infographics Card */}
        <VerticalMotionCard
          mode={scene.mode}
          accent={scene.accent}
          localFrame={localFrame}
          fps={fps}
        />
      </div>
    </AbsoluteFill>
  );
};

export default BookWisdomExplainer;