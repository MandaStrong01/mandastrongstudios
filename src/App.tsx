```tsx
import React, { useState, useEffect, useRef } from "react";
import { Music, Mic, Zap, Sliders, Loader, Save, Share2 } from "lucide-react";

type VideoData = {
  url: string;
  name: string;
  size: string;
  quality: string;
  format: string;
};

export default function App() {

  const [page, setPage] = useState(1);

  const [audioLevels, setAudioLevels] = useState({
    music: 75,
    voice: 50,
    sfx: 65,
    master: 80,
  });

  const [savingPreset, setSavingPreset] = useState(false);

  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  const addToast = (message: string) => {
    const el = document.createElement("div");

    el.innerText = message;
    el.style.position = "fixed";
    el.style.bottom = "20px";
    el.style.left = "50%";
    el.style.transform = "translateX(-50%)";
    el.style.background = "#7c3aed";
    el.style.color = "white";
    el.style.padding = "10px 20px";
    el.style.borderRadius = "10px";
    el.style.fontWeight = "bold";
    el.style.zIndex = "9999";

    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2500);
  };

  const goTo = (p:number) => setPage(p);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
  }, []);

  const handleSavePreset = () => {

    setSavingPreset(true);

    setTimeout(() => {
      setSavingPreset(false);
      addToast("Preset saved");
    }, 800);

  };

  const handleRender = () => {

    const video: VideoData = {
      url: "/videos/tutorial.mp4",
      name: "MandaStrong Demo",
      size: "150MB",
      quality: "1080p",
      format: "MP4"
    };

    setCurrentVideo(video);
    addToast("Video rendered");
    setPage(3);

  };

  const handleShare = async () => {

    if (!currentVideo) return;

    try {

      await navigator.clipboard.writeText(currentVideo.url);
      addToast("Public link copied");

    } catch {

      addToast("Copy failed");

    }

  };

  return (

    <div className="min-h-screen bg-black text-white">

      {page === 1 && (

        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">

          <h1 className="text-6xl font-black text-[#7c3aed] mb-6">
            MANDASTRONG STUDIO
          </h1>

          <p className="text-zinc-400 mb-10 max-w-xl">
            AI Movie Creation Platform
          </p>

          <button
            onClick={()=>goTo(2)}
            className="px-10 py-4 bg-[#7c3aed] rounded-xl font-bold hover:bg-[#6d28d9]"
          >
            START CREATING
          </button>

        </div>

      )}

      {page === 2 && (

        <div className="p-10">

          <h1 className="text-4xl text-center font-black text-[#7c3aed] mb-12">
            AUDIO MIXER
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">

            {[
              { key: "music", icon: Music },
              { key: "voice", icon: Mic },
              { key: "sfx", icon: Zap },
              { key: "master", icon: Sliders }
            ].map((ch)=>{

              const Icon = ch.icon;

              return(

                <div key={ch.key} className="bg-zinc-900 p-6 rounded-2xl text-center">

                  <Icon className="mx-auto mb-4 text-[#7c3aed]" size={32}/>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audioLevels[ch.key as keyof typeof audioLevels]}
                    onChange={(e)=>{

                      setAudioLevels({
                        ...audioLevels,
                        [ch.key]:Number(e.target.value)
                      })

                    }}
                    className="w-full"
                  />

                  <div className="mt-3 font-bold">
                    {audi
```
