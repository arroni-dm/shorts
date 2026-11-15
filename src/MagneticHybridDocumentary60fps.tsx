// src/MagneticHybridDocumentary60fps.tsx
import React from 'react';
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
} from 'remotion';

type VisualStyle = 'creator-yellow' | 'creator-cream' | 'creator-dark' | 'cosmic-space' | 'vox-paper';
type VisualGraphic =
  | 'stickman-confused-compass'
  | 'earth-shield-pulse'
  | 'vox-stat-2900km'
  | 'earth-4-layers'
  | 'geodynamo-core'
  | 'south-atlantic-anomaly'
  | 'stickman-scientist-poles'
  | 'arctic-map-1831'
  | 'vox-183-reversals'
  | 'polarity-flip-3d'
  | 'timeline-42k'
  | 'doomsday-crossout'
  | 'gps-safe-network'
  | 'outro-question';

interface BeatSegment {
  fromSec: number;
  toSec: number;
  pillText: string;
  style: VisualStyle;
  graphic: VisualGraphic;
  caption: string;
  highlight: string;
  sfx?: 'whoosh' | 'pop';
}

const DOCUMENTARY_BEATS: BeatSegment[] = [
  // SCENE 01 (00:00 - 00:38)
  {
    fromSec: 0,
    toSec: 10,
    pillText: 'MYSTERY #01 • COMPASS FAIL',
    style: 'creator-yellow',
    graphic: 'stickman-confused-compass',
    caption: 'সকালে ঘুম থেকে উঠে দেখলেন আপনার Compass উত্তর দিক দেখাচ্ছে না!',
    highlight: 'Compass উত্তর দিক',
    sfx: 'whoosh',
  },
  {
    fromSec: 10,
    toSec: 19,
    pillText: 'MAGNETIC SHIELD WEAKENING',
    style: 'cosmic-space',
    graphic: 'earth-shield-pulse',
    caption: 'Satellite-এ অদ্ভুত সমস্যা, আর পৃথিবীর Magnetic Shield দুর্বল হচ্ছে!',
    highlight: 'Magnetic Shield',
    sfx: 'pop',
  },
  {
    fromSec: 19,
    toSec: 28,
    pillText: '2,900 KM UNDERGROUND',
    style: 'vox-paper',
    graphic: 'vox-stat-2900km',
    caption: 'আমাদের পায়ের প্রায় ২,৯০০ কিলোমিটার নিচে রয়েছে গলিত Iron-এর জগৎ।',
    highlight: '২,৯০০ কিলোমিটার',
    sfx: 'whoosh',
  },
  {
    fromSec: 28,
    toSec: 38,
    pillText: 'POLE REVERSAL QUESTION',
    style: 'creator-dark',
    graphic: 'polarity-flip-3d',
    caption: 'পৃথিবীর Magnetic North ও South Pole কি অবস্থান বদলে ফেলবে?',
    highlight: 'North ও South Pole',
    sfx: 'pop',
  },

  // SCENE 02 (00:38 - 01:18)
  {
    fromSec: 38,
    toSec: 49,
    pillText: 'INSIDE THE EARTH',
    style: 'cosmic-space',
    graphic: 'earth-4-layers',
    caption: 'পৃথিবীর ভেতরে চারটি স্তর: Crust, Mantle, Outer Core এবং Inner Core।',
    highlight: 'Outer Core',
    sfx: 'whoosh',
  },
  {
    fromSec: 49,
    toSec: 60,
    pillText: 'GEODYNAMO ENGINE',
    style: 'creator-dark',
    graphic: 'geodynamo-core',
    caption: 'গলিত Iron ও Nickel-এর ঘূর্ণনে তৈরি হয় Geodynamo ও Magnetic Field।',
    highlight: 'Geodynamo',
    sfx: 'pop',
  },
  {
    fromSec: 60,
    toSec: 69,
    pillText: 'SOLAR RADIATION SHIELD',
    style: 'creator-cream',
    graphic: 'earth-shield-pulse',
    caption: 'এটি সূর্য থেকে আসা ক্ষতিকর Charged Particles থেকে পৃথিবীকে রক্ষা করে।',
    highlight: 'Charged Particles',
    sfx: 'whoosh',
  },
  {
    fromSec: 69,
    toSec: 78,
    pillText: 'WEAK SPOT DETECTED',
    style: 'vox-paper',
    graphic: 'south-atlantic-anomaly',
    caption: 'দক্ষিণ আটলান্টিকে রয়েছে দুর্বল এলাকা—South Atlantic Anomaly।',
    highlight: 'South Atlantic Anomaly',
    sfx: 'pop',
  },

  // SCENE 03 (01:18 - 01:56)
  {
    fromSec: 78,
    toSec: 91,
    pillText: 'TWO NORTH POLES?',
    style: 'creator-yellow',
    graphic: 'stickman-scientist-poles',
    caption: 'Geographic North Pole এবং Magnetic North Pole কিন্তু এক নয়!',
    highlight: 'Magnetic North Pole',
    sfx: 'whoosh',
  },
  {
    fromSec: 91,
    toSec: 104,
    pillText: '1831 TO SIBERIA',
    style: 'vox-paper',
    graphic: 'arctic-map-1831',
    caption: '১৮৩১ সালের পর থেকে এটি কানাডা থেকে রাশিয়ার Siberia-এর দিকে সরে গেছে।',
    highlight: 'Siberia-এর দিকে',
    sfx: 'pop',
  },
  {
    fromSec: 104,
    toSec: 116,
    pillText: 'LIQUID IRON SHIFT',
    style: 'cosmic-space',
    graphic: 'geodynamo-core',
    caption: 'পৃথিবীর গভীরে গলিত Iron-এর চলাচল North Pole-এর অবস্থান বদলে দিচ্ছে।',
    highlight: 'গলিত Iron-এর চলাচল',
    sfx: 'whoosh',
  },

  // SCENE 04 (01:56 - 02:36)
  {
    fromSec: 116,
    toSec: 130,
    pillText: '183 TIMES IN HISTORY',
    style: 'vox-paper',
    graphic: 'vox-183-reversals',
    caption: 'গত ৮৩ মিলিয়ন বছরে পৃথিবীতে প্রায় ১৮৩টি Magnetic Reversal ঘটেছে!',
    highlight: '১৮৩টি Magnetic Reversal',
    sfx: 'pop',
  },
  {
    fromSec: 130,
    toSec: 144,
    pillText: '780,000 YEARS AGO',
    style: 'creator-dark',
    graphic: 'timeline-42k',
    caption: 'শেষ সম্পূর্ণ Reversal হয়েছিল প্রায় ৭,৮০,০০০ বছর আগে।',
    highlight: '৭,৮০,০০০ বছর আগে',
    sfx: 'whoosh',
  },
  {
    fromSec: 144,
    toSec: 156,
    pillText: 'NOT OVERNIGHT',
    style: 'creator-cream',
    graphic: 'polarity-flip-3d',
    caption: 'Magnetic Reversal রাতারাতি ঘটে না; এটি হাজার হাজার বছর ধরে চলে।',
    highlight: 'হাজার হাজার বছর',
    sfx: 'pop',
  },

  // SCENE 05 (02:36 - 03:12)
  {
    fromSec: 156,
    toSec: 168,
    pillText: 'DOOMSDAY MYTH BUSTED',
    style: 'creator-yellow',
    graphic: 'doomsday-crossout',
    caption: 'Magnetic Field দুর্বল হলেই পৃথিবী ধ্বংস হয়ে যাবে—এটি বৈজ্ঞানিকভাবে ভুল!',
    highlight: 'পৃথিবী ধ্বংস হয়ে যাবে',
    sfx: 'whoosh',
  },
  {
    fromSec: 168,
    toSec: 180,
    pillText: 'ATMOSPHERE PROTECTS US',
    style: 'cosmic-space',
    graphic: 'earth-shield-pulse',
    caption: 'পোল পরিবর্তনের সময়ও আমাদের Atmosphere ও Magnetic Field সুরক্ষা দেবে।',
    highlight: 'Atmosphere',
    sfx: 'pop',
  },
  {
    fromSec: 180,
    toSec: 192,
    pillText: 'GPS STILL WORKS',
    style: 'vox-paper',
    graphic: 'gps-safe-network',
    caption: 'GPS Magnetic Pole-এর ওপর নির্ভর করে না, তাই Navigation বন্ধ হবে না।',
    highlight: 'GPS Magnetic Pole',
    sfx: 'whoosh',
  },

  // SCENE 06 (03:12 - 03:48)
  {
    fromSec: 192,
    toSec: 204,
    pillText: 'UNSOLVED MYSTERIES',
    style: 'cosmic-space',
    graphic: 'earth-4-layers',
    caption: 'পৃথিবী বাইরে থেকে শান্ত দেখালেও এর ভেতরে প্রতিনিয়ত পরিবর্তন ঘটছে।',
    highlight: 'প্রতিনিয়ত পরিবর্তন',
    sfx: 'pop',
  },
  {
    fromSec: 204,
    toSec: 216,
    pillText: 'YOUR OPINION?',
    style: 'creator-dark',
    graphic: 'outro-question',
    caption: 'ভবিষ্যতে Magnetic Pole উল্টে গেলে মানবসভ্যতা কতটা প্রস্তুত থাকবে?',
    highlight: 'মানবসভ্যতা কতটা প্রস্তুত',
    sfx: 'whoosh',
  },
  {
    fromSec: 216,
    toSec: 228,
    pillText: 'SUBSCRIBE NOW',
    style: 'creator-yellow',
    graphic: 'outro-question',
    caption: 'কমেন্টে মতামত জানান এবং এমন অজানা রহস্য জানতে Subscribe করুন!',
    highlight: 'Subscribe করুন!',
    sfx: 'pop',
  },
];

