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

const VOICE_FILE = "magnatic-poll.wav";
const BGM_FILE = "cinematic-bed.wav";

interface Beat {
  start: number;
  end: number;
  chapter: string;
  tag: string;
  headline: string;
  subtext: string;
  statBig?: string;
  statLabel?: string;
  accent: string;
  visualType:
    | "earth-shield"
    | "core-layers"
    | "geodynamo"
    | "solar-wind"
    | "saa-map"
    | "pole-drift"
    | "tug-of-war"
    | "reversals"
    | "laschamps"
    | "wmm-gps"
    | "myth-vs-fact"
    | "conclusion";
}

const BEATS: Beat[] = [
  // SCENE 01: 00:00 - 00:45
  {
    start: 0,
    end: 20,
    chapter: "01 / THE INVISIBLE THREAT",
    tag: "MAGNETIC ANOMALY",
    headline: "কম্পাস, বিমান ও স্যাটেলাইটে\nহঠাৎ অদ্ভুত বিপর্যয়!",
    subtext: "পৃথিবীর অদৃশ্য Magnetic Shield-এ সত্যিই ঘটছে বড় পরিবর্তন",
    accent: "#38BDF8",
    visualType: "earth-shield",
  },
  {
    start: 20,
    end: 45,
    chapter: "01 / THE INVISIBLE THREAT",
    tag: "DEEP INSIDE EARTH",
    headline: "পায়ের ৩,০০০ কি.মি. নিচে\nগলিত লোহার বিশাল জগৎ",
    subtext: "উত্তর ও দক্ষিণ Magnetic Pole কি একদিন অবস্থান বদলে ফেলবে?",
    statBig: "3,000 KM",
    statLabel: "গভীরে গলিত লোহার স্তর",
    accent: "#F59E0B",
    visualType: "core-layers",
  },

  // SCENE 02: 00:45 - 01:40
  {
    start: 45,
    end: 72,
    chapter: "02 / INSIDE THE EARTH",
    tag: "EARTH STRUCTURE",
    headline: "পৃথিবীর প্রধান চারটি স্তর:\nCrust • Mantle • Outer & Inner Core",
    subtext: "২,৯০০ কি.মি. গভীরে গলিত Iron ও Nickel-এর উত্তাল সমুদ্র",
    statBig: "2,900 KM",
    statLabel: "OUTER CORE DEPTH",
    accent: "#FB923C",
    visualType: "core-layers",
  },
  {
    start: 72,
    end: 100,
    chapter: "02 / INSIDE THE EARTH",
    tag: "THE GEODYNAMO",
    headline: "চলমান গলিত ধাতুই তৈরি করে\nপৃথিবীর অদৃশ্য ঢাল",
    subtext: "তাপ, ঘূর্ণন ও বৈদ্যুতিক প্রবাহের এই প্রক্রিয়ার নাম Geodynamo",
    statBig: "GEODYNAMO",
    statLabel: "NATURAL MAGNETIC ENGINE",
    accent: "#38BDF8",
    visualType: "geodynamo",
  },

  // SCENE 03: 01:40 - 02:35
  {
    start: 100,
    end: 128,
    chapter: "03 / COSMIC SHIELD",
    tag: "SOLAR WIND DEFENSE",
    headline: "সূর্যের Charged Particles ও\nCosmic Radiation থেকে সুরক্ষা",
    subtext: "Magnetic Field এবং বায়ুমণ্ডল মিলে রক্ষা করে পৃথিবীর জীবন",
    accent: "#22D3EE",
    visualType: "solar-wind",
  },
  {
    start: 128,
    end: 155,
    chapter: "03 / COSMIC SHIELD",
    tag: "WEAK ZONE DETECTED",
    headline: "South Atlantic Anomaly:\nঅদৃশ্য ঢালের দুর্বল অংশ",
    subtext: "দক্ষিণ আমেরিকা ও আটলান্টিকের ওপর স্যাটেলাইটে বাড়তি Radiation প্রভাব",
    statBig: "SAA ZONE",
    statLabel: "WEAK MAGNETIC REGION",
    accent: "#EF4444",
    visualType: "saa-map",
  },

  // SCENE 04: 02:35 - 03:35
  {
    start: 155,
    end: 185,
    chapter: "04 / SHIFTING NORTH POLE",
    tag: "GEOGRAPHIC VS MAGNETIC",
    headline: "Geographic North Pole বনাম\nMagnetic North Pole",
    subtext: "ভৌগোলিক উত্তর মেরু স্থির, কিন্তু Magnetic North Pole প্রতিনিয়ত চলমান",
    accent: "#60A5FA",
    visualType: "pole-drift",
  },
  {
    start: 185,
    end: 215,
    chapter: "04 / SHIFTING NORTH POLE",
    tag: "1831 → TODAY",
    headline: "কানাডার Arctic থেকে\nরাশিয়ার সাইবেরিয়ার পথে!",
    subtext: "১৮৩১ সালে James Clark Ross শনাক্ত করার পর হাজার কি.মি. সরে গেছে",
    statBig: "1,000+ KM",
    statLabel: "DRIFT SINCE 1831",
    accent: "#F59E0B",
    visualType: "pole-drift",
  },

  // SCENE 05: 03:35 - 04:35
  {
    start: 215,
    end: 245,
    chapter: "05 / MAGNETIC TUG OF WAR",
    tag: "CORE BOUNDARY FORCES",
    headline: "পৃথিবীর ভেতরে চলছে\nMagnetic Tug of War",
    subtext: "কানাডা ও সাইবেরিয়ার নিচের দুটি শক্তিশালী Magnetic Lobe-এর টানাপোড়েন",
    accent: "#38BDF8",
    visualType: "tug-of-war",
  },
  {
    start: 245,
    end: 275,
    chapter: "05 / MAGNETIC TUG OF WAR",
    tag: "ORBITAL OBSERVATION",
    headline: "৩,০০০ কি.মি. নিচের খবর\nজানাচ্ছে মহাকাশের Satellite",
    subtext: "স্যাটেলাইট ও ম্যাগনেটিক সেন্সরে ধরা পড়ছে কোর বাউন্ডারির পরিবর্তন",
    accent: "#818CF8",
    visualType: "earth-shield",
  },

  // SCENE 06: 04:35 - 05:35
  {
    start: 275,
    end: 305,
    chapter: "06 / POLE REVERSAL HISTORY",
    tag: "83 MILLION YEARS RECORD",
    headline: "পৃথিবীর ইতিহাসে ১৮৩ বার\nউল্টেছে Magnetic Pole!",
    subtext: "সমুদ্রের তলদেশের আগ্নেয় শিলায় সংরক্ষিত প্রাচীন ম্যাগনেটিক রেকর্ড",
    statBig: "183 TIMES",
    statLabel: "REVERSALS IN 83M YEARS",
    accent: "#F59E0B",
    visualType: "reversals",
  },
  {
    start: 305,
    end: 335,
    chapter: "06 / POLE REVERSAL HISTORY",
    tag: "NOT OVERNIGHT",
    headline: "সর্বশেষ পূর্ণ Reversal ঘটেছিল\nপ্রায় ৭,৮০,০০০ বছর আগে",
    subtext: "এটি এক রাতে ঘটে না—শত শত থেকে হাজার বছর সময় নেয়",
    statBig: "780,000 YRS",
    statLabel: "LAST FULL REVERSAL",
    accent: "#38BDF8",
    visualType: "reversals",
  },

  // SCENE 07: 05:35 - 06:35
  {
    start: 335,
    end: 365,
    chapter: "07 / 42,000 YEARS AGO",
    tag: "LASCHAMPS EXCURSION",
    headline: "৪২,০০০ বছর আগে মারাত্মক\nদুর্বল হয়েছিল Magnetic Shield",
    subtext: "প্রাচীন গাছের গুঁড়ি ও বরফের স্তরে মিলেছে Laschamps Excursion-এর প্রমাণ",
    statBig: "42,000 YRS",
    statLabel: "LASCHAMPS EXCURSION",
    accent: "#A78BFA",
    visualType: "laschamps",
  },
  {
    start: 365,
    end: 395,
    chapter: "07 / 42,000 YEARS AGO",
    tag: "SCIENTIFIC EVIDENCE",
    headline: "Neanderthal বিলুপ্তির কারণ কি\nশুধুই Magnetic Event?",
    subtext: "নিশ্চিত বৈজ্ঞানিক প্রমাণ নেই—বিষয়টি নিয়ে এখনো গবেষণা চলছে",
    accent: "#34D399",
    visualType: "laschamps",
  },

  // SCENE 08: 06:35 - 07:35
  {
    start: 395,
    end: 425,
    chapter: "08 / IMPACT ON DAILY LIFE",
    tag: "WORLD MAGNETIC MODEL",
    headline: "স্মার্টফোন, বিমান ও জাহাজের\nNavigation আপডেট রাখা জরুরি",
    subtext: "Magnetic Declination সামঞ্জস্য রাখতে আপডেট হয় World Magnetic Model",
    statBig: "WMM 2025",
    statLabel: "GLOBAL NAVIGATION STANDARD",
    accent: "#38BDF8",
    visualType: "wmm-gps",
  },
  {
    start: 425,
    end: 455,
    chapter: "08 / IMPACT ON DAILY LIFE",
    tag: "GPS VS COMPASS",
    headline: "GPS স্যাটেলাইট নির্ভর—\nGoogle Maps হঠাৎ ভুল দেখাবে না",
    subtext: "ফোনের কম্পাস ও GPS স্যাটেলাইট সম্পূর্ণ আলাদা প্রযুক্তিতে কাজ করে",
    accent: "#10B981",
    visualType: "wmm-gps",
  },

  // SCENE 09: 07:35 - 08:40
  {
    start: 455,
    end: 488,
    chapter: "09 / MYTH VS SCIENCE",
    tag: "NASA & NOAA FACTS",
    headline: "Magnetic Pole উল্টে গেলেই কি\nমানবসভ্যতা ধ্বংস হয়ে যাবে?",
    subtext: "NASA: Reversal চলাকালেও Magnetic Field পুরোপুরি অদৃশ্য হয়ে যায় না",
    accent: "#EF4444",
    visualType: "myth-vs-fact",
  },
  {
    start: 488,
    end: 520,
    chapter: "09 / MYTH VS SCIENCE",
    tag: "NOAA 2025 REPORT",
    headline: "বর্তমানে এর গড় গতিবেগ\nবছরে প্রায় ৩৬ কিলোমিটার",
    subtext: "পরিবর্তনটি গুরুত্বপূর্ণ, তবে এটি পৃথিবী ধ্বংসের কোনো সংকেত নয়",
    statBig: "36 KM / YR",
    statLabel: "CURRENT DRIFT SPEED",
    accent: "#10B981",
    visualType: "pole-drift",
  },

  // SCENE 10: 08:40 - 10:00
  {
    start: 520,
    end: 560,
    chapter: "10 / THE REAL THREAT",
    tag: "CLIMATE & ENVIRONMENT",
    headline: "Magnetic Pole-এর চেয়েও\nবড় বিপদ আমাদের নিজেদের তৈরি",
    subtext: "Climate Change, পরিবেশ দূষণ ও প্রযুক্তির অতিরিক্ত নির্ভরতা এখনই বড় চ্যালেঞ্জ",
    accent: "#F59E0B",
    visualType: "conclusion",
  },
  {
    start: 560,
    end: 600,
    chapter: "10 / CONCLUSION",
    tag: "JOIN THE DISCUSSION",
    headline: "ভবিষ্যতে Magnetic Pole উল্টে গেলে\nমানবসভ্যতা কতটা প্রস্তুত থাকবে?",
    subtext: "কমেন্টে আপনার মতামত জানান • আরও বিজ্ঞান রহস্য জানতে Subscribe করুন",
    accent: "#38BDF8",
    visualType: "earth-shield",
  },
];

