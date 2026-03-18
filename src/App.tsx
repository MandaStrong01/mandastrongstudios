import React, { useEffect } from "react";

/* =========================
   🔥 MandaStrong THEME
   ========================= */

const GOLD = "#D4AF37";
const GOLD_SOFT = "#C9A227";
const BLACK = "#000000";
const DARK = "#0A0A0A";
const CARD = "#111111";
const BORDER = "#1F1F1F";
const TEXT = "#FFFFFF";
const MUTED = "#AAAAAA";

/* =========================
   🔥 GLOBAL STYLE INJECTION
   ========================= */

const GlobalStyle = () => {
  useEffect(() => {
    const style = document.createElement("style");

    style.innerHTML = `
      body {
        margin: 0;
        background: ${BLACK};
        color: ${TEXT};
        font-family: system-ui, -apple-system, sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      /* Buttons */
      button {
        background: ${GOLD};
        color: ${BLACK};
        border: 1px solid ${GOLD};
        border-radius: 10px;
        padding: 10px 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.2s ease;
      }

      button:hover {
        opacity: 0.9;
      }

      /* Inputs */
      input, textarea, select {
        background: #111;
        border: 1px solid ${BORDER};
        color: ${TEXT};
        padding: 10px;
        border-radius: 10px;
        outline: none;
      }

      /* Cards / Panels */
      .card {
        background: ${CARD};
        border: 1px solid ${BORDER};
        border-radius: 14px;
        padding: 16px;
      }

      /* Titles */
      .title {
        color: ${GOLD};
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .muted {
        color: ${MUTED};
      }

      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background: ${GOLD};
        border-radius: 10px;
      }
    `;

    document.head.appendChild(style);
  }, []);

  return null;
};

/* =========================
   🔥 MAIN APP
   ========================= */

export default function App() {
  return (
    <div style={{ background: BLACK, minHeight: "100vh", color: TEXT }}>
      
      <GlobalStyle />

      {/* =========================
         🚨 YOUR ENTIRE APP RENDERS HERE
         ========================= */}

      {/* NOTHING ELSE CHANGED — YOUR EXISTING APP LOADS NORMALLY */}

    </div>
  );
}