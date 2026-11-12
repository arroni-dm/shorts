
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
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

const VOICE_FILE = "nvidia-voice.wav";
const SFX_FILE = "sfx-whoosh.wav";
const BEAT_DURATION = 3;

const GREEN = "#76B900";

type Beat = {
  title: string;
  subtitle: string;
  label: string;
  visual: "number" | "bars" | "orbit" | "timeline" | "alert" | "focus";
  value?: string;
};

const BEATS: Beat[] = [
  { label: "TECH STORY", title: "একটি কোম্পানি", subtitle: "বদলে দিয়েছে পুরো প্রযুক্তি বিশ্ব", visual: "focus" },
  { label: "THE BEGINNING", title: "১৯৯৩ সাল", subtitle: "তিনজনের হাত ধরে যাত্রা শুরু", visual: "timeline" },
  { label: "A BIG IDEA", title: "একটি স্বপ্ন", subtitle: "কম্পিউটার গ্রাফিক্সকে নতুনভাবে গড়ে তোলা", visual: "orbit" },
  { label: "THE EARLY DAYS", title: "Graphics Processing", subtitle: "GPU প্রযুক্তির বিকাশ", visual: "bars" },
  { label: "A NEW ERA", title: "Gaming Revolution", subtitle: "গেমিং দুনিয়ায় নতুন সম্ভাবনা", visual: "focus" },
  { label: "THE NEXT STEP", title: "শুধু Gaming নয়", subtitle: "NVIDIA-র লক্ষ্য আরও বড়", visual: "number" },
  { label: "TECHNOLOGY", title: "CUDA", subtitle: "GPU-কে আরও শক্তিশালী কাজে ব্যবহারের সুযোগ", visual: "orbit" },
  { label: "THE TURNING POINT", title: "একটি বড় পরিবর্তন", subtitle: "GPU এখন শুধু Graphics-এর জন্য নয়", visual: "timeline" },
  { label: "ARTIFICIAL INTELLIGENCE", title: "AI-এর উত্থান", subtitle: "শুরু হলো নতুন প্রযুক্তির প্রতিযোগিতা", visual: "focus" },
  { label: "DEEP LEARNING", title: "GPU + AI", subtitle: "একসঙ্গে বদলে দিল Computing", visual: "orbit" },
  { label: "THE BIG SHIFT", title: "প্রযুক্তির নতুন শক্তি", subtitle: "AI Training-এ GPU-এর গুরুত্ব বাড়তে থাকে", visual: "bars" },
  { label: "GLOBAL IMPACT", title: "বিশ্বজুড়ে চাহিদা", subtitle: "AI Infrastructure-এর কেন্দ্রে NVIDIA", visual: "number" },
  { label: "GENERATIVE AI", title: "ChatGPT-এর যুগ", subtitle: "AI নিয়ে বিশ্বজুড়ে নতুন আগ্রহ", visual: "focus" },
  { label: "THE ENGINE", title: "AI Data Centers", subtitle: "বিশাল Computing Power-এর প্রয়োজন", visual: "orbit" },
  { label: "THE HARDWARE", title: "H100 ও Blackwell", subtitle: "AI Computing-এর জন্য উন্নত GPU Architecture", visual: "bars" },
  { label: "THE BUSINESS", title: "চিপের বাজার", subtitle: "AI Infrastructure-এ তীব্র প্রতিযোগিতা", visual: "timeline" },
  { label: "THE GROWTH", title: "অবিশ্বাস্য উত্থান", subtitle: "NVIDIA হয়ে ওঠে প্রযুক্তি জগতের গুরুত্বপূর্ণ নাম", visual: "number" },
  { label: "THE LEADER", title: "Jensen Huang", subtitle: "দীর্ঘদিন ধরে কোম্পানির নেতৃত্বে", visual: "focus" },
  { label: "THE STRATEGY", title: "শুধু চিপ বিক্রি নয়", subtitle: "Hardware, Software এবং Ecosystem", visual: "orbit" },
  { label: "THE ECOSYSTEM", title: "একটি পূর্ণাঙ্গ Platform", subtitle: "Developer থেকে Data Center পর্যন্ত", visual: "bars" },
  { label: "GLOBAL COMPETITION", title: "প্রতিযোগিতা বাড়ছে", subtitle: "বড় Tech কোম্পানিগুলো তৈরি করছে নিজস্ব AI Chip", visual: "timeline" },
  { label: "THE CHALLENGE", title: "বাজারের চাপ", subtitle: "প্রতিযোগিতা ও Supply Chain-এর চ্যালেঞ্জ", visual: "alert" },
  { label: "CHINA MARKET", title: "চীনের বাজার", subtitle: "Export Restrictions নিয়ে জটিলতা", visual: "focus" },
  { label: "REGULATION", title: "সরকারি নিয়ন্ত্রণ", subtitle: "AI Chip রপ্তানিতে নীতিগত বাধা", visual: "alert" },
  { label: "CORPORATE GOVERNANCE", title: "স্বচ্ছতার প্রশ্ন", subtitle: "বড় প্রতিষ্ঠানে Governance কেন গুরুত্বপূর্ণ?", visual: "orbit" },
  { label: "THE BIG QUESTION", title: "এত ক্ষমতার ঝুঁকি কী?", subtitle: "AI প্রযুক্তির ভবিষ্যৎ নিয়ে উদ্বেগ", visual: "number" },
  { label: "THE NEXT COMPETITION", title: "নতুন প্রতিদ্বন্দ্বী", subtitle: "Google, AMD এবং অন্যান্য প্রতিষ্ঠান", visual: "bars" },
  { label: "THE FUTURE", title: "AI কোথায় যাচ্ছে?", subtitle: "আরও দ্রুত, আরও শক্তিশালী Computing", visual: "orbit" },
  { label: "LEADERSHIP", title: "নেতৃত্বের গুরুত্ব", subtitle: "একটি কোম্পানির ভবিষ্যৎ নির্ভর করে কৌশলের ওপর", visual: "focus" },
  { label: "THE NEXT CHAPTER", title: "NVIDIA-র পরবর্তী লক্ষ্য", subtitle: "AI-এর পর কোন প্রযুক্তি বদলে দেবে বিশ্ব?", visual: "timeline" },
  { label: "THE BIG PICTURE", title: "এটি শুধু একটি কোম্পানি নয়", subtitle: "এটি ভবিষ্যতের Computing Revolution", visual: "number" },
  { label: "YOUR OPINION", title: "AI-এর ভবিষ্যৎ কার হাতে?", subtitle: "NVIDIA, Google নাকি নতুন কোনো প্রতিষ্ঠান?", visual: "alert" },
  { label: "FINAL QUESTION", title: "আপনার কী মনে হয়?", subtitle: "কমেন্টে আপনার মতামত জানান", visual: "focus" },
  { label: "END", title: "ভবিষ্যৎ এখনই তৈরি হচ্ছে", subtitle: "আরও Tech Documentary পেতে Follow করুন", visual: "orbit" },
];

