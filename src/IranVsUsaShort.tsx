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

const { fontFamily } = loadFont('normal', {
  weights: ['600', '700'],
  subsets: ['bengali'],
});

// Higgsfield-Style Camera Rig: Handheld Drift + Smooth Dolly Zoom
const CinematicCameraRig: React.FC<{
  children: React.ReactNode;
  zoomFrom?: number;
  zoomTo?: number;
  shakeIntensity?: number;
}> = ({ children, zoomFrom = 1.0, zoomTo = 1.09, shakeIntensity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;

  const progress = interpolate(frame, [0, Math.max(1, durationInFrames)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [zoomFrom, zoomTo]);
  const driftX = (Math.sin(t * 2.1) * 9 + Math.cos(t * 4.3) * 4) * shakeIntensity;
  const driftY = (Math.cos(t * 1.9) * 8 + Math.sin(t * 3.7) * 4) * shakeIntensity;
  const tilt = Math.sin(t * 1.6) * 0.65 * shakeIntensity;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${driftX}px, ${driftY}px) rotate(${tilt}deg)`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Blurred Ambient Glow Orbs (SaaS Dark Glow)
const AmbientGlowOrbs: React.FC<{ color1?: string; color2?: string }> = ({
  color1 = 'rgba(255, 214, 10, 0.22)',
  color2 = 'rgba(230, 57, 70, 0.22)',
}) => {
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          left: '-12%',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          filter: 'blur(65px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-8%',
          right: '-12%',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          filter: 'blur(65px)',
        }}
      />
    </AbsoluteFill>
  );
};

// Google Flow-Style Atmospheric Lighting, Vignette & Film Grain Overlay
const CinematicAtmosphereOverlay: React.FC<{
  glowColor?: string;
  isLightScene?: boolean;
}> = ({ glowColor = 'rgba(255, 214, 10, 0.14)', isLightScene = false }) => {
  const frame = useCurrentFrame();
  const seed = frame % 12;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 40 }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, ${glowColor} 0%, transparent 65%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: isLightScene
            ? 'radial-gradient(circle, transparent 58%, rgba(13, 13, 13, 0.22) 100%)'
            : 'radial-gradient(circle, transparent 52%, rgba(0, 0, 0, 0.72) 100%)',
        }}
      />
      <svg
        width="100%"
        height="100%"
        style={{ opacity: isLightScene ? 0.045 : 0.075, mixBlendMode: 'overlay' }}
      >
        <filter id={`film-grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={seed}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#film-grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

// One-by-One Pop-in Caption
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

  const totalDurationMs = Math.max(1, activeCaption.endMs - activeCaption.startMs);
  const phraseDurationMs = totalDurationMs / phrases.length;
  const elapsedMs = currentTimeMs - activeCaption.startMs;

  const activePhraseIdx = Math.min(
    phrases.length - 1,
    Math.max(0, Math.floor(elapsedMs / phraseDurationMs))
  );

  const activePhrase = phrases[activePhraseIdx];
  const phraseStartMs = activeCaption.startMs + activePhraseIdx * phraseDurationMs;
  const framesSincePhraseStart = Math.max(
    0,
    Math.round(((currentTimeMs - phraseStartMs) / 1000) * fps)
  );

  const popScale = spring({
    frame: framesSincePhraseStart,
    fps,
    config: { damping: 13, stiffness: 240 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 235,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 55,
        fontFamily,
      }}
    >
      <div
        key={`${activeCaption.startMs}-${activePhraseIdx}`}
        style={{
          padding: '16px 40px',
          borderRadius: 22,
          backgroundColor: '#FFD60A',
          color: '#0D0D0D',
          border: darkTheme ? '4px solid #FFFFFF' : '4px solid #0D0D0D',
          fontSize: 56,
          fontWeight: 700,
          textAlign: 'center',
          boxShadow: darkTheme
            ? '0 16px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 214, 10, 0.35)'
            : '10px 10px 0px #0D0D0D',
          transform: `scale(${0.8 + 0.2 * popScale})`,
        }}
      >
        {activePhrase}
      </div>
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
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
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
          letterSpacing: 1.5,
          boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        }}
      >
        {badgeText}
      </div>
    </div>
  );
};

