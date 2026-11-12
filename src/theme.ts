import { loadFont } from "@remotion/google-fonts/HindSiliguri";

// Load Hind Siliguri for Bengali + Latin support
const { fontFamily: hindSiliguriFont } = loadFont("normal", {
  weights: ["600", "700"],
  subsets: ["bengali", "latin"],
});

export const theme = {
  colors: {
    bgGradientStart: "#0B1020",
    bgGradientEnd: "#05070F",
    primary: "#7C5CFF", // Electric Violet
    cyan: "#22D3EE", // Cyan
    white: "#FFFFFF",
    textMuted: "#94A3B8",
    cardBg: "rgba(255, 255, 255, 0.07)",
    cardBorder: "rgba(255, 255, 255, 0.12)",
    violetGlow: "rgba(124, 92, 255, 0.4)",
    cyanGlow: "rgba(34, 211, 238, 0.4)",
  },
  fonts: {
    hind: hindSiliguriFont,
    sans: `${hindSiliguriFont}, system-ui, -apple-system, sans-serif`,
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "28px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
};
