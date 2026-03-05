import { Home, Film, HelpCircle } from 'lucide-react';

interface QuickAccessProps {
  onNavigate: (page: number) => void;
}

export default function QuickAccess({ onNavigate }: QuickAccessProps) {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
      <button
        onClick={() => onNavigate(0)}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="Home"
      >
        <Home className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => onNavigate(4)}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="AI Tools"
      >
        <Film className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => onNavigate(19)}
        className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="Help"
      >
        <HelpCircle className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