const ScienceDiagram: React.FC<{
  type: Beat["visualType"];
  accent: string;
  localFrame: number;
  fps: number;
}> = ({ type, accent, localFrame, fps }) => {
  const pulse = 1 + Math.sin(localFrame / 14) * 0.03;
  const rot = (localFrame * 0.4) % 360;
  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  if (type === "core-layers") {
    const layers = [
      { r: 215, color: "#1E293B", border: "#64748B", label: "CRUST" },
      { r: 165, color: "#7C2D12", border: "#EA580C", label: "MANTLE" },
      { r: 112, color: "#D97706", border: "#FBBF24", label: "OUTER CORE (2,900 KM)" },
      { r: 54, color: "#FEF3C7", border: "#FFFFFF", label: "INNER CORE" },
    ];
    return (
      <div style={{ position: "relative", width: 480, height: 480, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop})` }}>
        {layers.map((l, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: l.r * 2,
              height: l.r * 2,
              borderRadius: "50%",
              backgroundColor: l.color,
              border: `3px solid ${l.border}`,
              boxShadow: i === 2 ? `0 0 55px ${accent}88` : "none",
              transform: i === 2 ? `scale(${pulse})` : "none",
            }}
          />
        ))}
        <div style={{ position: "absolute", bottom: -18, backgroundColor: "#0F172A", border: `1px solid ${accent}`, padding: "6px 18px", borderRadius: 99, fontSize: 18, color: accent, fontWeight: 700 }}>
          LIQUID IRON & NICKEL OUTER CORE
        </div>
      </div>
    );
  }

  if (type === "pole-drift" || type === "tug-of-war") {
    const progress = interpolate(localFrame, [0, 45], [0, 1], { extrapolateRight: "clamp" });
    const dotX = interpolate(progress, [0, 1], [110, 470]);
    const dotY = interpolate(progress, [0, 1], [270, 110]);
    return (
      <div style={{ width: 580, height: 400, borderRadius: 28, backgroundColor: "rgba(15,23,42,0.85)", border: `2px solid ${accent}66`, padding: 32, position: "relative", transform: `scale(${pop})` }}>
        <div style={{ fontSize: 20, color: accent, fontWeight: 700, letterSpacing: 2 }}>
          {type === "tug-of-war" ? "MAGNETIC LOBE TUG OF WAR" : "ARCTIC DRIFT TRAJECTORY (1831 → 2026)"}
        </div>
        <svg width="520" height="310" viewBox="0 0 520 310">
          <path d="M 110 270 Q 280 210, 470 110" fill="none" stroke={accent} strokeWidth="5" strokeDasharray="10 8" />
          <circle cx="110" cy="270" r="14" fill="#64748B" />
          <text x="75" y="300" fill="#CBD5E1" fontSize="18" fontWeight="bold">CANADA (1831)</text>
          <circle cx="470" cy="110" r="16" fill={accent} />
          <text x="360" y="85" fill="#FFFFFF" fontSize="18" fontWeight="bold">SIBERIA (TODAY)</text>
          <circle cx={dotX} cy={dotY} r="10" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (type === "reversals") {
    const bars = [1, -1, 1, 1, -1, -1, 1, -1, 1, -1, 1, 1];
    return (
      <div style={{ width: 580, height: 380, borderRadius: 28, backgroundColor: "rgba(15,23,42,0.85)", border: `2px solid ${accent}66`, padding: 34, display: "flex", flexDirection: "column", justifyContent: "space-between", transform: `scale(${pop})` }}>
        <div style={{ fontSize: 20, color: accent, fontWeight: 700, letterSpacing: 2 }}>
          SEAFLOOR MAGNETIC STRIPES (83M YEARS)
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", height: 210 }}>
          {bars.map((dir, i) => {
            const h = interpolate(localFrame, [i * 2, i * 2 + 12], [10, 175], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  borderRadius: 8,
                  backgroundColor: dir === 1 ? accent : "#1E293B",
                  border: dir === -1 ? "1px solid #475569" : "none",
                }}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#94A3B8" }}>
          <span>NORMAL POLARITY (GOLD)</span>
          <span>REVERSED POLARITY (DARK)</span>
        </div>
      </div>
    );
  }

  // Default Cinematic Magnetic Field Globe / Shield Visual
  return (
    <div style={{ position: "relative", width: 480, height: 480, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop})` }}>
      {/* Outer Magnetic Field Loops */}
      {[1, 1.35, 1.7].map((scale, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 220 * scale,
            height: 290 * scale,
            borderRadius: "50%",
            border: `2px solid ${accent}${i === 0 ? "CC" : i === 1 ? "77" : "33"}`,
            transform: `rotate(${rot * (i % 2 === 0 ? 0.25 : -0.2)}deg) scale(${pulse})`,
          }}
        />
      ))}
      {/* Planet Core Sphere */}
      <div
        style={{
          width: 195,
          height: 195,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, #38BDF8, #0F172A 75%)`,
          border: `3px solid ${accent}`,
          boxShadow: `0 0 70px ${accent}66`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: 2 }}>EARTH</div>
        <div style={{ fontSize: 15, color: "#BAE6FD", marginTop: 4 }}>MAGNETOSPHERE</div>
      </div>
    </div>
  );
};

