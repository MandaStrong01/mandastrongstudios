import React, { useState } from 'react';
import { Music, Mic, Volume2, Activity } from 'lucide-react';

interface AudioMixerProps {
  onBack: () => void;
  onNext: () => void;
}

export const AudioMixer: React.FC<AudioMixerProps> = ({ onBack, onNext }) => {
  const [musicLevel, setMusicLevel] = useState(75);
  const [voiceLevel, setVoiceLevel] = useState(50);
  const [sfxLevel, setSfxLevel] = useState(65);
  const [masterLevel, setMasterLevel] = useState(80);
  const [musicMute, setMusicMute] = useState(false);
  const [voiceMute, setVoiceMute] = useState(false);
  const [sfxMute, setSfxMute] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Editor Suite</h1>
            <div className="flex gap-6 mt-2 text-sm">
              <button className="text-gray-400 hover:text-white">Editor Home</button>
              <button className="text-gray-400 hover:text-white">Media Library</button>
              <button className="text-gray-400 hover:text-white">Timeline</button>
              <button className="text-purple-400 font-bold">Audio Mixer</button>
              <button className="text-gray-400 hover:text-white">Settings</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-black">AUDIO MIXER</h2>
            <p className="text-gray-400 text-sm">Rendered Video 12/30/2025, 7:25:44 AM</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
              ← Back
            </button>
            <button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
              Next →
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h3 className="text-purple-400 font-bold">PROFESSIONAL AUDIO MIXER</h3>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
            💾 Save Settings
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <Music className="text-purple-400 mb-2" size={32} />
              <h4 className="font-bold mb-6">MUSIC</h4>
              <div className="relative w-full h-64 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg transition-all"
                  style={{ height: `${musicLevel}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={musicLevel}
                onChange={(e) => setMusicLevel(parseInt(e.target.value))}
                className="w-full accent-purple-600 mb-3"
              />
              <div className="text-2xl font-bold mb-4">{musicLevel}%</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setMusicMute(!musicMute)}
                  className={`px-4 py-2 rounded font-bold transition ${musicMute ? 'bg-red-600' : 'bg-gray-800'}`}
                >
                  MUTE
                </button>
                <button className="px-4 py-2 rounded bg-gray-800 font-bold hover:bg-gray-700 transition">
                  SOLO
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <Mic className="text-purple-400 mb-2" size={32} />
              <h4 className="font-bold mb-6">VOICE</h4>
              <div className="relative w-full h-64 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg transition-all"
                  style={{ height: `${voiceLevel}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={voiceLevel}
                onChange={(e) => setVoiceLevel(parseInt(e.target.value))}
                className="w-full accent-purple-600 mb-3"
              />
              <div className="text-2xl font-bold mb-4">{voiceLevel}%</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setVoiceMute(!voiceMute)}
                  className={`px-4 py-2 rounded font-bold transition ${voiceMute ? 'bg-red-600' : 'bg-gray-800'}`}
                >
                  MUTE
                </button>
                <button className="px-4 py-2 rounded bg-gray-800 font-bold hover:bg-gray-700 transition">
                  SOLO
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <Volume2 className="text-purple-400 mb-2" size={32} />
              <h4 className="font-bold mb-6">SFX</h4>
              <div className="relative w-full h-64 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg transition-all"
                  style={{ height: `${sfxLevel}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sfxLevel}
                onChange={(e) => setSfxLevel(parseInt(e.target.value))}
                className="w-full accent-purple-600 mb-3"
              />
              <div className="text-2xl font-bold mb-4">{sfxLevel}%</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSfxMute(!sfxMute)}
                  className={`px-4 py-2 rounded font-bold transition ${sfxMute ? 'bg-red-600' : 'bg-gray-800'}`}
                >
                  MUTE
                </button>
                <button className="px-4 py-2 rounded bg-gray-800 font-bold hover:bg-gray-700 transition">
                  SOLO
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border-2 border-purple-600 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <Activity className="text-purple-400 mb-2" size={32} />
              <h4 className="font-bold mb-6">MASTER</h4>
              <div className="relative w-full h-64 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-purple-400 rounded-lg transition-all"
                  style={{ height: `${masterLevel}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={masterLevel}
                onChange={(e) => setMasterLevel(parseInt(e.target.value))}
                className="w-full accent-purple-600 mb-3"
              />
              <div className="text-2xl font-bold mb-4">{masterLevel}%</div>
              <button className="px-8 py-2 rounded bg-purple-600 font-bold hover:bg-purple-700 transition">
                OUTPUT
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-purple-400 font-bold mb-4">AUDIO EFFECTS</h3>
          <div className="grid grid-cols-4 gap-4">
            <button className="bg-gray-900 border-2 border-gray-700 hover:border-purple-600 px-6 py-4 rounded-lg font-bold transition">
              Reverb
            </button>
            <button className="bg-gray-900 border-2 border-gray-700 hover:border-purple-600 px-6 py-4 rounded-lg font-bold transition">
              Echo
            </button>
            <button className="bg-gray-900 border-2 border-gray-700 hover:border-purple-600 px-6 py-4 rounded-lg font-bold transition">
              Compressor
            </button>
            <button className="bg-gray-900 border-2 border-gray-700 hover:border-purple-600 px-6 py-4 rounded-lg font-bold transition">
              Equalizer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