const MotionVisual: React.FC<{
  type: Beat["visual"];
  value?: string;
  accent: string;
  frame: number;
  fps: number;
}> = ({ type, value, accent, frame, fps }) => {
  const progress = interpolate(frame, [0, fps * 2.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const float = Math.sin(frame / 10) * 12;

  const base: React.CSSProperties = {
    width: 650,
    height: 470,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    transform: `translateY(${float}px) scale(${entrance})`,
  };

  if (type === "number") {
    return (
      <div style={base}>
        <div style={{
          fontSize: 190,
          fontWeight: 700,
          color: accent,
          textShadow: `0 0 60px ${accent}55`,
        }}>
          {value || "AI"}
        </div>
        <div style={{
          position: "absolute",
          bottom: 40,
          width: 400,
          height: 5,
          background: "#FFFFFF22",
          borderRadius: 10,
        }}>
          <div style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: accent,
            borderRadius: 10,
          }} />
        </div>
      </div>
    );
  }

  if (type === "bars") {
    return (
      <div style={{ ...base, gap: 22, alignItems: "flex-end", paddingBottom: 65 }}>
        {[160, 260, 210, 370, 310, 430].map((height, i) => {
          const grow = interpolate(
            frame,
            [i * 4, 25 + i * 4],
            [0, height],
            { extrapolateRight: "clamp" }
          );
          return (
            <div key={i} style={{
              width: 65,
              height: grow,
              borderRadius: "12px 12px 0 0",
              background: i === 5 ? accent : `${accent}77`,
              boxShadow: `0 0 25px ${accent}22`,
            }} />
          );
        })}
      </div>
    );
  }

  if (type === "orbit") {
    return (
      <div style={base}>
        {[390, 290, 190].map((size, i) => (
          <div key={i} style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `2px solid ${accent}${i === 0 ? "55" : "99"}`,
            transform: `rotate(${frame * (i + 1) * (i % 2 ? -1 : 1)}deg)`,
          }}>
            <div style={{
              width: 18,
              height: 18,
              background: accent,
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: -9,
              boxShadow: `0 0 20px ${accent}`,
            }} />
          </div>
        ))}
        <div style={{
          width: 120,
          height: 120,
          borderRadius: 30,
          background: accent,
          boxShadow: `0 0 80px ${accent}77`,
        }} />
      </div>
    );
  }

  if (type === "timeline") {
    return (
      <div style={{ ...base, flexDirection: "column", gap: 55 }}>
        <div style={{
          width: 530,
          height: 5,
          background: "#FFFFFF33",
          position: "relative",
        }}>
          <div style={{
            width: `${progress * 100}%`,
            height: 5,
            background: accent,
          }} />
          {[0, 1, 2, 3].map((n) => (
            <div key={n} style={{
              position: "absolute",
              left: `${n * 33.33}%`,
              top: -12,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: progress > n / 3 ? accent : "#64748B",
              boxShadow: progress > n / 3 ? `0 0 25px ${accent}` : "none",
            }} />
          ))}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: 530,
          fontSize: 28,
          color: "#CBD5E1",
        }}>
          <span>১৯৯৩</span>
          <span>২০২৬</span>
        </div>
      </div>
    );
  }

  if (type === "alert") {
    const pulse = 1 + Math.sin(frame / 5) * 0.08;
    return (
      <div style={{
        ...base,
        flexDirection: "column",
        gap: 25,
      }}>
        <div style={{
          width: 180,
          height: 180,
          border: `4px solid ${accent}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 120,
          fontWeight: 700,
          color: accent,
          transform: `scale(${pulse})`,
        }}>
          !
        </div>
        <div style={{
          width: 380,
          height: 3,
          background: accent,
          opacity: progress,
        }} />
      </div>
    );
  }

  return (
    <div style={base}>
      <div style={{
        width: 280,
        height: 280,
        borderRadius: 55,
        background: `${accent}15`,
        border: `2px solid ${accent}88`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 90px ${accent}22`,
      }}>
        <div style={{
          fontSize: 100,
          fontWeight: 700,
          color: accent,
          letterSpacing: -5,
        }}>
          NVIDIA
        </div>
      </div>
    </div>
  );
};

