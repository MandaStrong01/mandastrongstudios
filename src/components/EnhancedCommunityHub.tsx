import React, { useState, useEffect } from 'react';
import { Heart, ThumbsUp, MessageCircle, TrendingUp, Clock, Flame, Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Movie {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string | null;
  thumbnail_url: string | null;
  duration: number;
  is_public: boolean;
  created_at: string;
}

interface Comment {
  id: string;
  movie_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: { full_name: string | null; email: string };
}

interface Reaction {
  id: string;
  movie_id: string;
  user_id: string;
  reaction_type: 'heart' | 'like';
}

interface EnhancedCommunityHubProps {
  user: any;
  onBack: () => void;
  onNext: () => void;
}

const movieEmojis = ['🎬', '✈️', '📦', '🎵', '💍', '🎮'];
const movieTitles = [
  'Epic Action Montage',
  'Cinematic Travel Vlog',
  'Product Showcase Video',
  'Music Video Edit',
  'Wedding Highlights',
  'Gaming Montage'
];
const creators = [
  { name: 'Sarah Johnson', avatar: 'SJ' },
  { name: 'Mike Chen', avatar: 'MC' },
  { name: 'Emily Rodriguez', avatar: 'ER' },
  { name: 'Alex Thompson', avatar: 'AT' },
  { name: 'Jessica Kim', avatar: 'JK' },
  { name: 'David Brown', avatar: 'DB' }
];

export const EnhancedCommunityHub: React.FC<EnhancedCommunityHubProps> = ({ user, onBack, onNext }) => {
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [reactions, setReactions] = useState<Record<string, Reaction[]>>({});
  const [newComment, setNewComment] = useState('');
  const [expandedComments, setExpandedComments] = useState<string | null>(null);

  useEffect(() => {
    loadCommunityMovies();
  }, []);

  const loadCommunityMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (data) {
      setMovies(data);
      data.forEach(movie => {
        loadComments(movie.id);
        loadReactions(movie.id);
      });
    }
  };

  const loadComments = async (movieId: string) => {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(full_name, email)')
      .eq('movie_id', movieId)
      .order('created_at', { ascending: false });

    if (data) {
      setComments(prev => ({ ...prev, [movieId]: data }));
    }
  };

  const loadReactions = async (movieId: string) => {
    const { data } = await supabase
      .from('reactions')
      .select('*')
      .eq('movie_id', movieId);

    if (data) {
      setReactions(prev => ({ ...prev, [movieId]: data }));
    }
  };

  const toggleReaction = async (movieId: string, type: 'heart' | 'like') => {
    if (!user) return;

    const existing = reactions[movieId]?.find(r => r.user_id === user.id && r.reaction_type === type);

    if (existing) {
      await supabase.from('reactions').delete().eq('id', existing.id);
    } else {
      await supabase.from('reactions').insert({
        movie_id: movieId,
        user_id: user.id,
        reaction_type: type
      });
    }

    loadReactions(movieId);
  };

  const addComment = async (movieId: string) => {
    if (!newComment.trim() || !user) return;

    const { error } = await supabase.from('comments').insert({
      movie_id: movieId,
      user_id: user.id,
      content: newComment
    });

    if (!error) {
      setNewComment('');
      loadComments(movieId);
    }
  };

  const getTimeAgo = (index: number) => {
    const times = ['2 hours ago', '5 hours ago', '1 day ago', '1 day ago', '3 days ago', '4 days ago'];
    return times[index] || '1 day ago';
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black">COMMUNITY HUB</h1>
          <div className="flex gap-3">
            <button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
              ← Back
            </button>
            <button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
              Next →
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === 'recent' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Clock size={20} /> Recent
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === 'popular' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Flame size={20} /> Popular
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === 'trending' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <TrendingUp size={20} /> Trending
            </button>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold transition">
            <Upload size={20} /> Upload Your Creation
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => {
            const movie = movies[index];
            const movieId = movie?.id || `demo-${index}`;
            const heartCount = reactions[movieId]?.filter(r => r.reaction_type === 'heart').length || [1247, 892, 2156, 3421, 0, 0][index];
            const likeCount = reactions[movieId]?.filter(r => r.reaction_type === 'like').length || [823, 634, 1423, 2789, 0, 0][index];
            const commentCount = comments[movieId]?.length || [156, 89, 267, 445, 0, 0][index];
            const isTrending = index === 0 || index === 2 || index === 3;

            return (
              <div
                key={movieId}
                className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl overflow-hidden border-2 border-purple-600 hover:border-purple-400 transition"
              >
                {isTrending && (
                  <div className="bg-purple-600 px-4 py-2 flex items-center gap-2 justify-center">
                    <TrendingUp size={16} />
                    <span className="text-sm font-bold">Trending</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="bg-gradient-to-br from-purple-700 to-purple-600 h-64 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-8xl">{movieEmojis[index]}</div>
                  </div>

                  <h3 className="text-2xl font-black mb-2">{movie?.title || movieTitles[index]}</h3>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm">
                      {creators[index].avatar}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{creators[index].name}</p>
                      <p className="text-gray-400 text-xs">{getTimeAgo(index)}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => movie && toggleReaction(movie.id, 'heart')}
                      className={`flex items-center gap-2 bg-black bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-70 transition ${
                        reactions[movieId]?.some(r => r.user_id === user?.id && r.reaction_type === 'heart') ? 'text-red-500' : ''
                      }`}
                    >
                      <Heart size={20} fill={reactions[movieId]?.some(r => r.user_id === user?.id && r.reaction_type === 'heart') ? 'currentColor' : 'none'} />
                      <span className="font-bold">{heartCount}</span>
                    </button>
                    <button
                      onClick={() => movie && toggleReaction(movie.id, 'like')}
                      className={`flex items-center gap-2 bg-black bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-70 transition ${
                        reactions[movieId]?.some(r => r.user_id === user?.id && r.reaction_type === 'like') ? 'text-orange-500' : ''
                      }`}
                    >
                      <ThumbsUp size={20} fill={reactions[movieId]?.some(r => r.user_id === user?.id && r.reaction_type === 'like') ? 'currentColor' : 'none'} />
                      <span className="font-bold">{likeCount}</span>
                    </button>
                    <button
                      onClick={() => setExpandedComments(expandedComments === movieId ? null : movieId)}
                      className="flex items-center gap-2 bg-black bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-70 transition"
                    >
                      <MessageCircle size={20} />
                      <span className="font-bold">{commentCount}</span>
                    </button>
                  </div>

                  <div className="bg-black bg-opacity-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-400 mb-2">Recent comments:</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs"><span className="font-bold">User123:</span> Amazing work!</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex-shrink-0" />
                        <div>
                          <p className="text-xs"><span className="font-bold">Creator456:</span> Love the editing style!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedComments(expandedComments === movieId ? null : movieId)}
                    className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition"
                  >
                    View All Comments
                  </button>

                  {expandedComments === movieId && (
                    <div className="mt-4 space-y-3">
                      {comments[movieId]?.slice(0, 5).map(comment => (
                        <div key={comment.id} className="bg-black bg-opacity-50 rounded-lg p-3">
                          <p className="text-sm font-bold text-purple-400">{comment.profiles.full_name || comment.profiles.email}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      ))}
                      {user && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-black bg-opacity-50 border-2 border-purple-600 rounded-lg px-4 py-2 text-sm"
                          />
                          <button
                            onClick={() => movie && addComment(movie.id)}
                            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition"
                          >
                            Post
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
