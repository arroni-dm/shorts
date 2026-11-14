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

// Change to "book-wisdom-voice.mp3" if your audio file is MP3
const VOICE_FILE = "boi-pora.wav";

interface SceneBlock {
  start: number;
  end: number;
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
  mode: "split" | "compare" | "decline" | "expansion";
}

const SCENES: SceneBlock[] = [
  {
    start: 0,
    end: 7.2,
    tag: "INFORMATION VS WISDOM",
    title: "ইন্টারনেট দেয় তথ্য,\nকিন্তু বই দেয় প্রজ্ঞা!",
    subtitle: "তথ্য জানা আর গভীরভাবে উপলব্ধি করার মধ্যে রয়েছে বিশাল ব্যবধান",
    accent: "#F59E0B",
    mode: "split",
  },
  {
    start: 7.2,
    end: 16.5,
    tag: "DEPTH COMPARISON",
    title: "৩ মিনিটের সার্চ বনাম\n৩০০ পৃষ্ঠার গভীর পাঠ",
    subtitle: "Google-এ তাৎক্ষণিক উত্তর মেলে, কিন্তু বই তৈরি করে গভীর জ্ঞান",
    accent: "#38BDF8",
    mode: "compare",
  },
  {
    start: 16.5,
    end: 23.0,
    tag: "THE SKIMMING ERA",
    title: "তথ্য সংগ্রহের যুগে\nকমছে গভীরে যাওয়ার অভ্যাস",
    subtitle: "দ্রুত স্ক্রলিং ও স্কিমিং আমাদের গভীর মনোযোগকে দুর্বল করে দিচ্ছে",
    accent: "#EF4444",
    mode: "decline",
  },
  {
    start: 23.0,
    end: 32.0,
    tag: "COGNITIVE GROWTH",
    title: "রিলস বা শর্টসের চেয়ে\nবই পড়া বহু গুণে এগিয়ে",
    subtitle: "মনস্তাত্ত্বিক বিকাশ ও চিন্তার পরিধি বাড়াতে বই পড়ার বিকল্প নেই",
    accent: "#10B981",
    mode: "expansion",
  },
];

