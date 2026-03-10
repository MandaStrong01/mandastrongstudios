import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Video, Scissors, Image as ImageIcon, Share2, Sparkles, Upload, Save, Play, Pause, SkipBack, SkipForward, Volume2, Download, Film, ChevronDown, ChevronUp, Music, Wand2, Type, Palette, Layers, Grid2x2 as Grid, Home, Moon, Sun, Mic, Settings, PlusCircle, List, Users, X, MessageSquare, Check, LayoutGrid, Smartphone, Loader, CheckCircle, XCircle, User as UserIcon, LogOut, Clipboard } from 'lucide-react';
import VideoRecorder from './components/VideoRecorder';
import { AudioMixer } from './components/AudioMixer';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import VideoPlayer from './components/VideoPlayer';
import { DevTools } from './components/DevTools';
import DaVinciTimeline from './components/DaVinciTimeline';
import Footer from './components/Footer';
import QuickAccess from './components/QuickAccess';
import { AgentGrokHelpDesk } from './components/AgentGrokHelpDesk';
import { ThankYouMissionPage } from './components/ThankYouMissionPage';
import FullscreenMovieViewer from './components/FullscreenMovieViewer';
import PasteImporter from './components/PasteImporter';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

type Tool =
  | 'home'
  | 'video-editor'
  | 'audio-mixer'
  | 'social'
  | 'ai-tools'
  | 'recorder'
  | 'library'
  | 'thank-you'
  | 'movies';

interface TimelineClip {
  id: string;
  type: 'video' | 'audio' | 'image' | 'text';
  src?: string;
  text?: string;
  start: number;
  duration: number;
  track: number;
  thumbnail?: string;
  volume?: number;
  effects?: string[];
}

interface Project {
  id: string;
  name: string;
  clips: TimelineClip[];
  duration: number;
  lastModified: Date;
}

