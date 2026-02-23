import { useState } from 'react';
import { Clipboard, Link, FileText, Download, Sparkles } from 'lucide-react';

interface PasteImporterProps {
  onImport: (content: { type: 'url' | 'script' | 'text', data: string, name: string }) => void;
  onClose: () => void;
}

export default function PasteImporter({ onImport, onClose }: PasteImporterProps) {
  const [pastedContent, setPastedContent] = useState('');
  const [contentType, setContentType] = useState<'url' | 'script' | 'text'>('url');
  const [processing, setProcessing] = useState(false);
  const [projectName, setProjectName] = useState('');

  const detectContentType = (content: string): 'url' | 'script' | 'text' => {
    const urlRegex = /^(https?:\/\/|www\.)/i;
    const videoUrlRegex = /(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|twitch\.tv)/i;

    if (urlRegex.test(content.trim()) || videoUrlRegex.test(content)) {
      return 'url';
    }

    const scriptKeywords = ['scene', 'int.', 'ext.', 'fade in', 'fade out', 'cut to', 'dialog', 'action'];
    const hasScriptKeywords = scriptKeywords.some(keyword =>
      content.toLowerCase().includes(keyword)
    );

    if (hasScriptKeywords || content.split('\n').length > 10) {
      return 'script';
    }

    return 'text';
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPastedContent(text);
      setContentType(detectContentType(text));
    } catch (err) {
      console.error('Clipboard access denied:', err);
      alert('Please paste your content manually in the text area below');
    }
  };

  const handleContentChange = (value: string) => {
    setPastedContent(value);
    if (value.trim()) {
      setContentType(detectContentType(value));
    }
  };

  const extractVideoUrls = (content: string): string[] => {
    const urls: string[] = [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = content.match(urlRegex);

    if (matches) {
      matches.forEach(url => {
        if (url.match(/\.(mp4|webm|ogg|mov|avi)$/i) ||
            url.match(/(youtube\.com|youtu\.be|vimeo\.com)/i)) {
          urls.push(url);
        }
      });
    }

    return urls;
  };

  const parseScript = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const scenes: { type: string, content: string }[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.match(/^(INT\.|EXT\.)/i)) {
        scenes.push({ type: 'scene', content: trimmed });
      } else if (trimmed.match(/^[A-Z\s]+$/)) {
        scenes.push({ type: 'character', content: trimmed });
      } else if (trimmed.length > 0) {
        scenes.push({ type: 'dialog', content: trimmed });
      }
    });

    return scenes;
  };

  const handleImport = () => {
    if (!pastedContent.trim()) {
      alert('Please paste or enter content first');
      return;
    }

    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      onImport({
        type: contentType,
        data: pastedContent,
        name: projectName || 'Imported Project'
      });
      setProcessing(false);
    }, 500);
  };

  const getPlaceholder = () => {
    switch (contentType) {
      case 'url':
        return 'Paste video URLs here...\n\nSupported:\n- Direct video links (.mp4, .webm, .mov)\n- YouTube links\n- Vimeo links\n- Any video hosting URL\n\nExample:\nhttps://example.com/video.mp4\nhttps://youtube.com/watch?v=...';
      case 'script':
        return 'Paste your video script here...\n\nExample:\n\nINT. STUDIO - DAY\n\nMANDA\nWelcome to MandaStrong Studio!\n\nShe gestures to the editing suite.\n\nMANDA\nLet\'s create something amazing.';
      case 'text':
        return 'Paste any text content here...\n\nIdeas, notes, descriptions, or anything you want to turn into a video project.';
    }
  };

  const videoUrls = contentType === 'url' ? extractVideoUrls(pastedContent) : [];
  const scriptScenes = contentType === 'script' ? parseScript(pastedContent) : [];

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black uppercase text-white flex items-center gap-3">
            <Clipboard className="text-[#7c3aed]"/>
            PASTE TO CREATE
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 text-2xl font-bold">×</button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-bold mb-2 block">PROJECT NAME</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Video Project"
              className="w-full bg-zinc-900 border-2 border-[#7c3aed] rounded-xl px-4 py-3 text-white placeholder-zinc-500"
            />
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={handlePaste}
              className="flex-1 bg-[#7c3aed] px-6 py-3 rounded-xl font-bold uppercase flex items-center justify-center gap-2 hover:bg-[#6d28d9] transition"
            >
              <Clipboard size={20}/>
              PASTE FROM CLIPBOARD
            </button>
          </div>

          <div className="bg-zinc-900 border-2 border-[#7c3aed] rounded-xl p-4">
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setContentType('url')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold uppercase text-sm flex items-center justify-center gap-2 transition ${
                  contentType === 'url' ? 'bg-[#7c3aed] text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                <Link size={16}/>
                URL
              </button>
              <button
                onClick={() => setContentType('script')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold uppercase text-sm flex items-center justify-center gap-2 transition ${
                  contentType === 'script' ? 'bg-[#7c3aed] text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                <FileText size={16}/>
                SCRIPT
              </button>
              <button
                onClick={() => setContentType('text')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold uppercase text-sm flex items-center justify-center gap-2 transition ${
                  contentType === 'text' ? 'bg-[#7c3aed] text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                <Sparkles size={16}/>
                TEXT
              </button>
            </div>

            <textarea
              value={pastedContent}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full h-64 bg-zinc-800 border-2 border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-600 resize-none focus:border-[#7c3aed] outline-none"
            />
          </div>

          {videoUrls.length > 0 && (
            <div className="bg-zinc-900 border-2 border-green-500 rounded-xl p-4">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <Download size={16} className="text-green-500"/>
                DETECTED VIDEO URLS ({videoUrls.length})
              </h3>
              <div className="space-y-2">
                {videoUrls.map((url, idx) => (
                  <div key={idx} className="bg-zinc-800 px-3 py-2 rounded text-sm text-green-400 truncate">
                    {url}
                  </div>
                ))}
              </div>
            </div>
          )}

          {scriptScenes.length > 0 && (
            <div className="bg-zinc-900 border-2 border-blue-500 rounded-xl p-4">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <FileText size={16} className="text-blue-500"/>
                DETECTED SCRIPT ELEMENTS ({scriptScenes.length})
              </h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {scriptScenes.slice(0, 10).map((scene, idx) => (
                  <div key={idx} className="text-sm">
                    <span className={`font-bold ${
                      scene.type === 'scene' ? 'text-yellow-400' :
                      scene.type === 'character' ? 'text-blue-400' :
                      'text-zinc-400'
                    }`}>
                      {scene.type.toUpperCase()}:
                    </span>
                    <span className="text-zinc-300 ml-2">{scene.content.substring(0, 60)}...</span>
                  </div>
                ))}
                {scriptScenes.length > 10 && (
                  <p className="text-xs text-zinc-500 italic">...and {scriptScenes.length - 10} more</p>
                )}
              </div>
            </div>
          )}

          {contentType === 'text' && pastedContent.trim() && (
            <div className="bg-zinc-900 border-2 border-[#7c3aed] rounded-xl p-4">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-[#7c3aed]"/>
                CONTENT READY
              </h3>
              <p className="text-zinc-400 text-sm">
                {pastedContent.split(' ').length} words • {pastedContent.split('\n').length} lines
              </p>
              <p className="text-zinc-500 text-xs mt-2">
                This content will be available in your project workspace
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-800 px-6 py-4 rounded-xl font-black uppercase hover:bg-zinc-700 transition"
            >
              CANCEL
            </button>
            <button
              onClick={handleImport}
              disabled={processing || !pastedContent.trim() || !projectName.trim()}
              className="flex-1 bg-[#7c3aed] px-6 py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download size={20}/>
              {processing ? 'IMPORTING...' : 'IMPORT & CREATE'}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-zinc-900 border-l-4 border-[#7c3aed] p-4 rounded">
          <h4 className="text-white font-bold text-sm mb-2">TIPS:</h4>
          <ul className="text-zinc-400 text-xs space-y-1">
            <li>• Paste video URLs to automatically add them to your media library</li>
            <li>• Paste scripts to organize your video structure</li>
            <li>• Paste any text to use as reference for your project</li>
            <li>• You can edit and refine everything after importing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
