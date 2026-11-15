// src/MagneticFieldDocumentary.tsx
import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  random,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// সিনেমেটিক ব্যাকগ্রাউন্ড ও স্টারফিল্ড (Atmospheric SVG Space)
const CosmicAtmosphere: React.FC<{
  seed: number;
  topColor: string;
  bottomColor: string;
  glowColor: string;
}> = ({ seed, topColor, bottomColor, glowColor }) => {
  const frame = useCurrentFrame();

  const stars = useMemo(() => {
    return Array.from({ length: 75 }).map((_, i) => ({
      id: i,
      x: random(`sx-${seed}-${i}`) * 1920,
      y: random(`sy-${seed}-${i}`) * 1080,
      r: 1 + random(`sr-${seed}-${i}`) * 2.5,
      speed: 0.03 + random(`ssp-${seed}-${i}`) * 0.06,
      phase: random(`sp-${seed}-${i}`) * Math.PI * 2,
    }));
  }, [seed]);

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={topColor} />
            <stop offset="100%" stopColor={bottomColor} />
          </linearGradient>
          <radialGradient id={`nebula-${seed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill={`url(#bg-${seed})`} />
        <circle cx="960" cy="540" r="750" fill={`url(#nebula-${seed})`} />
        {stars.map((s) => {
          const opacity = 0.25 + Math.abs(Math.sin(frame * s.speed + s.phase)) * 0.75;
          return (
            <circle key={s.id} cx={s.x} cy={s.y} r={s.r} fill="#ffffff" opacity={opacity} />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// লোয়ার-থার্ড টাইটেল ও সাবটাইটেল কার্ড
const DocumentaryHUD: React.FC<{
  chapter: string;
  title: string;
  headline: string;
}> = ({ chapter, title, headline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', padding: 60 }}>
      {/* টপ-লেফট চ্যাপ্টার ব্যাজ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity,
          transform: `translateY(${(1 - slideIn) * -20}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: '#ffb703',
            color: '#050814',
            padding: '8px 18px',
            borderRadius: 6,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 1.5,
          }}
        >
          {chapter}
        </div>
        <div
          style={{
            color: '#e0fbfc',
            fontSize: 26,
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </div>
      </div>

      {/* বটম টেক্সট ব্যানার */}
      <div
        style={{
          position: 'absolute',
          bottom: 65,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'center',
          opacity,
          transform: `translateY(${(1 - slideIn) * 30}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(6, 11, 25, 0.85)',
            borderLeft: '6px solid #ffb703',
            borderRight: '6px solid #ffb703',
            padding: '18px 42px',
            borderRadius: 12,
            boxShadow: '0 15px 40px rgba(0,0,0,0.75)',
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            {headline}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ================= SCENE 01: পৃথিবীর অদৃশ্য বিপদ (00:00 - 00:35 | 1050 frames) =================
const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const fieldPulse = 1 + Math.sin(frame * 0.08) * 0.06;
  const compassAngle = Math.sin(frame * 0.15) * 140 + frame * 1.5;
  const zoom = interpolate(frame, [0, 1050], [1, 1.18]);

  return (
    <AbsoluteFill>
      <CosmicAtmosphere seed={1} topColor="#040712" bottomColor="#101d42" glowColor="#00b4d8" />
      <div style={{ width: '100%', height: '100%', transform: `scale(${zoom})` }}>
        <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
          {/* ম্যাগনেটিক ফিল্ড লাইনস */}
          <g transform={`translate(960, 540) scale(${fieldPulse}) translate(-960, -540)`}>
            {[260, 380, 510].map((rx, idx) => (
              <React.Fragment key={idx}>
                <ellipse
                  cx={960 - rx * 0.75}
                  cy="540"
                  rx={rx}
                  ry={220 + idx * 70}
                  fill="none"
                  stroke="#4cc9f0"
                  strokeWidth="3"
                  strokeDasharray="14 10"
                  opacity={0.7 - idx * 0.15}
                />
                <ellipse
                  cx={960 + rx * 0.75}
                  cy="540"
                  rx={rx}
                  ry={220 + idx * 70}
                  fill="none"
                  stroke="#4cc9f0"
                  strokeWidth="3"
                  strokeDasharray="14 10"
                  opacity={0.7 - idx * 0.15}
                />
              </React.Fragment>
            ))}
          </g>

          {/* পৃথিবী */}
          <circle cx="960" cy="540" r="190" fill="#1d3557" stroke="#90e0ef" strokeWidth="4" />
          <path
            d="M 880 430 Q 930 460 910 520 T 970 630 Q 1030 580 1020 490 Z"
            fill="#2a9d8f"
            opacity="0.85"
          />
          <path
            d="M 830 530 Q 860 580 845 640 Q 890 650 885 570 Z"
            fill="#2a9d8f"
            opacity="0.8"
          />

          {/* বাম পাশে অস্থির কম্পাস */}
          <g transform="translate(330, 500)">
            <circle cx="0" cy="0" r="110" fill="#0b132b" stroke="#ffb703" strokeWidth="6" />
            <text x="-10" y="-75" fill="#ffb703" fontSize="24" fontWeight="bold">N</text>
            <text x="-8" y="92" fill="#ffffff" fontSize="22">S</text>
            <g transform={`rotate(${compassAngle})`}>
              <polygon points="0,-75 14,0 -14,0" fill="#e63946" />
              <polygon points="0,75 14,0 -14,0" fill="#f1faee" />
            </g>
            <circle cx="0" cy="0" r="10" fill="#ffb703" />
          </g>

          {/* ডান পাশে স্যাটেলাইট */}
          <g transform={`translate(1560, ${440 + Math.sin(frame * 0.05) * 25}) rotate(-20)`}>
            <rect x="-25" y="-40" width="50" height="80" rx="8" fill="#adb5bd" />
            <rect x="-130" y="-25" width="95" height="50" fill="#0077b6" stroke="#90e0ef" strokeWidth="2" />
            <rect x="35" y="-25" width="95" height="50" fill="#0077b6" stroke="#90e0ef" strokeWidth="2" />
            <circle cx="0" cy="-55" r="12" fill="#e63946" opacity={Math.abs(Math.sin(frame * 0.2))} />
          </g>
        </svg>
      </div>
      <DocumentaryHUD
        chapter="SCENE 01"
        title="পৃথিবীর অদৃশ্য বিপদ"
        headline="EARTH'S MAGNETIC FIELD IS CHANGING!"
      />
    </AbsoluteFill>
  );
};

// ================= SCENE 02: পৃথিবীর ভেতরে কী ঘটছে? (00:35 - 01:13 | 1140 frames) =================
const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const coreSpin = frame * 0.8;

  return (
    <AbsoluteFill>
      <CosmicAtmosphere seed={2} topColor="#140505" bottomColor="#380d0d" glowColor="#ff6b00" />
      <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
        {/* পৃথিবীর ৪টি স্তর (Cross-Section) */}
        <g transform="translate(820, 540)">
          {/* Crust */}
          <circle cx="0" cy="0" r="340" fill="#264653" stroke="#a8dadc" strokeWidth="5" />
          {/* Mantle */}
          <circle cx="0" cy="0" r="305" fill="#9b2226" />
          {/* Outer Core (Liquid Iron & Nickel) */}
          <circle cx="0" cy="0" r="200" fill="#ee9b00" />
          {/* ঘূর্ণায়মান তরল লোহার স্রোত (Geodynamo) */}
          <g transform={`rotate(${coreSpin})`}>
            <circle
              cx="0"
              cy="0"
              r="155"
              fill="none"
              stroke="#ca6702"
              strokeWidth="16"
              strokeDasharray="60 40"
            />
            <circle
              cx="0"
              cy="0"
              r="120"
              fill="none"
              stroke="#fff3b0"
              strokeWidth="8"
              strokeDasharray="40 30"
            />
          </g>
          {/* Inner Core */}
          <circle cx="0" cy="0" r="85" fill="#ffffff" />

          {/* South Atlantic Anomaly হাইলাইট */}
          <circle
            cx="-140"
            cy="150"
            r={35 + Math.sin(frame * 0.15) * 10}
            fill="rgba(230, 57, 70, 0.55)"
            stroke="#ff4d6d"
            strokeWidth="3"
          />
        </g>

        {/* লেবেলসমূহ */}
        <g fill="#ffffff" fontSize="26" fontWeight="bold">
          <line x1="1155" y1="460" x2="1320" y2="360" stroke="#a8dadc" strokeWidth="3" />
          <text x="1335" y="368">CRUST (ভূত্বক)</text>

          <line x1="1110" y1="510" x2="1320" y2="460" stroke="#f4a261" strokeWidth="3" />
          <text x="1335" y="468">MANTLE (ম্যাস্টল)</text>

          <line x1="1010" y1="550" x2="1320" y2="560" stroke="#ffb703" strokeWidth="3" />
          <text x="1335" y="568" fill="#ffb703">OUTER CORE (Geodynamo)</text>

          <line x1="900" y1="540" x2="1320" y2="660" stroke="#ffffff" strokeWidth="3" />
          <text x="1335" y="668">INNER CORE (অন্তঃকেন্দ্র)</text>

          <line x1="650" y1="690" x2="460" y2="760" stroke="#ff4d6d" strokeWidth="3" />
          <text x="140" y="768" fill="#ff758f">South Atlantic Anomaly</text>
        </g>
      </svg>
      <DocumentaryHUD
        chapter="SCENE 02"
        title="পৃথিবীর ভেতরে কী ঘটছে?"
        headline="GEODYNAMO & OUTER CORE FLOW"
      />
    </AbsoluteFill>
  );
};

// ================= SCENE 03: North Pole কেন সরে যাচ্ছে? (01:13 - 01:49 | 1080 frames) =================
const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const moveProgress = interpolate(frame, [120, 900], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // কানাডা (760, 560) থেকে সাইবেরিয়া (1180, 410) পর্যন্ত যাত্রা
  const magX = interpolate(moveProgress, [0, 1], [760, 1180]);
  const magY = interpolate(moveProgress, [0, 1], [560, 410]);
  const currentYear = Math.round(interpolate(moveProgress, [0, 1], [1831, 2026]));

  return (
    <AbsoluteFill>
      <CosmicAtmosphere seed={3} topColor="#051324" bottomColor="#0d2b45" glowColor="#48cae4" />
      <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
        {/* আর্কটিক পোলার ম্যাপ গ্রিড */}
        <circle cx="960" cy="520" r="360" fill="#0b1d33" stroke="#1d4e89" strokeWidth="4" />
        <circle cx="960" cy="520" r="240" fill="none" stroke="#1d4e89" strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="960" cy="520" r="120" fill="none" stroke="#1d4e89" strokeWidth="2" strokeDasharray="8 8" />

        {/* কানাডা ও সাইবেরিয়ার আউটলাইন */}
        <path d="M 650 540 Q 740 480 820 580 Q 750 680 650 620 Z" fill="#2a9d8f" opacity="0.5" />
        <text x="670" y="650" fill="#90e0ef" fontSize="24" fontWeight="bold">CANADA (Arctic)</text>

        <path d="M 1080 360 Q 1200 320 1260 440 Q 1160 500 1070 430 Z" fill="#2a9d8f" opacity="0.5" />
        <text x="1110" y="340" fill="#90e0ef" fontSize="24" fontWeight="bold">SIBERIA (Russia)</text>

        {/* Geographic North Pole (স্থির) */}
        <circle cx="960" cy="520" r="12" fill="#ffffff" />
        <text x="980" y="525" fill="#ffffff" fontSize="22" fontWeight="bold">
          Geographic North Pole (স্থির)
        </text>

        {/* গতিপথের রেখা */}
        <line
          x1="760"
          y1="560"
          x2={magX}
          y2={magY}
          stroke="#ffb703"
          strokeWidth="6"
          strokeDasharray="12 8"
        />

        {/* Magnetic North Pole (চলমান) */}
        <circle cx={magX} cy={magY} r="22" fill="rgba(255, 183, 3, 0.35)" />
        <circle cx={magX} cy={magY} r="12" fill="#ffb703" />
        <text x={magX - 80} y={magY - 30} fill="#ffb703" fontSize="24" fontWeight="bold">
          Magnetic North ({currentYear})
        </text>
      </svg>
      <DocumentaryHUD
        chapter="SCENE 03"
        title="North Pole কেন সরে যাচ্ছে?"
        headline="THE NORTH POLE IS MOVING!"
      />
    </AbsoluteFill>
  );
};

// ================= SCENE 04: Magnetic Pole কি উল্টে যাবে? (01:49 - 02:27 | 1140 frames) =================
const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const reversalsCount = Math.min(183, Math.round(interpolate(frame, [60, 400], [0, 183])));
  const flipRotation = interpolate(frame, [450, 750], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <CosmicAtmosphere seed={4} topColor="#1b0926" bottomColor="#3c134f" glowColor="#c77dff" />
      <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
        {/* বাম পাশে পোলারিটি রিভার্সাল ডায়াগ্রাম */}
        <g transform={`translate(560, 520) rotate(${flipRotation})`}>
          <circle cx="0" cy="0" r="190" fill="#10002b" stroke="#e0aaff" strokeWidth="5" />
          <path d="M -190 0 A 190 190 0 0 1 190 0 Z" fill="#e63946" />
          <path d="M -190 0 A 190 190 0 0 0 190 0 Z" fill="#4361ee" />
          <text x="-18" y="-75" fill="#ffffff" fontSize="42" fontWeight="bold">N</text>
          <text x="-15" y="105" fill="#ffffff" fontSize="42" fontWeight="bold">S</text>
        </g>

        {/* ডান পাশে স্ট্যাটিস্টিকস ও টাইমলাইন */}
        <g transform="translate(960, 320)">
          <text x="0" y="0" fill="#ffb703" fontSize="86" fontWeight="900">
            {reversalsCount} REVERSALS
          </text>
          <text x="0" y="55" fill="#e0aaff" fontSize="30">
            গত ৮৩ মিলিয়ন বছরের জিওলজিক্যাল রেকর্ড
          </text>

          <rect x="0" y="110" width="760" height="90" rx="12" fill="rgba(255,255,255,0.08)" />
          <text x="30" y="165" fill="#ffffff" fontSize="30" fontWeight="bold">
            LAST REVERSAL: ~780,000 YEARS AGO
          </text>

          <rect x="0" y="225" width="760" height="90" rx="12" fill="rgba(255,255,255,0.08)" />
          <text x="30" y="280" fill="#90e0ef" fontSize="30" fontWeight="bold">
            LASCHAMPS EXCURSION: ~42,000 YEARS AGO
          </text>
        </g>
      </svg>
      <DocumentaryHUD
        chapter="SCENE 04"
        title="পৃথিবীর Magnetic Pole কি উল্টে যাবে?"
        headline="183 MAGNETIC REVERSALS IN EARTH'S HISTORY"
      />
    </AbsoluteFill>
  );
};

// ================= SCENE 05: তাহলে কি পৃথিবী ধ্বংস হয়ে যাবে? (02:27 - 03:03 | 1080 frames) =================
const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const slashProgress = interpolate(frame, [120, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <CosmicAtmosphere seed={5} topColor="#041c15" bottomColor="#0b4232" glowColor="#52b788" />
      <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
        {/* বায়ুমণ্ডল ও ম্যাগনেটিক শিল্ডের সুরক্ষা */}
        <circle cx="960" cy="540" r="240" fill="none" stroke="#52b788" strokeWidth="6" opacity="0.7" />
        <circle cx="960" cy="540" r="185" fill="#1b4332" stroke="#95d5b2" strokeWidth="4" />
        <text x="895" y="550" fill="#ffffff" fontSize="32" fontWeight="bold">EARTH SAFE</text>

        {/* GPS স্যাটেলাইট নেটওয়ার্ক */}
        <circle cx="960" cy="540" r="320" fill="none" stroke="#ffb703" strokeWidth="2" strokeDasharray="10 10" />
        <text x="1220" y="340" fill="#ffb703" fontSize="26" fontWeight="bold">
          GPS SATELLITES ACTIVE
        </text>

        {/* Fake Doomsday Headline Cross-out */}
        <g transform="translate(220, 320)">
          <rect x="0" y="0" width="460" height="110" rx="12" fill="rgba(230, 57, 70, 0.25)" stroke="#e63946" strokeWidth="3" />
          <text x="35" y="65" fill="#ffccd5" fontSize="30" fontWeight="bold">
            &quot;END OF THE WORLD?&quot;
          </text>
          <line
            x1="20"
            y1="90"
            x2={20 + 420 * slashProgress}
            y2={90 - 70 * slashProgress}
            stroke="#ff4d6d"
            strokeWidth="8"
          />
        </g>
      </svg>
      <DocumentaryHUD
        chapter="SCENE 05"
        title="তাহলে কি পৃথিবী ধ্বংস হয়ে যাবে?"
        headline="NOT THE END OF THE WORLD!"
      />
    </AbsoluteFill>
  );
};

// ================= SCENE 06: শেষ প্রশ্ন ও আউট্রো (03:03 - 03:32 | 870 frames) =================
const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const earthScale = interpolate(frame, [0, durationInFrames], [0.95, 1.15]);
  const fadeToBlack = interpolate(frame, [durationInFrames - 60, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <CosmicAtmosphere seed={6} topColor="#050814" bottomColor="#16213e" glowColor="#ffb703" />
      <div style={{ width: '100%', height: '100%', transform: `scale(${earthScale})` }}>
        <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
          <circle cx="960" cy="540" r="220" fill="#1d3557" stroke="#ffb703" strokeWidth="4" />
          <path d="M 880 430 Q 940 470 910 550 T 990 650 Q 1050 580 1030 480 Z" fill="#2a9d8f" />
        </svg>
      </div>

      {/* সেন্টার প্রশ্ন কার্ড */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 120,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(5, 8, 20, 0.88)',
            border: '3px solid #ffb703',
            borderRadius: 24,
            padding: '50px 70px',
            textAlign: 'center',
            maxWidth: 1250,
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
          }}
        >
          <p style={{ color: '#ffb703', fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            আপনার মতামত কী?
          </p>
          <h2 style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, lineHeight: 1.4, margin: 0 }}>
            ভবিষ্যতে পৃথিবীর Magnetic Pole উল্টে গেলে মানবসভ্যতা কতটা প্রস্তুত থাকবে?
          </h2>
          <div
            style={{
              marginTop: 35,
              display: 'inline-block',
              backgroundColor: '#e63946',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: 50,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            SUBSCRIBE FOR MORE SCIENCE MYSTERIES
          </div>
        </div>
      </AbsoluteFill>

      {/* Fade to Black */}
      <AbsoluteFill style={{ backgroundColor: '#000000', opacity: fadeToBlack }} />
    </AbsoluteFill>
  );
};

// ================= মেইন ডকুমেন্টারি কম্পোনেন্ট =================
export const MagneticFieldDocumentary: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* ভয়েসওভার অডিও */}
      <Audio src={staticFile('magnetic-voiceover.mp3')} />

      {/* হালকা ব্যাকগ্রাউন্ড মিউজিক (ভয়েসওভারের নিচে ২০% ভলিউমে) */}
      <Audio src={staticFile('cinematic-bed.wav')} volume={0.2} loop />

      {/* Scene 01: 00:00 - 00:35 (1050 frames) */}
      <Sequence from={0} durationInFrames={1050}>
        <Scene01 />
      </Sequence>

      {/* Scene 02: 00:35 - 01:13 (1140 frames) */}
      <Sequence from={1050} durationInFrames={1140}>
        <Scene02 />
      </Sequence>

      {/* Scene 03: 01:13 - 01:49 (1080 frames) */}
      <Sequence from={2190} durationInFrames={1080}>
        <Scene03 />
      </Sequence>

      {/* Scene 04: 01:49 - 02:27 (1140 frames) */}
      <Sequence from={3270} durationInFrames={1140}>
        <Scene04 />
      </Sequence>

      {/* Scene 05: 02:27 - 03:03 (1080 frames) */}
      <Sequence from={4410} durationInFrames={1080}>
        <Scene05 />
      </Sequence>

      {/* Scene 06: 03:03 - 03:32 (870 frames) */}
      <Sequence from={5490} durationInFrames={870}>
        <Scene06 />
      </Sequence>
    </AbsoluteFill>
  );
};