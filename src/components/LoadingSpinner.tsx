import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullscreen?: boolean;
}

export default function LoadingSpinner({ size = 'md', message, fullscreen = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
      {message && (
        <p className="text-white text-center font-medium animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-3 text-blue-400">
      <Loader2 className="w-5 h-5 animate-spin" />
      {message && <span className="text-sm font-medium">{message}</span>}
    </div>
  );
}

export function ProgressBar({ progress, message }: { progress: number; message?: string }) {
  return (
    <div className="w-full space-y-2">
      {message && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-white font-medium">{message}</span>
          <span className="text-blue-400 font-bold">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
