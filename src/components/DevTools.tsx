import { useState } from 'react';
import { Shield, X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DevToolsProps {
  onClose: () => void;
  userEmail: string | undefined;
}

export function DevTools({ onClose, userEmail }: DevToolsProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpgradePlan = async () => {
    if (!userEmail) {
      setMessage({ type: 'error', text: 'No user email found' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.rpc('set_user_as_admin', {
        user_email: userEmail,
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Successfully upgraded to Admin plan! Please refresh the page.' });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Error upgrading plan:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to upgrade plan' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8">
      <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Shield size={32} className="text-[#7c3aed]"/>
            <h2 className="text-3xl font-black uppercase text-white">Developer Tools</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-500 transition">
            <X size={32}/>
          </button>
        </div>

        <div className="bg-yellow-600/20 border-2 border-yellow-600 rounded-xl p-4 mb-6">
          <p className="text-yellow-400 font-bold text-sm">
            Development Tool: This allows you to upgrade your account plan without payment. This is for testing purposes only.
          </p>
        </div>

        {message && (
          <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-600/20 border-2 border-green-600'
              : 'bg-red-600/20 border-2 border-red-600'
          }`}>
            <CheckCircle size={24} className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}/>
            <p className={`font-bold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message.text}
            </p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-zinc-400 mb-4">Current Email: <span className="text-white font-bold">{userEmail}</span></p>
          <p className="text-zinc-400 mb-6">This will upgrade your account to Admin plan with full Studio access.</p>
        </div>

        <button
          onClick={handleUpgradePlan}
          disabled={loading}
          className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"/>
              UPGRADING...
            </>
          ) : (
            <>
              <Shield size={24}/>
              UPGRADE TO ADMIN
            </>
          )}
        </button>

        <p className="text-xs text-zinc-500 text-center mt-4">
          Note: AI generation features are simulated. No actual AI processing occurs.
        </p>
      </div>
    </div>
  );
}
