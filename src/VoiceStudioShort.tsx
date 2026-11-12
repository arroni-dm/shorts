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

interface SceneProps {
  children: React.ReactNode;
}

const ZoomScene: React.FC<SceneProps> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scale = 0.94 + entrance * 0.06;
  const opacity = entrance;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 50px",
        transform: `scale(${scale})`,
        opacity,
        fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
      }}
    >
      {children}
    </div>
  );
};

// Background with dark tech theme and subtle grid overlay
const TechBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#050814",
        backgroundImage: `
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        overflow: "hidden",
      }}
    >
      {/* Glowing ambient background orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(139, 92, 246, 0.05) 60%, transparent 100%)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
};

// Animated Audio Waveform visualizer
const AudioWaveform: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = 24;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "60px", margin: "20px 0" }}>
      {Array.from({ length: bars }).map((_, i) => {
        const height = Math.sin(frame / 6 + i * 0.5) * 25 + 35;
        return (
          <div
            key={i}
            style={{
              width: "6px",
              height: `${Math.max(8, height)}px`,
              backgroundColor: i % 2 === 0 ? "#00F0FF" : "#8B5CF6",
              borderRadius: "4px",
              boxShadow: "0 0 12px rgba(0, 240, 255, 0.4)",
            }}
          />
        );
      })}
    </div>
  );
};

// Scene 1: Hook ("ElevenLabs-কে বিদায় জানান!")
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = Math.sin(frame / 8) * 6;

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "36px", textAlign: "center" }}>
        {/* Crossed-out subscription price badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "14px 28px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: "40px",
            boxShadow: "0 0 25px rgba(239, 68, 68, 0.2)",
          }}
        >
          <span style={{ color: "#EF4444", fontSize: "28px", fontWeight: 700, textDecoration: "line-through" }}>
            $99/mo (ElevenLabs)
          </span>
          <span style={{ color: "#00F0FF", fontSize: "28px", fontWeight: 700 }}>
            ➔ $0 FREE
          </span>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.25,
            textShadow: "0 0 30px rgba(0, 240, 255, 0.4)",
            transform: `translateY(${pulse}px)`,
          }}
        >
          ElevenLabs-কে <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "76px",
            }}
          >
            বিদায় জানান!
          </span>
        </div>

        <div
          style={{
            color: "#93C5FD",
            fontSize: "30px",
            fontWeight: 500,
            maxWidth: "850px",
            lineHeight: 1.5,
          }}
        >
          সাবস্ক্রিপশনের জন্য টাকা খরচ না করেই এআই দিয়ে ভয়েস ক্লোন, ভিডিও ডাবিং এবং অডিওবুক তৈরি করুন!
        </div>
      </div>
    </ZoomScene>
  );
};

// Scene 2: Features ("Voice Clone", "ভিডিও ডাবিং", "অডিওবুক" + Soundwave)
const FeaturesScene: React.FC = () => {
  const features = [
    { title: "Voice Clone", sub: "নিজের কণ্ঠ ক্লোন করুন", icon: "🎙️" },
    { title: "ভিডিও ডাবিং", sub: "যেকোনো ভাষায় ডাব করুন", icon: "🎬" },
    { title: "অডিওবুক", sub: "বই থেকে প্রিমিয়াম অডিও", icon: "🎧" },
  ];

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", width: "100%" }}>
        <div
          style={{
            fontSize: "38px",
            fontWeight: 700,
            color: "#00F0FF",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          ⚡ শক্তিশালী এআই ফিচারসমূহ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "900px" }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                padding: "24px 32px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(0, 240, 255, 0.25)",
                borderRadius: "24px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                style={{
                  fontSize: "44px",
                  padding: "12px",
                  background: "rgba(0, 240, 255, 0.1)",
                  borderRadius: "18px",
                }}
              >
                {f.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ color: "#FFFFFF", fontSize: "36px", fontWeight: 700 }}>
                  {f.title}
                </div>
                <div style={{ color: "#93C5FD", fontSize: "24px", fontWeight: 500 }}>
                  {f.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <AudioWaveform />
      </div>
    </ZoomScene>
  );
};

// Scene 3: Product Reveal ("VoiceStudio", 100% Local & Open-Source AI)
const ProductRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = Math.sin(frame / 10) * 15 + 25;

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "36px", textAlign: "center" }}>
        <div
          style={{
            padding: "12px 28px",
            background: "rgba(139, 92, 246, 0.15)",
            border: "1px solid rgba(139, 92, 246, 0.5)",
            borderRadius: "30px",
            color: "#C084FC",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          ✨ পিসিতে লোকালি চালিত
        </div>

        <div
          style={{
            padding: "40px 60px",
            background: "rgba(5, 8, 20, 0.75)",
            border: "2px solid #00F0FF",
            borderRadius: "36px",
            boxShadow: `0 0 ${glow}px rgba(0, 240, 255, 0.6), inset 0 0 30px rgba(0, 240, 255, 0.2)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ fontSize: "72px" }}>💻⚡</div>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #00F0FF 0%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "2px",
            }}
          >
            VoiceStudio
          </div>
          <div
            style={{
              color: "#38BDF8",
              fontSize: "28px",
              fontWeight: 600,
            }}
          >
            100% Local & Open-Source AI Tool
          </div>
        </div>

        <div
          style={{
            color: "#E2E8F0",
            fontSize: "28px",
            fontWeight: 500,
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          সম্পূর্ণ নিজের ডিভাইসে ডেটা প্রাইভেসি বজায় রেখে চালান।
        </div>
      </div>
    </ZoomScene>
  );
};

