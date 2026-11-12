import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../theme";

interface CaptionProps {
  text: string;
  startFrame: number;
  durationInFrames: number;
}

export const Caption: React.FC<CaptionProps> = ({ text, startFrame, durationInFrames }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > durationInFrames) {
    return null;
  }

  // Fade + slide-up in (first 10 frames)
  const introOpacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const introTranslateY = interpolate(relativeFrame, [0, 10], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out (last 10 frames)
  const outroStart = durationInFrames - 10;
  const outroOpacity =
    relativeFrame >= outroStart
      ? interpolate(relativeFrame, [outroStart, durationInFrames], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const opacity = Math.min(introOpacity, outroOpacity);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        opacity,
        transform: `translateY(${introTranslateY}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(11, 16, 32, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${theme.colors.cardBorder}`,
          borderRadius: 20,
          padding: "16px 36px",
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px ${theme.colors.violetGlow}`,
          maxWidth: "85%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: theme.fonts.hind,
            fontWeight: 700,
            fontSize: 52,
            color: theme.colors.white,
            textShadow: `0 0 20px ${theme.colors.violetGlow}`,
            letterSpacing: "-0.5px",
          }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
};
