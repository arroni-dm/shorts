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

interface DocChapter {
  startSec: number;
  endSec: number;
  year: string;
  eraBadge: string;
  title: string;
  subtitle: string;
  statLabel: string;
  accentColor: string;
  bgGradient: string;
  iconType:
    | "skull"
    | "treaty"
    | "crisis"
    | "dictator"
    | "expansion"
    | "blitz"
    | "london"
    | "barbarossa"
    | "pearlharbor"
    | "holocaust"
    | "stalingrad"
    | "dday"
    | "berlin"
    | "atomic"
    | "surrender"
    | "coldwar"
    | "question";
}

const CHAPTERS: DocChapter[] = [
  {
    startSec: 0,
    endSec: 95,
    year: "১৯৩৯ – ১৯৪৫",
    eraBadge: "ভূমিকা | ইতিহাসের ভয়াবহতম অধ্যায়",
    title: "দ্বিতীয় বিশ্বযুদ্ধ: এক মহাপ্রলয়ের গল্প",
    subtitle: "প্রাণ হারিয়েছিল ৭ থেকে ৮ কোটি মানুষ • জড়িয়ে পড়ে ৫০টিরও বেশি দেশ",
    statLabel: "৭–৮ কোটি প্রাণহানি",
    accentColor: "#EF4444",
    bgGradient: "radial-gradient(circle at 25% 30%, #450A0A 0%, #090D16 100%)",
    iconType: "skull",
  },
  {
    startSec: 95,
    endSec: 165,
    year: "১৯১৮ – ১৯১৯",
    eraBadge: "অধ্যায় ১ | যুদ্ধের বীজ বপন",
    title: "ট্রিটি অফ ভার্সাই (Treaty of Versailles)",
    subtitle: "প্রথম বিশ্বযুদ্ধে জার্মানির পরাজয় এবং অপমানজনক ভার্সাই চুক্তির শর্ত",
    statLabel: "ভার্সাই প্রাসাদ • ১৯১৯",
    accentColor: "#F59E0B",
    bgGradient: "radial-gradient(circle at 25% 30%, #451A03 0%, #090D16 100%)",
    iconType: "treaty",
  },
  {
    startSec: 165,
    endSec: 225,
    year: "১৯২৩",
    eraBadge: "অধ্যায় ২ | অর্থনৈতিক মহাবিপর্যয়",
    title: "জার্মানির মুদ্রাস্ফীতি ও হতাশা",
    subtitle: "অর্থনীতি ভেঙে পড়া, বেকারত্ব এবং সাধারণ মানুষের তীব্র ক্ষোভ",
    statLabel: "অর্থনৈতিক ধস • ১৯২৩",
    accentColor: "#FB923C",
    bgGradient: "radial-gradient(circle at 25% 30%, #431407 0%, #090D16 100%)",
    iconType: "crisis",
  },
  {
    startSec: 225,
    endSec: 325,
    year: "১৯৩৩",
    eraBadge: "অধ্যায় ৩ | একনায়কতন্ত্রের উত্থান",
    title: "অ্যাডলফ হিটলার ও নাৎসি শাসন",
    subtitle: "চ্যান্সেলর হিসেবে ক্ষমতা গ্রহণ • গণতন্ত্র ধ্বংস ও একনায়কতন্ত্র প্রতিষ্ঠা",
    statLabel: "৩০ জানুয়ারি ১৯৩৩",
    accentColor: "#DC2626",
    bgGradient: "radial-gradient(circle at 25% 30%, #4C0519 0%, #090D16 100%)",
    iconType: "dictator",
  },
  {
    startSec: 325,
    endSec: 375,
    year: "১৯৩৮",
    eraBadge: "অধ্যায় ৪ | সাম্রাজ্য বিস্তার",
    title: "অস্ট্রিয়া ও চেকোস্লোভাকিয়া দখল",
    subtitle: "মিউনিখ সমঝোতা এবং ইউরোপের শক্তিগুলোর যুদ্ধ এড়ানোর ব্যর্থ চেষ্টা",
    statLabel: "ইউরোপে উত্তেজনা • ১৯৩৮",
    accentColor: "#EAB308",
    bgGradient: "radial-gradient(circle at 25% 30%, #422006 0%, #090D16 100%)",
    iconType: "expansion",
  },
  {
    startSec: 375,
    endSec: 475,
    year: "১৯৩৯ – ১৯৪০",
    eraBadge: "অধ্যায় ৫ | যুদ্ধের সূচনা",
    title: "পোল্যান্ড আক্রমণ ও ব্লিৎসক্রিগ",
    subtitle: "১ সেপ্টেম্বর ১৯৩৯ যুদ্ধ শুরু • ডেনমার্ক, নরওয়ে ও ফ্রান্সের পতন",
    statLabel: "১ সেপ্টেম্বর ১৯৩৯",
    accentColor: "#EF4444",
    bgGradient: "radial-gradient(circle at 25% 30%, #3F0E1D 0%, #090D16 100%)",
    iconType: "blitz",
  },
  {
    startSec: 475,
    endSec: 525,
    year: "১৯৪০",
    eraBadge: "অধ্যায় ৬ | আকাশযুদ্ধ",
    title: "ব্যাটল অফ ব্রিটেন ও লন্ডন ব্লিৎস",
    subtitle: "রয়্যাল এয়ার ফোর্সের (RAF) প্রতিরোধ • বোমাবর্ষণের মুখেও ব্রিটেনের অটল মনোবল",
    statLabel: "জুলাই ১৯৪০ • RAF",
    accentColor: "#38BDF8",
    bgGradient: "radial-gradient(circle at 25% 30%, #0C4A6E 0%, #090D16 100%)",
    iconType: "london",
  },
  {
    startSec: 525,
    endSec: 565,
    year: "১৯৪১ (জুন)",
    eraBadge: "অধ্যায় ৭ | পূর্ব ফ্রন্ট",
    title: "অপারেশন বারবারোসা",
    subtitle: "চুক্তি ভেঙে সোভিয়েত ইউনিয়নে ৩০ লক্ষ অক্ষশক্তি সৈন্যের বিশাল আক্রমণ",
    statLabel: "২২ জুন ১৯৪১",
    accentColor: "#F97316",
    bgGradient: "radial-gradient(circle at 25% 30%, #451A03 0%, #090D16 100%)",
    iconType: "barbarossa",
  },
  {
    startSec: 565,
    endSec: 605,
    year: "১৯৪১ (ডিসেম্বর)",
    eraBadge: "অধ্যায় ৮ | বৈশ্বিক যুদ্ধ",
    title: "পার্ল হারবার আক্রমণ",
    subtitle: "৭ ডিসেম্বর ১৯৪১ জাপানের হামলা • যুক্তরাষ্ট্রের যুদ্ধে প্রবেশ (অ্যাক্সিস বনাম অ্যালাইজ)",
    statLabel: "৭ ডিসেম্বর ১৯৪১",
    accentColor: "#F43F5E",
    bgGradient: "radial-gradient(circle at 25% 30%, #4C0519 0%, #090D16 100%)",
    iconType: "pearlharbor",
  },
  {
    startSec: 605,
    endSec: 655,
    year: "১৯৪১ – ১৯৪৫",
    eraBadge: "অধ্যায় ৯ | মানবতার কলঙ্ক",
    title: "হলোকাস্ট (The Holocaust)",
    subtitle: "পরিকল্পিত গণহত্যায় প্রায় ৬০ লক্ষ ইহুদি ও লক্ষ লক্ষ নিরীহ মানুষের মৃত্যু",
    statLabel: "৬০ লক্ষ প্রাণহানি",
    accentColor: "#A855F7",
    bgGradient: "radial-gradient(circle at 25% 30%, #2E1065 0%, #090D16 100%)",
    iconType: "holocaust",
  },
  {
    startSec: 655,
    endSec: 688,
    year: "১৯৪২ – ১৯৪৩",
    eraBadge: "অধ্যায় ১০ | যুদ্ধের মোড় পরিবর্তন",
    title: "স্টালিনগ্রাদের রক্তক্ষয়ী যুদ্ধ",
    subtitle: "জার্মান সিক্সথ আর্মির আত্মসমর্পণ এবং প্রশান্ত মহাসাগরে যুক্তরাষ্ট্রের অগ্রগতি",
    statLabel: "ফেব্রুয়ারি ১৯৪৩",
    accentColor: "#22D3EE",
    bgGradient: "radial-gradient(circle at 25% 30%, #164E63 0%, #090D16 100%)",
    iconType: "stalingrad",
  },
  {
    startSec: 688,
    endSec: 718,
    year: "১৯৪৪ (জুন)",
    eraBadge: "অধ্যায় ১১ | মিত্রবাহিনীর প্রত্যাঘাত",
    title: "অপারেশন ওভারলর্ড (D-Day)",
    subtitle: "৬ জুন ১৯৪৪ নরম্যান্ডি উপকূলে অবতরণ • দুই দিক থেকে ঘেরাও জার্মানি",
    statLabel: "৬ জুন ১৯৪৪ • D-Day",
    accentColor: "#10B981",
    bgGradient: "radial-gradient(circle at 25% 30%, #064E3B 0%, #090D16 100%)",
    iconType: "dday",
  },
  {
    startSec: 718,
    endSec: 745,
    year: "১৯৪৫ (এপ্রিল-মে)",
    eraBadge: "অধ্যায় ১২ | ইউরোপে যুদ্ধের সমাপ্তি",
    title: "বার্লিনের পতন ও জার্মানির আত্মসমর্পণ",
    subtitle: "৩০ এপ্রিল হিটলারের আত্মহত্যা • ৮ মে ১৯৪৫ ইউরোপে যুদ্ধের অবসান",
    statLabel: "৮ মে ১৯৪৫ • VE Day",
    accentColor: "#FBBF24",
    bgGradient: "radial-gradient(circle at 25% 30%, #451A03 0%, #090D16 100%)",
    iconType: "berlin",
  },
  {
    startSec: 745,
    endSec: 775,
    year: "১৯৪৫ (আগস্ট)",
    eraBadge: "অধ্যায় ১৩ | পারমাণবিক যুগ",
    title: "হিরোশিমা ও নাগাসাকি",
    subtitle: "৬ ও ৯ আগস্ট পারমাণবিক বোমা নিক্ষেপ • মুহূর্তেই ধ্বংস দুই শহর",
    statLabel: "৬ ও ৯ আগস্ট ১৯৪৫",
    accentColor: "#EF4444",
    bgGradient: "radial-gradient(circle at 25% 30%, #450A0A 0%, #090D16 100%)",
    iconType: "atomic",
  },
  {
    startSec: 775,
    endSec: 792,
    year: "১৯৪৫ (সেপ্টেম্বর)",
    eraBadge: "অধ্যায় ১৪ | বিশ্বযুদ্ধের সমাপ্তি",
    title: "জাপানের আত্মসমর্পণ",
    subtitle: "১৫ আগস্ট ঘোষণা ও ২ সেপ্টেম্বর ১৯৪৫ আনুষ্ঠানিক চুক্তি স্বাক্ষর",
    statLabel: "২ সেপ্টেম্বর ১৯৪৫",
    accentColor: "#34D399",
    bgGradient: "radial-gradient(circle at 25% 30%, #064E3B 0%, #090D16 100%)",
    iconType: "surrender",
  },
  {
    startSec: 792,
    endSec: 806,
    year: "১৯৪৫ – ১৯৪৭",
    eraBadge: "অধ্যায় ১৫ | নতুন বিশ্বব্যবস্থা",
    title: "জাতিসংঘ, স্বাধীনতা ও কোল্ড ওয়ার",
    subtitle: "উপনিবেশবাদের পতন, ভারত-পাকিস্তান স্বাধীনতা এবং স্নায়ুযুদ্ধের সূচনা",
    statLabel: "United Nations • ১৯৪৫",
    accentColor: "#60A5FA",
    bgGradient: "radial-gradient(circle at 25% 30%, #1E3A8A 0%, #090D16 100%)",
    iconType: "coldwar",
  },
  {
    startSec: 806,
    endSec: 820,
    year: "উপসংহার",
    eraBadge: "ইতিহাসের শিক্ষা",
    title: "মানুষ কি ইতিহাস থেকে শিক্ষা নেয়?",
    subtitle: "যুদ্ধ শেষ হতে পারে, কিন্তু যুদ্ধের ক্ষত কখনো সহজে শেষ হয় না।",
    statLabel: "শান্তি বনাম ধ্বংস",
    accentColor: "#F59E0B",
    bgGradient: "radial-gradient(circle at 25% 30%, #1F2937 0%, #05070E 100%)",
    iconType: "question",
  },
];

