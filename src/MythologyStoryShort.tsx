// src/MythologyStoryShort.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { DynamicScene, DynamicSceneProps } from './components/DynamicScene';

interface StorySegment {
  id: number;
  durationInFrames: number;
  subtitle: string;
  highlightWord?: string;
  sceneProps: DynamicSceneProps;
}

// গল্পের ৫টি দৃশ্য ও তাদের স্ক্রিপ্ট (মোট ৪৫০ ফ্রেম = ১৫ সেকেন্ড, ৩০ fps-এ)
const STORY_SEGMENTS: StorySegment[] = [
  {
    id: 1,
    durationInFrames: 90, // ৩ সেকেন্ড
    subtitle: 'হাজার বছর আগে, যখন পৃথিবী ছিল গভীর রহস্যে ঘেরা...',
    highlightWord: 'হাজার বছর আগে',
    sceneProps: {
      seed: 101,
      theme: 'mysticNight',
      monument: 'mountainPeak',
      weather: 'stars',
      hasBirds: false,
      hasRiver: true,
      cameraMotion: 'zoomIn',
    },
  },
  {
    id: 2,
    durationInFrames: 90, // ৩ সেকেন্ড
    subtitle: 'প্রাচীন ঋষিরা শুরু করেছিলেন এক মহা যজ্ঞের আয়োজন।',
    highlightWord: 'মহা যজ্ঞের',
    sceneProps: {
      seed: 205,
      theme: 'ashramDusk',
      monument: 'yajnaFire',
      weather: 'embers',
      hasBirds: true,
      hasRiver: false,
      cameraMotion: 'panRight',
    },
  },
  {
    id: 3,
    durationInFrames: 90, // ৩ সেকেন্ড
    subtitle: 'কিন্তু অন্ধকার শক্তি চেয়েছিল এই সত্যকে চিরতরে মুছে ফেলতে!',
    highlightWord: 'অন্ধকার শক্তি',
    sceneProps: {
      seed: 312,
      theme: 'crimsonWar',
      monument: 'palace',
      weather: 'embers',
      hasBirds: true,
      hasRiver: false,
      cameraMotion: 'zoomOut',
    },
  },
  {
    id: 4,
    durationInFrames: 90, // ৩ সেকেন্ড
    subtitle: 'প্রকৃতির বুকে নেমে এসেছিল এক ভয়াবহ প্রলয়...',
    highlightWord: 'ভয়াবহ প্রলয়',
    sceneProps: {
      seed: 408,
      theme: 'celestialBlue',
      monument: 'sacredTree',
      weather: 'rain',
      hasBirds: false,
      hasRiver: true,
      cameraMotion: 'panLeft',
    },
  },
  {
    id: 5,
    durationInFrames: 90, // ৩ সেকেন্ড
    subtitle: 'তবুও সত্যের আলো আবারও উদিত হলো এক নতুন সূর্যোদয়ে।',
    highlightWord: 'সত্যের আলো',
    sceneProps: {
      seed: 500,
      theme: 'goldenEra',
      monument: 'temple',
      weather: 'fireflies',
      hasBirds: true,
      hasRiver: true,
      cameraMotion: 'zoomIn',
    },
  },
];

// সাবটাইটেল ওভারলে কম্পোনেন্ট
const StoryCaption: React.FC<{ text: string; highlight?: string }> = ({ text, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // হাইলাইট শব্দটিকে আলাদা রঙে দেখানোর লজিক
  const parts = highlight ? text.split(highlight) : [text];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 240,
        paddingLeft: 60,
        paddingRight: 60,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(10, 5, 20, 0.78)',
          border: '2px solid rgba(255, 183, 3, 0.45)',
          borderRadius: 24,
          padding: '28px 36px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
          transform: `scale(${popIn})`,
          opacity,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#ffffff',
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: 'sans-serif',
          }}
        >
          {highlight && parts.length > 1 ? (
            <>
              {parts[0]}
              <span style={{ color: '#ffb703' }}>{highlight}</span>
              {parts[1]}
            </>
          ) : (
            text
          )}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const MythologyStoryShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // উপরের প্রগ্রেস বারের হিসাব
  const progress = interpolate(frame, [0, durationInFrames], [0, 100]);

  let currentStartFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* প্রতিটি সিন পরপর সাজানো হচ্ছে */}
      {STORY_SEGMENTS.map((segment) => {
        const from = currentStartFrame;
        currentStartFrame += segment.durationInFrames;

        return (
          <Sequence
            key={segment.id}
            from={from}
            durationInFrames={segment.durationInFrames}
          >
            {/* ব্যাকগ্রাউন্ড ইলাস্ট্রেশন সিন */}
            <DynamicScene {...segment.sceneProps} />

            {/* ভিজ্যুয়াল কন্ট্রাস্ট বাড়ানোর জন্য হালকা ভিনিয়েট (Vignette) */}
            <AbsoluteFill
              style={{
                background:
                  'radial-gradient(circle, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)',
              }}
            />

            {/* ডাইনামিক সাবটাইটেল */}
            <StoryCaption
              text={segment.subtitle}
              highlight={segment.highlightWord}
            />
          </Sequence>
        );
      })}

      {/* একদম উপরে স্টোরি প্রগ্রেস বার */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          right: 40,
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#ffb703',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};