function App() {
  const [activeTool, setActiveTool] = useState<Tool>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showPasteImporter, setShowPasteImporter] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setActiveTool('home');
  };

  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [clips, setClips] = useState<TimelineClip[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [selectedClip, setSelectedClip] = useState<TimelineClip | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [zoom, setZoom] = useState(1);

  const [showDevTools, setShowDevTools] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      const newClip: TimelineClip = {
        id: `clip-${Date.now()}`,
        type: 'video',
        src: url,
        start: 0,
        duration: 0,
        track: 0,
        thumbnail: url,
      };
      setClips([...clips, newClip]);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      const updatedClips = clips.map((clip) =>
        clip.src === videoSrc && clip.duration === 0
          ? { ...clip, duration: videoRef.current!.duration }
          : clip
      );
      setClips(updatedClips);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const addClip = (clip: Partial<TimelineClip>) => {
    const newClip: TimelineClip = {
      id: `clip-${Date.now()}`,
      type: clip.type || 'video',
      src: clip.src,
      text: clip.text,
      start: clips.length > 0 ? Math.max(...clips.map((c) => c.start + c.duration)) : 0,
      duration: clip.duration || 5,
      track: clip.track || 0,
      thumbnail: clip.thumbnail,
      volume: clip.volume ?? 1,
      effects: clip.effects || [],
    };
    setClips([...clips, newClip]);
  };

  const removeClip = (id: string) => {
    setClips(clips.filter((clip) => clip.id !== id));
    if (selectedClip?.id === id) {
      setSelectedClip(null);
    }
  };

  const updateClip = (id: string, updates: Partial<TimelineClip>) => {
    setClips(clips.map((clip) => (clip.id === id ? { ...clip, ...updates } : clip)));
    if (selectedClip?.id === id) {
      setSelectedClip({ ...selectedClip, ...updates });
    }
  };

  const duplicateClip = (id: string) => {
    const clip = clips.find((c) => c.id === id);
    if (clip) {
      const newClip = {
        ...clip,
        id: `clip-${Date.now()}`,
        start: clip.start + clip.duration,
      };
      setClips([...clips, newClip]);
    }
  };

  const saveProject = () => {
    const project: Project = {
      id: currentProject?.id || `project-${Date.now()}`,
      name: currentProject?.name || 'Untitled Project',
      clips,
      duration: clips.reduce((max, clip) => Math.max(max, clip.start + clip.duration), 0),
      lastModified: new Date(),
    };
    localStorage.setItem(`project-${project.id}`, JSON.stringify(project));
    setCurrentProject(project);
  };

  const loadProject = (projectId: string) => {
    const saved = localStorage.getItem(`project-${projectId}`);
    if (saved) {
      const project = JSON.parse(saved);
      setCurrentProject(project);
      setClips(project.clips);
    }
  };

  const exportVideo = () => {
    alert('Export functionality would render the timeline to a final video file.');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const tools = [
    { id: 'home' as Tool, name: 'Home', icon: Home },
    { id: 'video-editor' as Tool, name: 'Video Editor', icon: Video },
    { id: 'audio-mixer' as Tool, name: 'Audio Mixer', icon: Music },
    { id: 'recorder' as Tool, name: 'Record', icon: Mic },
    { id: 'social' as Tool, name: 'Community', icon: Users },
    { id: 'movies' as Tool, name: 'Movies', icon: Film },
    { id: 'thank-you' as Tool, name: 'Thank You', icon: MessageSquare },
  ];

  const requiresAuth = (toolId: Tool): boolean => {
    return ['video-editor', 'audio-mixer', 'recorder', 'social', 'library'].includes(toolId);
  };

  const handleToolClick = (toolId: Tool) => {
    if (requiresAuth(toolId) && !user) {
      setShowAuthModal(true);
      return;
    }
    setActiveTool(toolId);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handlePasteImport = (content: { type: 'url' | 'script' | 'text', data: string, name: string }) => {
    console.log('Imported content:', content);
    setShowPasteImporter(false);
    setActiveTool('video-editor');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <PWAInstallPrompt />

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <EnhancedLoginRegister
              onBack={() => setShowAuthModal(false)}
              onLoginSuccess={handleAuthSuccess}
              onBrowseAsGuest={() => setShowAuthModal(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col h-screen">
        <header className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white shadow-2xl border-b border-purple-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

          <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-purple-200">
                    MandaStrong Studio
                  </h1>
                  <p className="text-[10px] sm:text-xs text-purple-200/80 font-medium hidden sm:block">
                    Professional Video Creation Platform
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/20"
                  title="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>

                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                      <UserIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm transition-all duration-200 border border-red-500/30 text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm font-medium"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                )}
              </div>
            </div>

            <nav className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;
                const needsAuth = requiresAuth(tool.id) && !user;

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm relative group ${
                      isActive
                        ? 'bg-white text-purple-900 shadow-lg scale-105'
                        : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{tool.name}</span>
                    {needsAuth && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {activeTool === 'home' && (
            <div className="h-full overflow-y-auto">
              <div className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
                >
                  <source src="/background.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-900/70 to-gray-900/90"></div>

                <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
                  <div className="inline-block mb-4 sm:mb-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 p-4 sm:p-6 rounded-2xl shadow-2xl">
                        <Film className="w-12 h-12 sm:w-20 sm:h-20 text-white" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-6xl md:text-7xl font-black mb-3 sm:mb-6 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-purple-200">
                      Create Amazing Videos
                    </span>
                  </h2>

                  <p className="text-base sm:text-xl md:text-2xl text-purple-100 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-light px-4">
                    Professional video editing tools at your fingertips. Record, edit, and share stunning content with ease.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
                    <button
                      onClick={() => handleToolClick('video-editor')}
                      className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                        <Video className="w-5 h-5 sm:w-6 sm:h-6" />
                        Start Creating
                      </span>
                    </button>

                    <button
                      onClick={() => handleToolClick('recorder')}
                      className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold text-base sm:text-lg border-2 border-white/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
                        <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                        Record Now
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                    {[
                      { icon: Video, title: 'Professional Editing', desc: 'Timeline-based editing' },
                      { icon: Wand2, title: 'AI-Powered Tools', desc: 'Smart enhancements' },
                      { icon: Share2, title: 'Easy Sharing', desc: 'Export & share instantly' },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="group bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:bg-white/10 transform hover:scale-105"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-white">{feature.title}</h3>
                        <p className="text-xs sm:text-sm text-purple-200/80">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <QuickAccess onToolSelect={handleToolClick} user={user} />
            </div>
          )}

          {activeTool === 'video-editor' && user && (
            <div className="h-full flex flex-col bg-gray-900">
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
                <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
                  <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden flex-1 min-h-0">
                    <div className="h-full flex flex-col">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-gray-700">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                          <Play className="w-4 h-4 text-purple-400" />
                          Preview
                        </h3>
                      </div>
                      <div className="flex-1 flex items-center justify-center bg-black p-4 min-h-0">
                        <VideoPlayer videoSrc={videoSrc} clips={clips} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-64">
                    <DaVinciTimeline
                      clips={clips}
                      currentTime={currentTime}
                      duration={duration}
                      onSeek={handleSeek}
                      onClipSelect={setSelectedClip}
                      onClipUpdate={updateClip}
                      onClipRemove={removeClip}
                      selectedClip={selectedClip}
                      zoom={zoom}
                      onZoomChange={setZoom}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 overflow-y-auto">
                  <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-purple-400" />
                      Import Media
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg cursor-pointer transition-all transform hover:scale-105 shadow-lg">
                        <Video className="w-4 h-4" />
                        <span className="font-medium">Upload Video</span>
                        <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                      </label>
                      <button
                        onClick={() => setShowPasteImporter(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg font-medium"
                      >
                        <Clipboard className="w-4 h-4" />
                        Paste Content
                      </button>
                    </div>
                  </div>

                  {selectedClip && (
                    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4">
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-purple-400" />
                        Clip Properties
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Duration (seconds)</label>
                          <input
                            type="number"
                            value={selectedClip.duration}
                            onChange={(e) => updateClip(selectedClip.id, { duration: parseFloat(e.target.value) })}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                            step="0.1"
                            min="0.1"
                          />
                        </div>
                        {selectedClip.type === 'video' && (
                          <div>
                            <label className="text-sm text-gray-400 mb-1 block">Volume</label>
                            <input
                              type="range"
                              value={selectedClip.volume ?? 1}
                              onChange={(e) => updateClip(selectedClip.id, { volume: parseFloat(e.target.value) })}
                              className="w-full"
                              min="0"
                              max="1"
                              step="0.1"
                            />
                          </div>
                        )}
                        <button
                          onClick={() => removeClip(selectedClip.id)}
                          className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Remove Clip
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Save className="w-4 h-4 text-purple-400" />
                      Project
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={saveProject}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Project
                      </button>
                      <button
                        onClick={exportVideo}
                        className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'audio-mixer' && user && (
            <AudioMixer
              onBack={() => setActiveTool('home')}
              onNext={() => setActiveTool('video-editor')}
            />
          )}
          {activeTool === 'recorder' && user && (
            <VideoRecorder onRecordingComplete={(url) => setVideoSrc(url)} />
          )}
          {activeTool === 'social' && user && (
            <EnhancedCommunityHub
              user={user}
              onBack={() => setActiveTool('home')}
              onNext={() => setActiveTool('video-editor')}
            />
          )}
          {activeTool === 'thank-you' && (
            <ThankYouMissionPage onBackToHome={() => setActiveTool('home')} />
          )}
          {activeTool === 'movies' && <FullscreenMovieViewer />}
        </main>

        <Footer onOpenDevTools={() => setShowDevTools(true)} />
      </div>

      <AgentGrokHelpDesk
        onBack={() => {}}
        onNext={() => {}}
      />

      {showDevTools && (
        <DevTools
          onClose={() => setShowDevTools(false)}
          userEmail={user?.email}
        />
      )}

      {showPasteImporter && (
        <PasteImporter
          onImport={handlePasteImport}
          onClose={() => setShowPasteImporter(false)}
        />
      )}
    </div>
  );
}

export default App;
