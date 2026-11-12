import React from "react";
import { interpolate } from "remotion";

interface BoltCatProps {
  pose: "sneak" | "rubbing" | "frozen" | "nervous" | "scream" | "pan" | "scared" | "inside-box" | "terrified-revealed";
  expression?: "happy" | "shocked" | "terrified" | "relieved";
  shake?: number;
}

export const BoltCat: React.FC<BoltCatProps> = ({ pose, expression = "happy", shake = 0 }) => {
  // Orange tabby cat with amber eyes, round belly, stripes
  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 400,
        transform: `translate(${shake}px, ${shake * 0.5}px)`,
      }}
    >
      {/* Cat Body */}
      {pose === "inside-box" ? (
        // Just head sticking out of box or terrified face
        <div style={{ position: "absolute", bottom: 20, left: 60, width: 200, height: 220, textAlign: "center" }}>
          {/* Terrified Head in Box */}
          <div
            style={{
              position: "relative",
              width: 180,
              height: 160,
              backgroundColor: "#E67E22",
              borderRadius: "50%",
              boxShadow: "inset -15px -15px 0px rgba(0,0,0,0.15), 0 10px 25px rgba(0,0,0,0.4)",
              margin: "0 auto",
            }}
          >
            {/* Ears */}
            <div style={{ position: "absolute", top: -20, left: 20, width: 50, height: 60, backgroundColor: "#D35400", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(-15deg)" }} />
            <div style={{ position: "absolute", top: -20, right: 20, width: 50, height: 60, backgroundColor: "#D35400", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(15deg)" }} />
            
            {/* Wide Terrified Eyes */}
            <div style={{ position: "absolute", top: 45, left: 25, width: 45, height: 55, backgroundColor: "#FFF", borderRadius: "50%", border: "4px solid #2C3E50" }}>
              <div style={{ position: "absolute", top: 12, left: 12, width: 22, height: 30, backgroundColor: "#E74C3C", borderRadius: "50%" }}>
                <div style={{ position: "absolute", top: 4, left: 4, width: 8, height: 10, backgroundColor: "#000", borderRadius: "50%" }} />
              </div>
            </div>
            <div style={{ position: "absolute", top: 45, right: 25, width: 45, height: 55, backgroundColor: "#FFF", borderRadius: "50%", border: "4px solid #2C3E50" }}>
              <div style={{ position: "absolute", top: 12, left: 12, width: 22, height: 30, backgroundColor: "#E74C3C", borderRadius: "50%" }}>
                <div style={{ position: "absolute", top: 4, left: 4, width: 8, height: 10, backgroundColor: "#000", borderRadius: "50%" }} />
              </div>
            </div>

            {/* Trembling Mouth */}
            <div style={{ position: "absolute", top: 110, left: 70, width: 40, height: 25, backgroundColor: "#000", borderRadius: "0 0 20px 20px" }} />
          </div>
        </div>
      ) : (
        // Full Body Cat
        <div style={{ position: "absolute", bottom: 0, left: 40, width: 240, height: 360 }}>
          {/* Tail */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: -30,
              width: 40,
              height: 120,
              backgroundColor: "#E67E22",
              borderRadius: "20px",
              transform: pose === "scared" ? "rotate(-45deg) scale(1.2)" : "rotate(15deg)",
              transformOrigin: "bottom center",
              boxShadow: "inset -8px 0 0 rgba(0,0,0,0.15)",
            }}
          />

          {/* Round Belly / Body */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 20,
              width: 180,
              height: 200,
              backgroundColor: "#E67E22",
              borderRadius: "50% 50% 45% 45%",
              boxShadow: "inset -20px -20px 0px rgba(0,0,0,0.15), 0 15px 30px rgba(0,0,0,0.3)",
            }}
          >
            {/* Tabby Stripes on Body */}
            <div style={{ position: "absolute", top: 40, left: 20, width: 40, height: 15, backgroundColor: "#D35400", borderRadius: 10, transform: "rotate(-10deg)" }} />
            <div style={{ position: "absolute", top: 70, left: 15, width: 50, height: 15, backgroundColor: "#D35400", borderRadius: 10, transform: "rotate(5deg)" }} />
            <div style={{ position: "absolute", top: 100, left: 20, width: 40, height: 15, backgroundColor: "#D35400", borderRadius: 10, transform: "rotate(-5deg)" }} />
          </div>

          {/* Paws / Arms */}
          {pose === "rubbing" ? (
            // Rubbing Paws
            <div style={{ position: "absolute", bottom: 120, left: 70, width: 90, height: 60, display: "flex", justifyContent: "space-between", zIndex: 3 }}>
              <div style={{ width: 40, height: 40, backgroundColor: "#F39C12", borderRadius: "50%", transform: "translate(15px, 0px) scale(1.1)", border: "3px solid #D35400" }} />
              <div style={{ width: 40, height: 40, backgroundColor: "#F39C12", borderRadius: "50%", transform: "translate(-15px, 0px) scale(1.1)", border: "3px solid #D35400" }} />
            </div>
          ) : pose === "pan" ? (
            // Holding Kitchen Pan as Shield
            <div style={{ position: "absolute", bottom: 100, left: 40, width: 140, height: 140, zIndex: 4, transform: "rotate(-10deg)" }}>
              {/* Pan Body */}
              <div style={{ width: 120, height: 120, backgroundColor: "#BDC3C7", borderRadius: "50%", border: "8px solid #7F8C8D", boxShadow: "inset 0 10px 20px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.4)" }} />
              {/* Pan Handle */}
              <div style={{ position: "absolute", bottom: -30, right: -40, width: 80, height: 20, backgroundColor: "#2C3E50", borderRadius: 10, transform: "rotate(-45deg)" }} />
            </div>
          ) : null}

          {/* Head */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 25,
              width: 170,
              height: 150,
              backgroundColor: "#E67E22",
              borderRadius: "50%",
              boxShadow: "inset -15px -15px 0px rgba(0,0,0,0.15), 0 10px 25px rgba(0,0,0,0.3)",
              zIndex: 2,
              transform: pose === "scared" ? "translateY(-10px) rotate(-5deg)" : pose === "scream" ? "scale(1.1)" : "none",
            }}
          >
            {/* Ears */}
            <div style={{ position: "absolute", top: -15, left: 15, width: 45, height: 55, backgroundColor: "#D35400", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: pose === "scared" ? "rotate(-35deg)" : "rotate(-15deg)" }} />
            <div style={{ position: "absolute", top: -15, right: 15, width: 45, height: 55, backgroundColor: "#D35400", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: pose === "scared" ? "rotate(35deg)" : "rotate(15deg)" }} />
            
            {/* Inner Ear Pink */}
            <div style={{ position: "absolute", top: -2, left: 24, width: 25, height: 35, backgroundColor: "#FFB6C1", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(-15deg)" }} />
            <div style={{ position: "absolute", top: -2, right: 24, width: 25, height: 35, backgroundColor: "#FFB6C1", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(15deg)" }} />

            {/* Tabby forehead stripes */}
            <div style={{ position: "absolute", top: 10, left: 70, width: 30, height: 12, backgroundColor: "#D35400", borderRadius: 6 }} />
            <div style={{ position: "absolute", top: 25, left: 60, width: 50, height: 12, backgroundColor: "#D35400", borderRadius: 6 }} />

            {/* Eyes */}
            {pose === "frozen" || pose === "nervous" || pose === "scared" || pose === "scream" ? (
              // Wide Shocked / Terrified Eyes
              <div style={{ position: "absolute", top: 45, left: 20, width: 48, height: 58, backgroundColor: "#FFF", borderRadius: "50%", border: "4px solid #2C3E50" }}>
                <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 32, backgroundColor: "#E67E22", borderRadius: "50%" }}>
                  <div style={{ position: "absolute", top: 6, left: 6, width: 10, height: 14, backgroundColor: "#000", borderRadius: "50%" }} />
                </div>
              </div>
            ) : (
              // Happy / Sneaking Eyes
              <div style={{ position: "absolute", top: 50, left: 25, width: 40, height: 45, backgroundColor: "#FFF", borderRadius: "50%", border: "4px solid #2C3E50" }}>
                <div style={{ position: "absolute", top: 8, left: 10, width: 22, height: 30, backgroundColor: "#F1C40F", borderRadius: "50%" }}>
                  <div style={{ position: "absolute", top: 8, left: 6, width: 10, height: 16, backgroundColor: "#000", borderRadius: "50%" }} />
                </div>
              </div>
            )}

            {pose === "frozen" || pose === "nervous" || pose === "scared" || pose === "scream" ? (
              <div style={{ position: "absolute", top: 45, right: 20, width: 48, height: 58, backgroundColor: "#FFF", borderRadius: "50%", border: "4px solid #2C3E50" }}>
                <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 32, backgroundColor: "#E67E22", borderRadius: "50%" }}>
                  <div style={{ position: "absolute", top: 6, left: 6, width: 10, height: 14, backgroundColor: "#000", borderRadius: "50%" }} />
                </div>
              </div>
            ) : (
              <div style={{ position: "absolute", top: 50, right: 25, width: 40, height: 45, backgroundColor: "#FFF", borderRadius: "50%", border: "4px solid #2C3E50" }}>
                <div style={{ position: "absolute", top: 8, left: 10, width: 22, height: 30, backgroundColor: "#F1C40F", borderRadius: "50%" }}>
                  <div style={{ position: "absolute", top: 8, left: 6, width: 10, height: 16, backgroundColor: "#000", borderRadius: "50%" }} />
                </div>
              </div>
            )}

            {/* Nose & Whiskers */}
            <div style={{ position: "absolute", top: 90, left: 75, width: 20, height: 15, backgroundColor: "#FF69B4", clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }} />
            
            {/* Mouth */}
            {pose === "scream" ? (
              <div style={{ position: "absolute", top: 105, left: 60, width: 50, height: 35, backgroundColor: "#000", borderRadius: "50%", border: "3px solid #E74C3C" }} />
            ) : pose === "rubbing" ? (
              <div style={{ position: "absolute", top: 108, left: 75, width: 20, height: 10, borderBottom: "4px solid #2C3E50", borderRadius: "0 0 10px 10px" }} />
            ) : (
              <div style={{ position: "absolute", top: 108, left: 70, width: 30, height: 12, borderBottom: "4px solid #2C3E50", borderRadius: "0 0 15px 15px" }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
