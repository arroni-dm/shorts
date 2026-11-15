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

interface WordCue {
  text: string;
  start: number;
  end: number;
}

const PHRASE_CHUNKS: WordCue[][] = [
  [
    { text: "ইন্টারনেট", start: 0.0, end: 0.65 },
    { text: "আপনাকে", start: 0.65, end: 1.15 },
    { text: "তথ্য", start: 1.15, end: 1.75 },
  ],
  [
    { text: "বা ইনফরমেশন", start: 1.75, end: 2.95 },
    { text: "দিতে পারে,", start: 2.95, end: 4.05 },
  ],
  [
    { text: "কিন্তু বই", start: 4.05, end: 5.0 },
    { text: "আপনাকে", start: 5.0, end: 5.55 },
    { text: "প্রজ্ঞা দেয়।", start: 5.55, end: 7.0 },
  ],
  [
    { text: "গুগলে", start: 7.0, end: 7.65 },
    { text: "সার্চ দিয়ে", start: 7.65, end: 8.55 },
    { text: "তিন মিনিটে", start: 8.55, end: 9.45 },
  ],
  [
    { text: "একটা বিষয়", start: 9.45, end: 10.35 },
    { text: "জেনে নেওয়া,", start: 10.35, end: 11.4 },
  ],
  [
    { text: "আর একটা", start: 11.4, end: 12.1 },
    { text: "বইয়ের", start: 12.1, end: 12.65 },
    { text: "৩০০ পৃষ্ঠা পড়ে", start: 12.65, end: 14.15 },
  ],
  [
    { text: "গভীর জ্ঞান", start: 14.15, end: 15.1 },
    { text: "অর্জন করার", start: 15.1, end: 15.95 },
    { text: "বিশাল পার্থক্য।", start: 15.95, end: 17.2 },
  ],
  [
    { text: "স্কিমিং বা", start: 17.2, end: 18.1 },
    { text: "তথ্য সংগ্রহের", start: 18.1, end: 19.25 },
    { text: "যুগে", start: 19.25, end: 19.8 },
  ],
  [
    { text: "গভীরে যাওয়ার", start: 19.8, end: 21.05 },
    { text: "অভ্যাস", start: 21.05, end: 21.75 },
    { text: "কমে যাচ্ছে।", start: 21.75, end: 23.0 },
  ],
  [
    { text: "মনস্তাত্ত্বিক", start: 23.0, end: 24.05 },
    { text: "বিকাশ ও", start: 24.05, end: 24.85 },
    { text: "চিন্তার পরিধি বাড়াতে", start: 24.85, end: 26.6 },
  ],
  [
    { text: "রিলস বা শর্টসের চেয়ে", start: 26.6, end: 28.2 },
    { text: "বই পড়া", start: 28.2, end: 28.95 },
    { text: "বহু গুণে এগিয়ে!", start: 28.95, end: 30.0 },
  ],
];

const POP_TIMES = [0.1, 4.1, 7.05, 11.45, 17.25, 19.85, 23.05, 26.65];
const WHOOSH_TIMES = [4.05, 7.0, 17.2, 23.0];

