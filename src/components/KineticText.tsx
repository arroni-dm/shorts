import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface KineticTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  fontSize?: number;
  highlightWords?: string[];
  align?: "center" | "left" | "right";
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  style,
  delay = 0,
  fontSize = 64,
  highlightWords = [],
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
        gap: "16px 20px",
        fontSize: `${fontSize}px`,
        fontWeight: 800,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#FFFFFF",
        textAlign: align,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * 2;
        const spr = spring({
          frame: frame - wordDelay,
          fps,
          config: {
            damping: 12,
            stiffness: 140,
          },
        });

        const opacity = Math.min(1, Math.max(0, spr));
        const translateY = (1 - spr) * 30;
        const scale = 0.8 + spr * 0.2;

        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span
            key={index}
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              display: "inline-block",
              color: isHighlighted ? "#00F0FF" : "#FFFFFF",
              textShadow: isHighlighted
                ? "0 0 25px rgba(0, 240, 255, 0.6)"
                : "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
