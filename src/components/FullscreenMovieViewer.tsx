import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Movie {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  is_featured?: boolean;
}

interface FullscreenMovieViewerProps {
  onClose: () => void;
  isAdmin?: boolean;
  userEmail?: string;
}

export default function FullscreenMovieViewer({ onClose, isAdmin = false, userEmail }: FullscreenMovieViewerProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMovie = featuredMovies[currentMovieIndex] || movies[currentMovieIndex];

  useEffect(() => {
    loadMovies();
    loadFeaturedMovies();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => {
      const totalMovies = featuredMovies.length + movies.length;
      if (currentMovieIndex < totalMovies - 1) {
        setCurrentMovieIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    if (currentMovie) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentMovieIndex, currentMovie, featuredMovies.length, movies.length]);

  const loadMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMovies(data);
    }
  };

  const loadFeaturedMovies = async () => {
    const { data, error } = await supabase
      .from('admin_featured_movies')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!error && data) {
      setFeaturedMovies(data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        video_url: item.featured_video_url || '',
        is_featured: true
      })));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const videoUrl = event.target?.result as string;

        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        if (!userId) {
          alert('You must be logged in to upload');
          setUploading(false);
          return;
        }

        const { data: profileData } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', userId)
          .maybeSingle();

        if (profileData?.plan !== 'admin') {
          alert('Only administrators can upload featured movies');
          setUploading(false);
          return;
        }

        const { error } = await supabase
          .from('admin_featured_movies')
          .insert({
            admin_id: userId,
            featured_video_url: videoUrl,
            title: uploadTitle || file.name,
            description: uploadDescription,
            display_order: featuredMovies.length,
            is_active: true
          });

        if (error) {
          alert('Upload failed: ' + error.message);
        } else {
          setUploadTitle('');
          setUploadDescription('');
          setShowUploadDialog(false);
          loadFeaturedMovies();
        }

        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Upload error');
      setUploading(false);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentMovie) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">No movies available</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-white text-2xl font-bold">
            {currentMovie.is_featured ? "Administrator's Choice" : 'Community Movies'}
          </h1>
          {isAdmin && (
            <button
              onClick={() => setShowUploadDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <Upload size={20} />
              Upload
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-purple-400 transition"
        >
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <video
          ref={videoRef}
          src={currentMovie.video_url}
          className="max-w-full max-h-full"
          onClick={togglePlay}
          autoPlay
          playsInline
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent p-8">
        <div className="mb-4">
          <h2 className="text-white text-xl font-bold mb-1">{currentMovie.title}</h2>
          {currentMovie.description && (
            <p className="text-gray-400 text-sm">{currentMovie.description}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#9333ea' }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={skipBackward}
              className="text-white hover:text-purple-400 transition"
            >
              <SkipBack size={28} />
            </button>

            <button
              onClick={togglePlay}
              className="bg-purple-600 p-4 rounded-full hover:bg-purple-700 transition"
            >
              {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white" />}
            </button>

            <button
              onClick={skipForward}
              className="text-white hover:text-purple-400 transition"
            >
              <SkipForward size={28} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button onClick={toggleMute} className="text-white hover:text-purple-400 transition">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#9333ea' }}
              />
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400 transition"
            >
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>

      {showUploadDialog && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-white text-2xl font-bold mb-6">Upload Featured Movie</h2>

            <input
              type="text"
              placeholder="Movie Title"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <textarea
              placeholder="Description (optional)"
              value={uploadDescription}
              onChange={(e) => setUploadDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg mb-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Choose Video'}
              </button>
              <button
                onClick={() => setShowUploadDialog(false)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
