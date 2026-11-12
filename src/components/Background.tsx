import React from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";
import { theme } from "../theme";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Generate 40 deterministic particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const x = random(`particle-x-${i}`) * width;
      const y = random(`particle-y-${i}`) * height;
      const size = random(`particle-size-${i}`) * 4 + 2;
      const speed = random(`particle-speed-${i}`) * 0.5 + 0.2;
      const opacity = random(`particle-opacity-${i}`) * 0.5 + 0.2;
      return { x, y, size, speed, opacity };
    });
  }, [width, height]);

  const gridOffset = (frame * 0.5) % 60;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, ${theme.colors.bgGradientStart} 0%, ${theme.colors.bgGradientEnd} 100%)`,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Ambient glowing background blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 92, 255, 0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Moving grid lines */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: `${gridOffset}px ${gridOffset}px`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const currentY = (p.y - frame * p.speed * 1.5) % height;
        const adjustedY = currentY < 0 ? currentY + height : currentY;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: adjustedY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? theme.colors.cyan : theme.colors.primary,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px ${i % 2 === 0 ? theme.colors.cyan : theme.colors.primary}`,
            }}
          />
        );
      })}
    </div>
  );
};
