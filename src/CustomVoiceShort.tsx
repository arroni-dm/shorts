import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/HindSiliguri";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "700"],
  subsets: ["bengali"],
});

interface SlideData {
  startSec: number;
  endSec: number;
  badge: string;
  headline: string;
  caption: string;
  bgGradient: string;
  iconType: "book" | "compare" | "target" | "crown";
}

const SLIDES: SlideData[] = [
  {
    startSec: 0,
    endSec: 7.5,
    badge: "তথ্য বনাম প্রজ্ঞা",
    headline: "তথ্য নয়, প্রজ্ঞা খুঁজুন",
    caption: "ইন্টারনেট আপনাকে তথ্য দিতে পারে,\nকিন্তু বই আপনাকে প্রজ্ঞা দেয়।",
    bgGradient: "radial-gradient(circle at 50% 35%, #5B21B6 0%, #1E1B4B 100%)",
    iconType: "book",
  },
  {
    startSec: 7.5,
    endSec: 16.5,
    badge: "ধাপ ১ / ৩",
    headline: "৩ মিনিট বনাম ৩০০ পৃষ্ঠা",
    caption: "সার্চ করে জানা আর বই পড়ে\nগভীর জ্ঞান অর্জনে বিশাল পার্থক্য।",
    bgGradient: "radial-gradient(circle at 50% 35%, #0F766E 0%, #042F2E 100%)",
    iconType: "compare",
  },
  {
    startSec: 16.5,
    endSec: 23.5,
    badge: "ধাপ ২ / ৩",
    headline: "গভীর মনোযোগের শক্তি",
    caption: "স্কিমিং বা তথ্য সংগ্রহের যুগে\nগভীরে যাওয়ার অভ্যাস কমে যাচ্ছে।",
    bgGradient: "radial-gradient(circle at 50% 35%, #B45309 0%, #271300 100%)",
    iconType: "target",
  },
  {
    startSec: 23.5,
    endSec: 32,
    badge: "ধাপ ৩ / ৩",
    headline: "বই পড়ার অভ্যাস গড়ুন",
    caption: "চিন্তার পরিধি বাড়াতে রিলসের চেয়ে\nবই পড়ার অভ্যাস বহুগুণ এগিয়ে।",
    bgGradient: "radial-gradient(circle at 50% 35%, #1D4ED8 0%, #090D16 100%)",
    iconType: "crown",
  },
];

const HeroIcon: React.FC<{ type: SlideData["iconType"]; frame: number }> = ({
  type,
  frame,
}) => {
  const floatY = Math.sin(frame / 12) * 8;

  if (type === "book") {
    return (
      <svg
        width="210"
        height="210"
        viewBox="0 0 120 120"
        style={{ transform: `translateY(${floatY}px)` }}
      >
        <path
          d="M60 32 C42 24, 20 26, 12 32 L12 88 C20 82, 42 80, 60 88 C78 80, 100 82, 108 88 L108 32 C100 26, 78 24, 60 32 Z"
          fill="#FBBF24"
          stroke="#FEF3C7"
          strokeWidth="3"
        />
        <line x1="60" y1="32" x2="60" y2="88" stroke="#92400E" strokeWidth="3" />
        <circle cx="60" cy="14" r="4" fill="#FDE047" />
        <circle cx="38" cy="18" r="3" fill="#FDE047" />
        <circle cx="82" cy="18" r="3" fill="#FDE047" />
      </svg>
    );
  }

  if (type === "compare") {
    return (
      <svg
        width="220"
        height="220"
        viewBox="0 0 120 120"
        style={{ transform: `translateY(${floatY}px)` }}
      >
        {/* Left Magnifying Glass */}
        <circle cx="34" cy="58" r="16" fill="none" stroke="#38BDF8" strokeWidth="5" />
        <line x1="45" y1="70" x2="56" y2="82" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
        {/* Right Tall Stack of Books */}
        <rect x="66" y="76" width="42" height="12" rx="3" fill="#F43F5E" />
        <rect x="68" y="62" width="38" height="12" rx="3" fill="#FBBF24" />
        <rect x="65" y="48" width="44" height="12" rx="3" fill="#34D399" />
        <rect x="69" y="34" width="36" height="12" rx="3" fill="#A78BFA" />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg
        width="210"
        height="210"
        viewBox="0 0 120 120"
        style={{ transform: `translateY(${floatY}px)` }}
      >
        <circle cx="60" cy="60" r="42" fill="#FFFFFF" />
        <circle cx="60" cy="60" r="30" fill="#EF4444" />
        <circle cx="60" cy="60" r="18" fill="#FFFFFF" />
        <circle cx="60" cy="60" r="8" fill="#F59E0B" />
        <line x1="95" y1="25" x2="62" y2="58" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      width="210"
      height="210"
      viewBox="0 0 120 120"
      style={{ transform: `translateY(${floatY}px)` }}
    >
      <path d="M35 45 L45 25 L60 38 L75 25 L85 45 Z" fill="#FACC15" />
      <rect x="30" y="54" width="60" height="13" rx="3" fill="#60A5FA" />
      <rect x="26" y="69" width="68" height="13" rx="3" fill="#FBBF24" />
      <rect x="32" y="84" width="56" height="13" rx="3" fill="#34D399" />
    </svg>
  );
};

export const CustomVoiceShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const currentSec = frame / fps;

  const activeIndex = Math.max(
    0,
    SLIDES.findIndex((s) => currentSec >= s.startSec && currentSec < s.endSec)
  );
  const slide = SLIDES[activeIndex] ?? SLIDES[SLIDES.length - 1];
  const slideStartFrame = Math.round(slide.startSec * fps);
  const localFrame = Math.max(0, frame - slideStartFrame);

  const popScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const textOpacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textTranslateY = interpolate(localFrame, [0, 12], [24, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: slide.bgGradient,
        fontFamily,
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Audio src={staticFile("boi-pora.mp3")} volume={1} />

      {/* Top Story Segmented Progress Bar */}
      <div
        style={{
          position: "absolute",
          top: 90,
          width: 920,
          display: "flex",
          gap: 14,
        }}
      >
        {SLIDES.map((s, idx) => {
          const sStart = s.startSec * fps;
          const sEnd = Math.min(durationInFrames, s.endSec * fps);
          const progress =
            idx < activeIndex
              ? 100
              : idx > activeIndex
              ? 0
              : interpolate(frame, [sStart, sEnd], [0, 100], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 99,
                backgroundColor: "rgba(255,255,255,0.25)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 99,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Top Step Pill Badge */}
      <div
        style={{
          position: "absolute",
          top: 185,
          padding: "12px 36px",
          borderRadius: 999,
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          border: "1.5px solid rgba(255, 255, 255, 0.3)",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        {slide.badge}
      </div>

      {/* Center Hero Glass Circle */}
      <div
        style={{
          position: "absolute",
          top: 360,
          width: 400,
          height: 400,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          border: "3px solid rgba(255, 255, 255, 0.28)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${popScale})`,
        }}
      >
        <HeroIcon type={slide.iconType} frame={localFrame} />
      </div>

      {/* Center-Bottom Clean Typography */}
      <div
        style={{
          position: "absolute",
          top: 840,
          width: 900,
          textAlign: "center",
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: 28,
            textShadow: "0 6px 24px rgba(0,0,0,0.4)",
          }}
        >
          {slide.headline}
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 500,
            lineHeight: 1.45,
            color: "rgba(255, 255, 255, 0.92)",
            whiteSpace: "pre-line",
          }}
        >
          {slide.caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default CustomVoiceShort;