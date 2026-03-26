import { useState } from "react";

const GOLD = "#e8c96d";
const BG = "#000";
const PANEL = "#111";
const TEXT = "#d4c9a8";
const DIM = "#777";

const writingTools = [
"Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Story to Script",
"Feature Film Script","Short Film Script","TV Pilot Script","Documentary Script","Commercial Script",
"YouTube Script","Podcast Script","Social Media Script","Explainer Script","Plot Generator",
"Story Outline","Three Act Structure","Five Act Structure","Beat Sheet Builder","Character Bio Writer",
"Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer",
"Logline Generator","Synopsis Writer","Treatment Writer","Scene Writer","Text to Dialogue",
"Dialogue Generator","Narration Writer","Voiceover Script","Interview Script","Action Line Writer",
"Scene Heading Tool","Parenthetical Generator","Script Formatter","Dialogue Tightener","Script Timer",
"Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish",
"Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Classifier"
];

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div style={{ background: BG, minHeight: "100vh", padding: 20 }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ color: GOLD }}>☰ MANDA STRONG</h1>
        <div style={{ color: TEXT }}>STUDIO</div>
        <div style={{ color: DIM }}>
          ✦ CINEMA INTELLIGENCE PLATFORM · 600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS · PROFESSIONAL CINEMA SYNTHESIS
        </div>
        <div style={{ color: "lime" }}>● SYSTEM ONLINE</div>
      </div>

      {/* WORKSTATION */}
      <h2 style={{ color: GOLD }}>AI WORKSTATION 01 — WRITING</h2>
      <div style={{ color: TEXT }}>WRITING TOOLS</div>

      {/* SEARCH */}
      <input
        placeholder="Search 50 tools..."
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
          background: "#000",
          border: `1px solid ${GOLD}`,
          color: TEXT
        }}
      />

      <div style={{ color: DIM, marginTop: 5 }}>🔍 50 TOOLS</div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 10,
          maxHeight: "55vh",
          overflowY: "auto"
        }}
      >
        {writingTools.map((tool, i) => (
          <div
            key={i}
            onClick={() => setActiveTool(tool)}
            style={{
              background: PANEL,
              border: `1px solid ${GOLD}`,
              padding: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: 50
            }}
          >
            {tool}
          </div>
        ))}
      </div>

      {/* TOOL PANEL */}
      {activeTool && (
        <div
          style={{
            marginTop: 20,
            background: "#050505",
            border: `2px solid ${GOLD}`,
            padding: 20,
            maxWidth: 600
          }}
        >
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ color: GOLD, letterSpacing: 2 }}>
              {activeTool.toUpperCase()}
            </div>
            <div
              onClick={() => setActiveTool(null)}
              style={{ cursor: "pointer", color: GOLD }}
            >
              ✕
            </div>
          </div>

          {/* MODE BUTTONS */}
          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
            <button style={btn}>CREATE</button>
            <button style={btn}>PASTE</button>
            <button style={{ ...btn, color: GOLD }}>AI CREATE ✦</button>
          </div>

          {/* INPUT */}
          <div style={label}>INPUT</div>
          <input
            placeholder="Paste a URL or import content..."
            style={input}
          />

          {/* PROMPT */}
          <div style={label}>PROMPT</div>
          <textarea
            placeholder={`Describe what you want from "${activeTool}"...`}
            style={textarea}
          />

          {/* GENERATE */}
          <button style={generateBtn}>
            ✦ GENERATE
          </button>

          {/* UPLOAD */}
          <button style={uploadBtn}>
            ⬆ UPLOAD FILE
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ marginTop: 30, color: DIM }}>
        MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <span>◀ BACK</span>
        <span>PAGE 5 / 23</span>
        <span>NEXT ▶</span>
      </div>

      <div style={{ color: "lime", marginTop: 5 }}>● AUTOSAVE ON</div>
      <div style={{ color: DIM }}>Made in Bolt</div>

    </div>
  );
}

// STYLES
const btn = {
  flex: 1,
  background: "transparent",
  border: "1px solid #e8c96d",
  padding: 8,
  color: "#d4c9a8",
  cursor: "pointer"
};

const label = {
  marginTop: 15,
  fontSize: 12,
  color: "#777"
};

const input = {
  width: "100%",
  padding: 10,
  background: "#000",
  border: "1px solid #e8c96d",
  color: "#d4c9a8",
  marginTop: 5
};

const textarea = {
  width: "100%",
  height: 100,
  padding: 10,
  background: "#000",
  border: "1px solid #e8c96d",
  color: "#d4c9a8",
  marginTop: 5
};

const generateBtn = {
  marginTop: 15,
  width: "100%",
  background: "#e8c96d",
  padding: 12,
  border: "none"
};

const uploadBtn = {
  marginTop: 10,
  width: "100%",
  background: "transparent",
  border: "1px solid #e8c96d",
  padding: 10,
  color: "#d4c9a8"
};