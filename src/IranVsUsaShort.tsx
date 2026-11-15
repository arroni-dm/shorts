import React, { useEffect, useState } from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Caption, parseSrt } from '@remotion/captions';
import { loadFont } from '@remotion/google-fonts/HindSiliguri';
import { DynamicScene } from './components/DynamicScene';

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700'],
  subsets: ['bengali'],
});

const SrtKaraokeCaptions: React.FC<{ darkTheme?: boolean }> = ({ darkTheme = true }) => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [handle] = useState(() => delayRender('Loading iranvsusa.srt...'));

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  useEffect(() => {
    fetch(staticFile('iranvsusa.srt'))
      .then((res) => res.text())
      .then((text) => {
        const { captions: parsed } = parseSrt({ input: text });
        setCaptions(parsed);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, [handle]);

  const activeCaption = captions.find(
    (c) => currentTimeMs >= c.startMs && currentTimeMs <= c.endMs
  );

  if (!activeCaption) return null;

  const words = activeCaption.text.trim().split(/\s+/);
  const phrases: string[] = [];
  for (let i = 0; i < words.length; i += 3) {
    phrases.push(words.slice(i, i + 3).join(' '));
  }

  const progress =
    (currentTimeMs - activeCaption.startMs) /
    Math.max(1, activeCaption.endMs - activeCaption.startMs);
  const activePhraseIdx = Math.min(phrases.length - 1, Math.floor(progress * phrases.length));

  const popScale = spring({
    frame: Math.max(0, Math.round(((currentTimeMs - activeCaption.startMs) / 1000) * fps)),
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 220,
        left: 60,
        right: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        transform: `scale(${0.94 + 0.06 * popScale})`,
        zIndex: 50,
        fontFamily,
      }}
    >
      {phrases.map((phrase, idx) => {
        const isCurrent = idx === activePhraseIdx;
        return (
          <div
            key={idx}
            style={{
              padding: '12px 30px',
              borderRadius: 18,
              backgroundColor: isCurrent
                ? '#FFD60A'
                : darkTheme
                ? 'rgba(13, 13, 13, 0.9)'
                : 'rgba(250, 246, 238, 0.95)',
              color: isCurrent ? '#0D0D0D' : darkTheme ? '#FFFFFF' : '#0D0D0D',
              border: isCurrent
                ? '4px solid #0D0D0D'
                : darkTheme
                ? '2px solid rgba(255,255,255,0.2)'
                : '3px solid #0D0D0D',
              fontSize: isCurrent ? 52 : 44,
              fontWeight: 700,
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
              transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {phrase}
          </div>
        );
      })}
    </div>
  );
};

const CreatorHeader: React.FC<{ badgeText: string; lightBg?: boolean }> = ({
  badgeText,
  lightBg = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pulse = 1 + Math.sin(t * 6) * 0.03;

  return (
    <div
      style={{
        position: 'absolute',
        top: 75,
        left: 55,
        right: 55,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 60,
        fontFamily,
      }}
    >
      <div
        style={{
          width: 112,
          height: 112,
          borderRadius: '50%',
          padding: 6,
          background: 'linear-gradient(135deg, #FFD60A, #FF6B00)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          transform: `scale(${pulse})`,
        }}
      >
        <Img
          src={staticFile('avatar.png')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #0D0D0D',
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: '#0D0D0D',
          color: '#FFD60A',
          padding: '16px 34px',
          borderRadius: 999,
          border: lightBg ? '3px solid #0D0D0D' : '2px solid #FFD60A',
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 1,
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        }}
      >
        {badgeText}
      </div>
    </div>
  );
};

// Vox Explainer স্টাইল: মধ্যপ্রাচ্য রাডার ও ঘাঁটি ম্যাপ (9.6s - 19.5s)
const VoxMiddleEastRadar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const targets = [
    { name: 'বাহরাইন (US Radar)', x: 640, y: 690, delay: 4.5 },
    { name: 'এরবিল, ইরাক (US Base)', x: 430, y: 420, delay: 6.6 },
    { name: 'কুয়েত (US Military Base)', x: 560, y: 560, delay: 8.0 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F4EFE6',
        backgroundImage: 'radial-gradient(#C8C0B0 2.5px, transparent 2.5px)',
        backgroundSize: '36px 36px',
        padding: 60,
        fontFamily,
      }}
    >
      <div style={{ marginTop: 220, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#FFD60A',
            padding: '12px 30px',
            border: '4px solid #0D0D0D',
            boxShadow: '8px 8px 0px #0D0D0D',
            fontSize: 44,
            fontWeight: 700,
            color: '#0D0D0D',
          }}
        >
          📍 মধ্যপ্রাচ্য টার্গেট জোন
        </div>
      </div>

      <svg width="960" height="820" viewBox="0 0 960 820" style={{ marginTop: 30 }}>
        <circle cx="720" cy="480" r="280" fill="none" stroke="#D9534F" strokeWidth="2" strokeDasharray="10 8" opacity="0.5" />
        <circle cx="720" cy="480" r="420" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />

        <polygon
          points="660,260 860,300 910,540 760,640 640,510"
          fill="#FFD60A"
          stroke="#0D0D0D"
          strokeWidth="5"
        />
        <text x="740" y="450" fontSize="38" fontWeight="700" fill="#0D0D0D" fontFamily={fontFamily}>
          ইরান
        </text>

        {targets.map((tgt, i) => {
          const active = t >= tgt.delay;
          const progress = interpolate(t - tgt.delay, [0, 0.6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const pulseR = active ? 16 + Math.sin((t - tgt.delay) * 10) * 8 : 0;

          return (
            <g key={i} opacity={active ? 1 : 0.25}>
              <line
                x1="710"
                y1="450"
                x2={710 + (tgt.x - 710) * progress}
                y2={450 + (tgt.y - 450) * progress}
                stroke="#E63946"
                strokeWidth="6"
                strokeDasharray="12 6"
              />
              <circle cx={tgt.x} cy={tgt.y} r={pulseR} fill="rgba(230, 57, 70, 0.35)" />
              <circle cx={tgt.x} cy={tgt.y} r="12" fill="#E63946" stroke="#0D0D0D" strokeWidth="3" />
              <rect x={tgt.x - 190} y={tgt.y - 68} width="380" height="46" rx="8" fill="#0D0D0D" />
              <text
                x={tgt.x}
                y={tgt.y - 38}
                textAnchor="middle"
                fill="#FFD60A"
                fontSize="24"
                fontWeight="700"
                fontFamily={fontFamily}
              >
                {tgt.name}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Stickman Style: স্ট্র্যাটেজি বনাম মিসাইল (22.6s - 27.2s)
const StickmanStrategyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const nod = Math.sin(t * 8) * 6;
  const armWave = Math.sin(t * 6) * 18;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FAF6EE',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 230,
          backgroundColor: '#0D0D0D',
          color: '#FFD60A',
          padding: '14px 36px',
          borderRadius: 14,
          fontSize: 40,
          fontWeight: 700,
        }}
      >
        🧠 শক্তি নয়, আসল খেলা কৌশলে!
      </div>

      <svg width="900" height="750" viewBox="0 0 900 750">
        <rect x="180" y="520" width="540" height="24" rx="10" fill="#0D0D0D" />
        <rect x="240" y="544" width="22" height="160" fill="#0D0D0D" />
        <rect x="638" y="544" width="22" height="160" fill="#0D0D0D" />

        <g transform={`translate(340, 290)`}>
          <circle cx="0" cy={nod} r="48" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="8" />
          <circle cx="-14" cy={nod - 6} r="5" fill="#0D0D0D" />
          <circle cx="14" cy={nod - 6} r="5" fill="#0D0D0D" />
          <path d={`M -16 ${nod + 14} Q 0 ${nod + 28} 16 ${nod + 14}`} stroke="#0D0D0D" strokeWidth="5" fill="none" />
          <line x1="0" y1="48" x2="0" y2="230" stroke="#0D0D0D" strokeWidth="10" strokeLinecap="round" />
          <line x1="0" y1="95" x2="135" y2={75 + armWave} stroke="#0D0D0D" strokeWidth="10" strokeLinecap="round" />
          <line x1="0" y1="95" x2="-75" y2="165" stroke="#0D0D0D" strokeWidth="10" strokeLinecap="round" />
        </g>

        <g transform={`translate(530, ${270 + Math.sin(t * 4) * 10})`}>
          <rect width="260" height="90" rx="16" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="5" />
          <text x="130" y="55" textAnchor="middle" fontSize="28" fontWeight="700" fill="#0D0D0D" fontFamily={fontFamily}>
            🚀 ক্ষেপণাস্ত্র শক্তি
          </text>
        </g>
        <g transform={`translate(530, ${390 - Math.sin(t * 4) * 10})`}>
          <rect width="260" height="95" rx="16" fill="#0D0D0D" stroke="#FFD60A" strokeWidth="5" />
          <text x="130" y="58" textAnchor="middle" fontSize="28" fontWeight="700" fill="#FFD60A" fontFamily={fontFamily}>
            ♟️ দীর্ঘমেয়াদি কৌশল
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Vox Data Cards: ৩টি কৌশলগত শক্তি (27.2s - 37.0s)
const VoxThreePillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const cards = [
    { icon: '🛡️', title: 'দীর্ঘদিনের সামরিক প্রস্তুতি', sub: 'আন্ডারগ্রাউন্ড মিসাইল সিটি ও ডিফেন্স', delay: 0.1 },
    { icon: '🛸', title: 'আধুনিক ড্রোন প্রযুক্তি', sub: 'স্বল্প খরচে হাই-ইমপ্যাক্ট স্ট্রাইক', delay: 1.8 },
    { icon: '🌊', title: 'হরমুজ প্রণালীর নিয়ন্ত্রণ', sub: 'বৈশ্বিক তেল সরবরাহের প্রধান চাবিকাঠি', delay: 3.2 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F4EFE6',
        backgroundImage: 'radial-gradient(#C8C0B0 2.5px, transparent 2.5px)',
        backgroundSize: '36px 36px',
        padding: '240px 65px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        fontFamily,
      }}
    >
      {cards.map((card, i) => {
        const s = spring({
          frame: Math.max(0, Math.round((t - card.delay) * fps)),
          fps,
          config: { damping: 14, stiffness: 150 },
        });
        return (
          <div
            key={i}
            style={{
              backgroundColor: i === 2 ? '#FFD60A' : '#FFFFFF',
              border: '5px solid #0D0D0D',
              borderRadius: 24,
              padding: '32px 36px',
              boxShadow: '10px 10px 0px #0D0D0D',
              transform: `translateX(${(1 - s) * 140}px) scale(${0.9 + 0.1 * s})`,
              opacity: s,
              display: 'flex',
              alignItems: 'center',
              gap: 26,
            }}
          >
            <div style={{ fontSize: 64 }}>{card.icon}</div>
            <div>
              <div style={{ fontSize: 38, fontWeight: 700, color: '#0D0D0D' }}>{card.title}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: '#333333', marginTop: 6 }}>
                {card.sub}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Stickman + Vox Hybrid: যুদ্ধ নাকি শক্তি প্রদর্শন? (45.8s - 52.1s)
const StickmanDilemmaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const tilt = Math.sin(t * 5) * 10;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0D0D0D',
        padding: '230px 60px 0',
        alignItems: 'center',
        fontFamily,
      }}
    >
      <div style={{ display: 'flex', gap: 24, width: '100%' }}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#E63946',
            borderRadius: 24,
            padding: 30,
            border: '4px solid #FFFFFF',
            textAlign: 'center',
            transform: `scale(${t < 4.2 ? 1.04 : 0.96})`,
          }}
        >
          <div style={{ fontSize: 54 }}>⚔️</div>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#FFFFFF', marginTop: 10 }}>
            দীর্ঘমেয়াদি যুদ্ধ?
          </div>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFD60A',
            borderRadius: 24,
            padding: 30,
            border: '4px solid #FFFFFF',
            textAlign: 'center',
            transform: `scale(${t >= 4.2 ? 1.05 : 0.96})`,
          }}
        >
          <div style={{ fontSize: 54 }}>💪</div>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#0D0D0D', marginTop: 10 }}>
            শক্তি প্রদর্শন?
          </div>
        </div>
      </div>

      <svg width="500" height="450" viewBox="0 0 500 450" style={{ marginTop: 30 }}>
        <g transform={`translate(250, 140)`}>
          <circle cx="0" cy="0" r="52" fill="#FFD60A" stroke="#FFFFFF" strokeWidth="6" />
          <text
            x="85"
            y="-45"
            fontSize="76"
            fontWeight="700"
            fill="#FFD60A"
            transform={`rotate(${tilt}, 85, -45)`}
          >
            ?
          </text>
          <line x1="0" y1="52" x2="0" y2="230" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <polyline
            points="0,105 -55,145 -22,42"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="0" y1="105" x2="65" y2="165" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const IranVsUsaShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const isLightScene = t >= 9.6 && t < 37.0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D0D0D', fontFamily }}>
      <Audio src={staticFile('iranvsusa.wav')} volume={1} />
      <Audio src={staticFile('cinematic-bed.wav')} volume={0.14} />

      {/* 100% Voice-Synced SFX */}
      <Sequence from={Math.round(8.0 * fps)} durationInFrames={fps}>
        <Audio src={staticFile('sfx-whoosh.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={Math.round(9.6 * fps)} durationInFrames={fps}>
        <Audio src={staticFile('sfx-pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={Math.round(19.5 * fps)} durationInFrames={fps}>
        <Audio src={staticFile('sfx-whoosh.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={Math.round(27.2 * fps)} durationInFrames={fps}>
        <Audio src={staticFile('sfx-pop.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={Math.round(37.0 * fps)} durationInFrames={fps}>
        <Audio src={staticFile('sfx-whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={Math.round(52.1 * fps)} durationInFrames={fps}>
        <Audio src={staticFile('sfx-pop.wav')} volume={0.6} />
      </Sequence>

      {/* BEAT 1 (0.0s - 8.0s): Creator-UI Hook */}
      <Sequence from={0} durationInFrames={Math.round(8.0 * fps)}>
        <AbsoluteFill style={{ backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              padding: '28px 48px',
              borderRadius: 28,
              border: '4px solid #FFD60A',
              backgroundColor: 'rgba(255, 214, 10, 0.1)',
              textAlign: 'center',
              marginBottom: 140,
            }}
          >
            <div style={{ fontSize: 42, fontWeight: 700, color: '#FFD60A' }}>🇺🇸 USA vs 🇮🇷 IRAN</div>
            <div style={{ fontSize: 64, fontWeight: 700, color: '#FFFFFF', marginTop: 10 }}>
              “আমরা প্রস্তুত!”
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* BEAT 2 (8.0s - 9.6s): DynamicScene "দেশটির নাম ইরান!" */}
      <Sequence from={Math.round(8.0 * fps)} durationInFrames={Math.round(1.6 * fps)}>
        <DynamicScene scene="geopolitics-alert" mood="dramatic" />
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#FFD60A',
              color: '#0D0D0D',
              padding: '24px 70px',
              borderRadius: 24,
              border: '6px solid #0D0D0D',
              fontSize: 96,
              fontWeight: 700,
              boxShadow: '14px 14px 0px #0D0D0D',
              marginBottom: 150,
            }}
          >
            ইরান 🇮🇷
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* BEAT 3 (9.6s - 19.5s): Vox Explainer Radar Map */}
      <Sequence from={Math.round(9.6 * fps)} durationInFrames={Math.round(9.9 * fps)}>
        <VoxMiddleEastRadar />
      </Sequence>

      {/* BEAT 4 (19.5s - 22.6s): Creator-UI Yellow Punch ("এ যেন সরাসরি ওয়াশিংটনকে দেওয়া এক বার্তা!") */}
      <Sequence from={Math.round(19.5 * fps)} durationInFrames={Math.round(3.1 * fps)}>
        <AbsoluteFill style={{ backgroundColor: '#FFD60A', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#0D0D0D',
              color: '#FFD60A',
              padding: '36px 54px',
              borderRadius: 28,
              fontSize: 56,
              fontWeight: 700,
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              marginBottom: 140,
            }}
          >
            সরাসরি ওয়াশিংটনকে বার্তা! 🏛️
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* BEAT 5 (22.6s - 27.2s): Stickman Strategy Scene */}
      <Sequence from={Math.round(22.6 * fps)} durationInFrames={Math.round(4.6 * fps)}>
        <StickmanStrategyScene />
      </Sequence>

      {/* BEAT 6 (27.2s - 37.0s): Vox Three Strategic Pillars */}
      <Sequence from={Math.round(27.2 * fps)} durationInFrames={Math.round(9.8 * fps)}>
        <VoxThreePillars />
      </Sequence>

      {/* BEAT 7 (37.0s - 45.8s): DynamicScene Strait of Hormuz */}
      <Sequence from={Math.round(37.0 * fps)} durationInFrames={Math.round(8.8 * fps)}>
        <DynamicScene scene="ocean-tanker-crisis" mood="tense" />
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: 'rgba(13, 13, 13, 0.9)',
              border: '4px solid #FFD60A',
              borderRadius: 26,
              padding: '32px 46px',
              textAlign: 'center',
              marginBottom: 160,
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 700, color: '#FFD60A' }}>
              ⚠️ হরমুজ প্রণালী সংকট
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#FFFFFF', marginTop: 12 }}>
              বিশ্বের ২০% জ্বালানি তেলের রুট ঝুঁকিতে!
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* BEAT 8 (45.8s - 52.1s): Stickman + Vox Hybrid Dilemma */}
      <Sequence from={Math.round(45.8 * fps)} durationInFrames={Math.round(6.3 * fps)}>
        <StickmanDilemmaScene />
      </Sequence>

      {/* BEAT 9 (52.1s - 53.5s): Creator-UI CTA Ending ("আপনার কী মনে হয়?") */}
      <Sequence from={Math.round(52.1 * fps)} durationInFrames={Math.round(1.4 * fps)}>
        <AbsoluteFill style={{ backgroundColor: '#0D0D0D', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#FFD60A',
              color: '#0D0D0D',
              padding: '32px 56px',
              borderRadius: 28,
              fontSize: 54,
              fontWeight: 700,
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(255, 214, 10, 0.45)',
              marginBottom: 150,
            }}
          >
            💬 কমেন্টে জানান!
          </div>
        </AbsoluteFill>
      </Sequence>

      <CreatorHeader badgeText="IRAN vs USA" lightBg={isLightScene} />
      <SrtKaraokeCaptions darkTheme={!isLightScene} />
    </AbsoluteFill>
  );
};