import React, { useState, useEffect, useRef } from "react";

export default function App() {
  // STATES
  const [script, setScript] = useState("");
  const [scenes, setScenes] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [status, setStatus] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // -------------------------
  // SCRIPT GENERATION
  // -------------------------
  const generateScript = async () => {
    try {
      setLoading(true);
      setStatus("Generating script...");
      const res = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Generate full movie script" }),
      });

      const data = await res.json();
      if (data?.script) {
        setScript(data.script);
        setStatus("Script generated successfully");
      } else {
        setStatus("Script generation returned no data");
      }
    } catch (err) {
      console.error("Error generating script:", err);
      setStatus("Script generation failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // SCENE GENERATION
  // -------------------------
  const generateScenes = async () => {
    try {
      if (!script) return;
      setLoading(true);
      setStatus("Generating scenes...");
      const res = await fetch("/api/scenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });

      const data = await res.json();
      if (data?.scenes) {
        setScenes(data.scenes);
        setStatus("Scenes generated successfully");
      } else {
        setStatus("Scene generation returned no data");
      }
    } catch (err) {
      console.error("Error generating scenes:", err);
      setStatus("Scene generation failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // RENDER MOVIE
  // -------------------------
  const renderMovie = async () => {
    try {
      if (!scenes.length) return;
      setRendering(true);
      setStatus("Rendering movie...");
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenes }),
      });

      const data = await res.json();
      if (data?.videoUrl) {
        setVideoUrl(data.videoUrl);
        setStatus("Render complete");
      } else {
        setVideoUrl("");
        setStatus("Render finished but no video returned");
      }
    } catch (err) {
      console.error("Render error:", err);
      setStatus("Render failed");
    } finally {
      setRendering(false);
    }
  };

  // -------------------------
  // VIDEO EFFECT: reload on URL change
  // -------------------------
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load(); // ensures video reloads when URL updates
    }
  }, [videoUrl]);

  // -------------------------
  // UI RENDER
  // -------------------------
  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>MandaStrong AI Film Builder</h1>

      {/* Status Display */}
      <p style={{ fontWeight: "bold", color: rendering ? "orange" : "green" }}>
        Status: {status || "Idle"}
      </p>

      {/* CONTROL BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={generateScript} disabled={loading}>
          {loading && !script ? "Generating..." : "Generate Script"}
        </button>

        <button
          onClick={generateScenes}
          disabled={!script || loading}
          style={{ marginLeft: 10 }}
        >
          {loading && script ? "Generating Scenes..." : "Generate Scenes"}
        </button>

        <button
          onClick={renderMovie}
          disabled={!scenes.length || rendering}
          style={{ marginLeft: 10 }}
        >
          {rendering ? "Rendering..." : "Render Movie"}
        </button>
      </div>

      {/* SCRIPT DISPLAY */}
      {script && (
        <div style={{ marginBottom: 30 }}>
          <h3>Script</h3>
          <textarea
            value={script}
            readOnly
            rows={12}
            style={{ width: "100%", fontFamily: "monospace" }}
          />
        </div>
      )}

      {/* SCENES DISPLAY */}
      {scenes.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <h3>Scenes</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 15,
              borderRadius: 5,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {JSON.stringify(scenes, null, 2)}
          </pre>
        </div>
      )}

      {/* VIDEO PLAYER */}
      {videoUrl && (
        <div>
          <h3>Rendered Movie</h3>
          <video
            key={videoUrl}
            ref={videoRef}
            controls
            autoPlay
            style={{
              width: "100%",
              maxHeight: 600,
              backgroundColor: "black",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div style={{ marginTop: 15 }}>
            <a href={videoUrl} download>
              Download Movie
            </a>
          </div>
        </div>
      )}
    </div>
  );
}