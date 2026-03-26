import { useState } from "react";

const GOLD = "#e8c96d";
const BG = "#000000";
const PANEL = "#111";
const TEXT = "#d4c9a8";
const DIM = "#777";

const TOOLS_PER_PAGE = 120;

// 600 TOOL SYSTEM
const tools = Array.from({ length: 600 }, (_, i) => ({
  id: i + 1,
  name: `AI Tool ${i + 1}`,
  group: [
    "Visual Engine",
    "Motion Engine",
    "Audio Engine",
    "Narrative Engine",
    "FX Engine"
  ][Math.floor(i / 120)]
}));

export default function App() {
  const [page, setPage] = useState(0);
  const [activeTool, setActiveTool] = useState<any>(null);

  const start = page * TOOLS_PER_PAGE;
  const visible = tools.slice(start, start + TOOLS_PER_PAGE);

  return (
    <div style={{ background: BG, minHeight: "100vh", padding: 20 }}>

      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ color: GOLD }}>☰ MANDA STRONG</h1>
        <div style={{ color: TEXT }}>STUDIO</div>
        <div style={{ color: DIM }}>
          ✦ CINEMA INTELLIGENCE PLATFORM · 600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS
        </div>
        <div style={{ color: "lime", marginTop: 5 }}>● SYSTEM ONLINE</div>
      </div>

      {/* TOOLBOARD TITLE */}
      <h2 style={{ color: GOLD }}>
        AI TOOLBOARD — PAGE {page + 1}
      </h2>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          maxHeight: "70vh",
          overflowY: "auto"
        }}
      >
        {visible.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTool(tool)}
            style={{
              background: PANEL,
              border: `1px solid ${GOLD}`,
              padding: 14,
              cursor: "pointer"
            }}
          >
            <div>{tool.name}</div>
            <div style={{ fontSize: 11, color: DIM }}>
              {tool.group}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={{ marginTop: 15 }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>◀</button>
        <span style={{ margin: "0 10px", color: TEXT }}>
          PAGE {page + 1} / 5
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === 4}>▶</button>
      </div>

      {/* TOOL STUDIO */}
      {activeTool && (
        <div
          style={{
            marginTop: 20,
            background: "#050505",
            border: `2px solid ${GOLD}`,
            padding: 20
          }}
        >

          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ color: GOLD }}>{activeTool.name}</h3>
            <button onClick={() => setActiveTool(null)}>✕</button>
          </div>

          {/* MODE */}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button>UPLOAD</button>
            <button>PASTE</button>
            <button style={{ color: GOLD }}>AI CREATE ✦</button>
          </div>

          {/* INPUT */}
          <textarea
            placeholder="Describe what you want to create..."
            style={{
              width: "100%",
              height: 120,
              marginTop: 15,
              background: "#000",
              color: TEXT,
              border: `1px solid ${GOLD}`
            }}
          />

          {/* UPLOAD BOX */}
          <div
            style={{
              marginTop: 15,
              border: `1px dashed ${GOLD}`,
              padding: 25,
              textAlign: "center"
            }}
          >
            ⬆ CLICK TO BROWSE  
            <div style={{ color: DIM }}>
              Video · Audio · Image · Text
            </div>
          </div>

          {/* SETTINGS */}
          <div style={{ marginTop: 15 }}>
            <h4 style={{ color: GOLD }}>Creation Settings</h4>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <select><option>Resolution: 4K</option><option>8K</option></select>
              <select><option>Style: Cinematic</option><option>Realistic</option></select>
              <select><option>Depth: Standard</option><option>High Detail</option></select>
              <select><option>Duration: Auto</option><option>Extended</option></select>
            </div>
          </div>

          {/* GENERATE */}
          <button
            style={{
              marginTop: 20,
              width: "100%",
              background: GOLD,
              padding: 12,
              fontWeight: "bold"
            }}
          >
            GENERATE ASSET
          </button>

          {/* OUTPUT */}
          <div
            style={{
              marginTop: 15,
              border: "1px solid #333",
              padding: 20
            }}
          >
            OUTPUT WINDOW  
            <div style={{ color: DIM }}>
              Generated content will appear here
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ marginTop: 30, color: DIM }}>
        MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <span>◀ BACK</span>
        <span>PAGE {page + 1} / 5</span>
        <span>NEXT ▶</span>
      </div>

      <div style={{ marginTop: 5, color: "lime" }}>● AUTOSAVE ON</div>
      <div style={{ color: DIM }}>Made in Bolt</div>

    </div>
  );
}