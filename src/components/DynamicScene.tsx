// src/components/DynamicScene.tsx
import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type AtmosphereTheme =
  | 'vedicDawn'
  | 'mysticNight'
  | 'crimsonWar'
  | 'goldenEra'
  | 'emeraldForest'
  | 'celestialBlue'
  | 'ashramDusk'
  | 'divineFire';

export type MonumentType =
  | 'temple'
  | 'stupa'
  | 'sacredTree'
  | 'yajnaFire'
  | 'palace'
  | 'mountainPeak';

export type WeatherEffect = 'none' | 'stars' | 'fireflies' | 'embers' | 'rain' | 'snow';

export interface DynamicSceneProps {
  seed?: number; // ১ থেকে ১০০০+ যেকোনো সংখ্যা দিলে অটোমেটিক নতুন সিন তৈরি হবে
  theme?: AtmosphereTheme;
  monument?: MonumentType;
  weather?: WeatherEffect;
  hasBirds?: boolean;
  hasRiver?: boolean;
  cameraMotion?: 'zoomIn' | 'zoomOut' | 'panRight' | 'panLeft';
}

const THEMES: Record<
  AtmosphereTheme,
  {
    sky: [string, string, string];
    celestial: string;
    celestialGlow: string;
    farHill: string;
    midHill: string;
    ground: string;
    structureMain: string;
    structureAccent: string;
    accentHighlight: string;
  }
> = {
  vedicDawn: {
    sky: ['#1a0b2e', '#5c1d4c', '#e06348'],
    celestial: '#ffb703',
    celestialGlow: '#fb8500',
    farHill: '#2b1236',
    midHill: '#1f0c29',
    ground: '#0d0412',
    structureMain: '#14071c',
    structureAccent: '#2e133d',
    accentHighlight: '#ffb703',
  },
  mysticNight: {
    sky: ['#050814', '#0f1c3f', '#1e3a6e'],
    celestial: '#f8f9fa',
    celestialGlow: '#90e0ef',
    farHill: '#0b132b',
    midHill: '#1c2541',
    ground: '#040711',
    structureMain: '#090e1c',
    structureAccent: '#1b2845',
    accentHighlight: '#90e0ef',
  },
  crimsonWar: {
    sky: ['#1c0303', '#590d0d', '#b82518'],
    celestial: '#ff4d00',
    celestialGlow: '#ff9e00',
    farHill: '#2b0606',
    midHill: '#1a0303',
    ground: '#0a0101',
    structureMain: '#120202',
    structureAccent: '#380808',
    accentHighlight: '#ff7b00',
  },
  goldenEra: {
    sky: ['#2b1903', '#784808', '#d9961a'],
    celestial: '#fff3b0',
    celestialGlow: '#ffd166',
    farHill: '#3d2405',
    midHill: '#261603',
    ground: '#120a01',
    structureMain: '#1c1002',
    structureAccent: '#4a2c06',
    accentHighlight: '#ffd166',
  },
  emeraldForest: {
    sky: ['#041a13', '#0d4231', '#217859'],
    celestial: '#d8f3dc',
    celestialGlow: '#74c69d',
    farHill: '#08291e',
    midHill: '#051c14',
    ground: '#020d09',
    structureMain: '#04140e',
    structureAccent: '#113d2d',
    accentHighlight: '#95d5b2',
  },
  celestialBlue: {
    sky: ['#090426', '#1e1366', '#3f37c9'],
    celestial: '#4cc9f0',
    celestialGlow: '#4361ee',
    farHill: '#120b3d',
    midHill: '#0b0629',
    ground: '#040214',
    structureMain: '#07041f',
    structureAccent: '#1b1454',
    accentHighlight: '#4cc9f0',
  },
  ashramDusk: {
    sky: ['#241109', '#6e3219', '#c96a32'],
    celestial: '#ffccd5',
    celestialGlow: '#ff8fa3',
    farHill: '#36190d',
    midHill: '#210f07',
    ground: '#0f0603',
    structureMain: '#170a04',
    structureAccent: '#421e0f',
    accentHighlight: '#ffb703',
  },
  divineFire: {
    sky: ['#140824', '#47123b', '#9e2a2b'],
    celestial: '#ffba08',
    celestialGlow: '#f48c06',
    farHill: '#240b29',
    midHill: '#17061a',
    ground: '#08020a',
    structureMain: '#0f0412',
    structureAccent: '#330e36',
    accentHighlight: '#ffba08',
  },
};