const ChapterIcon: React.FC<{
  type: DocChapter["iconType"];
  color: string;
  frame: number;
}> = ({ type, color, frame }) => {
  const pulse = 1 + Math.sin(frame / 15) * 0.04;

  return (
    <svg
      width="240"
      height="240"
      viewBox="0 0 120 120"
      style={{ transform: `scale(${pulse})` }}
    >
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="rgba(255,255,255,0.04)"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      {type === "atomic" || type === "skull" ? (
        <>
          <circle cx="60" cy="60" r="10" fill={color} />
          <path d="M60 44 L44 22 A36 36 0 0 1 76 22 Z" fill={color} />
          <path d="M46 68 L22 76 A36 36 0 0 0 38 96 Z" fill={color} />
          <path d="M74 68 L98 76 A36 36 0 0 1 82 96 Z" fill={color} />
        </>
      ) : type === "treaty" || type === "surrender" ? (
        <>
          <rect x="34" y="24" width="52" height="72" rx="6" fill="none" stroke={color} strokeWidth="4" />
          <line x1="44" y1="42" x2="76" y2="42" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="44" y1="56" x2="76" y2="56" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="44" y1="70" x2="64" y2="70" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="72" cy="78" r="8" fill={color} />
        </>
      ) : type === "blitz" || type === "barbarossa" || type === "dday" ? (
        <>
          <polygon points="65,20 35,65 58,65 50,100 85,52 62,52" fill={color} />
        </>
      ) : type === "coldwar" ? (
        <>
          <circle cx="60" cy="60" r="34" fill="none" stroke={color} strokeWidth="3.5" />
          <ellipse cx="60" cy="60" rx="16" ry="34" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="26" y1="60" x2="94" y2="60" stroke="#FFFFFF" strokeWidth="2.5" />
        </>
      ) : (
        <>
          <polygon
            points="60,22 70,46 96,48 76,65 82,91 60,77 38,91 44,65 24,48 50,46"
            fill="none"
            stroke={color}
            strokeWidth="4"
          />
          <circle cx="60" cy="60" r="10" fill={color} />
        </>
      )}
    </svg>
  );
};

