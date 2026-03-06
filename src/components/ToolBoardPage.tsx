import { useState, useRef } from 'react';
import { Upload, FileVideo, Zap, Search, ChevronLeft, ChevronRight, X, Loader, BookOpen, Mic, Camera, Film, Activity, Sparkles } from 'lucide-react';

interface ToolBoardPageProps {
  page: number;
  toolCategories: string[];
  AI_TOOLS: Record<string, string[]>;
  toolSearch: string;
  setToolSearch: (v: string) => void;
  goTo: (p: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleAIGenerate: () => void;
  handleUrlImport: () => void;
  generating: boolean;
  aiPrompt: string;
  setAiPrompt: (v: string) => void;
  importUrl: string;
  setImportUrl: (v: string) => void;
}

export default function ToolBoardPage({
  page,
  toolCategories,
  AI_TOOLS,
  toolSearch,
  setToolSearch,
  goTo,
  fileInputRef,
  handleAIGenerate,
  handleUrlImport,
  generating,
  aiPrompt,
  setAiPrompt,
  importUrl,
  setImportUrl
}: ToolBoardPageProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'upload' | 'paste' | 'ai'>('ai');
  const [currentToolPage, setCurrentToolPage] = useState(0);

  const cat = toolCategories[page - 5];
  const allTools = AI_TOOLS[cat] || [];
  const filtered = toolSearch.trim() ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
  const toolsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / toolsPerPage);
  const startIdx = currentToolPage * toolsPerPage;
  const displayedTools = filtered.slice(startIdx, startIdx + toolsPerPage);
  const catIcons: Record<string, any> = { Writing: BookOpen, Voice: Mic, Image: Camera, Video: Film, Motion: Activity, Enhancement: Sparkles };
  const CatIcon = catIcons[cat] || Zap;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '6rem' }}>
      {/* Header */}
      <div className="panel" style={{ padding: '1.5rem 2rem', borderLeft: 0, borderRight: 0, borderTop: 0, marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CatIcon size={20} style={{ color: 'var(--purple-bright)' }} />
          <div>
            <div className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>AI WORKSTATION 0{page - 3}</div>
            <div className="font-display" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{cat.toUpperCase()} TOOLS</div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', marginLeft: 'auto', flexWrap: 'wrap' }}>
          {toolCategories.map((c, i) => (
            <button key={c} onClick={() => goTo(5 + i)}
              className="font-mono"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.6rem', letterSpacing: '0.1em', background: c === cat ? 'var(--purple)' : 'var(--panel)', color: c === cat ? 'white' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}>
              {c.slice(0, 3).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={12} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input type="text" value={toolSearch} onChange={e => setToolSearch(e.target.value)}
            placeholder={`Search ${filtered.length} tools...`}
            className="font-mono"
            style={{ background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.4rem 0.5rem 0.4rem 2rem', fontSize: '0.65rem', width: '200px', outline: 'none' }} />
        </div>

        <div className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--purple-bright)' }}>{filtered.length} TOOLS · PAGE {currentToolPage + 1}/{totalPages}</div>
      </div>

      {/* Tools grid - 4 across, 10 per page */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {displayedTools.map((tool, i) => (
            <div key={startIdx + i} className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>TOOL {String(startIdx + i + 1).padStart(3, '0')}</div>
                <div className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginBottom: '1rem', minHeight: '2.5rem' }}>{tool}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setSelectedTool(tool); setSelectedCategory('upload'); }} className="btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <Upload size={12} /> Upload
                </button>
                <button onClick={() => { setSelectedTool(tool); setSelectedCategory('paste'); }} className="btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <FileVideo size={12} /> Paste
                </button>
                <button onClick={() => { setSelectedTool(tool); setSelectedCategory('ai'); }} className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <Zap size={12} /> AI
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={() => setCurrentToolPage(Math.max(0, currentToolPage - 1))} disabled={currentToolPage === 0} className="btn-secondary" style={{ padding: '0.5rem 1rem', opacity: currentToolPage === 0 ? 0.4 : 1 }}>
              <ChevronLeft size={16} />
            </button>
            <div className="font-mono" style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              PAGE {currentToolPage + 1} / {totalPages}
            </div>
            <button onClick={() => setCurrentToolPage(Math.min(totalPages - 1, currentToolPage + 1))} disabled={currentToolPage === totalPages - 1} className="btn-secondary" style={{ padding: '0.5rem 1rem', opacity: currentToolPage === totalPages - 1 ? 0.4 : 1 }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="panel" style={{ maxWidth: '600px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--purple-bright)', marginBottom: '0.25rem' }}>{cat.toUpperCase()} TOOL</div>
                <h2 className="font-display" style={{ fontSize: '2rem' }}>{selectedTool}</h2>
              </div>
              <button onClick={() => { setSelectedTool(null); setAiPrompt(''); setImportUrl(''); }} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.3rem', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {selectedCategory === 'upload' && (
              <div style={{ marginBottom: '1rem' }}>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>UPLOAD SOURCE MEDIA</div>
                <button onClick={() => fileInputRef.current?.click()}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(139,92,246,0.3)', color: 'var(--text-dim)', padding: '2rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.7rem', letterSpacing: '0.1em', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  <Upload size={24} style={{ color: 'var(--purple-bright)' }} />
                  <div>CLICK TO BROWSE FILES</div>
                </button>
                <button onClick={() => { setSelectedTool(null); fileInputRef.current?.click(); }} className="btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '1rem' }}>
                  <Upload size={14} style={{ marginRight: '0.5rem' }} />
                  UPLOAD & ADD TO LIBRARY
                </button>
              </div>
            )}

            {selectedCategory === 'paste' && (
              <div style={{ marginBottom: '1rem' }}>
                <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>PASTE URL OR PATH</div>
                <input type="text" value={importUrl} onChange={e => setImportUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4 or file path..."
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.75rem', marginBottom: '1rem', outline: 'none' }} />
                <button onClick={handleUrlImport} disabled={!importUrl.trim()} className="btn-primary" style={{ width: '100%', padding: '0.75rem', opacity: !importUrl.trim() ? 0.4 : 1 }}>
                  <FileVideo size={14} style={{ marginRight: '0.5rem' }} />
                  IMPORT TO LIBRARY
                </button>
              </div>
            )}

            {selectedCategory === 'ai' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>AI GENERATION PROMPT</div>
                  <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                    placeholder={`Describe what you want to generate with ${selectedTool}...`}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'Barlow', fontSize: '0.85rem', height: '120px', resize: 'none', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => { setSelectedTool(null); setAiPrompt(''); }} className="btn-secondary" style={{ flex: 1, padding: '0.75rem' }}>CANCEL</button>
                  <button onClick={handleAIGenerate} disabled={!aiPrompt.trim() || generating} className="btn-primary" style={{ flex: 2, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: (!aiPrompt.trim() || generating) ? 0.4 : 1 }}>
                    {generating ? <><Loader size={14} className="animate-spin" /> GENERATING...</> : <><Zap size={14} /> GENERATE & SAVE</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
