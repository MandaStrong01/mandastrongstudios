import React, { useState } from "react";

/* =========================
   🎨 COLORS
========================= */
const GOLD = "#FFD700";
const GOLD2 = "#f5d06f";
const GOLDDIM = "#8c7a2f";
const BG = "#050505";
const BG2 = "#0b0b0b";
const TEXT = "#eaeaea";
const TEXT2 = "#aaaaaa";
const TEXT3 = "#777";

/* =========================
   ✨ GLOBAL FX
========================= */
const glow = {
  panel: {
    boxShadow:
      "0 0 25px rgba(255,215,0,0.15), inset 0 0 10px rgba(255,215,0,0.1)",
  },
};

const GlobalFX = () => (
  <>
    <style>{`
      @keyframes shine {
        0% { background-position: -200% }
        100% { background-position: 200% }
      }
      @keyframes floatBg {
        from { transform: translateY(0); }
        to { transform: translateY(-200px); }
      }
    `}</style>

    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle, rgba(255,215,0,0.12) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
        animation: "floatBg 60s linear infinite",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  </>
);

/* =========================
   🎬 BUTTON SYSTEM
========================= */
const S = {
  btn: (type: "gold" | "out" = "gold") => ({
    padding: "6px 16px",
    borderRadius: 6,
    border: `1px solid ${type === "gold" ? GOLD : GOLDDIM}`,
    background:
      type === "gold"
        ? "linear-gradient(145deg,#FFD700,#c9a24a)"
        : "transparent",
    color: type === "gold" ? "#000" : GOLD,
    cursor: "pointer",
    transition: "all .15s ease",
    boxShadow: "0 0 10px rgba(255,215,0,0.5)",
  }),
};

/* =========================
   🚀 APP
========================= */

export default function App({
  P0_Home,
  P3_Login,
  P4_Create,
  P10_Upload,
  P11_EditorSuite,
  P12_Timeline,
  P13_Neural,
  P14_Mixer,
  P15_Render,
  P16_Preview,
  P17_Distribution,
  P18_Tutorials,
  P19_Legal,
  AgentGrok,
  P21_Community,
  P22_ThatsAllFolks,
  AIPanel,
}: any) {
  const [page, setPage] = useState(0);
  const [aiTool, setAiTool] = useState("");
  const [assets, setAssets] = useState<any[]>([]);

  const TOTAL = 23;

  const goTo = (p: number) => {
    if (p >= 0 && p < TOTAL) setPage(p);
  };

  const render = () => {
    switch (page) {
      case 10:
        return <P10_Upload assets={assets} setAssets={setAssets} />;
      case 11:
        return <P11_EditorSuite goTo={goTo} assets={assets} />;
      case 12:
        return (
          <div>
            <P12_Timeline assets={assets} goTo={goTo} />
            {/* Timeline Glow */}
            <div
              style={{
                height: 6,
                background: "linear-gradient(90deg,#FFD700,transparent)",
                boxShadow: "0 0 10px #FFD700",
              }}
            />
          </div>
        );
      case 13:
        return <P13_Neural />;
      case 14:
        return <P14_Mixer />;
      case 15:
        return <P15_Render assets={assets} />;
      case 16:
        return <P16_Preview goTo={goTo} />;
      case 17:
        return <P17_Distribution goTo={goTo} />;
      case 18:
        return <P18_Tutorials />;
      case 19:
        return <P19_Legal goTo={goTo} />;
      case 20:
        return <AgentGrok />;
      case 21:
        return <P21_Community goTo={goTo} />;
      case 22:
        return <P22_ThatsAllFolks goTo={goTo} />;
      default:
        return <P0_Home goTo={goTo} />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: BG,
        color: TEXT,
        fontFamily: "'Rajdhani',sans-serif",
        position: "relative",
      }}
    >
      <GlobalFX />

      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: BG2,
          borderBottom: `1px solid ${GOLDDIM}`,
        }}
      >
        <div onClick={() => goTo(0)} style={{ cursor: "pointer" }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 5,
              background:
                "linear-gradient(90deg,#FFD700,#fff2b0,#FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shine 4s linear infinite",
            }}
          >
            MANDA STRONG STUDIO
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={S.btn("out")}
            onClick={() => goTo(4)}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.95)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            START
          </button>

          <button style={S.btn("out")} onClick={() => goTo(3)}>
            LOGIN
          </button>

          <button style={S.btn("gold")} onClick={() => goTo(20)}>
            🤖 GROK
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          transition: "opacity .25s ease",
        }}
      >
        {render()}
      </div>

      {/* FOOTER */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
