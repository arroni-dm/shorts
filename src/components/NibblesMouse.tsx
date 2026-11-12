import React from "react";

interface NibblesMouseProps {
  isGhost?: boolean;
  eyesGlowing?: boolean;
}

export const NibblesMouse: React.FC<NibblesMouseProps> = ({ isGhost = false, eyesGlowing = false }) => {
  return (
    <div style={{ position: "relative", width: 160, height: 200 }}>
      {isGhost ? (
        // Ghost Costume (white sheet with eyeholes and red scarf peeking out)
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 20,
            width: 120,
            height: 160,
            backgroundColor: "#FFFFFF",
            borderRadius: "50% 50% 20px 20px",
            boxShadow: "0 10px 25px rgba(255,255,255,0.4), inset -10px -10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Ghost Eyeholes */}
          <div style={{ position: "absolute", top: 50, left: 30, width: 20, height: 25, backgroundColor: "#000", borderRadius: "50%" }}>
            {eyesGlowing && (
              <div style={{ position: "absolute", top: 4, left: 4, width: 12, height: 16, backgroundColor: "#F1C40F", borderRadius: "50%", boxShadow: "0 0 10px #F1C40F" }} />
            )}
          </div>
          <div style={{ position: "absolute", top: 50, right: 30, width: 20, height: 25, backgroundColor: "#000", borderRadius: "50%" }}>
            {eyesGlowing && (
              <div style={{ position: "absolute", top: 4, left: 4, width: 12, height: 16, backgroundColor: "#F1C40F", borderRadius: "50%", boxShadow: "0 0 10px #F1C40F" }} />
            )}
          </div>

          {/* Red Scarf Peeking Out */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 25,
              width: 70,
              height: 25,
              backgroundColor: "#E74C3C",
              borderRadius: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      ) : (
        // Normal Tiny White Mouse with Red Scarf
        <div style={{ position: "absolute", bottom: 0, left: 30, width: 100, height: 120 }}>
          {/* Body */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 15,
              width: 70,
              height: 80,
              backgroundColor: "#ECF0F1",
              borderRadius: "50%",
              boxShadow: "inset -5px -5px 0px rgba(0,0,0,0.1)",
            }}
          />
          {/* Head */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 20,
              width: 60,
              height: 60,
              backgroundColor: "#ECF0F1",
              borderRadius: "50%",
            }}
          >
            {/* Big Round Ears */}
            <div style={{ position: "absolute", top: -12, left: -10, width: 30, height: 30, backgroundColor: "#ECF0F1", borderRadius: "50%", border: "2px solid #BDC3C7" }}>
              <div style={{ position: "absolute", top: 5, left: 5, width: 20, height: 20, backgroundColor: "#FFB6C1", borderRadius: "50%" }} />
            </div>
            <div style={{ position: "absolute", top: -12, right: -10, width: 30, height: 30, backgroundColor: "#ECF0F1", borderRadius: "50%", border: "2px solid #BDC3C7" }}>
              <div style={{ position: "absolute", top: 5, left: 5, width: 20, height: 20, backgroundColor: "#FFB6C1", borderRadius: "50%" }} />
            </div>

            {/* Clever Eyes & Snout */}
            <div style={{ position: "absolute", top: 20, left: 12, width: 10, height: 12, backgroundColor: "#000", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: 20, right: 12, width: 10, height: 12, backgroundColor: "#000", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: 32, left: 24, width: 12, height: 8, backgroundColor: "#FF69B4", borderRadius: "50%" }} />
          </div>

          {/* Red Scarf */}
          <div
            style={{
              position: "absolute",
              top: 45,
              left: 10,
              width: 80,
              height: 22,
              backgroundColor: "#E74C3C",
              borderRadius: 12,
              boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ position: "absolute", bottom: -25, right: 10, width: 15, height: 30, backgroundColor: "#E74C3C", borderRadius: 5 }} />
          </div>
        </div>
      )}
    </div>
  );
};
