import React, { useState, useEffect } from 'react';
import { Film, Video, Users, Settings, LogIn, Home } from 'lucide-react';
import { supabase } from './lib/supabase';

type Page = 'home' | 'login' | 'editor' | 'community' | 'movies';

const aiTools = [
  { name: "Text to Text", desc: "Generate or transform written content using AI." },
  { name: "Text to Image", desc: "Create images from written prompts." },
  { name: "Image to Image", desc: "Enhance or transform images with AI." },
  { name: "Image to Video", desc: "Turn still images into cinematic video clips." },
  { name: "Text to Video", desc: "Generate video clips directly from text prompts." },
  { name: "Video to Video", desc: "Enhance or modify existing video with AI." },
  { name: "Text to Audio", desc: "Generate voice or sound from written text." },
  { name: "Audio to Audio", desc: "Transform or enhance existing audio." },
  { name: "Audio to Video", desc: "Generate video visuals from audio." },
  { name: "Video to Audio", desc: "Extract or convert audio from video." },
  { name: "Text to Music", desc: "Create background music using text prompts." },
  { name: "Music to Music", desc: "Remix or transform music with AI." },
  { name: "Script to Movie", desc: "Generate a full AI film from a written script." },
  { name: "Prompt Builder", desc: "Generate optimized prompts for AI creation." },
  { name: "Storyboard Generator", desc: "Automatically generate visual storyboards." },
  { name: "Voice Generator", desc: "Create realistic AI voice narration." },
  { name: "Subtitle Generator", desc: "Generate subtitles automatically." },
  { name: "Scene Extender", desc: "Extend scenes with additional AI generated clips." },
  { name: "Lip Sync Generator", desc: "Match dialogue audio with mouth movement." },
  { name: "Animation Generator", desc: "Generate animated scenes using AI." },
  { name: "3D Motion Generator", desc: "Add cinematic motion and depth." },
  { name: "AI Film Builder", desc: "Combine clips, audio, and scenes into a movie." }
];

function App() {

  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
        setUserEmail(session?.user?.email || null);
      });

    return () => subscription.unsubscribe();

  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentPage('home');
  };

  const renderEditor = () => {

    return (
      <div className="min-h-screen bg-black text-white p-10">

        <h1 className="text-4xl font-bold mb-8 text-center">
          AI Tool Board
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {aiTools.map((tool, i) => (

            <div
              key={i}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5"
            >

              <h2 className="text-lg font-semibold mb-2">
                {tool.name}
              </h2>

              <p className="text-sm text-gray-300 mb-4">
                {tool.desc}
              </p>

              <div className="flex flex-col gap-2">

                <button className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                  Browse / Upload
                </button>

                <button className="bg-gray-800 p-2 rounded hover:bg-gray-700">
                  Paste
                </button>

                <button className="bg-blue-600 p-2 rounded hover:bg-blue-500">
                  AI Create
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    );

  };

  const renderPage = () => {

    switch (currentPage) {

      case 'login':
        return (
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <button
              onClick={() => setCurrentPage('editor')}
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              Login to Studio
            </button>
          </div>
        );

      case 'editor':
        return isAuthenticated ? renderEditor() : (
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            Please login first
          </div>
        );

      case 'community':
        return (
          <div className="min-h-screen bg-black text-white p-10">
            Community Hub
          </div>
        );

      case 'movies':
        return (
          <div className="min-h-screen bg-black text-white p-10">
            Movie Viewer
          </div>
        );

      default:
        return (

          <div className="min-h-screen bg-black text-white relative overflow-hidden">

            <video
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              src="/background.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-6xl font-bold mb-8">MandaStrong Studio</h1>
              <p className="text-xl mb-12 max-w-2xl text-center">
                Create stunning AI-powered films with professional tools
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="bg-blue-600 px-8 py-4 rounded-lg text-lg hover:bg-blue-500 transition"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setCurrentPage('movies')}
                  className="bg-gray-800 px-8 py-4 rounded-lg text-lg hover:bg-gray-700 transition"
                >
                  Watch Movies
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition"
          >
            <Film className="w-6 h-6" />
            <span className="font-bold text-xl">MandaStrong</span>
          </button>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('editor')}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition"
            >
              <Video className="w-5 h-5" />
              <span>Studio</span>
            </button>
            <button
              onClick={() => setCurrentPage('community')}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition"
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </button>
            <button
              onClick={() => setCurrentPage('movies')}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition"
            >
              <Film className="w-5 h-5" />
              <span>Movies</span>
            </button>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition"
              >
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;