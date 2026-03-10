import { Home, Film, HelpCircle } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

type Tool = 'home' | 'video-editor' | 'audio-mixer' | 'social' | 'ai-tools' | 'recorder' | 'library' | 'thank-you' | 'movies';

interface QuickAccessProps {
  onNavigate?: (page: number) => void;
  onToolSelect?: (toolId: Tool) => void;
  user?: User | null;
}

export default function QuickAccess({ onNavigate, onToolSelect }: QuickAccessProps) {
  const handleClick = (toolOrPage: Tool | number) => {
    if (typeof toolOrPage === 'number' && onNavigate) {
      onNavigate(toolOrPage);
    } else if (typeof toolOrPage === 'string' && onToolSelect) {
      onToolSelect(toolOrPage as Tool);
    }
  };
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
      <button
        onClick={() => handleClick('home')}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="Home"
      >
        <Home className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => handleClick('ai-tools')}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="AI Tools"
      >
        <Film className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => handleClick('social')}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="Help"
      >
        <HelpCircle className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
