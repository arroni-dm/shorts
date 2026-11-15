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

export const BookWisdomExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;
  const floatY = Math.sin(frame / 14) * 6;
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

      {/* CENTER STAGE */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 68,
          right: 68,
          height: 1020,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* BEAT 1 (0 - 4.05s): Yellow Hook */}
        {sec < 4.05 && (
          <div style={{ textAlign: "center", transform: `scale(${springAt(0)}) translateY(${floatY}px)` }}>
            <div style={{ fontSize: 80, fontWeight: 700, color: "#111111", lineHeight: 1.25 }}>
              ইন্টারনেট দেয় শুধু
            </div>
            <div
              style={{
                fontSize: 116,
                fontWeight: 700,
                color: "#DC2626",
                lineHeight: 1.15,
                marginTop: 14,
              }}
            >
              তথ্য ও ডেটা
            </div>
          </div>
        )}

        {/* BEAT 2 (4.05 - 7.0s): Dark Contrast Wisdom Reveal */}
        {sec >= 4.05 && sec < 7.0 && (
          <div style={{ textAlign: "center", transform: `scale(${springAt(4.05)}) translateY(${floatY}px)` }}>
            <div
              style={{
                width: 210,
                height: 210,
                borderRadius: "50%",
                border: "6px solid #FACC15",
                backgroundColor: "#1F2937",
                margin: "0 auto 38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 60px rgba(250, 204, 21, 0.28)",
              }}
            >
              <svg
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FACC15"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div style={{ fontSize: 86, fontWeight: 700, color: "#FACC15", marginBottom: 26 }}>
              কিন্তু বই দেয় প্রজ্ঞা
            </div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FFFFFF",
                color: "#111111",
                padding: "16px 44px",
                borderRadius: 999,
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              গভীর উপলব্ধি
            </div>
          </div>
        )}

        {/* BEAT 3 (7.0 - 17.2s): Dual Timeline Slider Comparison */}
        {sec >= 7.0 && sec < 17.2 && (
          <div style={{ width: "100%" }}>
            <div style={{ textAlign: "center", fontSize: 62, fontWeight: 700, marginBottom: 60 }}>
              জ্ঞান অর্জনের{" "}
              <span style={{ backgroundColor: "#FACC15", padding: "2px 18px", borderRadius: 12 }}>
                গভীরতা
              </span>
            </div>

            <div style={{ marginBottom: 64, transform: `scale(${springAt(7.05)})` }}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#78716C",
                  color: "#FFFFFF",
                  padding: "12px 30px",
                  borderRadius: 999,
                  fontSize: 34,
                  fontWeight: 700,
                  marginBottom: 18,
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
              <div style={{ marginBottom: 60, transform: `scale(${springAt(11.4)})` }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#10B981",
                      color: "#FFFFFF",
                      padding: "12px 30px",
                      borderRadius: 999,
                      fontSize: 34,
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

            {sec >= 15.1 && (
              <div
                style={{
                  backgroundColor: "#FACC15",
                  color: "#111111",
                  padding: "24px 38px",
                  borderRadius: 999,
                  fontSize: 46,
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

        {/* BEAT 4 (17.2 - 23.0s): Stacking Cards & Slanted Red Stamp */}
        {sec >= 17.2 && sec < 23.0 && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
            <div style={{ fontSize: 58, fontWeight: 700, marginBottom: 16 }}>
              স্কিমিং যুগে যা হচ্ছে
            </div>

            <div
              style={{
                width: "90%",
                backgroundColor: "#FFFFFF",
                border: "4px solid #3B82F6",
                borderRadius: 22,
                padding: "26px 38px",
                fontSize: 40,
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
                  padding: "26px 38px",
                  fontSize: 40,
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
                  padding: "28px 38px",
                  position: "relative",
                  transform: `scale(${springAt(20.0)})`,
                }}
              >
                <div style={{ fontSize: 30, color: "#6B7280", marginBottom: 6 }}>পরে করবো:</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: "#2563EB" }}>গভীরে গিয়ে বই পড়া</div>

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

        {/* BEAT 5 (23.0 - 30.0s): Flow Badges & Highlighted Solution */}
        {sec >= 23.0 && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 22,
                marginBottom: 48,
                transform: `scale(${springAt(23.05)})`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#22C55E",
                  color: "#FFFFFF",
                  padding: "18px 38px",
                  borderRadius: 22,
                  fontSize: 42,
                  fontWeight: 700,
                }}
              >
                বই পড়া
              </div>
              <div style={{ fontSize: 50, fontWeight: 700 }}>→</div>
              <div
                style={{
                  backgroundColor: "#2563EB",
                  color: "#FFFFFF",
                  padding: "18px 38px",
                  borderRadius: 22,
                  fontSize: 42,
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
                padding: "16px 40px",
                borderRadius: 18,
                fontSize: 56,
                fontWeight: 700,
                marginBottom: 36,
                transform: `scale(${springAt(24.9)})`,
              }}
            >
              চিন্তার পরিধি বাড়াতে
            </div>

            {sec >= 26.65 && (
              <div
                style={{
                  backgroundColor: "#FACC15",
                  padding: "24px 48px",
                  borderRadius: 999,
                  fontSize: 52,
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