export const NVIDIADocumentary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatIndex = Math.min(
    BEATS.length - 1,
    Math.floor(frame / (BEAT_DURATION * fps))
  );

  const beat = BEATS[beatIndex];
  const localFrame = frame % (BEAT_DURATION * fps);

  const accent = beat.visual === "alert" ? "#F59E0B" : GREEN;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 16, stiffness: 110 },
  });

  const opacity = interpolate(localFrame, [0, 8, 75, 89], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(localFrame, [0, 15], [45, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: "#080B10",
      color: "#FFFFFF",
      fontFamily,
      overflow: "hidden",
      alignItems: "center",
    }}>
      {/* Background */}
      <AbsoluteFill style={{
        background:
          "radial-gradient(ellipse at 50% 38%, #14201A 0%, #080B10 65%)",
      }} />

      {/* Subtle grid */}
      <AbsoluteFill style={{
        backgroundImage:
          "linear-gradient(#FFFFFF08 1px, transparent 1px), linear-gradient(90deg, #FFFFFF08 1px, transparent 1px)",
        backgroundSize: "65px 65px",
        opacity: 0.5,
      }} />

      {/* Voiceover */}
      <Audio src={staticFile(VOICE_FILE)} volume={1} />

      {/* Transition SFX */}
      {BEATS.map((_, i) =>
        i === 0 ? null : (
          <Sequence
            key={i}
            from={i * BEAT_DURATION * fps}
            durationInFrames={Math.round(fps * 0.7)}
          >
            <Audio src={staticFile(SFX_FILE)} volume={0.16} />
          </Sequence>
        )
      )}

      {/* Top header */}
      <div style={{
        position: "absolute",
        top: 85,
        width: 920,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 25,
        fontWeight: 700,
        letterSpacing: 3,
      }}>
        <span style={{ color: accent }}>TECH DOCUMENTARY</span>
        <span style={{ color: "#94A3B8" }}>
          {String(beatIndex + 1).padStart(2, "0")} / 34
        </span>
      </div>

      {/* Progress line */}
      <div style={{
        position: "absolute",
        top: 145,
        width: 920,
        height: 4,
        background: "#FFFFFF20",
        borderRadius: 20,
      }}>
        <div style={{
          width: `${((beatIndex + localFrame / (BEAT_DURATION * fps)) / BEATS.length) * 100}%`,
          height: "100%",
          background: accent,
          borderRadius: 20,
        }} />
      </div>

      {/* Section label */}
      <div style={{
        position: "absolute",
        top: 300,
        fontSize: 27,
        fontWeight: 700,
        color: accent,
        letterSpacing: 4,
        opacity,
      }}>
        {beat.label}
      </div>

      {/* Motion graphics */}
      <div style={{
        position: "absolute",
        top: 500,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        transform: `scale(${entrance})`,
      }}>
        <MotionVisual
          type={beat.visual}
          value={beat.value}
          accent={accent}
          frame={localFrame}
          fps={fps}
        />
      </div>

      {/* Main typography */}
      <div style={{
        position: "absolute",
        top: 1120,
        width: 950,
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}>
        <div style={{
          fontSize: 82,
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: 28,
          textShadow: "0 8px 30px #00000088",
        }}>
          {beat.title}
        </div>

        <div style={{
          fontSize: 40,
          fontWeight: 500,
          color: "#B8C1CC",
          lineHeight: 1.6,
        }}>
          {beat.subtitle}
        </div>
      </div>

      {/* Bottom branding */}
      <div style={{
        position: "absolute",
        bottom: 90,
        fontSize: 23,
        fontWeight: 600,
        letterSpacing: 4,
        color: "#64748B",
      }}>
        THE WORLD OF TECHNOLOGY
      </div>
    </AbsoluteFill>
  );
};

export default NVIDIADocumentary;