// Bottom Multi-Color Linear Progress Bar
const BottomProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = Math.min(100, Math.max(0, (frame / Math.max(1, durationInFrames)) * 100));

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        zIndex: 70,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #4285F4 0%, #34A853 45%, #FFD60A 75%, #E63946 100%)',
          boxShadow: '0 0 14px rgba(255, 214, 10, 0.65)',
        }}
      />
    </div>
  );
};

// কাস্টম ইরান অ্যালার্ট সিন (8.0s - 9.6s)
const IranRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ringRot = t * 120;

  return (
    <CinematicCameraRig zoomFrom={1.18} zoomTo={1.0} shakeIntensity={1.4}>
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 45%, #3B0D11 0%, #0A0A0C 75%)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AmbientGlowOrbs color1="rgba(230, 57, 70, 0.32)" color2="rgba(255, 214, 10, 0.25)" />
        <svg width="900" height="900" viewBox="0 0 900 900" style={{ position: 'absolute', opacity: 0.45 }}>
          <g transform={`rotate(${ringRot}, 450, 450)`}>
            <circle cx="450" cy="450" r="320" fill="none" stroke="#FFD60A" strokeWidth="4" strokeDasharray="30 18" />
            <circle cx="450" cy="450" r="240" fill="none" stroke="#E63946" strokeWidth="3" strokeDasharray="12 12" />
          </g>
          <line x1="80" y1="450" x2="820" y2="450" stroke="#E63946" strokeWidth="2" opacity="0.5" />
          <line x1="450" y1="80" x2="450" y2="820" stroke="#E63946" strokeWidth="2" opacity="0.5" />
        </svg>

        <div
          style={{
            backgroundColor: '#FFD60A',
            color: '#0D0D0D',
            padding: '26px 76px',
            borderRadius: 24,
            border: '6px solid #0D0D0D',
            fontSize: 102,
            fontWeight: 700,
            boxShadow: '16px 16px 0px #0D0D0D, 0 0 60px rgba(255, 214, 10, 0.65)',
            marginBottom: 150,
          }}
        >
          ইরান 🇮🇷
        </div>
      </AbsoluteFill>
    </CinematicCameraRig>
  );
};

// Vox + Tactical Radar Sweep (9.6s - 19.5s)
const VoxMiddleEastRadar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const sweepAngle = (t * 95) % 360;
  const targets = [
    { name: 'বাহরাইন (US Radar)', x: 640, y: 690, delay: 4.5 },
    { name: 'এরবিল, ইরাক (US Base)', x: 430, y: 420, delay: 6.6 },
    { name: 'কুয়েত (US Military Base)', x: 560, y: 560, delay: 8.0 },
  ];

  return (
    <CinematicCameraRig zoomFrom={1.0} zoomTo={1.1} shakeIntensity={0.85}>
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
          <defs>
            <linearGradient id="radar-beam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(230, 57, 70, 0.35)" />
              <stop offset="100%" stopColor="rgba(230, 57, 70, 0)" />
            </linearGradient>
          </defs>

          <circle cx="720" cy="480" r="280" fill="none" stroke="#D9534F" strokeWidth="2.5" strokeDasharray="10 8" opacity="0.55" />
          <circle cx="720" cy="480" r="420" fill="none" stroke="#0D0D0D" strokeWidth="2" strokeDasharray="6 6" opacity="0.3" />

          <g transform={`rotate(${sweepAngle}, 720, 480)`}>
            <path d="M 720 480 L 1120 480 A 400 400 0 0 1 1050 700 Z" fill="url(#radar-beam)" />
          </g>

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
            const progress = interpolate(t - tgt.delay, [0, 0.55], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const pulseR = active ? 18 + Math.sin((t - tgt.delay) * 12) * 10 : 0;

            return (
              <g key={i} opacity={active ? 1 : 0.22}>
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
    </CinematicCameraRig>
  );
};

// Stickman + 3D Perspective Strategy Scene (22.6s - 27.2s)
const StickmanStrategyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const nod = Math.sin(t * 8) * 6;
  const armWave = Math.sin(t * 6) * 18;
  const cardTilt = Math.sin(t * 3) * 8;

  return (
    <CinematicCameraRig zoomFrom={1.02} zoomTo={1.09} shakeIntensity={0.8}>
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
            boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
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

          <g transform={`translate(530, ${270 + Math.sin(t * 4) * 10}) skewY(${cardTilt * 0.25})`}>
            <rect width="260" height="90" rx="16" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="5" />
            <text x="130" y="55" textAnchor="middle" fontSize="28" fontWeight="700" fill="#0D0D0D" fontFamily={fontFamily}>
              🚀 ক্ষেপণাস্ত্র শক্তি
            </text>
          </g>
          <g transform={`translate(530, ${390 - Math.sin(t * 4) * 10}) skewY(${-cardTilt * 0.25})`}>
            <rect width="260" height="95" rx="16" fill="#0D0D0D" stroke="#FFD60A" strokeWidth="5" />
            <text x="130" y="58" textAnchor="middle" fontSize="28" fontWeight="700" fill="#FFD60A" fontFamily={fontFamily}>
              ♟️ দীর্ঘমেয়াদি কৌশল
            </text>
          </g>
        </svg>
      </AbsoluteFill>
    </CinematicCameraRig>
  );
};

