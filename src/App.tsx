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