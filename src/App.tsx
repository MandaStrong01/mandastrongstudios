import React, { useEffect } from "react";

/* =========================
   🔥 MandaStrong THEME
   ========================= */

const GOLD = "#D4AF37";
const BLACK = "#000000";
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

      /* 🔥 BUTTONS */
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

      /* 🔥 INPUTS */
      input, textarea, select {
        background: ${CARD};
        border: 1px solid ${BORDER};
        color: ${TEXT};
        padding: 10px;
        border-radius: 10px;
        outline: none;
      }

      /* 🔥 CARDS */
      .card {
        background: ${CARD};
        border: 1px solid ${BORDER};
        border-radius: 14px;
        padding: 16px;
      }

      /* 🔥 TITLES */
      .title {
        color: ${GOLD};
        font-weight: 700;
      }

      .muted {
        color: ${MUTED};
      }

      /* 🔥 SCROLLBAR */
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background: ${GOLD};
        border-radius: 10px;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
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

      {/* 🚨 YOUR REAL APP CONTENT STARTS BELOW */}
      {/* DO NOT DELETE YOUR EXISTING COMPONENTS / ROUTES */}

    </div>
  );
}