// Reusable White-Head Stickman Actor Component
const StickmanActor: React.FC<{
  pose: "phone-confused" | "book-wisdom" | "compare" | "scrolling" | "celebrate";
  frame: number;
  darkBg?: boolean;
  scale?: number;
}> = ({ pose, frame, darkBg = false, scale = 1 }) => {
  const strokeColor = darkBg ? "#FFFFFF" : "#111111";
  const headFill = "#FFFFFF";
  const bob = Math.sin(frame / 7) * 5;
  const wave = Math.sin(frame / 5) * 12;
  const blink = frame % 75 < 4;

  return (
    <svg
      width={300 * scale}
      height={320 * scale}
      viewBox="0 0 300 320"
      style={{ overflow: "visible" }}
    >
      {/* Ground Shadow */}
      <ellipse
        cx="150"
        cy="302"
        rx="58"
        ry="10"
        fill={darkBg ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}
      />

      {/* Wisdom Aura / Idea Rays for Book Poses */}
      {(pose === "book-wisdom" || pose === "celebrate") && (
        <g transform={`translate(150, ${75 + bob})`}>
          <circle
            r="68"
            fill="none"
            stroke="#FACC15"
            strokeWidth="4"
            strokeDasharray="10 10"
            opacity="0.85"
          />
          <line x1="0" y1="-84" x2="0" y2="-68" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
          <line x1="-62" y1="-56" x2="-50" y2="-44" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
          <line x1="62" y1="-56" x2="50" y2="-44" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}

      {/* Legs */}
      <path
        d={
          pose === "celebrate"
            ? "M 150 205 L 118 265 L 106 296 M 150 205 L 182 265 L 194 296"
            : "M 150 205 L 128 296 M 150 205 L 172 296"
        }
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Torso */}
      <line
        x1="150"
        y1={122 + bob}
        x2="150"
        y2="205"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Arms + Props per Pose */}
      {pose === "phone-confused" && (
        <g>
          {/* Left arm holding glowing phone */}
          <path
            d={`M 150 ${145 + bob} L 112 ${172 + bob} L 96 ${146 + bob}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Right arm scratching head */}
          <path
            d={`M 150 ${145 + bob} L 194 ${125 + bob} L 186 ${85 + bob}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Smartphone Prop */}
          <rect
            x="76"
            y={114 + bob}
            width="28"
            height="46"
            rx="6"
            fill="#1E293B"
            stroke="#38BDF8"
            strokeWidth="3"
          />
          <circle cx="90" cy={137 + bob} r="5" fill="#38BDF8" />
          {/* Question Mark */}
          <text
            x="202"
            y={72 + bob}
            fill="#DC2626"
            fontSize="42"
            fontWeight="bold"
          >
            ?
          </text>
        </g>
      )}

      {pose === "book-wisdom" && (
        <g>
          {/* Arms holding open golden book */}
          <path
            d={`M 150 ${145 + bob} L 106 ${174 + bob} L 126 ${164 + bob}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M 150 ${145 + bob} L 194 ${174 + bob} L 174 ${164 + bob}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Open Book Prop */}
          <path
            d={`M 116 ${152 + bob} Q 133 ${146 + bob} 150 ${155 + bob} Q 167 ${146 + bob} 184 ${152 + bob} L 184 ${184 + bob} Q 167 ${176 + bob} 150 ${185 + bob} Q 133 ${176 + bob} 116 ${184 + bob} Z`}
            fill="#FACC15"
            stroke="#111111"
            strokeWidth="3.5"
          />
        </g>
      )}

      {pose === "compare" && (
        <g>
          {/* Left hand: tiny phone */}
          <path
            d={`M 150 ${145 + bob} L 92 ${142 + bob + wave * 0.4}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="66"
            y={116 + bob + wave * 0.4}
            width="24"
            height="38"
            rx="5"
            fill="#64748B"
            stroke="#111111"
            strokeWidth="3"
          />
          {/* Right hand: thick green book */}
          <path
            d={`M 150 ${145 + bob} L 208 ${136 + bob - wave * 0.4}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="204"
            y={104 + bob - wave * 0.4}
            width="42"
            height="52"
            rx="6"
            fill="#10B981"
            stroke="#111111"
            strokeWidth="3.5"
          />
        </g>
      )}

      {pose === "scrolling" && (
        <g>
          <path
            d={`M 150 ${145 + bob} L 114 ${174 + bob} L 146 ${168 + bob}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M 150 ${145 + bob} L 186 ${164 + bob} L 160 ${156 + bob + wave * 0.5}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="138"
            y={136 + bob}
            width="28"
            height="46"
            rx="6"
            fill="#EF4444"
            stroke="#111111"
            strokeWidth="3"
          />
        </g>
      )}

      {pose === "celebrate" && (
        <g>
          {/* Both arms raised holding book high */}
          <path
            d={`M 150 ${145 + bob} L 106 ${96 + bob + wave * 0.4}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M 150 ${145 + bob} L 194 ${96 + bob - wave * 0.4}`}
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="184"
            y={64 + bob - wave * 0.4}
            width="38"
            height="46"
            rx="6"
            fill="#FACC15"
            stroke="#111111"
            strokeWidth="3.5"
          />
        </g>
      )}

      {/* White Round Head with Ink Outline */}
      <circle
        cx="150"
        cy={78 + bob}
        r="44"
        fill={headFill}
        stroke="#111111"
        strokeWidth="6"
      />

      {/* Eyes */}
      {blink ? (
        <g stroke="#111111" strokeWidth="4" strokeLinecap="round">
          <line x1="131" y1={74 + bob} x2="143" y2={74 + bob} />
          <line x1="157" y1={74 + bob} x2="169" y2={74 + bob} />
        </g>
      ) : (
        <g fill="#111111">
          <circle cx="137" cy={73 + bob} r="5.5" />
          <circle cx="163" cy={73 + bob} r="5.5" />
        </g>
      )}

      {/* Facial Expression Mouth */}
      {pose === "phone-confused" || pose === "scrolling" ? (
        <path
          d={`M 137 ${95 + bob} Q 150 ${88 + bob} 163 ${95 + bob}`}
          stroke="#111111"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d={`M 135 ${90 + bob} Q 150 ${106 + bob} 165 ${90 + bob}`}
          stroke="#111111"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
};

export const BookWisdomExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;
  const floatY = Math.sin(frame / 14) * 5;
  const progressPct = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  let bg = "#F7F5EE";
  let primaryText = "#111111";
  let dotColor = "rgba(17, 17, 17, 0.06)";

  if (sec < 4.05) {
    bg = "#FACC15";
    primaryText = "#111111";
    dotColor = "rgba(17, 17, 17, 0.08)";
  } else if (sec >= 4.05 && sec < 7.0) {
    bg = "#111111";
    primaryText = "#FFFFFF";
    dotColor = "rgba(255, 255, 255, 0.07)";
  }

  const activeChunk =
    PHRASE_CHUNKS.find(
      (chunk) => sec >= chunk[0].start && sec < chunk[chunk.length - 1].end
    ) ?? PHRASE_CHUNKS[PHRASE_CHUNKS.length - 1];

  const springAt = (startSec: number) =>
    spring({
      frame: Math.max(0, frame - Math.round(startSec * fps)),
      fps,
      config: { damping: 13, stiffness: 130 },
    });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        fontFamily,
        color: primaryText,
        overflow: "hidden",
      }}
    >
      {/* Subtle Editorial Dot Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${dotColor} 2px, transparent 2px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Main Voiceover */}
      <Audio src={staticFile("boi-pora.wav")} volume={1} />

      {/* Subtle Ambient Background Music Bed */}
      <Audio src={staticFile("cinematic-bed.wav")} volume={0.09} loop />

      {/* Micro Pop SFX */}
      {POP_TIMES.map((t, i) => (
        <Sequence key={`pop-${i}`} from={Math.round(t * fps)} durationInFrames={12}>
          <Audio src={staticFile("sfx-pop.wav")} volume={0.26} />
        </Sequence>
      ))}

      {/* Scene Switch Whoosh SFX */}
      {WHOOSH_TIMES.map((t, i) => (
        <Sequence key={`whoosh-${i}`} from={Math.round(t * fps)} durationInFrames={14}>
          <Audio src={staticFile("sfx-whoosh.wav")} volume={0.22} />
        </Sequence>
      ))}

      {/* TOP PERSISTENT HEADER */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: "50%",
            border: "5px solid #D97706",
            backgroundColor: "#111111",
            boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("avatar.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#111111",
            color: "#FFFFFF",
            padding: "16px 34px",
            borderRadius: 999,
            fontSize: 30,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              display: "inline-block",
            }}
          />
          <span>বই বনাম ইন্টারনেট</span>
        </div>
      </div>

      {/* CENTER STAGE: CREATOR-UI + STICKMAN HYBRID */}
      <div
        style={{
          position: "absolute",
          top: 225,
          left: 68,
          right: 68,
          height: 1040,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* BEAT 1 (0 - 4.05s): Yellow Hook + Confused Stickman with Phone */}
        {sec < 4.05 && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${springAt(0)}) translateY(${floatY}px)`,
            }}
          >
            <StickmanActor pose="phone-confused" frame={frame} scale={1.15} />
            <div style={{ fontSize: 74, fontWeight: 700, color: "#111111", lineHeight: 1.22, marginTop: 20 }}>
              ইন্টারনেট দেয় শুধু
            </div>
            <div
              style={{
                fontSize: 108,
                fontWeight: 700,
                color: "#DC2626",
                lineHeight: 1.15,
                marginTop: 8,
              }}
            >
              তথ্য ও ডেটা
            </div>
          </div>
        )}

        {/* BEAT 2 (4.05 - 7.0s): Dark Contrast + Stickman Reading Golden Book */}
        {sec >= 4.05 && sec < 7.0 && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${springAt(4.05)}) translateY(${floatY}px)`,
            }}
          >
            <StickmanActor pose="book-wisdom" frame={frame} darkBg scale={1.18} />
            <div style={{ fontSize: 82, fontWeight: 700, color: "#FACC15", marginTop: 18, marginBottom: 22 }}>
              কিন্তু বই দেয় প্রজ্ঞা
            </div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FFFFFF",
                color: "#111111",
                padding: "14px 42px",
                borderRadius: 999,
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              গভীর উপলব্ধি
            </div>
          </div>
        )}

        {/* BEAT 3 (7.0 - 17.2s): Dual Timeline Slider + Stickman Comparing */}
        {sec >= 7.0 && sec < 17.2 && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ textAlign: "center", fontSize: 58, fontWeight: 700, marginBottom: 34 }}>
              জ্ঞান অর্জনের{" "}
              <span style={{ backgroundColor: "#FACC15", padding: "2px 18px", borderRadius: 12 }}>
                গভীরতা
              </span>
            </div>

            <div style={{ width: "100%", marginBottom: 42, transform: `scale(${springAt(7.05)})` }}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#78716C",
                  color: "#FFFFFF",
                  padding: "10px 28px",
                  borderRadius: 999,
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                Google সার্চ: ৩ মিনিট
              </div>
              <div style={{ height: 12, backgroundColor: "#E5E7EB", borderRadius: 99, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: `${interpolate(sec, [7.2, 9.5], [0, 22], { extrapolateRight: "clamp" })}%`,
                    top: -10,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#78716C",
                  }}
                />
              </div>
            </div>

            {sec >= 11.4 && (
              <div style={{ width: "100%", marginBottom: 34, transform: `scale(${springAt(11.4)})` }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
                  <div
                    style={{
                      backgroundColor: "#10B981",
                      color: "#FFFFFF",
                      padding: "10px 28px",
                      borderRadius: 999,
                      fontSize: 32,
                      fontWeight: 700,
                    }}
                  >
                    একটি বই: ৩০০ পৃষ্ঠা
                  </div>
                </div>
                <div style={{ height: 12, backgroundColor: "#E5E7EB", borderRadius: 99, position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: `${interpolate(sec, [11.6, 14.5], [10, 84], { extrapolateRight: "clamp" })}%`,
                      top: -10,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#10B981",
                    }}
                  />
                </div>
              </div>
            )}

            <StickmanActor pose="compare" frame={frame} scale={0.92} />

            {sec >= 15.1 && (
              <div
                style={{
                  width: "100%",
                  marginTop: 14,
                  backgroundColor: "#FACC15",
                  color: "#111111",
                  padding: "20px 34px",
                  borderRadius: 999,
                  fontSize: 42,
                  fontWeight: 700,
                  textAlign: "center",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
                  transform: `scale(${springAt(15.1)})`,
                }}
              >
                দুটোর মধ্যে বিশাল পার্থক্য!
              </div>
            )}
          </div>
        )}

        {/* BEAT 4 (17.2 - 23.0s): Stacking Cards + Scrolling Stickman + Red Stamp */}
        {sec >= 17.2 && sec < 23.0 && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <StickmanActor pose="scrolling" frame={frame} scale={0.78} />
              <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.25 }}>
                স্কিমিং যুগে
                <br />
                যা হচ্ছে
              </div>
            </div>

            <div
              style={{
                width: "90%",
                backgroundColor: "#FFFFFF",
                border: "4px solid #3B82F6",
                borderRadius: 22,
                padding: "22px 34px",
                fontSize: 38,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
                transform: `scale(${springAt(17.25)})`,
              }}
            >
              <span style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#3B82F6" }} />
              <span>দ্রুত তথ্য স্কিমিং</span>
            </div>

            {sec >= 18.6 && (
              <div
                style={{
                  width: "90%",
                  backgroundColor: "#FFFFFF",
                  border: "4px solid #F59E0B",
                  borderRadius: 22,
                  padding: "22px 34px",
                  fontSize: 38,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
                  transform: `scale(${springAt(18.6)})`,
                }}
              >
                <span style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
                <span>অবিরাম স্ক্রলিং ও শর্টস</span>
              </div>
            )}

            {sec >= 20.0 && (
              <div
                style={{
                  width: "90%",
                  backgroundColor: "#F3F4F6",
                  border: "3px dashed #9CA3AF",
                  borderRadius: 22,
                  padding: "24px 34px",
                  position: "relative",
                  transform: `scale(${springAt(20.0)})`,
                }}
              >
                <div style={{ fontSize: 28, color: "#6B7280", marginBottom: 4 }}>পরে করবো:</div>
                <div style={{ fontSize: 38, fontWeight: 700, color: "#2563EB" }}>গভীরে গিয়ে বই পড়া</div>

                {sec >= 21.3 && (
                  <div
                    style={{
                      position: "absolute",
                      right: 24,
                      bottom: -24,
                      backgroundColor: "#FFFFFF",
                      border: "4px solid #EF4444",
                      color: "#EF4444",
                      padding: "10px 26px",
                      borderRadius: 14,
                      fontSize: 34,
                      fontWeight: 700,
                      transform: `rotate(-6deg) scale(${springAt(21.3)})`,
                      boxShadow: "0 10px 20px rgba(239,68,68,0.2)",
                    }}
                  >
                    পরে আর হয় না!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* BEAT 5 (23.0 - 30.0s): Celebrating Stickman + Flow Badges */}
        {sec >= 23.0 && (
          <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <StickmanActor pose="celebrate" frame={frame} scale={0.95} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                marginTop: 14,
                marginBottom: 32,
                transform: `scale(${springAt(23.05)})`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#22C55E",
                  color: "#FFFFFF",
                  padding: "16px 34px",
                  borderRadius: 20,
                  fontSize: 38,
                  fontWeight: 700,
                }}
              >
                বই পড়া
              </div>
              <div style={{ fontSize: 46, fontWeight: 700 }}>→</div>
              <div
                style={{
                  backgroundColor: "#2563EB",
                  color: "#FFFFFF",
                  padding: "16px 34px",
                  borderRadius: 20,
                  fontSize: 38,
                  fontWeight: 700,
                }}
              >
                বিকাশ + প্রজ্ঞা
              </div>
            </div>

            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FDE68A",
                padding: "14px 36px",
                borderRadius: 16,
                fontSize: 50,
                fontWeight: 700,
                marginBottom: 28,
                transform: `scale(${springAt(24.9)})`,
              }}
            >
              চিন্তার পরিধি বাড়াতে
            </div>

            {sec >= 26.65 && (
              <div
                style={{
                  backgroundColor: "#FACC15",
                  padding: "22px 46px",
                  borderRadius: 999,
                  fontSize: 48,
                  fontWeight: 700,
                  boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
                  transform: `scale(${springAt(26.65)})`,
                }}
              >
                বই পড়া বহু গুণে এগিয়ে!
              </div>
            )}
          </div>
        )}
      </div>

      {/* COMPACT FIT-CONTENT KARAOKE SUBTITLE PILL */}
      <div
        style={{
          position: "absolute",
          bottom: 310,
          left: 44,
          right: 44,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            width: "fit-content",
            maxWidth: "96%",
            backgroundColor: "rgba(17, 17, 17, 0.94)",
            padding: "16px 34px",
            borderRadius: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.28)",
          }}
        >
          {activeChunk.map((w, i) => {
            const isActive = sec >= w.start && sec < w.end;
            return (
              <span
                key={`${w.start}-${i}`}
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: isActive ? "#FACC15" : "#FFFFFF",
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  display: "inline-block",
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* SUBTLE TOP-EDGE RETENTION PROGRESS BAR */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: "rgba(0,0,0,0.08)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: "100%",
            backgroundColor: sec >= 4.05 && sec < 7.0 ? "#FACC15" : "#EF4444",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export default BookWisdomExplainer;