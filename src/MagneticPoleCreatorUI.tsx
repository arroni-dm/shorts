import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/HindSiliguri";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700"],
  subsets: ["bengali"],
});

interface Beat {
  start: number;
  end: number;
  theme: "yellow" | "black" | "cream";
  badge: string;
  headline: string;
  highlight: string;
  subtext: string;
  captionLine1: string;
  captionLine2: string;
  stamp?: string;
  cardType: "hook" | "layers" | "shield" | "slider" | "tug" | "reversals" | "laschamps" | "wmm" | "myth" | "outro";
}

const BEATS: Beat[] = [
  // SCENE 01: 00:00 - 00:45
  {
    start: 0,
    end: 18,
    theme: "yellow",
    badge: "SCENE 01 • THE HOOK",
    headline: "কম্পাস, বিমান ও স্যাটেলাইটে",
    highlight: "হঠাৎ অদ্ভুত বিপর্যয়!",
    subtext: "পৃথিবীর Magnetic Field-এ সত্যিই বড় পরিবর্তন ঘটছে",
    captionLine1: "হাতে থাকা কম্পাসটি উত্তর দিক দেখাচ্ছে না,",
    captionLine2: "স্যাটেলাইটগুলো রেডিয়েশনে ক্ষতিগ্রস্ত হচ্ছে!",
    cardType: "hook",
  },
  {
    start: 18,
    end: 45,
    theme: "black",
    badge: "3,000 KM DEEP",
    headline: "পায়ের ৩,০০০ কি.মি. নিচে",
    highlight: "গলিত লোহার বিশাল জগৎ",
    subtext: "উত্তর ও দক্ষিণ Magnetic Pole কি একদিন অবস্থান বদলে ফেলবে?",
    captionLine1: "পৃথিবীর উত্তর আর দক্ষিণ Magnetic Pole কি",
    captionLine2: "একদিন নিজেদের অবস্থান বদলে ফেলবে?",
    cardType: "layers",
  },

  // SCENE 02: 00:45 - 01:40
  {
    start: 45,
    end: 72,
    theme: "cream",
    badge: "EARTH STRUCTURE",
    headline: "পৃথিবীর প্রধান চারটি স্তর",
    highlight: "২,৯০০ কি.মি. গভীরে Outer Core",
    subtext: "Crust • Mantle • Outer Core • Inner Core",
    captionLine1: "পৃথিবীর প্রায় ২,৯০০ কিলোমিটার গভীরে রয়েছে",
    captionLine2: "গলিত আয়রন আর নিকেলের এক বিশাল স্তর।",
    cardType: "layers",
  },
  {
    start: 72,
    end: 100,
    theme: "cream",
    badge: "THE GEODYNAMO",
    headline: "চলমান গলিত ধাতু থেকেই তৈরি হয়",
    highlight: "Geodynamo ও অদৃশ্য ঢাল",
    subtext: "তাপ, ঘূর্ণন ও বৈদ্যুতিক প্রবাহের প্রাকৃতিক ইঞ্জিন",
    captionLine1: "বিজ্ঞানীরা এই প্রক্রিয়ার নাম দিয়েছেন জিওডায়নামো,",
    captionLine2: "যা আমাদের চারপাশে তৈরি করে অদৃশ্য ঢাল।",
    cardType: "shield",
  },

  // SCENE 03: 01:40 - 02:35
  {
    start: 100,
    end: 128,
    theme: "cream",
    badge: "COSMIC SHIELD",
    headline: "সূর্যের Charged Particles থেকে",
    highlight: "পৃথিবীকে রক্ষা করে Magnetic Shield",
    subtext: "বায়ুমণ্ডল ও ম্যাগনেটিক ফিল্ড মিলে তৈরি করে সুরক্ষা স্তর",
    captionLine1: "পৃথিবীর Magnetic Field এই Charged Particles-কে",
    captionLine2: "বাধা দেয় কিংবা অন্যদিকে সরিয়ে দেয়।",
    cardType: "shield",
  },
  {
    start: 128,
    end: 155,
    theme: "black",
    badge: "WEAK ZONE DETECTED",
    headline: "South Atlantic Anomaly:",
    highlight: "অদৃশ্য ঢালের দুর্বল অংশ",
    subtext: "দক্ষিণ আমেরিকা ও আটলান্টিকের ওপর Radiation-এর বাড়তি প্রভাব",
    stamp: "দুর্বল অঞ্চল!",
    captionLine1: "এর নাম South Atlantic Anomaly—অর্থাৎ",
    captionLine2: "পৃথিবীর অদৃশ্য ঢালে ইতিমধ্যেই দুর্বল জায়গা রয়েছে।",
    cardType: "shield",
  },

  // SCENE 04: 02:35 - 03:35
  {
    start: 155,
    end: 185,
    theme: "cream",
    badge: "GEOGRAPHIC VS MAGNETIC",
    headline: "দুটি North Pole এক জিনিস নয়",
    highlight: "Magnetic North Pole স্থির থাকে না",
    subtext: "Geographic North Pole স্থির, কিন্তু Magnetic Pole প্রতিনিয়ত চলমান",
    captionLine1: "জিওগ্রাফিক নর্থ পোল আর ম্যাগনেটিক নর্থ পোল",
    captionLine2: "এক জিনিস নয়—এটি স্থির থাকে না।",
    cardType: "slider",
  },
  {
    start: 185,
    end: 215,
    theme: "yellow",
    badge: "1831 → TODAY",
    headline: "১৮৩১ সাল থেকে আজ পর্যন্ত",
    highlight: "১,০০০+ কি.মি. সরে গেছে!",
    subtext: "কানাডার Arctic অঞ্চল থেকে রাশিয়ার সাইবেরিয়ার দিকে যাত্রা",
    captionLine1: "বর্তমানে এর অবস্থান কানাডার আর্কটিক অঞ্চল থেকে",
    captionLine2: "রাশিয়ার সাইবেরিয়ার দিকে সরে গেছে।",
    cardType: "slider",
  },

  // SCENE 05: 03:35 - 04:35
  {
    start: 215,
    end: 245,
    theme: "cream",
    badge: "CORE BOUNDARY",
    headline: "পৃথিবীর ভেতরে চলছে",
    highlight: "Magnetic Tug of War",
    subtext: "কানাডা ও সাইবেরিয়ার নিচের দুটি শক্তিশালী Magnetic Lobe-এর টানাপোড়েন",
    captionLine1: "দুই দিক থেকে দুই শক্তি যেন একটি বিন্দুকে",
    captionLine2: "নিজেদের দিকে টানছে—Tug of War-এর মতো।",
    cardType: "tug",
  },
  {
    start: 245,
    end: 275,
    theme: "cream",
    badge: "SATELLITE DATA",
    headline: "৩,০০০ কি.মি. নিচের খবর",
    highlight: "জানাচ্ছে মহাকাশের Satellite",
    subtext: "স্যাটেলাইট ও ম্যাগনেটিক মেজারমেন্টে ধরা পড়ছে কোর বাউন্ডারির পরিবর্তন",
    captionLine1: "পৃথিবীর প্রায় ৩ হাজার কিলোমিটার নিচে কী ঘটছে,",
    captionLine2: "তার উত্তর আসে মহাকাশের স্যাটেলাইটের মাধ্যমে।",
    cardType: "shield",
  },

  // SCENE 06: 04:35 - 05:35
  {
    start: 275,
    end: 305,
    theme: "black",
    badge: "83 MILLION YEARS",
    headline: "গত ৮৩ মিলিয়ন বছরে",
    highlight: "১৮৩ বার উল্টেছে Magnetic Pole!",
    subtext: "সমুদ্রের নিচের আগ্নেয় শিলায় সংরক্ষিত প্রাচীন ম্যাগনেটিক রেকর্ড",
    captionLine1: "গত প্রায় ৮৩ মিলিয়ন বছরে প্রায় ১৮৩টি",
    captionLine2: "Magnetic Reversal-এর প্রমাণ পাওয়া গেছে।",
    cardType: "reversals",
  },
  {
    start: 305,
    end: 335,
    theme: "cream",
    badge: "LAST REVERSAL",
    headline: "সর্বশেষ পূর্ণ Reversal ঘটেছিল",
    highlight: "প্রায় ৭,৮০,০০০ বছর আগে",
    subtext: "এটি এক রাতে ঘটে না—শত শত থেকে হাজার বছর সময় নেয়",
    stamp: "কোনো ক্যালেন্ডার নেই!",
    captionLine1: "এটি সিনেমার মতো এক রাতের মধ্যে ঘটে না—",
    captionLine2: "শত শত থেকে হাজার বছর ধরে ঘটে।",
    cardType: "reversals",
  },

  // SCENE 07: 05:35 - 06:35
  {
    start: 335,
    end: 365,
    theme: "cream",
    badge: "42,000 YEARS AGO",
    headline: "Laschamps Excursion:",
    highlight: "মারাত্মক দুর্বল হয়েছিল Magnetic Shield",
    subtext: "প্রাচীন গাছের গুঁড়ি ও বরফের স্তরে মিলেছে অস্থায়ী পরিবর্তনের প্রমাণ",
    captionLine1: "প্রায় ৪২,০০০ বছর আগে পৃথিবীর Magnetic Field",
    captionLine2: "মারাত্মকভাবে দুর্বল হয়ে পড়েছিল।",
    cardType: "laschamps",
  },
  {
    start: 365,
    end: 395,
    theme: "cream",
    badge: "SCIENTIFIC DEBATE",
    headline: "Neanderthal বিলুপ্তির কারণ কি",
    highlight: "শুধুই Magnetic Event?",
    subtext: "নিশ্চিত বৈজ্ঞানিক প্রমাণ নেই—বিষয়টি নিয়ে এখনো গবেষণা চলছে",
    stamp: "গবেষণা চলমান",
    captionLine1: "শুধু এই Magnetic Event-এর কারণেই বিলুপ্ত হয়েছিল—",
    captionLine2: "এমন নিশ্চিত বৈজ্ঞানিক প্রমাণ নেই।",
    cardType: "laschamps",
  },

  // SCENE 08: 06:35 - 07:35
  {
    start: 395,
    end: 425,
    theme: "cream",
    badge: "WMM 2025–2030",
    headline: "বিমান, জাহাজ ও স্মার্টফোনের জন্য",
    highlight: "World Magnetic Model আপডেট",
    subtext: "Magnetic Declination সামঞ্জস্য রাখতে নিয়মিত মডেল আপডেট হয়",
    captionLine1: "এই কাজের জন্য বিজ্ঞানীরা তৈরি করেন",
    captionLine2: "World Magnetic Model (WMM)।",
    cardType: "wmm",
  },
  {
    start: 425,
    end: 455,
    theme: "yellow",
    badge: "GPS VS COMPASS",
    headline: "GPS স্যাটেলাইট নির্ভর—",
    highlight: "Google Maps ভুল দেখাবে না!",
    subtext: "ফোনের কম্পাস ও GPS স্যাটেলাইট সম্পূর্ণ আলাদা প্রযুক্তিতে কাজ করে",
    captionLine1: "GPS নিজে Magnetic North Pole-এর ওপর নির্ভর করে না,",
    captionLine2: "তাই Google Maps হঠাৎ ভুল পথ দেখাবে না।",
    cardType: "wmm",
  },

  // SCENE 09: 07:35 - 08:40
  {
    start: 455,
    end: 488,
    theme: "black",
    badge: "NASA FACT CHECK",
    headline: "Magnetic Pole উল্টে গেলেই কি",
    highlight: "মানবসভ্যতা ধ্বংস হয়ে যাবে?",
    subtext: "NASA: Reversal চলাকালেও Magnetic Field পুরোপুরি অদৃশ্য হয় না",
    stamp: "গুজব বনাম বিজ্ঞান",
    captionLine1: "NASA-এর তথ্য অনুযায়ী, Reversal-এর সময়ও",
    captionLine2: "Magnetic Field সম্পূর্ণ অদৃশ্য হয়ে যায় না।",
    cardType: "myth",
  },
  {
    start: 488,
    end: 520,
    theme: "cream",
    badge: "NOAA 2025 REPORT",
    headline: "বর্তমানে এর গড় গতিবেগ",
    highlight: "বছরে প্রায় ৩৬ কিলোমিটার",
    subtext: "পরিবর্তনটি গুরুত্বপূর্ণ, তবে এটি পৃথিবী ধ্বংসের কোনো সংকেত নয়",
    captionLine1: "NOAA-এর ২০২৫ সালের রিপোর্টে এর গড় গতিবেগ",
    captionLine2: "প্রায় ৩৬ কিলোমিটার প্রতি বছর উল্লেখ করা হয়েছে।",
    cardType: "slider",
  },

  // SCENE 10: 08:40 - 10:00
  {
    start: 520,
    end: 560,
    theme: "cream",
    badge: "THE REAL CHALLENGE",
    headline: "Magnetic Pole-এর চেয়েও",
    highlight: "বড় বিপদ আমাদের নিজেদের তৈরি",
    subtext: "Climate Change, পরিবেশ দূষণ ও প্রযুক্তির ওপর অতিরিক্ত নির্ভরতা",
    captionLine1: "পৃথিবীর Magnetic Pole বদলানোর চেয়েও",
    captionLine2: "আমাদের নিজেদের তৈরি বিপদগুলো অনেক বেশি বাস্তব।",
    cardType: "outro",
  },
  {
    start: 560,
    end: 600,
    theme: "yellow",
    badge: "JOIN THE DISCUSSION",
    headline: "ভবিষ্যতে Magnetic Pole উল্টে গেলে",
    highlight: "মানবসভ্যতা কতটা প্রস্তুত থাকবে?",
    subtext: "কমেন্টে আপনার মতামত জানান • আরও বিজ্ঞান রহস্য জানতে Subscribe করুন",
    captionLine1: "কমেন্টে আপনার মতামত জানান এবং",
    captionLine2: "চ্যানেলটি Subscribe করে রাখুন!",
    cardType: "hook",
  },
];