// Claude-Style 3D Perspective Data Cards + Hex-Opacity Step Badges (27.2s - 37.0s)
const VoxThreePillars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const cards = [
    { step: '01', accent: '#4285F4', icon: '🛡️', title: 'দীর্ঘদিনের সামরিক প্রস্তুতি', sub: 'আন্ডারগ্রাউন্ড মিসাইল সিটি ও ডিফেন্স', delay: 0.1 },
    { step: '02', accent: '#E63946', icon: '🛸', title: 'আধুনিক ড্রোন প্রযুক্তি', sub: 'স্বল্প খরচে হাই-ইমপ্যাক্ট স্ট্রাইক', delay: 1.8 },
    { step: '03', accent: '#34A853', icon: '🌊', title: 'হরমুজ প্রণালীর নিয়ন্ত্রণ', sub: 'বৈশ্বিক তেল সরবরাহের প্রধান চাবিকাঠি', delay: 3.2 },
  ];

  return (
    <CinematicCameraRig zoomFrom={1.0} zoomTo={1.07} shakeIntensity={0.7}>
      <AbsoluteFill
        style={{
          backgroundColor: '#F4EFE6',
          backgroundImage: 'radial-gradient(#C8C0B0 2.5px, transparent 2.5px)',
          backgroundSize: '36px 36px',
          padding: '235px 65px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          perspective: 1100,
          fontFamily,
        }}
      >
        {cards.map((card, i) => {
          const s = spring({
            frame: Math.max(0, Math.round((t - card.delay) * fps)),
            fps,
            config: { damping: 14, stiffness: 160 },
          });
          const rotateY = (1 - s) * 28 + Math.sin(t * 2.5 + i) * 2.5;
          return (
            <div
              key={i}
              style={{
                backgroundColor: i === 2 ? '#FFD60A' : '#FFFFFF',
                border: '5px solid #0D0D0D',
                borderRadius: 24,
                padding: '28px 34px',
                boxShadow: '12px 12px 0px #0D0D0D',
                transform: `translateX(${(1 - s) * 140}px) rotateY(${rotateY}deg) scale(${0.92 + 0.08 * s})`,
                opacity: s,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              {/* Hex-Opacity Step Badge */}
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: i === 2 ? '#0D0D0D' : card.accent,
                  backgroundColor: i === 2 ? 'rgba(13,13,13,0.12)' : `${card.accent}20`,
                  border: `3px solid ${i === 2 ? '#0D0D0D' : card.accent}`,
                  padding: '16px 20px',
                  borderRadius: 18,
                  minWidth: 84,
                  textAlign: 'center',
                }}
              >
                {card.step}
              </div>

              <div>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#0D0D0D' }}>
                  {card.icon} {card.title}
                </div>
                <div style={{ fontSize: 25, fontWeight: 600, color: '#333333', marginTop: 6 }}>
                  {card.sub}
                </div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </CinematicCameraRig>
  );
};

// কাস্টম হরমুজ প্রণালী ও তেলের ট্যাংকার সিন (37.0s - 45.8s)
const StraitOfHormuzScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const shipX = interpolate(t, [0, 8.8], [160, 680]);
  const waveShift = Math.sin(t * 4) * 25;

  return (
    <CinematicCameraRig zoomFrom={1.0} zoomTo={1.12} shakeIntensity={1.1}>
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #071926 0%, #0D2B3E 55%, #06131C 100%)',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily,
        }}
      >
        <AmbientGlowOrbs color1="rgba(0, 180, 216, 0.25)" color2="rgba(255, 214, 10, 0.2)" />
        <svg width="1080" height="900" viewBox="0 0 1080 900" style={{ position: 'absolute', bottom: 180 }}>
          <g transform={`translate(${shipX}, ${460 + Math.sin(t * 3) * 8})`}>
            <polygon points="0,60 280,60 245,115 25,115" fill="#E63946" stroke="#FFD60A" strokeWidth="4" />
            <rect x="40" y="25" width="45" height="35" fill="#FFFFFF" />
            <rect x="105" y="38" width="110" height="22" rx="4" fill="#FFD60A" />
          </g>
          <path
            d={`M -100 570 Q 170 ${545 + waveShift} 440 570 T 980 570 T 1300 570 L 1300 900 L -100 900 Z`}
            fill="rgba(0, 119, 182, 0.45)"
          />
          <path
            d={`M -100 610 Q 220 ${635 - waveShift} 540 610 T 1180 610 L 1180 900 L -100 900 Z`}
            fill="rgba(3, 4, 94, 0.65)"
          />
        </svg>

        <div
          style={{
            backgroundColor: 'rgba(13, 13, 13, 0.88)',
            backdropFilter: 'blur(14px)',
            border: '4px solid #FFD60A',
            borderRadius: 26,
            padding: '32px 46px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
            marginBottom: 240,
            zIndex: 10,
          }}
        >
          {/* Gradient Clip Headline */}
          <div
            style={{
              fontSize: 50,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #FFD60A 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ⚠️ হরমুজ প্রণালী সংকট
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: '#FFFFFF', marginTop: 12 }}>
            বিশ্বের ২০% জ্বালানি তেলের রুট ঝুঁকিতে!
          </div>
        </div>
      </AbsoluteFill>
    </CinematicCameraRig>
  );
};