// ================= স্টিকম্যান অ্যানিমেশন (FPS-নিরপেক্ষ সময়ভিত্তিক) =================
const StickmanFigure: React.FC<{
  pose: 'confused' | 'scientist';
  strokeColor: string;
}> = ({ pose, strokeColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps; // সেকেন্ডে রূপান্তর, যাতে 30fps ও 60fps-এ গতি একই থাকে

  const bounce = Math.sin(t * 4.5) * 6;
  const armWave = Math.sin(t * 6) * 18;

  return (
    <g transform={`translate(0, ${bounce})`}>
      <circle cx="0" cy="-110" r="34" fill="none" stroke={strokeColor} strokeWidth="7" />
      <circle cx="-11" cy="-116" r="4" fill={strokeColor} />
      <circle cx="11" cy="-116" r="4" fill={strokeColor} />
      {pose === 'confused' ? (
        <circle cx="0" cy="-98" r="7" fill="none" stroke={strokeColor} strokeWidth="4" />
      ) : (
        <path d="M -12 -98 Q 0 -88 12 -98" fill="none" stroke={strokeColor} strokeWidth="4" />
      )}
      <line x1="0" y1="-76" x2="0" y2="30" stroke={strokeColor} strokeWidth="7" strokeLinecap="round" />
      {pose === 'confused' ? (
        <>
          <path
            d={`M 0 -55 L -45 -85 L -30 ${-125 + armWave * 0.4}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 0 -55 L 55 -40 L 85 -65"
            fill="none"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M 0 -55 L -50 -20 L -35 20"
            fill="none"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d={`M 0 -55 L 65 ${-75 + armWave} L 120 ${-95 + armWave}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}
      <line x1="0" y1="30" x2="-32" y2="115" stroke={strokeColor} strokeWidth="7" strokeLinecap="round" />
      <line x1="0" y1="30" x2="32" y2="115" stroke={strokeColor} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
};

// ================= সেন্টার ভিজ্যুয়াল রেন্ডারার =================
const CenterGraphicStage: React.FC<{ graphic: VisualGraphic; style: VisualStyle }> = ({
  graphic,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps; // 60fps-এ অতি-মসৃণ (Ultra-smooth) অ্যানিমেশনের জন্য সময়ভিত্তিক ভেরিয়েবল

  const popScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const isDarkBg = style === 'creator-dark' || style === 'cosmic-space';

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '100%', transform: `scale(${0.92 + popScale * 0.08})` }}>
        <svg viewBox="0 0 1920 1080" style={{ width: '100%', height: '100%' }}>
          {/* ১. স্টিকম্যান ও অস্থির কম্পাস */}
          {graphic === 'stickman-confused-compass' && (
            <g transform="translate(960, 520)">
              <g transform="translate(-220, 40)">
                <StickmanFigure pose="confused" strokeColor="#0d0d0d" />
                <text x="-15" y="-170" fill="#e63946" fontSize="54" fontWeight="900">
                  ?!
                </text>
              </g>
              <g transform="translate(180, -20)">
                <circle cx="0" cy="0" r="145" fill="#0d0d0d" stroke="#ffffff" strokeWidth="8" />
                <text x="-12" y="-100" fill="#ffd60a" fontSize="32" fontWeight="900">N</text>
                <text x="-10" y="122" fill="#ffffff" fontSize="30" fontWeight="bold">S</text>
                <g transform={`rotate(${Math.sin(t * 7.5) * 160 + t * 90})`}>
                  <polygon points="0,-95 18,0 -18,0" fill="#e63946" />
                  <polygon points="0,95 18,0 -18,0" fill="#faf6ee" />
                </g>
                <circle cx="0" cy="0" r="14" fill="#ffd60a" />
              </g>
            </g>
          )}

          {/* ২. পৃথিবী ও ম্যাগনেটিক শিল্ড পালস */}
          {graphic === 'earth-shield-pulse' && (
            <g transform="translate(960, 500)">
              {[230, 320, 420].map((r, idx) => {
                const pulse = 1 + Math.sin(t * 3 + idx) * 0.05;
                return (
                  <g key={idx} transform={`scale(${pulse})`}>
                    <ellipse
                      cx={-r * 0.65}
                      cy="0"
                      rx={r}
                      ry={180 + idx * 55}
                      fill="none"
                      stroke={isDarkBg ? '#4cc9f0' : '#0077b6'}
                      strokeWidth="4"
                      strokeDasharray="16 12"
                      opacity={0.8 - idx * 0.15}
                    />
                    <ellipse
                      cx={r * 0.65}
                      cy="0"
                      rx={r}
                      ry={180 + idx * 55}
                      fill="none"
                      stroke={isDarkBg ? '#4cc9f0' : '#0077b6'}
                      strokeWidth="4"
                      strokeDasharray="16 12"
                      opacity={0.8 - idx * 0.15}
                    />
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="155" fill="#1d3557" stroke="#90e0ef" strokeWidth="6" />
              <path d="M -60 -90 Q -10 -50 -30 10 T 30 95 Q 85 50 75 -40 Z" fill="#2a9d8f" />
            </g>
          )}

          {/* ৩. VOX স্টাইল স্ট্যাট কার্ড: ২,৯০০ কিমি */}
          {graphic === 'vox-stat-2900km' && (
            <g transform="translate(960, 490)">
              <rect
                x="-460"
                y="-190"
                width="920"
                height="360"
                rx="24"
                fill="#ffffff"
                stroke="#0d0d0d"
                strokeWidth="6"
              />
              <rect
                x="-380"
                y="-95"
                width={interpolate(t, [0, 0.8], [0, 760], { extrapolateRight: 'clamp' })}
                height="95"
                fill="#ffd60a"
              />
              <text x="0" y="-22" textAnchor="middle" fill="#0d0d0d" fontSize="84" fontWeight="900">
                2,900 KM DEEP
              </text>
              <text x="0" y="65" textAnchor="middle" fill="#333333" fontSize="36" fontWeight="700">
                MOLTEN IRON &amp; NICKEL OCEAN
              </text>
              <text x="0" y="120" textAnchor="middle" fill="#e63946" fontSize="30" fontWeight="800">
                SOURCE OF EARTH&apos;S MAGNETIC FIELD
              </text>
            </g>
          )}

          {/* ৪. পৃথিবীর ৪টি স্তর */}
          {graphic === 'earth-4-layers' && (
            <g transform="translate(780, 500)">
              <circle cx="0" cy="0" r="270" fill="#264653" stroke="#a8dadc" strokeWidth="5" />
              <circle cx="0" cy="0" r="235" fill="#9b2226" />
              <circle cx="0" cy="0" r="155" fill="#ee9b00" />
              <circle cx="0" cy="0" r="65" fill="#ffffff" />
              <g fill="#ffffff" fontSize="28" fontWeight="800">
                <line x1="265" y1="-80" x2="410" y2="-160" stroke="#a8dadc" strokeWidth="4" />
                <text x="425" y="-152">1. CRUST (ভূত্বক)</text>
                <line x1="225" y1="-20" x2="410" y2="-55" stroke="#f4a261" strokeWidth="4" />
                <text x="425" y="-47">2. MANTLE (ম্যান্টল)</text>
                <line x1="145" y1="30" x2="410" y2="50" stroke="#ffd60a" strokeWidth="4" />
                <text x="425" y="58" fill="#ffd60a">3. OUTER CORE (গলিত লোহা)</text>
                <line x1="60" y1="20" x2="410" y2="155" stroke="#ffffff" strokeWidth="4" />
                <text x="425" y="163">4. INNER CORE (কঠিন কেন্দ্র)</text>
              </g>
            </g>
          )}

          {/* ৫. Geodynamo ঘূর্ণন কোর */}
          {graphic === 'geodynamo-core' && (
            <g transform="translate(960, 500)">
              <circle cx="0" cy="0" r="240" fill="#370617" stroke="#ffba08" strokeWidth="6" />
              <g transform={`rotate(${t * 75})`}>
                <circle
                  cx="0"
                  cy="0"
                  r="185"
                  fill="none"
                  stroke="#f48c06"
                  strokeWidth="18"
                  strokeDasharray="75 45"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="130"
                  fill="none"
                  stroke="#ffd60a"
                  strokeWidth="12"
                  strokeDasharray="50 35"
                />
              </g>
              <circle cx="0" cy="0" r="70" fill="#ffffff" />
              <text x="0" y="10" textAnchor="middle" fill="#0d0d0d" fontSize="24" fontWeight="900">
                DYNAMO
              </text>
            </g>
          )}

          {/* ৬. South Atlantic Anomaly */}
          {graphic === 'south-atlantic-anomaly' && (
            <g transform="translate(960, 500)">
              <rect x="-440" y="-210" width="880" height="400" rx="20" fill="#0b132b" stroke="#0d0d0d" strokeWidth="6" />
              <path d="M -220 -80 Q -150 -40 -170 60 Q -120 130 -90 40 Z" fill="#2a9d8f" />
              <path d="M 120 -90 Q 210 -60 190 70 Q 130 110 110 10 Z" fill="#2a9d8f" />
              <circle
                cx="-30"
                cy="25"
                r={65 + Math.sin(t * 6) * 14}
                fill="rgba(230, 57, 70, 0.45)"
                stroke="#ff4d6d"
                strokeWidth="5"
              />
              <text x="0" y="-140" textAnchor="middle" fill="#ff758f" fontSize="34" fontWeight="900">
                ⚠ SOUTH ATLANTIC ANOMALY (WEAK ZONE)
              </text>
            </g>
          )}

          {/* ৭. স্টিকম্যান বিজ্ঞানী ও দুই উত্তর মেরু */}
          {graphic === 'stickman-scientist-poles' && (
            <g transform="translate(960, 520)">
              <g transform="translate(-260, 30)">
                <StickmanFigure pose="scientist" strokeColor="#0d0d0d" />
              </g>
              <g transform="translate(140, -20)">
                <circle cx="0" cy="0" r="170" fill="#1d3557" stroke="#0d0d0d" strokeWidth="6" />
                <line x1="0" y1="-210" x2="0" y2="210" stroke="#ffffff" strokeWidth="4" strokeDasharray="10 8" />
                <text x="15" y="-185" fill="#0d0d0d" fontSize="24" fontWeight="900">Geographic N</text>
                <g transform="rotate(24)">
                  <line x1="0" y1="-210" x2="0" y2="210" stroke="#e63946" strokeWidth="6" />
                  <text x="15" y="-185" fill="#e63946" fontSize="24" fontWeight="900">Magnetic N</text>
                </g>
              </g>
            </g>
          )}

          {/* ৮. ১৮৩১ থেকে সাইবেরিয়া ম্যাপ */}
          {graphic === 'arctic-map-1831' && (
            <g transform="translate(960, 490)">
              <rect x="-460" y="-210" width="920" height="400" rx="22" fill="#0b1d33" stroke="#0d0d0d" strokeWidth="6" />
              <text x="-360" y="-120" fill="#90e0ef" fontSize="30" fontWeight="800">CANADA (1831)</text>
              <text x="160" y="-120" fill="#ffd60a" fontSize="30" fontWeight="800">SIBERIA (NOW)</text>
              <line x1="-260" y1="30" x2="260" y2="-30" stroke="#ffd60a" strokeWidth="8" strokeDasharray="16 10" />
              <circle cx="-260" cy="30" r="16" fill="#90e0ef" />
              <circle
                cx={interpolate(t, [0, 8], [-260, 260], { extrapolateRight: 'clamp' })}
                cy={interpolate(t, [0, 8], [30, -30], { extrapolateRight: 'clamp' })}
                r="22"
                fill="#e63946"
                stroke="#ffffff"
                strokeWidth="4"
              />
            </g>
          )}

          {/* ৯. VOX ১৮৩ রিভার্সাল কার্ড */}
          {graphic === 'vox-183-reversals' && (
            <g transform="translate(960, 490)">
              <rect x="-450" y="-190" width="900" height="360" rx="24" fill="#ffffff" stroke="#0d0d0d" strokeWidth="6" />
              <text x="0" y="-30" textAnchor="middle" fill="#e63946" fontSize="115" fontWeight="900">
                183 TIMES
              </text>
              <rect x="-340" y="25" width="680" height="65" fill="#ffd60a" />
              <text x="0" y="70" textAnchor="middle" fill="#0d0d0d" fontSize="36" fontWeight="900">
                IN THE LAST 83 MILLION YEARS
              </text>
            </g>
          )}

          {/* ১০. পোলারিটি ফ্লিপ ডায়াগ্রাম */}
          {graphic === 'polarity-flip-3d' && (
            <g transform={`translate(960, 490) rotate(${interpolate(t, [0, 6], [0, 180], { extrapolateRight: 'clamp' })})`}>
              <circle cx="0" cy="0" r="190" fill="#10002b" stroke="#ffd60a" strokeWidth="8" />
              <path d="M -190 0 A 190 190 0 0 1 190 0 Z" fill="#e63946" />
              <path d="M -190 0 A 190 190 0 0 0 190 0 Z" fill="#4361ee" />
              <text x="0" y="-75" textAnchor="middle" fill="#ffffff" fontSize="54" fontWeight="900">N</text>
              <text x="0" y="105" textAnchor="middle" fill="#ffffff" fontSize="54" fontWeight="900">S</text>
            </g>
          )}

          {/* ১১. টাইমলাইন ৭,৮০,০০০ ও ৪২,০০০ বছর */}
          {graphic === 'timeline-42k' && (
            <g transform="translate(960, 490)">
              <line x1="-420" y1="0" x2="420" y2="0" stroke="#ffd60a" strokeWidth="8" />
              <circle cx="-230" cy="0" r="24" fill="#e63946" />
              <text x="-230" y="-55" textAnchor="middle" fill="#ffffff" fontSize="34" fontWeight="900">
                780,000 YEARS AGO
              </text>
              <text x="-230" y="65" textAnchor="middle" fill="#adb5bd" fontSize="26">
                Last Full Reversal
              </text>

              <circle cx="230" cy="0" r="24" fill="#4cc9f0" />
              <text x="230" y="-55" textAnchor="middle" fill="#ffd60a" fontSize="34" fontWeight="900">
                42,000 YEARS AGO
              </text>
              <text x="230" y="65" textAnchor="middle" fill="#adb5bd" fontSize="26">
                Laschamps Excursion
              </text>
            </g>
          )}

          {/* ১২. ডুমসডে গুজব ক্রস-আউট */}
          {graphic === 'doomsday-crossout' && (
            <g transform="translate(960, 490)">
              <rect x="-420" y="-130" width="840" height="240" rx="20" fill="#0d0d0d" />
              <text x="0" y="12" textAnchor="middle" fill="#ffffff" fontSize="58" fontWeight="900">
                &quot;END OF THE WORLD?&quot;
              </text>
              <line
                x1="-360"
                y1="70"
                x2={interpolate(t, [0, 0.8], [-360, 360], { extrapolateRight: 'clamp' })}
                y2={interpolate(t, [0, 0.8], [70, -85], { extrapolateRight: 'clamp' })}
                stroke="#e63946"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* ১৩. GPS স্যাটেলাইট নিরাপদ */}
          {graphic === 'gps-safe-network' && (
            <g transform="translate(960, 490)">
              <circle cx="0" cy="0" r="145" fill="#1d3557" stroke="#0d0d0d" strokeWidth="6" />
              <circle cx="0" cy="0" r="240" fill="none" stroke="#2a9d8f" strokeWidth="5" strokeDasharray="14 10" />
              <rect x="-180" y="-45" width="360" height="90" rx="14" fill="#2a9d8f" />
              <text x="0" y="12" textAnchor="middle" fill="#ffffff" fontSize="38" fontWeight="900">
                ✓ GPS 100% SAFE
              </text>
            </g>
          )}

          {/* ১৪. আউট্রো প্রশ্ন ও সাবস্ক্রাইব */}
          {graphic === 'outro-question' && (
            <g transform="translate(960, 480)">
              <rect x="-480" y="-170" width="960" height="320" rx="26" fill="#161b33" stroke="#ffd60a" strokeWidth="6" />
              <text x="0" y="-65" textAnchor="middle" fill="#ffd60a" fontSize="34" fontWeight="800">
                কমেন্টে আপনার মতামত জানান!
              </text>
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="42" fontWeight="900">
                মানবসভ্যতা কি এই পরিবর্তনের জন্য প্রস্তুত?
              </text>
              <rect x="-220" y="55" width="440" height="65" rx="32" fill="#e63946" />
              <text x="0" y="97" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="900">
                SUBSCRIBE FOR MORE
              </text>
            </g>
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// ================= ফ্রেজ-লকড কারাওকে ক্যাপশন =================
const KaraokeCaptionBar: React.FC<{
  caption: string;
  highlight: string;
  isDarkBg: boolean;
}> = ({ caption, highlight, isDarkBg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const parts = caption.split(highlight);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 55,
        paddingLeft: 100,
        paddingRight: 100,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: isDarkBg ? 'rgba(255, 255, 255, 0.12)' : '#0d0d0d',
          border: isDarkBg ? '2px solid rgba(255, 214, 10, 0.6)' : '3px solid #0d0d0d',
          borderRadius: 20,
          padding: '20px 44px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          transform: `scale(${0.9 + pop * 0.1})`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#ffffff',
            fontSize: 40,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.35,
            fontFamily: 'sans-serif',
          }}
        >
          {parts.length > 1 ? (
            <>
              {parts[0]}
              <span
                style={{
                  backgroundColor: '#ffd60a',
                  color: '#0d0d0d',
                  padding: '2px 12px',
                  borderRadius: 8,
                  margin: '0 4px',
                }}
              >
                {highlight}
              </span>
              {parts[1]}
            </>
          ) : (
            caption
          )}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ================= মেইন হাইব্রিড কম্পোনেন্ট =================
export const MagneticHybridDocumentary60fps: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const totalProgress = interpolate(frame, [0, durationInFrames], [0, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0d0d0d' }}>
      <Audio src={staticFile('magnetic-voiceover.mp3')} />
      <Audio src={staticFile('cinematic-bed.wav')} volume={0.18} loop />

      {DOCUMENTARY_BEATS.map((beat, index) => {
        const from = Math.round(beat.fromSec * fps);
        const segmentDuration = Math.round((beat.toSec - beat.fromSec) * fps);

        const bgColors: Record<VisualStyle, string> = {
          'creator-yellow': '#FFD60A',
          'creator-cream': '#FAF6EE',
          'creator-dark': '#0D0D0D',
          'cosmic-space': '#060B19',
          'vox-paper': '#F4EFE6',
        };

        const isDark = beat.style === 'creator-dark' || beat.style === 'cosmic-space';

        return (
          <Sequence key={index} from={from} durationInFrames={segmentDuration}>
            {beat.sfx === 'whoosh' && <Audio src={staticFile('sfx-whoosh.wav')} volume={0.35} />}
            {beat.sfx === 'pop' && <Audio src={staticFile('sfx-pop.wav')} volume={0.35} />}

            <AbsoluteFill
              style={{
                backgroundColor: bgColors[beat.style],
                backgroundImage:
                  beat.style === 'vox-paper'
                    ? 'radial-gradient(#d6cfc2 1.5px, transparent 1.5px)'
                    : undefined,
                backgroundSize: beat.style === 'vox-paper' ? '28px 28px' : undefined,
              }}
            >
              <CenterGraphicStage graphic={beat.graphic} style={beat.style} />

              <div
                style={{
                  position: 'absolute',
                  top: 42,
                  left: 55,
                  right: 55,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: '50%',
                    border: `4px solid ${isDark ? '#FFD60A' : '#0D0D0D'}`,
                    overflow: 'hidden',
                    backgroundColor: '#0D0D0D',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <Img
                    src={staticFile('avatar.png')}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div
                  style={{
                    backgroundColor: isDark ? '#FFD60A' : '#0D0D0D',
                    color: isDark ? '#0D0D0D' : '#FFD60A',
                    padding: '12px 28px',
                    borderRadius: 50,
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  {beat.pillText}
                </div>
              </div>

              <KaraokeCaptionBar
                caption={beat.caption}
                highlight={beat.highlight}
                isDarkBg={isDark}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: 'rgba(128,128,128,0.3)',
        }}
      >
        <div
          style={{
            width: `${totalProgress}%`,
            height: '100%',
            backgroundColor: '#e63946',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};