import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { VIDEO_CONFIG } from "./config";
import { Background } from "./components/Background";
import { Caption } from "./components/Caption";
import { Scene1_Hook } from "./scenes/Scene1_Hook";
import { Scene2_Reveal } from "./scenes/Scene2_Reveal";
import { Scene3_Features } from "./scenes/Scene3_Features";
import { Scene4_LocalFree } from "./scenes/Scene4_LocalFree";
import { Scene5_CTA } from "./scenes/Scene5_CTA";

interface VoiceStudioPromoProps {
  hasVoiceover?: boolean;
  hasMusic?: boolean;
}

export const VoiceStudioPromo: React.FC<VoiceStudioPromoProps> = ({
  hasVoiceover = true,
  hasMusic = true,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#05070F", overflow: "hidden" }}>
      {/* Background with particles and grid */}
      <Background />

      {/* Optional Audio Tracks */}
      {hasVoiceover && <Audio src={staticFile("voiceover.mp3")} volume={1.0} />}
      {hasMusic && <Audio src={staticFile("bg-music.mp3")} volume={0.15} />}

      {/* Scene 1: Hook */}
      <Sequence from={VIDEO_CONFIG.scenes[0].startFrame} durationInFrames={VIDEO_CONFIG.scenes[0].durationInFrames}>
        <Scene1_Hook />
        <Caption
          text={VIDEO_CONFIG.scenes[0].captionText}
          startFrame={0}
          durationInFrames={VIDEO_CONFIG.scenes[0].durationInFrames}
        />
      </Sequence>

      {/* Scene 2: Reveal */}
      <Sequence from={VIDEO_CONFIG.scenes[1].startFrame} durationInFrames={VIDEO_CONFIG.scenes[1].durationInFrames}>
        <Scene2_Reveal />
        <Caption
          text={VIDEO_CONFIG.scenes[1].captionText}
          startFrame={0}
          durationInFrames={VIDEO_CONFIG.scenes[1].durationInFrames}
        />
      </Sequence>

      {/* Scene 3: Features */}
      <Sequence from={VIDEO_CONFIG.scenes[2].startFrame} durationInFrames={VIDEO_CONFIG.scenes[2].durationInFrames}>
        <Scene3_Features />
        <Caption
          text={VIDEO_CONFIG.scenes[2].captionText}
          startFrame={0}
          durationInFrames={VIDEO_CONFIG.scenes[2].durationInFrames}
        />
      </Sequence>

      {/* Scene 4: Local & Free */}
      <Sequence from={VIDEO_CONFIG.scenes[3].startFrame} durationInFrames={VIDEO_CONFIG.scenes[3].durationInFrames}>
        <Scene4_LocalFree />
        <Caption
          text={VIDEO_CONFIG.scenes[3].captionText}
          startFrame={0}
          durationInFrames={VIDEO_CONFIG.scenes[3].durationInFrames}
        />
      </Sequence>

      {/* Scene 5: CTA */}
      <Sequence from={VIDEO_CONFIG.scenes[4].startFrame} durationInFrames={VIDEO_CONFIG.scenes[4].durationInFrames}>
        <Scene5_CTA />
        <Caption
          text={VIDEO_CONFIG.scenes[4].captionText}
          startFrame={0}
          durationInFrames={VIDEO_CONFIG.scenes[4].durationInFrames}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
