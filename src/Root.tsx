import React from "react";
import { Composition } from "remotion";
import { VoiceStudioPromo } from "./VoiceStudioPromo";
import { BoltAndNibblesShort } from "./BoltAndNibblesShort";
import { CustomVoiceShort } from "./CustomVoiceShort";
import { WW2Documentary } from "./WW2Documentary";
import { NVIDIADocumentary } from "./nvidiashort";
import { VIDEO_CONFIG } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};