const THEME_KEYS = Object.keys(THEMES) as AtmosphereTheme[];
const MONUMENT_KEYS: MonumentType[] = [
  'temple',
  'stupa',
  'sacredTree',
  'yajnaFire',
  'palace',
  'mountainPeak',
];
const WEATHER_KEYS: WeatherEffect[] = ['stars', 'fireflies', 'embers', 'rain', 'snow', 'none'];
const CAMERA_KEYS: Array<'zoomIn' | 'zoomOut' | 'panRight' | 'panLeft'> = [
  'zoomIn',
  'zoomOut',
  'panRight',
  'panLeft',
];

export const DynamicScene: React.FC<DynamicSceneProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const seed = props.seed ?? 1;

  // সিড অনুযায়ী স্বয়ংক্রিয়ভাবে ভ্যারিয়েশন নির্বাচন (যদি প্রপস না দেওয়া থাকে)
  const config = useMemo(() => {
    const theme =
      props.theme ?? THEME_KEYS[Math.floor(random(`theme-${seed}`) * THEME_KEYS.length)];
    const monument =
      props.monument ??
      MONUMENT_KEYS[Math.floor(random(`monument-${seed}`) * MONUMENT_KEYS.length)];
    const weather =
      props.weather ?? WEATHER_KEYS[Math.floor(random(`weather-${seed}`) * WEATHER_KEYS.length)];
    const cameraMotion =
      props.cameraMotion ??
      CAMERA_KEYS[Math.floor(random(`camera-${seed}`) * CAMERA_KEYS.length)];
    const hasBirds = props.hasBirds ?? random(`birds-${seed}`) > 0.45;
    const hasRiver = props.hasRiver ?? random(`river-${seed}`) > 0.5;
    const celestialX = 250 + random(`celX-${seed}`) * 580;
    const celestialRadius = 110 + random(`celR-${seed}`) * 110;
    const hillShift = (random(`hill-${seed}`) - 0.5) * 200;

    return {
      theme,
      monument,
      weather,
      cameraMotion,
      hasBirds,
      hasRiver,
      celestialX,
      celestialRadius,
      hillShift,
    };
  }, [seed, props]);

  const colors = THEMES[config.theme];

  // ১. ক্যামেরা অ্যানিমেশন (Ken Burns / Panning)
  const camScale =
    config.cameraMotion === 'zoomIn'
      ? interpolate(frame, [0, durationInFrames], [1, 1.12])
      : config.cameraMotion === 'zoomOut'
      ? interpolate(frame, [0, durationInFrames], [1.12, 1])
      : 1.06;

  const camX =
    config.cameraMotion === 'panRight'
      ? interpolate(frame, [0, durationInFrames], [-30, 30])
      : config.cameraMotion === 'panLeft'
      ? interpolate(frame, [0, durationInFrames], [30, -30])
      : 0;

  // ২. সূর্য বা চাঁদের গতি
  const celestialY = interpolate(frame, [0, durationInFrames], [680, 360], {
    extrapolateRight: 'clamp',
  });

  // ৩. মূল স্থাপত্যের স্প্রিং এন্ট্রান্স
  const monumentSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // ৪. মেঘের গতি
  const cloudDrift = interpolate(frame, [0, durationInFrames], [-80, 100]);

  // ৫. ডাইনামিক পার্টিকেল তৈরি (তারা, জোনাকি, আগুনের ফুলকি, বৃষ্টি, তুষার)
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: random(`px-${seed}-${i}`) * 1080,
      y: random(`py-${seed}-${i}`) * 1350,
      size: 2 + random(`ps-${seed}-${i}`) * 5,
      speed: 0.5 + random(`psp-${seed}-${i}`) * 2.5,
      delay: random(`pd-${seed}-${i}`) * 60,
    }));
  }, [seed]);

  // ৬. উড়ন্ত পাখির দল
  const birds = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      offsetX: i * 45 + random(`bx-${seed}-${i}`) * 20,
      offsetY: Math.sin(i) * 35,
      flapSpeed: 0.25 + random(`bf-${seed}-${i}`) * 0.1,
    }));
  }, [seed]);

  const birdGroupX = interpolate(frame, [0, durationInFrames], [-200, 1250]);
  const birdGroupY = interpolate(frame, [0, durationInFrames], [480, 320]);

  // আগুনের শিখা কাঁপার ইফেক্ট (Yajna Fire এর জন্য)
  const flameFlicker = Math.sin(frame * 0.4) * 12;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ground, overflow: 'hidden' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${camScale}) translateX(${camX}px)`,
        }}
      >
        <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id={`skyGrad-${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.sky[0]} />
              <stop offset="55%" stopColor={colors.sky[1]} />
              <stop offset="100%" stopColor={colors.sky[2]} />
            </linearGradient>

            <radialGradient id={`celestialGlow-${seed}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.celestial} stopOpacity="0.95" />
              <stop offset="50%" stopColor={colors.celestialGlow} stopOpacity="0.35" />
              <stop offset="100%" stopColor={colors.celestialGlow} stopOpacity="0" />
            </radialGradient>

            <linearGradient id={`riverGrad-${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.celestialGlow} stopOpacity="0.5" />
              <stop offset="100%" stopColor={colors.sky[0]} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* আকাশ */}
          <rect width="1080" height="1920" fill={`url(#skyGrad-${seed})`} />

          {/* তারা (যদি weather === 'stars' হয়) */}
          {config.weather === 'stars' &&
            particles.map((p) => {
              const twinkle = 0.3 + Math.abs(Math.sin((frame + p.delay) * 0.08)) * 0.7;
              return (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y * 0.7}
                  r={p.size * 0.7}
                  fill="#ffffff"
                  opacity={twinkle}
                />
              );
            })}

          {/* সূর্য বা চাঁদ এবং এর আভা */}
          <circle
            cx={config.celestialX}
            cy={celestialY}
            r={config.celestialRadius * 2.2}
            fill={`url(#celestialGlow-${seed})`}
          />
          <circle
            cx={config.celestialX}
            cy={celestialY}
            r={config.celestialRadius}
            fill={colors.celestial}
          />

          {/* ভাসমান মেঘ */}
          <g transform={`translate(${cloudDrift}, 0)`} opacity="0.28">
            <ellipse cx="260" cy="340" rx="170" ry="38" fill={colors.celestial} />
            <ellipse cx="340" cy="325" rx="120" ry="30" fill={colors.celestial} />
            <ellipse cx="820" cy="460" rx="200" ry="42" fill={colors.celestial} />
          </g>

          {/* উড়ন্ত পাখির দল */}
          {config.hasBirds && (
            <g transform={`translate(${birdGroupX}, ${birdGroupY})`}>
              {birds.map((b) => {
                const wingY = Math.sin(frame * b.flapSpeed + b.id) * 10;
                return (
                  <path
                    key={b.id}
                    d={`M ${b.offsetX - 15} ${b.offsetY + wingY} Q ${b.offsetX - 5} ${
                      b.offsetY - 10
                    } ${b.offsetX} ${b.offsetY} Q ${b.offsetX + 5} ${b.offsetY - 10} ${
                      b.offsetX + 15
                    } ${b.offsetY + wingY}`}
                    stroke={colors.structureMain}
                    strokeWidth="4"
                    fill="none"
                  />
                );
              })}
            </g>
          )}

          {/* দূরের পর্বতমালা */}
          <polygon
            points={`-100,1400 ${320 + config.hillShift},830 ${760 + config.hillShift},1400`}
            fill={colors.farHill}
          />
          <polygon
            points={`${350 + config.hillShift},1400 ${820 + config.hillShift},790 1200,1400`}
            fill={colors.midHill}
          />

          {/* ================= মূল স্থাপত্য / বিষয়বস্তু (৬টি ধরন) ================= */}
          <g
            transform={`translate(540, 1350) scale(${monumentSpring}) translate(-540, -1350)`}
          >
            {/* ১. প্রাচীন মন্দির (Temple) */}
            {config.monument === 'temple' && (
              <g>
                <rect x="320" y="1290" width="440" height="60" fill={colors.structureMain} />
                <rect x="360" y="1240" width="360" height="50" fill={colors.structureAccent} />
                <rect x="390" y="1060" width="32" height="180" fill={colors.structureMain} />
                <rect x="524" y="1060" width="32" height="180" fill={colors.structureMain} />
                <rect x="658" y="1060" width="32" height="180" fill={colors.structureMain} />
                <polygon points="350,1060 540,710 730,1060" fill={colors.structureMain} />
                <polygon points="410,1060 540,780 670,1060" fill={colors.structureAccent} />
                <circle cx="540" cy="690" r="18" fill={colors.accentHighlight} />
                <line
                  x1="540"
                  y1="672"
                  x2="540"
                  y2="600"
                  stroke={colors.accentHighlight}
                  strokeWidth="6"
                />
                <polygon points="540,600 610,625 540,650" fill={colors.accentHighlight} />
              </g>
            )}

            {/* ২. বৌদ্ধ স্তূপ / প্রাচীন গম্বুজ (Stupa) */}
            {config.monument === 'stupa' && (
              <g>
                <rect x="300" y="1280" width="480" height="70" fill={colors.structureMain} />
                <rect x="350" y="1220" width="380" height="60" fill={colors.structureAccent} />
                <path
                  d="M 370 1220 A 170 170 0 0 1 710 1220 Z"
                  fill={colors.structureMain}
                />
                <rect x="495" y="1010" width="90" height="45" fill={colors.structureAccent} />
                <polygon points="510,1010 540,860 570,1010" fill={colors.accentHighlight} />
                <circle cx="540" cy="845" r="14" fill={colors.accentHighlight} />
              </g>
            )}

            {/* ৩. পবিত্র বটবৃক্ষ (Sacred Tree) */}
            {config.monument === 'sacredTree' && (
              <g>
                <rect x="380" y="1310" width="320" height="40" fill={colors.structureAccent} />
                <path
                  d="M 510 1310 Q 520 1150 470 1050 L 500 1050 Q 540 1140 540 1140 Q 540 1140 580 1050 L 610 1050 Q 560 1150 570 1310 Z"
                  fill={colors.structureMain}
                />
                <circle cx="540" cy="960" r="170" fill={colors.structureMain} />
                <circle cx="410" cy="1020" r="120" fill={colors.structureAccent} />
                <circle cx="670" cy="1020" r="120" fill={colors.structureAccent} />
                <circle cx="540" cy="880" r="130" fill={colors.structureMain} />
              </g>
            )}

            {/* ৪. বৈদিক যজ্ঞকুণ্ড ও অগ্নিশিখা (Yajna Fire) */}
            {config.monument === 'yajnaFire' && (
              <g>
                <polygon points="340,1350 380,1250 700,1250 740,1350" fill={colors.structureMain} />
                <rect x="400" y="1210" width="280" height="40" fill={colors.structureAccent} />
                {/* অগ্নিশিখা */}
                <path
                  d={`M 450 1210 Q ${430 + flameFlicker} 1050 540 ${900 + flameFlicker} Q ${
                    650 - flameFlicker
                  } 1050 630 1210 Z`}
                  fill={colors.celestialGlow}
                />
                <path
                  d={`M 485 1210 Q ${475 - flameFlicker} 1100 540 ${980 - flameFlicker} Q ${
                    605 + flameFlicker
                  } 1100 595 1210 Z`}
                  fill={colors.accentHighlight}
                />
              </g>
            )}

            {/* ৫. প্রাচীন রাজপ্রাসাদ / দুর্গ (Palace) */}
            {config.monument === 'palace' && (
              <g>
                <rect x="260" y="1120" width="560" height="230" fill={colors.structureMain} />
                <rect x="240" y="1040" width="90" height="310" fill={colors.structureAccent} />
                <rect x="750" y="1040" width="90" height="310" fill={colors.structureAccent} />
                <polygon points="230,1040 285,950 340,1040" fill={colors.accentHighlight} />
                <polygon points="740,1040 795,950 850,1040" fill={colors.accentHighlight} />
                <path
                  d="M 440 1120 A 100 100 0 0 1 640 1120 Z"
                  fill={colors.structureAccent}
                />
                <polygon points="525,1020 540,930 555,1020" fill={colors.accentHighlight} />
                {/* প্রাসাদের আলোকিত জানালা */}
                <rect x="380" y="1180" width="35" height="60" rx="17" fill={colors.accentHighlight} />
                <rect x="522" y="1180" width="35" height="60" rx="17" fill={colors.accentHighlight} />
                <rect x="665" y="1180" width="35" height="60" rx="17" fill={colors.accentHighlight} />
              </g>
            )}

            {/* ৬. হিমালয় পর্বতশৃঙ্গ (Sacred Mountain Peak) */}
            {config.monument === 'mountainPeak' && (
              <g>
                <polygon points="180,1350 540,720 900,1350" fill={colors.structureMain} />
                {/* তুষারাবৃত চূড়া */}
                <polygon
                  points="540,720 435,905 490,880 540,930 590,875 645,905"
                  fill={colors.accentHighlight}
                />
              </g>
            )}
          </g>

          {/* সামনের ভূমি */}
          <rect x="0" y="1350" width="1080" height="570" fill={colors.ground} />

          {/* প্রবহমান নদী (যদি hasRiver === true হয়) */}
          {config.hasRiver && (
            <path
              d="M 480 1350 Q 350 1550 620 1700 T 450 1920 L 750 1920 Q 850 1700 580 1550 T 580 1350 Z"
              fill={`url(#riverGrad-${seed})`}
            />
          )}

          {/* ডাইনামিক পার্টিকেল ইফেক্ট (Fireflies, Embers, Rain, Snow) */}
          {config.weather !== 'none' &&
            config.weather !== 'stars' &&
            particles.map((p) => {
              if (config.weather === 'fireflies') {
                const fx = p.x + Math.sin((frame + p.delay) * 0.05) * 40;
                const fy = p.y + 400 + Math.cos((frame + p.delay) * 0.04) * 30;
                const opacity = 0.2 + Math.abs(Math.sin((frame + p.delay) * 0.1)) * 0.8;
                return (
                  <circle
                    key={p.id}
                    cx={fx}
                    cy={fy}
                    r={p.size * 1.2}
                    fill={colors.accentHighlight}
                    opacity={opacity}
                  />
                );
              }

              if (config.weather === 'embers') {
                const ey = 1920 - ((frame * p.speed * 4 + p.y) % 1920);
                const ex = p.x + Math.sin((frame + p.delay) * 0.08) * 35;
                return (
                  <circle
                    key={p.id}
                    cx={ex}
                    cy={ey}
                    r={p.size}
                    fill="#ff7b00"
                    opacity={0.85}
                  />
                );
              }

              if (config.weather === 'rain') {
                const ry = (frame * p.speed * 18 + p.y) % 1920;
                return (
                  <line
                    key={p.id}
                    x1={p.x}
                    y1={ry}
                    x2={p.x - 10}
                    y2={ry + 35}
                    stroke="#a8dadc"
                    strokeWidth="2"
                    opacity="0.45"
                  />
                );
              }

              if (config.weather === 'snow') {
                const sy = (frame * p.speed * 3 + p.y) % 1920;
                const sx = p.x + Math.sin((frame + p.delay) * 0.03) * 25;
                return (
                  <circle
                    key={p.id}
                    cx={sx}
                    cy={sy}
                    r={p.size}
                    fill="#ffffff"
                    opacity="0.7"
                  />
                );
              }

              return null;
            })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};