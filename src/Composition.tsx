import React from "react";
import {
  Audio,
  Composition,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { KineticText } from "./components/KineticText";
import { ProgressBar } from "./components/ProgressBar";

interface SceneProps {
  children: React.ReactNode;
}

const ZoomScene: React.FC<SceneProps> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scale = 0.92 + entrance * 0.08;
  const opacity = entrance;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 60px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

const IntroScene: React.FC = () => {
  return (
    <ZoomScene>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            padding: "12px 24px",
            background: "rgba(0, 240, 255, 0.1)",
            border: "1px solid rgba(0, 240, 255, 0.4)",
            borderRadius: "30px",
            color: "#00F0FF",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
          }}
        >
          Universe Explained
        </div>
        <KineticText
          text="3 MIND-BLOWING SCIENCE FACTS"
          fontSize={72}
          highlightWords={["MIND-BLOWING", "SCIENCE"]}
          align="center"
        />
        <div
          style={{
            color: "#93C5FD",
            fontSize: "32px",
            fontWeight: 500,
            marginTop: "20px",
            letterSpacing: "2px",
          }}
        >
          Prepare to question reality.
        </div>
      </div>
    </ZoomScene>
  );
};

const Fact1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 10) * 10;

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", width: "100%" }}>
        <div
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#00F0FF",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Fact 01 • Time Dilation
        </div>

        {/* Gravity Warp Visual Element */}
        <div
          style={{
            position: "relative",
            width: "240px",
            height: "240px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${180 + pulse}px`,
              height: `${180 + pulse}px`,
              borderRadius: "50%",
              border: "2px dashed rgba(0, 240, 255, 0.5)",
              boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)",
            }}
          />
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #00F0FF 0%, #3B82F6 100%)",
              boxShadow: "0 0 50px rgba(0, 240, 255, 0.8)",
            }}
          />
        </div>

        <KineticText
          text="Time moves slower where gravity is strongest. Your feet literally age slower than your head."
          fontSize={52}
          highlightWords={["slower", "gravity", "feet", "head"]}
          align="center"
        />
      </div>
    </ZoomScene>
  );
};

const Fact2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const distance = Math.sin(frame / 15) * 30;

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", width: "100%" }}>
        <div
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#00F0FF",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Fact 02 • Quantum Entanglement
        </div>

        {/* Quantum Entanglement Visual Element */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: `${80 + distance}px`,
            margin: "40px 0",
            height: "120px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#00F0FF",
              boxShadow: "0 0 40px #00F0FF",
            }}
          />
          <div
            style={{
              height: "4px",
              width: "120px",
              background: "linear-gradient(90deg, #00F0FF, #3B82F6, #00F0FF)",
              boxShadow: "0 0 15px #3B82F6",
            }}
          />
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#3B82F6",
              boxShadow: "0 0 40px #3B82F6",
            }}
          />
        </div>

        <KineticText
          text="Two particles can instantly communicate across the entire universe, defying the speed of light."
          fontSize={50}
          highlightWords={["instantly", "universe", "defying", "light"]}
          align="center"
        />
      </div>
    </ZoomScene>
  );
};

const Fact3Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const scalePulse = 1 + Math.sin(frame / 8) * 0.08;

  return (
    <ZoomScene>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", width: "100%" }}>
        <div
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#00F0FF",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Fact 03 • Neutron Stars
        </div>

        {/* Neutron Star High Density Core Visual */}
        <div
          style={{
            position: "relative",
            width: "200px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
            transform: `scale(${scalePulse})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,240,255,0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFFFFF 0%, #00F0FF 40%, #1E3A8A 100%)",
              boxShadow: "0 0 70px rgba(0, 240, 255, 0.9)",
            }}
          />
        </div>

        <KineticText
          text="A teaspoon of a neutron star weighs 6 BILLION TONS—equal to Mount Everest."
          fontSize={50}
          highlightWords={["6", "BILLION", "TONS", "Mount Everest"]}
          align="center"
        />
      </div>
    </ZoomScene>
  );
};

const OutroScene: React.FC = () => {
  return (
    <ZoomScene>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <KineticText
          text="SUBSCRIBE FOR MORE SCIENCE!"
          fontSize={64}
          highlightWords={["SUBSCRIBE", "SCIENCE!"]}
          align="center"
        />
        <div
          style={{
            color: "#93C5FD",
            fontSize: "28px",
            letterSpacing: "3px",
            marginTop: "10px",
          }}
        >
          New facts every day 🚀
        </div>
      </div>
    </ZoomScene>
  );
};

export const ScienceShortsComposition: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        width: "1080px",
        height: "1920px",
        backgroundColor: "#04060F",
        overflow: "hidden",
      }}
    >
      <Background />
      <ProgressBar />

      {/* Audio Tracks */}
      <Audio src={staticFile("voiceover.mp3")} volume={1.0} />
      <Audio src={staticFile("bg-music.mp3")} volume={0.15} loop />

      {/* Intro: 0 - 75 frames (2.5s) */}
      <Sequence durationInFrames={75}>
        <IntroScene />
      </Sequence>

      {/* Fact 1: 75 - 350 frames (approx 9s) */}
      <Sequence from={75} durationInFrames={275}>
        <Fact1Scene />
      </Sequence>

      {/* Fact 2: 350 - 625 frames (approx 9s) */}
      <Sequence from={350} durationInFrames={275}>
        <Fact2Scene />
      </Sequence>

      {/* Fact 3: 625 - 875 frames (approx 8.3s) */}
      <Sequence from={625} durationInFrames={250}>
        <Fact3Scene />
      </Sequence>

      {/* Outro: 875 - 900 frames (1s) */}
      <Sequence from={875} durationInFrames={25}>
        <OutroScene />
      </Sequence>
    </div>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="ScienceShortsWithAudio"
      component={ScienceShortsComposition}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
