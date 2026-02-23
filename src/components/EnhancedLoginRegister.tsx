import React, { useState } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface EnhancedLoginRegisterProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onBrowseAsGuest: () => void;
}

export const EnhancedLoginRegister: React.FC<EnhancedLoginRegisterProps> = ({
  onBack,
  onLoginSuccess,
  onBrowseAsGuest
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      onLoginSuccess();
    }
  };

  const handleRegister = async () => {
    if (registerPassword.length < 8 || !/\d/.test(registerPassword)) {
      alert('Password must be at least 8 characters and contain at least 1 number');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) {
      alert(error.message);
    } else if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email: registerEmail,
        full_name: fullName
      });
      alert('Registration successful! You can now login.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950 text-white flex items-center justify-center p-8">
      <button
        onClick={onBack}
        className="fixed top-8 left-8 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-purple-900 to-purple-950 border-2 border-purple-600 rounded-2xl p-8">
            <h2 className="text-4xl font-black mb-8 text-center">Login</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-4 rounded-xl font-black text-xl transition"
              >
                Login
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-950 border-2 border-purple-600 rounded-2xl p-8">
            <h2 className="text-4xl font-black mb-8 text-center">Register</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full bg-transparent border-2 border-purple-600 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                />
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-4 rounded-xl font-black text-xl transition"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-700 flex-1 max-w-xs" />
            <span className="text-gray-400">or</span>
            <div className="h-px bg-gray-700 flex-1 max-w-xs" />
          </div>

          <button
            onClick={onBrowseAsGuest}
            className="bg-blue-600 hover:bg-blue-700 px-12 py-4 rounded-xl font-black text-xl transition inline-flex items-center gap-3"
          >
            <Eye size={24} />
            Browse as Guest (View Only)
          </button>
          <p className="text-gray-400 text-sm mt-3">Explore the platform without an account</p>
        </div>
      </div>
    </div>
  );
};