export const WW2Documentary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const currentSec = frame / fps;

  // Part 1 ends at 655.13s (19654 frames), Part 2 starts right after
  const part1Frames = Math.round(655.13 * fps);

  const activeIndex = Math.max(
    0,
    CHAPTERS.findIndex((c) => currentSec >= c.startSec && currentSec < c.endSec)
  );
  const chapter = CHAPTERS[activeIndex] ?? CHAPTERS[CHAPTERS.length - 1];
  const chapterStartFrame = Math.round(chapter.startSec * fps);
  const localFrame = Math.max(0, frame - chapterStartFrame);

  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const slideUp = interpolate(localFrame, [0, 15], [30, 0], {
    extrapolateRight: "clamp",
  });
  const fadeIn = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const overallProgress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: chapter.bgGradient,
        fontFamily,
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Part 1 Audio (0s -> 655.13s) */}
      <Sequence from={0} durationInFrames={part1Frames}>
        <Audio src={staticFile("part-1.mp3.wav")} volume={1} />
      </Sequence>

      {/* Part 2 Audio (655.13s -> End) */}
      <Sequence from={part1Frames}>
        <Audio src={staticFile("part-2.mp3.wav")} volume={1} />
      </Sequence>

      {/* Subtle Chapter Transition Whoosh SFX */}
      {CHAPTERS.map((ch, i) =>
        i === 0 ? null : (
          <Sequence
            key={i}
            from={Math.round(ch.startSec * fps)}
            durationInFrames={15}
          >
            <Audio src={staticFile("sfx-whoosh.wav")} volume={0.22} />
          </Sequence>
        )
      )}

      {/* Subtle Grid Pattern Overlay */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Documentary Header & Chapter Counter */}
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
            padding: "10px 28px",
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.08)",
            border: `1.5px solid ${chapter.accentColor}`,
            fontSize: 28,
            fontWeight: 600,
            color: chapter.accentColor,
          }}
        >
          {chapter.eraBadge}
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          অধ্যায় {activeIndex + 1} / {CHAPTERS.length}
        </div>
      </div>

      {/* Main 16:9 Split Content Area */}
      <div
        style={{
          position: "absolute",
          top: 180,
          bottom: 160,
          left: 90,
          right: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 70,
        }}
      >
        {/* Left Visual Glass Card */}
        <div
          style={{
            width: 540,
            height: 620,
            borderRadius: 36,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            border: `2px solid rgba(255,255,255,0.12)`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.03)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            transform: `scale(${cardSpring})`,
          }}
        >
          <ChapterIcon
            type={chapter.iconType}
            color={chapter.accentColor}
            frame={localFrame}
          />
          <div
            style={{
              marginTop: 36,
              padding: "12px 32px",
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.08)",
              border: `1px solid ${chapter.accentColor}`,
              fontSize: 32,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            {chapter.statLabel}
          </div>
        </div>

        {/* Right Editorial Typography Panel */}
        <div
          style={{
            flex: 1,
            opacity: fadeIn,
            transform: `translateY(${slideUp}px)`,
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: chapter.accentColor,
              letterSpacing: 1,
              marginBottom: 14,
            }}
          >
            {chapter.year}
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 32,
              textShadow: "0 8px 30px rgba(0,0,0,0.5)",
            }}
          >
            {chapter.title}
          </div>

          <div
            style={{
              width: 140,
              height: 6,
              borderRadius: 99,
              backgroundColor: chapter.accentColor,
              marginBottom: 32,
            }}
          />

          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            {chapter.subtitle}
          </div>
        </div>
      </div>

      {/* Bottom Timeline Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 90,
          right: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 12,
          }}
        >
          <span>দ্বিতীয় বিশ্বযুদ্ধের পূর্ণাঙ্গ ইতিহাস (১৯৩৯–১৯৪৫)</span>
          <span>{Math.round(overallProgress)}% সম্পন্ন</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 10,
            borderRadius: 99,
            backgroundColor: "rgba(255,255,255,0.14)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${overallProgress}%`,
              height: "100%",
              backgroundColor: chapter.accentColor,
              borderRadius: 99,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default WW2Documentary;