const EditorialVisual: React.FC<{
  mode: SceneBlock["mode"];
  accent: string;
  localFrame: number;
  fps: number;
}> = ({ mode, accent, localFrame, fps }) => {
  const floatY = Math.sin(localFrame / 16) * 8;
  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  if (mode === "split") {
    return (
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          transform: `scale(${pop}) translateY(${floatY}px)`,
        }}
      >
        {/* Left Card: Internet */}
        <div
          style={{
            width: 340,
            height: 410,
            borderRadius: 28,
            backgroundColor: "rgba(56, 189, 248, 0.08)",
            border: "2px solid rgba(56, 189, 248, 0.45)",
            padding: 36,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#38BDF8", fontWeight: 700 }}>
            INTERNET
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#FFFFFF" }}>তথ্য</div>
          <div style={{ fontSize: 24, color: "#94A3B8", lineHeight: 1.5 }}>
            দ্রুত ডেটা ও ইনফরমেশন
          </div>
        </div>

        <div style={{ fontSize: 40, fontWeight: 700, color: "#64748B" }}>VS</div>

        {/* Right Card: Book */}
        <div
          style={{
            width: 340,
            height: 410,
            borderRadius: 28,
            backgroundColor: "rgba(245, 158, 11, 0.14)",
            border: `3px solid ${accent}`,
            boxShadow: `0 25px 70px ${accent}33`,
            padding: 36,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 3, color: accent, fontWeight: 700 }}>
            BOOKS
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: accent }}>প্রজ্ঞা</div>
          <div style={{ fontSize: 24, color: "#FDE68A", lineHeight: 1.5 }}>
            গভীর উপলব্ধি ও প্রজ্ঞা
          </div>
        </div>
      </div>
    );
  }

  if (mode === "compare") {
    const bar1 = interpolate(localFrame, [0, 25], [0, 120], { extrapolateRight: "clamp" });
    const bar2 = interpolate(localFrame, [5, 45], [0, 560], { extrapolateRight: "clamp" });
    return (
      <div
        style={{
          width: 740,
          height: 440,
          borderRadius: 32,
          backgroundColor: "rgba(255,255,255,0.04)",
          border: `2px solid ${accent}55`,
          padding: "46px 52px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 44,
        }}
      >
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, marginBottom: 14 }}>
            <span style={{ color: "#94A3B8" }}>Google সার্চ (তাৎক্ষণিক)</span>
            <span style={{ color: "#94A3B8", fontWeight: 700 }}>৩ মিনিট</span>
          </div>
          <div style={{ height: 26, backgroundColor: "#1E293B", borderRadius: 99 }}>
            <div style={{ width: bar1, height: "100%", backgroundColor: "#64748B", borderRadius: 99 }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, marginBottom: 14 }}>
            <span style={{ color: "#FFFFFF", fontWeight: 700 }}>বই পাঠ (গভীর জ্ঞান)</span>
            <span style={{ color: accent, fontWeight: 700 }}>৩০০ পৃষ্ঠা</span>
          </div>
          <div style={{ height: 34, backgroundColor: "#1E293B", borderRadius: 99 }}>
            <div
              style={{
                width: bar2,
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
    const dashOffset = interpolate(localFrame, [0, 45], [700, 0], { extrapolateRight: "clamp" });
    return (
      <div
        style={{
          width: 740,
          height: 440,
          borderRadius: 32,
          backgroundColor: "rgba(239, 68, 68, 0.06)",
          border: `2px solid ${accent}66`,
          padding: 44,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700 }}>
          <span style={{ color: "#FCA5A5" }}>SKIMMING ERA • গভীর মনোযোগ</span>
          <span style={{ color: accent }}>↘ কমছে</span>
        </div>
        <svg width="650" height="230" viewBox="0 0 650 230">
          <path
            d="M 20 35 Q 220 45, 360 125 T 620 205"
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="700"
            strokeDashoffset={dashOffset}
          />
          <circle cx="20" cy="35" r="11" fill="#FFFFFF" />
          <circle cx="620" cy="205" r="14" fill={accent} />
        </svg>
        <div style={{ fontSize: 26, color: "#FECACA", textAlign: "center" }}>
          তথ্যের ভিড়ে হারিয়ে যাচ্ছে গভীর চিন্তাশক্তি
        </div>
      </div>
    );
  }

  // Expansion Mode
  const ringScale = interpolate(localFrame, [0, 35], [0.4, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        width: 740,
        height: 440,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: `2px dashed ${accent}88`,
          transform: `scale(${ringScale}) rotate(${localFrame * 0.6}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 310,
          height: 310,
          borderRadius: "50%",
          backgroundColor: `${accent}18`,
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
        <div style={{ fontSize: 44, fontWeight: 700, color: accent }}>বই পাঠ</div>
        <div style={{ fontSize: 24, color: "#FFFFFF", marginTop: 8 }}>
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

  const fade = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(localFrame, [0, 14], [36, 0], { extrapolateRight: "clamp" });
  const totalProgress = interpolate(frame, [0, durationInFrames], [0, 100], {
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

      {/* Subtle Whoosh Transition SFX */}
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
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 72% 48%, ${scene.accent}1F 0%, transparent 50%)`,
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 90,
          right: 90,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "10px 26px",
            borderRadius: 8,
            border: `1.5px solid ${scene.accent}`,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: scene.accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {scene.tag}
        </div>
        <div style={{ fontSize: 22, color: "#94A3B8", letterSpacing: 2 }}>
          DEEP READING SERIES
        </div>
      </div>

      {/* Main 16:9 Split Content Area */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 90,
          right: 90,
          bottom: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 60,
        }}
      >
        {/* Left Editorial Typography */}
        <div
          style={{
            flex: 1,
            opacity: fade,
            transform: `translateY(${slideY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.25,
              whiteSpace: "pre-line",
              marginBottom: 28,
            }}
          >
            {scene.title}
          </div>
          <div
            style={{
              width: 110,
              height: 6,
              borderRadius: 99,
              backgroundColor: scene.accent,
              marginBottom: 28,
            }}
          />
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.55,
              color: "#CBD5E1",
              maxWidth: 740,
            }}
          >
            {scene.subtitle}
          </div>
        </div>

        {/* Right Infographics / Data-Viz Zone */}
        <div
          style={{
            width: 760,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditorialVisual
            mode={scene.mode}
            accent={scene.accent}
            localFrame={localFrame}
            fps={fps}
          />
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          left: 90,
          right: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#94A3B8",
            marginBottom: 12,
          }}
        >
          <span>INFORMATION VS WISDOM</span>
          <span>{Math.round(totalProgress)}%</span>
        </div>
        <div style={{ height: 6, backgroundColor: "#1E293B", borderRadius: 99 }}>
          <div
            style={{
              width: `${totalProgress}%`,
              height: "100%",
              backgroundColor: scene.accent,
              borderRadius: 99,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default BookWisdomExplainer;