// Scene 4: Key Highlights (Checklist cards)
const HighlightsScene: React.FC = () => {
  const highlights = [
    "✓ Dedicated GPU বাধ্যতামূলক নয় (CPU-তেও চলবে)",
    "✓ সম্পূর্ণ ফ্রি & Open-Source",
    "✓ License: AGPL-3.0",
  ];

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "36px", width: "100%" }}>
        <div
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#00F0FF",
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          🎯 কেন এটি সবার সেরা?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "900px" }}>
          {highlights.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "28px 36px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
                color: "#FFFFFF",
                fontSize: "30px",
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </ZoomScene>
  );
};

// Scene 5: Outro CTA (GitHub link in comments)
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = Math.sin(frame / 5) * 12;

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", textAlign: "center" }}>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.3,
          }}
        >
          আজই ব্যবহার শুরু করুন!
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "36px 50px",
            background: "rgba(0, 240, 255, 0.1)",
            border: "2px solid #00F0FF",
            borderRadius: "30px",
            boxShadow: "0 0 40px rgba(0, 240, 255, 0.4)",
          }}
        >
          <div style={{ fontSize: "50px", transform: `translateY(${bounce}px)` }}>👇</div>
          <div
            style={{
              color: "#00F0FF",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            📌 GitHub Repository লিংক কমেন্টে!
          </div>
        </div>

        <div
          style={{
            color: "#93C5FD",
            fontSize: "26px",
            fontWeight: 500,
            letterSpacing: "2px",
          }}
        >
          LIKE & SUBSCRIBE 🚀
        </div>
      </div>
    </ZoomScene>
  );
};

interface CaptionChunk {
  start: number;
  duration: number;
  text: string;
}

const CAPTION_CHUNKS: CaptionChunk[] = [
  { start: 0, duration: 90, text: "ElevenLabs-কে বিদায় জানান!" },
  { start: 90, duration: 90, text: "সাবস্ক্রিপশনের টাকা খরচ ছাড়াই" },
  { start: 180, duration: 90, text: "ভয়েস ক্লোন ও ভিডিও ডাবিং" },
  { start: 270, duration: 90, text: "অডিওবুক তৈরি করুন সহজেই" },
  { start: 360, duration: 90, text: "পুরো সিস্টেম নিজের পিসিতে" },
  { start: 450, duration: 90, text: "লোকালি চালানো যায় একদম ফ্রি" },
  { start: 540, duration: 90, text: "ডেডিকেটেড জিপিইউ লাগবে না" },
  { start: 630, duration: 90, text: "সিপিইউ দিয়েও চালাতে পারেন" },
  { start: 720, duration: 90, text: "এটি সম্পূর্ণ ওপেন সোর্স" },
  { start: 810, duration: 90, text: "এজিপিএল থ্রি পয়েন্ট জিরো" },
  { start: 900, duration: 145, text: "ডেটা প্রাইভেসির পূর্ণ স্বাধীনতা" },
  { start: 1045, duration: 200, text: "গিটহাব লিংক কমেন্টে দেওয়া আছে!" },
];

const SubtitlesOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  const currentChunk = CAPTION_CHUNKS.find(
    (chunk) => frame >= chunk.start && frame < chunk.start + chunk.duration
  );

  if (!currentChunk) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "160px",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "rgba(5, 8, 20, 0.85)",
          border: "2px solid rgba(0, 240, 255, 0.4)",
          borderRadius: "20px",
          padding: "16px 36px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            fontSize: "48px",
            fontWeight: 700,
            color: "#FFFFFF",
            textShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
            lineHeight: 1.3,
          }}
        >
          {currentChunk.text}
        </div>
      </div>
    </div>
  );
};

export const VoiceStudioShortComposition: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        width: "1080px",
        height: "1920px",
        backgroundColor: "#050814",
        overflow: "hidden",
      }}
    >
      {/* Google Fonts Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&family=Inter:wght@400;600;700;900&display=swap');
        `}
      </style>

      <TechBackground />

      {/* Voiceover Audio */}
      <Audio src={staticFile("voicestudio-voice.mp3")} volume={1.0} />

      {/* Scene 1: Hook (0 - 220 frames) */}
      <Sequence durationInFrames={220}>
        <HookScene />
      </Sequence>

      {/* Scene 2: Features (220 - 520 frames) */}
      <Sequence from={220} durationInFrames={300}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 3: Product Reveal (520 - 750 frames) */}
      <Sequence from={520} durationInFrames={230}>
        <ProductRevealScene />
      </Sequence>

      {/* Scene 4: Highlights (750 - 1045 frames) */}
      <Sequence from={750} durationInFrames={295}>
        <HighlightsScene />
      </Sequence>

      {/* Scene 5: Outro CTA (1045 - 1245 frames) */}
      <Sequence from={1045} durationInFrames={200}>
        <OutroScene />
      </Sequence>

      {/* Subtitles Overlay */}
      <SubtitlesOverlay />
    </div>
  );
};

export const VoiceStudioShortRoot = () => {
  return (
    <Composition
      id="VoiceStudioShort"
      component={VoiceStudioShortComposition}
      durationInFrames={1245}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