export const MagneticPoleDocumentary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;

  const idx = Math.max(
    0,
    BEATS.findIndex((b) => sec >= b.start && sec < b.end)
  );
  const beat = BEATS[idx] ?? BEATS[BEATS.length - 1];
  const localFrame = Math.max(0, frame - Math.round(beat.start * fps));

  const fade = interpolate(localFrame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const slideY = interpolate(localFrame, [0, 16], [30, 0], { extrapolateRight: "clamp" });
  const progressPct = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#040811",
        fontFamily,
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Main Voiceover */}
      <Audio src={staticFile(VOICE_FILE)} volume={1} />

      {/* Subtle Documentary Ambient Bed */}
      <Audio src={staticFile(BGM_FILE)} volume={0.14} loop />

      {/* Transition Whoosh SFX on Beat Changes */}
      {BEATS.map((b, i) =>
        i === 0 ? null : (
          <Sequence key={i} from={Math.round(b.start * fps)} durationInFrames={15}>
            <Audio src={staticFile("sfx-whoosh.wav")} volume={0.18} />
          </Sequence>
        )
      )}

      {/* Deep Space Grid & Radial Glow */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(56, 189, 248, 0.14) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 75% 50%, ${beat.accent}22 0%, transparent 55%)`,
        }}
      />

      {/* Top Documentary Chapter Header */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 88,
          right: 88,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              padding: "8px 22px",
              borderRadius: 6,
              backgroundColor: `${beat.accent}22`,
              border: `1.5px solid ${beat.accent}`,
              color: beat.accent,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {beat.tag}
          </div>
          <div style={{ fontSize: 20, color: "#94A3B8", letterSpacing: 1.5 }}>
            {beat.chapter}
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#64748B", letterSpacing: 2 }}>
          EARTH SCIENCE DOCUMENTARY
        </div>
      </div>

      {/* Main Split Stage */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 88,
          right: 88,
          bottom: 130,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 50,
        }}
      >
        {/* Left Narration & Big Stat Typography */}
        <div
          style={{
            flex: 1,
            opacity: fade,
            transform: `translateY(${slideY}px)`,
          }}
        >
          {beat.statBig && (
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 78,
                  fontWeight: 700,
                  color: beat.accent,
                  lineHeight: 1,
                  letterSpacing: 1,
                }}
              >
                {beat.statBig}
              </div>
              {beat.statLabel && (
                <div
                  style={{
                    fontSize: 20,
                    color: "#94A3B8",
                    letterSpacing: 3,
                    marginTop: 6,
                    fontWeight: 600,
                  }}
                >
                  {beat.statLabel}
                </div>
              )}
            </div>
          )}

          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.26,
              whiteSpace: "pre-line",
              marginBottom: 24,
            }}
          >
            {beat.headline}
          </div>

          <div
            style={{
              width: 100,
              height: 5,
              borderRadius: 99,
              backgroundColor: beat.accent,
              marginBottom: 24,
            }}
          />

          <div
            style={{
              fontSize: 30,
              lineHeight: 1.55,
              color: "#CBD5E1",
              maxWidth: 820,
            }}
          >
            {beat.subtext}
          </div>
        </div>

        {/* Right Scientific Visualization */}
        <div
          style={{
            width: 620,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScienceDiagram
            type={beat.visualType}
            accent={beat.accent}
            localFrame={localFrame}
            fps={fps}
          />
        </div>
      </div>

      {/* Bottom Documentary Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 88,
          right: 88,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#64748B",
            marginBottom: 10,
            letterSpacing: 1.5,
          }}
        >
          <span>EARTH&apos;S MAGNETIC FIELD • GEODYNAMO &amp; POLE REVERSAL</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div style={{ height: 6, backgroundColor: "#0F172A", borderRadius: 99 }}>
          <div
            style={{
              width: `${progressPct}%`,
              height: "100%",
              backgroundColor: beat.accent,
              borderRadius: 99,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default MagneticPoleDocumentary;