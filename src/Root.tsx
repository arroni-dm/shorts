import React from "react";
import { Composition, Folder } from "remotion";
import { VoiceStudioPromo } from "./VoiceStudioPromo";
import { BoltAndNibblesShort } from "./BoltAndNibblesShort";
import { CustomVoiceShort } from "./CustomVoiceShort";
import { WW2Documentary } from "./WW2Documentary";
import { NVIDIADocumentary } from "./nvidiashort";
import { VIDEO_CONFIG } from "./config";
import { BookWisdomExplainer } from "./BookWisdomExplainer";
import { MagneticPoleCreatorUI } from "./MagneticPoleCreatorUI";
import { DynamicScene } from "./components/DynamicScene";
import { MythologyStoryShort } from "./MythologyStoryShort";
import { MagneticFieldDocumentary } from "./MagneticFieldDocumentary";
import { MagneticHybridDocumentary } from "./MagneticHybridDocumentary";
import { MagneticHybridDocumentary60fps } from "./MagneticHybridDocumentary60fps";
import { IranVsUsaShort } from './IranVsUsaShort';

export const RemotionRoot: React.FC = () => {
  // ১ থেকে ৫০০ পর্যন্ত ৫০০টি ইউনিক দৃশ্য জেনারেট করার অ্যারে
  const sceneSeeds = Array.from({ length: 500 }, (_, index) => index + 1);

  return (
    <>
      {/* ================= আপনার আগের কম্পোজিশনগুলো ================= */}
     <Composition
        id="IranVsUsaShort"
        component={IranVsUsaShort}
        durationInFrames={3270}
        fps={60}
        width={1080}
        height={1920}
      />
     
     <Composition
  id="MagneticHybridDocumentary60fps"
  component={MagneticHybridDocumentary60fps}
  durationInFrames={13680} // ২২৮ সেকেন্ড × ৬০ fps
  fps={60}
  width={1920}
  height={1080}
/>
     
     <Composition
  id="MagneticHybridDocumentary"
  component={MagneticHybridDocumentary}
  durationInFrames={6840}
  fps={30}
  width={1920}
  height={1080}
/>
      
      <Composition
  id="MagneticFieldDocumentary"
  component={MagneticFieldDocumentary}
  durationInFrames={6360}
  fps={30}
  width={1920}
  height={1080}
/>
      <Composition
        id="nvidiashort"
        component={NVIDIADocumentary}
        durationInFrames={3000}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WW2Documentary"
        component={WW2Documentary}
        durationInFrames={24485}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CustomVoiceShort"
        component={CustomVoiceShort}
        durationInFrames={898}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BoltAndNibblesSpookyShort"
        component={BoltAndNibblesShort}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VoiceStudioPromo"
        component={VoiceStudioPromo}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={1920}
        height={1080}
        defaultProps={{
          hasVoiceover: true,
          hasMusic: true,
        }}
      />
      <Composition
        id="VoiceStudioPromoVertical"
        component={VoiceStudioPromo}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={1080}
        height={1920}
        defaultProps={{
          hasVoiceover: true,
          hasMusic: true,
        }}
      />
      <Composition
        id="BookWisdomExplainer"
        component={BookWisdomExplainer}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MagneticPoleCreatorUI"
        component={MagneticPoleCreatorUI}
        durationInFrames={18000}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
  id="MythologyStoryShort"
  component={MythologyStoryShort}
  durationInFrames={450} // ৫টি সিন × ৯০ ফ্রেম = ৪৫০ ফ্রেম (১৫ সেকেন্ড)
  fps={30}
  width={1080}
  height={1920}
/>

      {/* ================= নতুন ডাইনামিক সিন ও ৫০০+ আবহের দৃশ্য ================= */}
      <Folder name="Mythology-Scenes">
        {/* কাস্টম একটি সিন প্রিভিউ করার জন্য */}
        <Composition
          id="CustomMythologyScene"
          component={DynamicScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            seed: 42,
            theme: "vedicDawn",
            monument: "yajnaFire",
            weather: "embers",
            hasBirds: true,
            hasRiver: true,
            cameraMotion: "zoomIn",
          }}
        />

        {/* অটোমেটিক ৫০০টি ভিন্ন ভিন্ন আবহের সিন (Scene-1 থেকে Scene-500) */}
        {sceneSeeds.map((seedNumber) => (
          <Composition
            key={seedNumber}
            id={`Scene-${seedNumber}`}
            component={DynamicScene}
            durationInFrames={150}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{
              seed: seedNumber,
            }}
          />
        ))}
      </Folder>
    </>
  );
};