const VisualCardRight: React.FC<{
  beat: Beat;
  localFrame: number;
  fps: number;
  isDark: boolean;
}> = ({ beat, localFrame, fps, isDark }) => {
  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const floatY = Math.sin(localFrame / 14) * 6;
  const cardBg = isDark ? "#1F2937" : "#FFFFFF";
  const borderCol = isDark ? "#FACC15" : "#111111";

  if (beat.cardType === "layers") {
    const layers = [
      { label: "CRUST (বাইরের শক্ত স্তর)", color: "#64748B", pct: 25 },
      { label: "MANTLE (মধ্যবর্তী স্তর)", color: "#EA580C", pct: 55 },
      { label: "OUTER CORE (গলিত লোহা - ২,৯০০ কি.মি.)", color: "#FACC15", pct: 95 },
      { label: "INNER CORE (কেন্দ্রস্থল)", color: "#EF4444", pct: 40 },
    ];
    return (
      <div
        style={{
          width: 680,
          backgroundColor: cardBg,
          border: `4px solid ${borderCol}`,
          borderRadius: 28,
          padding: "36px 40px",
          boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
          transform: `scale(${pop}) translateY(${floatY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: isDark ? "#FACC15" : "#D97706" }}>
          EARTH INTERNAL LAYERS
        </div>
        {layers.map((l, i) => {
          const w = interpolate(localFrame, [i * 4, i * 4 + 20], [0, l.pct], { extrapolateRight: "clamp" });
          return (
            <div key={i}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: isDark ? "#FFFFFF" : "#111111" }}>
                {l.label}
              </div>
              <div style={{ height: 16, backgroundColor: isDark ? "#374151" : "#E5E7EB", borderRadius: 99 }}>
                <div style={{ width: `${w}%`, height: "100%", backgroundColor: l.color, borderRadius: 99 }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (beat.cardType === "slider" || beat.cardType === "tug") {
    const pos = interpolate(localFrame, [0, 45], [15, 85], { extrapolateRight: "clamp" });
    return (
      <div
        style={{
          width: 680,
          backgroundColor: cardBg,
          border: `4px solid ${borderCol}`,
          borderRadius: 28,
          padding: "42px 44px",
          boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
          transform: `scale(${pop}) translateY(${floatY}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
          <span style={{ backgroundColor: "#3B82F6", color: "#FFFFFF", padding: "10px 24px", borderRadius: 999, fontSize: 26, fontWeight: 700 }}>
            কানাডা (১৮৩১)
          </span>
          <span style={{ backgroundColor: "#10B981", color: "#FFFFFF", padding: "10px 24px", borderRadius: 999, fontSize: 26, fontWeight: 700 }}>
            সাইবেরিয়া (আজ)
          </span>
        </div>
        <div style={{ height: 14, backgroundColor: "#E5E7EB", borderRadius: 99, position: "relative", marginBottom: 34 }}>
          <div
            style={{
              position: "absolute",
              left: `${pos}%`,
              top: -11,
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              border: "4px solid #FFFFFF",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          />
        </div>
        <div style={{ backgroundColor: "#FACC15", color: "#111111", padding: "16px 28px", borderRadius: 18, fontSize: 28, fontWeight: 700, textAlign: "center" }}>
          গতিবেগ: বছরে ~৩৬ কি.মি. (NOAA 2025)
        </div>
      </div>
    );
  }

  if (beat.cardType === "reversals") {
    const stripes = [1, -1, 1, 1, -1, -1, 1, -1, 1, -1, 1, 1];
    return (
      <div
        style={{
          width: 680,
          backgroundColor: cardBg,
          border: `4px solid ${borderCol}`,
          borderRadius: 28,
          padding: "38px 40px",
          boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
          transform: `scale(${pop}) translateY(${floatY}px)`,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: isDark ? "#FACC15" : "#111111", marginBottom: 24 }}>
          ১৮৩ বার মেরু পরিবর্তনের রেকর্ড (৮৩ মিলিয়ন বছর)
        </div>
        <div style={{ display: "flex", gap: 12, height: 180, alignItems: "center" }}>
          {stripes.map((s, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: s === 1 ? 165 : 115,
                borderRadius: 10,
                backgroundColor: s === 1 ? "#FACC15" : "#3B82F6",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default Clean Creator Emblem Card
  return (
    <div
      style={{
        width: 620,
        backgroundColor: cardBg,
        border: `4px solid ${borderCol}`,
        borderRadius: 32,
        padding: "46px 40px",
        boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
        transform: `scale(${pop}) translateY(${floatY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: "50%",
          border: "6px solid #FACC15",
          backgroundColor: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 26,
        }}
      >
        <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
      <div style={{ fontSize: 34, fontWeight: 700, color: isDark ? "#FACC15" : "#111111" }}>
        EARTH MAGNETOSPHERE
      </div>
      <div style={{ fontSize: 24, color: isDark ? "#D1D5DB" : "#4B5563", marginTop: 8 }}>
        পৃথিবীর অদৃশ্য সুরক্ষা কবচ
      </div>
    </div>
  );
};

export const MagneticPoleCreatorUI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;

  const idx = Math.max(
    0,
    BEATS.findIndex((b) => sec >= b.start && sec < b.end)
  );
  const beat = BEATS[idx] ?? BEATS[BEATS.length - 1];
  const localFrame = Math.max(0, frame - Math.round(beat.start * fps));

  const progressPct = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  // Creator-UI Tri-Tone Palette
  const isDark = beat.theme === "black";
  const bg =
    beat.theme === "yellow"
      ? "#FACC15"
      : beat.theme === "black"
      ? "#111111"
      : "#F7F5EE";
  const primaryText = isDark ? "#FFFFFF" : "#111111";
  const dotColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(17,17,17,0.06)";

  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  // Karaoke highlight split between Line 1 and Line 2
  const beatDuration = Math.max(1, beat.end - beat.start);
  const beatProgress = (sec - beat.start) / beatDuration;
  const line1Active = beatProgress < 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        fontFamily,
        color: primaryText,
        overflow: "hidden",
      }}
    >
      {/* Editorial Dot Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${dotColor} 2px, transparent 2px)`,
          backgroundSize: "38px 38px",
        }}
      />

      {/* Main Voiceover */}
      <Audio src={staticFile("magnatic-poll.wav")} volume={1} />

      {/* Subtle Ambient Bed */}
      <Audio src={staticFile("cinematic-bed.wav")} volume={0.09} loop />

      {/* Micro Pop & Whoosh SFX on Every Beat Switch */}
      {BEATS.map((b, i) => (
        <Sequence key={i} from={Math.round(b.start * fps)} durationInFrames={14}>
          <Audio src={staticFile(i === 0 ? "sfx-pop.wav" : "sfx-whoosh.wav")} volume={0.22} />
        </Sequence>
      ))}

      {/* TOP RETENTION PROGRESS BAR */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, backgroundColor: "rgba(0,0,0,0.08)", zIndex: 40 }}>
        <div style={{ width: `${progressPct}%`, height: "100%", backgroundColor: isDark ? "#FACC15" : "#EF4444" }} />
      </div>

      {/* PERSISTENT CREATOR HEADER (1920x1080) */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: "50%",
              border: "5px solid #D97706",
              backgroundColor: "#111111",
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
            }}
          >
            <Img src={staticFile("avatar.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div
            style={{
              backgroundColor: isDark ? "#FACC15" : "#111111",
              color: isDark ? "#111111" : "#FFFFFF",
              padding: "10px 26px",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {beat.badge}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#111111",
            color: "#FFFFFF",
            padding: "14px 32px",
            borderRadius: 999,
            fontSize: 26,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: isDark ? "2px solid #FACC15" : "none",
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <span>পৃথিবীর ভেতরে কী ঘটছে?</span>
        </div>
      </div>

      {/* WIDESCREEN SPLIT STAGE */}
      <div
        style={{
          position: "absolute",
          top: 175,
          bottom: 210,
          left: 72,
          right: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 54,
        }}
      >
        {/* Left Editorial Typography */}
        <div style={{ flex: 1, transform: `scale(${pop})` }}>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.25, marginBottom: 14 }}>
            {beat.headline}
          </div>

          <div
            style={{
              display: "inline-block",
              backgroundColor: beat.theme === "yellow" ? "#111111" : "#FACC15",
              color: beat.theme === "yellow" ? "#FACC15" : "#111111",
              padding: "10px 28px",
              borderRadius: 16,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {beat.highlight}
          </div>

          <div
            style={{
              fontSize: 30,
              lineHeight: 1.5,
              color: isDark ? "#D1D5DB" : "#374151",
              maxWidth: 880,
            }}
          >
            {beat.subtext}
          </div>

          {beat.stamp && (
            <div
              style={{
                display: "inline-block",
                marginTop: 26,
                backgroundColor: "#FFFFFF",
                border: "4px solid #EF4444",
                color: "#EF4444",
                padding: "8px 28px",
                borderRadius: 14,
                fontSize: 30,
                fontWeight: 700,
                transform: "rotate(-4deg)",
                boxShadow: "0 10px 20px rgba(239,68,68,0.2)",
              }}
            >
              {beat.stamp}
            </div>
          )}
        </div>

        {/* Right Interactive Data-Viz Card */}
        <VisualCardRight beat={beat} localFrame={localFrame} fps={fps} isDark={isDark} />
      </div>

      {/* BOTTOM FIT-CONTENT KARAOKE PILL CAPTION */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            width: "fit-content",
            maxWidth: "90%",
            backgroundColor: "rgba(17, 17, 17, 0.94)",
            padding: "16px 40px",
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 16px 36px rgba(0,0,0,0.28)",
          }}
        >
          <span
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: line1Active ? "#FACC15" : "#FFFFFF",
            }}
          >
            {beat.captionLine1}
          </span>
          <span
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: !line1Active ? "#FACC15" : "#FFFFFF",
            }}
          >
            {beat.captionLine2}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default MagneticPoleCreatorUI;