// Stickman + Glassmorphism 3D Dilemma (45.8s - 52.1s)
const StickmanDilemmaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const tilt = Math.sin(t * 5) * 10;

  return (
    <CinematicCameraRig zoomFrom={1.0} zoomTo={1.09} shakeIntensity={1.0}>
      <AbsoluteFill
        style={{
          backgroundColor: '#0A0A0C',
          padding: '230px 60px 0',
          alignItems: 'center',
          perspective: 1000,
          fontFamily,
        }}
      >
        <AmbientGlowOrbs color1="rgba(230, 57, 70, 0.25)" color2="rgba(255, 214, 10, 0.22)" />
        <div style={{ display: 'flex', gap: 24, width: '100%' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(230, 57, 70, 0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: 24,
              padding: 30,
              border: '4px solid #FFFFFF',
              textAlign: 'center',
              boxShadow: t < 4.2 ? '0 0 40px rgba(230, 57, 70, 0.6)' : 'none',
              transform: `scale(${t < 4.2 ? 1.05 : 0.95}) rotateY(6deg)`,
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
              backgroundColor: 'rgba(255, 214, 10, 0.96)',
              backdropFilter: 'blur(12px)',
              borderRadius: 24,
              padding: 30,
              border: '4px solid #FFFFFF',
              textAlign: 'center',
              boxShadow: t >= 4.2 ? '0 0 40px rgba(255, 214, 10, 0.6)' : 'none',
              transform: `scale(${t >= 4.2 ? 1.06 : 0.95}) rotateY(-6deg)`,
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
    </CinematicCameraRig>
  );
};

export const IranVsUsaShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const isLightScene = t >= 9.6 && t < 37.0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0C', fontFamily, overflow: 'hidden' }}>
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

      {/* BEAT 1 (0.0s - 8.0s): Creator-UI Glassmorphism Hook + Blurred Glow Orbs + Gradient Text */}
      <Sequence from={0} durationInFrames={Math.round(8.0 * fps)}>
        <CinematicCameraRig zoomFrom={1.0} zoomTo={1.12} shakeIntensity={1.1}>
          <AbsoluteFill
            style={{
              backgroundColor: '#0A0A0C',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AmbientGlowOrbs color1="rgba(66, 133, 244, 0.28)" color2="rgba(255, 214, 10, 0.24)" />
            <div
              style={{
                padding: '34px 54px',
                borderRadius: 30,
                border: '4px solid #FFD60A',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 214, 10, 0.25)',
                textAlign: 'center',
                marginBottom: 140,
              }}
            >
              <div style={{ fontSize: 44, fontWeight: 700, color: '#FFD60A', letterSpacing: 2 }}>
                🇺🇸 USA vs 🇮🇷 IRAN
              </div>
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 700,
                  marginTop: 12,
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #D4D4D8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                “আমরা প্রস্তুত!”
              </div>
            </div>
          </AbsoluteFill>
        </CinematicCameraRig>
      </Sequence>

      {/* BEAT 2 (8.0s - 9.6s): Custom Iran Reveal */}
      <Sequence from={Math.round(8.0 * fps)} durationInFrames={Math.round(1.6 * fps)}>
        <IranRevealScene />
      </Sequence>

      {/* BEAT 3 (9.6s - 19.5s): Vox Explainer Tactical Radar Map */}
      <Sequence from={Math.round(9.6 * fps)} durationInFrames={Math.round(9.9 * fps)}>
        <VoxMiddleEastRadar />
      </Sequence>

      {/* BEAT 4 (19.5s - 22.6s): Creator-UI Yellow Punch */}
      <Sequence from={Math.round(19.5 * fps)} durationInFrames={Math.round(3.1 * fps)}>
        <CinematicCameraRig zoomFrom={1.08} zoomTo={1.0} shakeIntensity={1.2}>
          <AbsoluteFill style={{ backgroundColor: '#FFD60A', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: '#0D0D0D',
                color: '#FFD60A',
                padding: '38px 56px',
                borderRadius: 28,
                fontSize: 56,
                fontWeight: 700,
                textAlign: 'center',
                boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
                marginBottom: 140,
              }}
            >
              সরাসরি ওয়াশিংটনকে বার্তা! 🏛️
            </div>
          </AbsoluteFill>
        </CinematicCameraRig>
      </Sequence>

      {/* BEAT 5 (22.6s - 27.2s): Stickman Strategy Scene */}
      <Sequence from={Math.round(22.6 * fps)} durationInFrames={Math.round(4.6 * fps)}>
        <StickmanStrategyScene />
      </Sequence>

      {/* BEAT 6 (27.2s - 37.0s): Claude 3D Strategic Pillars + Hex-Opacity Badges */}
      <Sequence from={Math.round(27.2 * fps)} durationInFrames={Math.round(9.8 * fps)}>
        <VoxThreePillars />
      </Sequence>

      {/* BEAT 7 (37.0s - 45.8s): Custom Strait of Hormuz Ocean & Tanker Scene */}
      <Sequence from={Math.round(37.0 * fps)} durationInFrames={Math.round(8.8 * fps)}>
        <StraitOfHormuzScene />
      </Sequence>

      {/* BEAT 8 (45.8s - 52.1s): Stickman + 3D Dilemma */}
      <Sequence from={Math.round(45.8 * fps)} durationInFrames={Math.round(6.3 * fps)}>
        <StickmanDilemmaScene />
      </Sequence>

      {/* BEAT 9 (52.1s - 53.5s): Creator-UI CTA Ending */}
      <Sequence from={Math.round(52.1 * fps)} durationInFrames={Math.round(1.4 * fps)}>
        <CinematicCameraRig zoomFrom={1.15} zoomTo={1.0} shakeIntensity={1.2}>
          <AbsoluteFill style={{ backgroundColor: '#0A0A0C', justifyContent: 'center', alignItems: 'center' }}>
            <AmbientGlowOrbs color1="rgba(52, 168, 83, 0.3)" color2="rgba(255, 214, 10, 0.28)" />
            <div
              style={{
                backgroundColor: '#FFD60A',
                color: '#0D0D0D',
                padding: '32px 56px',
                borderRadius: 28,
                fontSize: 54,
                fontWeight: 700,
                textAlign: 'center',
                boxShadow: '0 0 70px rgba(255, 214, 10, 0.55)',
                marginBottom: 150,
              }}
            >
              💬 কমেন্টে জানান!
            </div>
          </AbsoluteFill>
        </CinematicCameraRig>
      </Sequence>

      <CinematicAtmosphereOverlay isLightScene={isLightScene} />
      <CreatorHeader badgeText="IRAN vs USA" lightBg={isLightScene} />
      <SrtKaraokeCaptions darkTheme={!isLightScene} />
      <BottomProgressBar />
    </AbsoluteFill>
  );
};