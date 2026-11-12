import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Audio, staticFile } from "remotion";
import { BoltCat } from "./components/BoltCat";
import { NibblesMouse } from "./components/NibblesMouse";

export const BoltAndNibblesShort: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene calculations & interpolation
  // Scene 1: 0 - 80 frames (Sneak & cake spot)
  // Scene 2: 80 - 180 frames (Candles out & glowing eyes)
  // Scene 3: 180 - 320 frames (Silent scream, balloon knock, pan shield)
  // Scene 4: 320 - 450 frames (Nibbles ghost pop, leap into box)
  // Scene 5: 450 - 600 frames (Nibbles eats cake, sits on box, box opens on Bolt)

  // Bolt X position across frames
  const boltX = interpolate(
    frame,
    [0, 80, 180, 320, 350, 450, 600],
    [-200, 150, 150, 100, -300, -300, -300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const boltPose = (() => {
    if (frame < 50) return "sneak" as const;
    if (frame < 80) return "rubbing" as const;
    if (frame < 180) return "frozen" as const;
    if (frame < 320) return "pan" as const;
    if (frame < 450) return "scared" as const;
    return "inside-box" as const;
  })();

  const boltShake = frame >= 180 && frame < 320 ? Math.sin(frame * 0.8) * 8 : 0;

  // Cake shake
  const cakeShake = (frame >= 300 && frame < 450) || (frame >= 160 && frame < 180) ? Math.sin(frame * 1.2) * 6 : 0;

  // Candles status
  const candle1Out = frame >= 90;
  const candle2Out = frame >= 130;
  const eyesVisible = frame >= 160 && frame < 420;

  // Nibbles visibility & state
  const nibblesInCake = frame >= 320 && frame < 480;
  const nibblesGhost = frame >= 320 && frame < 480;
  const nibblesEating = frame >= 480;

  // Gift box open state
  const boxOpen = frame >= 540;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #2C1B4D 0%, #120A22 70%, #05020A 100%)",
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Background Music & Voiceover */}
      <Audio src={staticFile("spooky-music.mp3")} volume={0.3} />
      <Audio src={staticFile("cartoon-voiceover.mp3")} volume={1.0} />

      {/* Room Decor: Balloons in background */}
      <div style={{ position: "absolute", top: 100, left: 80, width: 90, height: 110, backgroundColor: "#E74C3C", borderRadius: "50%", boxShadow: "inset -15px -15px 0px rgba(0,0,0,0.2)", opacity: 0.85 }} />
      <div style={{ position: "absolute", top: 180, left: 40, width: 2, height: 250, backgroundColor: "rgba(255,255,255,0.4)" }} />

      <div style={{ position: "absolute", top: 60, right: 100, width: 100, height: 120, backgroundColor: "#3498DB", borderRadius: "50%", boxShadow: "inset -15px -15px 0px rgba(0,0,0,0.2)", opacity: 0.85 }} />
      <div style={{ position: "absolute", top: 180, right: 140, width: 2, height: 280, backgroundColor: "rgba(255,255,255,0.4)" }} />

      <div style={{ position: "absolute", top: 140, right: 250, width: 80, height: 100, backgroundColor: "#F1C40F", borderRadius: "50%", boxShadow: "inset -12px -12px 0px rgba(0,0,0,0.2)", opacity: 0.85 }} />
      <div style={{ position: "absolute", top: 240, right: 280, width: 2, height: 200, backgroundColor: "rgba(255,255,255,0.4)" }} />

      {/* Knocked over balloons in Scene 3 */}
      {frame >= 200 && (
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: 150,
            transform: "rotate(60deg) scale(0.9)",
            transition: "transform 0.3s ease",
          }}
        >
          <div style={{ width: 90, height: 110, backgroundColor: "#E74C3C", borderRadius: "50%", boxShadow: "inset -15px -15px 0px rgba(0,0,0,0.2)" }} />
        </div>
      )}

      {/* Birthday Table & Giant Chocolate Cake */}
      <div
        style={{
          position: "absolute",
          bottom: 250,
          left: "50%",
          transform: `translateX(-50%) translateX(${cakeShake}px)`,
          width: 600,
          height: 350,
          display: "flex",
          flexDirection: "column",
          alignItem: "center",
          zIndex: 5,
        }}
      >
        {/* Table Surface */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: -50,
            width: 700,
            height: 40,
            backgroundColor: "#8E44AD",
            borderRadius: 10,
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
          }}
        />
        <div style={{ position: "absolute", bottom: -120, left: 50, width: 30, height: 120, backgroundColor: "#6C3483" }} />
        <div style={{ position: "absolute", bottom: -120, right: 50, width: 30, height: 120, backgroundColor: "#6C3483" }} />

        {/* Giant Chocolate Cake */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 125,
            width: 350,
            height: 240,
            backgroundColor: "#5D4037",
            borderRadius: "40px 40px 10px 10px",
            boxShadow: "inset -25px -25px 0px rgba(0,0,0,0.3), 0 15px 35px rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Frosting drips */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 50, backgroundColor: "#8D6E63", borderRadius: "40px 40px 0 0" }} />
          <div style={{ position: "absolute", top: 45, left: 30, width: 40, height: 50, backgroundColor: "#8D6E63", borderRadius: "0 0 20px 20px" }} />
          <div style={{ position: "absolute", top: 45, left: 130, width: 50, height: 70, backgroundColor: "#8D6E63", borderRadius: "0 0 25px 25px" }} />
          <div style={{ position: "absolute", top: 45, right: 40, width: 45, height: 60, backgroundColor: "#8D6E63", borderRadius: "0 0 22px 22px" }} />

          {/* Glowing Eyes inside Cake */}
          {eyesVisible && (
            <div style={{ position: "absolute", top: 100, display: "flex", gap: 50, zIndex: 10 }}>
              <div style={{ width: 35, height: 35, backgroundColor: "#F1C40F", borderRadius: "50%", boxShadow: "0 0 25px #F1C40F, 0 0 50px #E74C3C" }} />
              <div style={{ width: 35, height: 35, backgroundColor: "#F1C40F", borderRadius: "50%", boxShadow: "0 0 25px #F1C40F, 0 0 50px #E74C3C" }} />
            </div>
          )}

          {/* Candles */}
          <div style={{ position: "absolute", top: -70, width: "100%", display: "flex", justifyContent: "space-around", padding: "0 40px" }}>
            {/* Candle 1 */}
            <div style={{ position: "relative", width: 20, height: 70, backgroundColor: "#E74C3C", borderRadius: 6 }}>
              {!candle1Out && (
                <div style={{ position: "absolute", top: -35, left: -10, width: 40, height: 45, backgroundColor: "#F1C40F", borderRadius: "50% 50% 20% 20%", boxShadow: "0 0 20px #F1C40F" }} />
              )}
            </div>
            {/* Candle 2 */}
            <div style={{ position: "relative", width: 20, height: 70, backgroundColor: "#3498DB", borderRadius: 6 }}>
              {!candle2Out && (
                <div style={{ position: "absolute", top: -35, left: -10, width: 40, height: 45, backgroundColor: "#F1C40F", borderRadius: "50% 50% 20% 20%", boxShadow: "0 0 20px #F1C40F" }} />
              )}
            </div>
            {/* Candle 3 (stays on) */}
            <div style={{ position: "relative", width: 20, height: 70, backgroundColor: "#2ECC71", borderRadius: 6 }}>
              <div style={{ position: "absolute", top: -35, left: -10, width: 40, height: 45, backgroundColor: "#F1C40F", borderRadius: "50% 50% 20% 20%", boxShadow: "0 0 20px #F1C40F" }} />
            </div>
          </div>

          {/* Nibbles popping out of cake */}
          {nibblesInCake && (
            <div style={{ position: "absolute", top: -110, left: "50%", transform: "translateX(-50%)", zIndex: 12 }}>
              <NibblesMouse isGhost={nibblesGhost} eyesGlowing={true} />
            </div>
          )}

          {/* Nibbles Eating Cake at End */}
          {nibblesEating && (
            <div style={{ position: "absolute", top: -90, left: "45%", zIndex: 12 }}>
              <NibblesMouse isGhost={false} />
            </div>
          )}
        </div>
      </div>

      {/* Giant Gift Box on the Right */}
      <div
        style={{
          position: "absolute",
          bottom: 250,
          right: 80,
          width: 220,
          height: 260,
          backgroundColor: "#E67E22",
          borderRadius: 16,
          boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
          zIndex: 8,
        }}
      >
        {/* Ribbon Vertical */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "40%", width: 40, backgroundColor: "#F1C40F" }} />
        {/* Ribbon Horizontal */}
        <div style={{ position: "absolute", top: "40%", left: 0, right: 0, height: 40, backgroundColor: "#F1C40F" }} />

        {/* Gift Box Lid (Opens at end) */}
        <div
          style={{
            position: "absolute",
            top: boxOpen ? -60 : 0,
            left: -10,
            right: -10,
            height: 50,
            backgroundColor: "#D35400",
            borderRadius: 10,
            transform: boxOpen ? "rotate(-25deg) translateY(-30px)" : "none",
            transition: "transform 0.3s ease",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "42%", width: 36, backgroundColor: "#F1C40F" }} />
        </div>

        {/* Bolt inside box when boxOpen */}
        {boxOpen && (
          <div style={{ position: "absolute", bottom: 40, left: 10, zIndex: 9 }}>
            <BoltCat pose="inside-box" />
          </div>
        )}
      </div>

      {/* Bolt Cat (Visible in scenes 1-4) */}
      {frame < 450 && (
        <div
          style={{
            position: "absolute",
            bottom: 250,
            left: boltX,
            zIndex: 10,
          }}
        >
          <BoltCat pose={boltPose} shake={boltShake} />
        </div>
      )}
    </AbsoluteFill>
  );
};
