
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_NOTES } from '../constants';
import { 
    Plus, 
    Trash2, 
    FileText,
    Sparkles,
    Brain,
    Send,
    Globe,
    Mic,
    MoreVertical,
    X,
    Highlighter,
    Music,
    FolderOpen,
    Play,
    Pause,
    ChevronLeft,
    Paperclip,
    Headphones,
    Save
} from 'lucide-react';
import { getWritingAssistance } from '../services/geminiService';

// Mock rhyme database helper
const MOCK_RHYMES: Record<string, string[]> = {
    'ing': ['King', 'Sing', 'Ring', 'Thing', 'Wing', 'Spring', 'Bling', 'Swing', 'Cling', 'Fling'],
    'at': ['Cat', 'Bat', 'Sat', 'Flat', 'Mat', 'Chat', 'That', 'Stat', 'Brat', 'Slat'],
    'ight': ['Night', 'Light', 'Fight', 'Sight', 'Bright', 'Height', 'Tight', 'White', 'Flight', 'Might'],
    'ove': ['Love', 'Dove', 'Above', 'Glove', 'Shove'],
    'ife': ['Life', 'Knife', 'Wife', 'Strife', 'Rife'],
    'ime': ['Time', 'Rhyme', 'Climb', 'Prime', 'Crime', 'Dime', 'Lime', 'Grime', 'Chime'],
    'ay': ['Day', 'Way', 'Say', 'Play', 'Stay', 'Gray', 'Pray', 'Away', 'Slay', 'Tray'],
    'eam': ['Dream', 'Team', 'Beam', 'Cream', 'Steam', 'Stream', 'Gleam', 'Scheme'],
    'one': ['Phone', 'Zone', 'Bone', 'Stone', 'Tone', 'Alone', 'Throne', 'Drone', 'Cone'],
    'all': ['Ball', 'Call', 'Fall', 'Tall', 'Wall', 'Small', 'Hall', 'Stall'],
    'eep': ['Deep', 'Keep', 'Sleep', 'Sweep', 'Weep', 'Creep', 'Steep', 'Sheep']
};

const MOCK_AUDIO_FILES = [
    { id: 'af1', name: 'Midnight_Idea_v1.mp3', duration: '2:14', size: '4.2 MB' },
    { id: 'af2', name: 'Trap_Beat_140bpm.wav', duration: '3:30', size: '32.5 MB' },
    { id: 'af3', name: 'Vocal_Chops_Em.wav', duration: '0:45', size: '8.1 MB' },
    { id: 'af4', name: 'Piano_Riff_Lofi.mp3', duration: '1:20', size: '2.8 MB' },
    { id: 'af5', name: 'Dark_Ambience.wav', duration: '4:10', size: '42.0 MB' },
    { id: 'af6', name: 'Drum_Loop_808.wav', duration: '0:16', size: '2.1 MB' },
];

const RHYME_COLORS = [
    'text-blue-400',
    'text-green-400', 
    'text-purple-400', 
    'text-yellow-400', 
    'text-pink-400',
    'text-orange-400',
    'text-cyan-400',
    'text-red-400'
];

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0].id);
  
  // View State
  const [viewMode, setViewMode] = useState<'editor' | 'browser'>('editor');
  
  // Feature State
  const [rhymeMode, setRhymeMode] = useState(false);
  const [accent, setAccent] = useState<'US' | 'UK'>('US');
  const [audioPlaying, setAudioPlaying] = useState(false);

  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  
  // Refs for syncing scroll
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleUpdateContent = (val: string) => {
      if (!activeNote) return;
      setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, content: val } : n));
  };

  const handleScroll = () => {
      if (textareaRef.current && backdropRef.current) {
          backdropRef.current.scrollTop = textareaRef.current.scrollTop;
      }
  };

  const handleSelectionChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      setCursorIndex(e.currentTarget.selectionStart);
  };

  const handleAiSubmit = async () => {
      if (!aiPrompt.trim() || !activeNote) return;
      setAiLoading(true);
      setAiResponse(null);
      
      const response = await getWritingAssistance(aiPrompt, activeNote.content);
      
      setAiResponse(response);
      setAiLoading(false);
      setAiPrompt('');
  };

  const insertAiResponse = () => {
      if (!aiResponse || !activeNote) return;
      const newContent = activeNote.content + "\n\n" + aiResponse;
      handleUpdateContent(newContent);
      setAiResponse(null);
  };

  const handleAttachFile = (fileName: string) => {
    if(activeNoteId) {
        setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, attachedAudio: fileName } : n));
        setViewMode('editor');
        setAudioPlaying(true); // Auto play on attach/return
    }
  };

  const handleDetachFile = () => {
      if(activeNoteId) {
          setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, attachedAudio: undefined } : n));
          setAudioPlaying(false);
      }
  };

  const handleCreateNote = () => {
      const newNote = {
          id: `n${Date.now()}`,
          title: 'New Idea',
          preview: '',
          content: '',
          tags: [],
          updated: new Date().toLocaleDateString()
      };
      setNotes([newNote, ...notes]);
      setActiveNoteId(newNote.id);
      setViewMode('editor');
  };

  // --- Rhyme Logic ---
  const getLastWord = (text: string, index: number) => {
      if (!text) return '';
      const textBefore = text.slice(0, index);
      // Match word characters before cursor
      const match = textBefore.match(/([a-zA-Z']+)$/);
      return match ? match[1] : '';
  };

  const currentWord = activeNote ? getLastWord(activeNote.content, cursorIndex) : '';

  const getRhymeSuggestions = (word: string) => {
      if (!word || word.length < 2) return [];
      const lowerWord = word.toLowerCase();
      
      // Simple heuristic suffix matching for demo
      for (const suffix in MOCK_RHYMES) {
          if (lowerWord.endsWith(suffix)) {
              return MOCK_RHYMES[suffix];
          }
      }
      return [];
  };

  const suggestions = getRhymeSuggestions(currentWord);

  // Highlighting Logic
  const renderHighlightedText = (text: string) => {
      if (!text) return null;
      
      // Split by spaces and newlines but keep delimiters to preserve formatting
      const tokens = text.split(/(\s+)/);
      
      return tokens.map((token, i) => {
          if (token.trim() === '') return token; // Return whitespace as is
          
          const lower = token.toLowerCase().replace(/[^a-z]/g, '');
          let colorClass = 'text-neutral-300'; // Default color matching textarea
          
          if (rhymeMode) {
              // Very basic heuristic for visual demo of rhyme groups
              for (let j = 0; j < Object.keys(MOCK_RHYMES).length; j++) {
                  const suffix = Object.keys(MOCK_RHYMES)[j];
                  if (lower.endsWith(suffix)) {
                      colorClass = RHYME_COLORS[j % RHYME_COLORS.length];
                      break;
                  }
              }
          }
          
          return <span key={i} className={`${colorClass} transition-colors duration-300`}>{token}</span>;
      });
  };

  return (
    <div className="w-full h-[calc(100vh-6rem)] max-w-[1600px] mx-auto pb-20 pt-6 px-6 lg:px-8 animate-in fade-in duration-500 flex flex-col">
        
        <div className="flex items-end justify-between mb-6">
             <div>
                <h1 className="text-3xl font-black text-white mb-1">Notes & Lyrics</h1>
                <p className="text-neutral-500 text-sm">Write lyrics, capture ideas, and organize your musical thoughts.</p>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={handleCreateNote}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors flex items-center gap-2"
                >
                    <Plus size={14} /> Write Note
                </button>
            </div>
        </div>

        <div className="flex-1 flex bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            
            {/* Sidebar List - The "Blue" List */}
            <div className="w-64 border-r border-neutral-800 flex flex-col bg-[#080808]">
                <div className="p-4 border-b border-neutral-800">
                     <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-blue-400" />
                        My Notebook
                     </h3>
                     <div className="relative mb-4">
                         <input className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50 pl-8" placeholder="Search notes..." />
                         <FileText size={12} className="absolute left-2.5 top-2.5 text-neutral-500" />
                     </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {notes.map(note => (
                        <div 
                            key={note.id}
                            onClick={() => setActiveNoteId(note.id)}
                            className={`
                                p-3 rounded-lg border cursor-pointer transition-all group relative
                                ${activeNoteId === note.id 
                                    ? 'bg-blue-500/10 border-blue-500/20' 
                                    : 'border-transparent hover:bg-white/5'
                                }
                            `}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm font-bold truncate pr-4 ${activeNoteId === note.id ? 'text-blue-400' : 'text-neutral-300'}`}>{note.title}</h4>
                                {note.attachedAudio && (
                                    <Headphones size={12} className={activeNoteId === note.id ? 'text-blue-400' : 'text-neutral-600'} />
                                )}
                            </div>
                            <p className="text-xs text-neutral-500 line-clamp-1 mb-2">{note.preview || 'No content'}</p>
                            <span className="text-[9px] text-neutral-600 font-mono">{note.updated}</span>
                             
                            <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-red-500"><Trash2 size={12}/></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Area - Switches between Editor and File Browser */}
            <div className="flex-1 flex flex-col bg-[#050505] relative">
                {activeNote ? (
                    <>
                        {/* Editor Toolbar */}
                        <div className="h-14 border-b border-neutral-800 flex items-center justify-between px-6 bg-neutral-900/30 z-20 shrink-0">
                            <div className="flex items-center gap-4">
                                {viewMode === 'browser' && (
                                    <button 
                                        onClick={() => setViewMode('editor')}
                                        className="p-1.5 hover:bg-white/5 rounded text-neutral-400 hover:text-white mr-2"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                )}
                                <div className="flex flex-col justify-center">
                                    <input 
                                        value={activeNote.title} 
                                        onChange={(e) => {
                                            const newTitle = e.target.value;
                                            setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, title: newTitle } : n));
                                        }}
                                        className="bg-transparent border-none text-sm font-bold text-white focus:outline-none p-0 placeholder-neutral-600"
                                        placeholder="Untitled Note"
                                    />
                                    <span className="text-[10px] text-neutral-500 font-mono">
                                        {viewMode === 'editor' ? 'Editing Mode' : 'Select Audio Attachment'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {viewMode === 'editor' && (
                                    <>
                                        {/* Rhyme Highlighting Toggle */}
                                        <button 
                                            onClick={() => setRhymeMode(!rhymeMode)}
                                            className={`
                                                flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wide transition-all
                                                ${rhymeMode 
                                                    ? 'bg-primary text-black shadow-[0_0_15px_rgba(var(--primary),0.3)]' 
                                                    : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-white/5'
                                                }
                                            `}
                                        >
                                            <Highlighter size={12} />
                                            Rhyme highlighting and analysis
                                        </button>
                                        
                                        <div className="w-px h-4 bg-neutral-800"></div>
                                    </>
                                )}

                                <button 
                                    onClick={() => setViewMode(viewMode === 'editor' ? 'browser' : 'editor')}
                                    className={`
                                        flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wide transition-all border
                                        ${viewMode === 'browser' 
                                            ? 'bg-white text-black border-white' 
                                            : 'bg-transparent border-neutral-700 text-neutral-400 hover:text-white hover:border-white'
                                        }
                                    `}
                                >
                                    {viewMode === 'editor' ? (
                                        <>
                                            <FolderOpen size={12} /> Attach Audio
                                        </>
                                    ) : (
                                        <>
                                            <FileText size={12} /> Back to Note
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Content Switcher */}
                        {viewMode === 'editor' ? (
                            <div className="flex-1 flex overflow-hidden relative">
                                <div className="flex-1 flex flex-col relative">
                                    {/* Embedded Audio Player */}
                                    {activeNote.attachedAudio && (
                                        <div className="h-12 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 shrink-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-primary">
                                                    <Music size={14} />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-white">{activeNote.attachedAudio}</div>
                                                    <div className="text-[9px] text-primary font-mono uppercase">Attached Track</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button 
                                                    onClick={() => setAudioPlaying(!audioPlaying)}
                                                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                                                >
                                                    {audioPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" className="ml-0.5" />}
                                                </button>
                                                <div className="w-px h-4 bg-neutral-800"></div>
                                                <button onClick={handleDetachFile} className="text-neutral-500 hover:text-red-500">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Text Editor Area */}
                                    <div className="flex-1 relative font-mono text-sm leading-relaxed">
                                        {/* Highlighting Backdrop */}
                                        <div 
                                            ref={backdropRef}
                                            className="absolute inset-0 p-8 whitespace-pre-wrap overflow-hidden pointer-events-none z-0"
                                            style={{ color: 'transparent' }} // Hide raw text, let spans show
                                        >
                                            {renderHighlightedText(activeNote.content + ' ')} 
                                        </div>

                                        {/* Input Textarea */}
                                        <textarea 
                                            ref={textareaRef}
                                            className={`
                                                absolute inset-0 w-full h-full bg-transparent p-8 resize-none focus:outline-none z-10
                                                ${rhymeMode ? 'text-transparent caret-white' : 'text-neutral-300'}
                                            `}
                                            value={activeNote.content}
                                            onChange={(e) => {
                                                handleUpdateContent(e.target.value);
                                                handleSelectionChange(e);
                                            }}
                                            onScroll={handleScroll}
                                            onSelect={handleSelectionChange}
                                            placeholder="Start writing your lyrics or production notes here..."
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>

                                {/* Rhyme Suggestions Sidebar */}
                                <div className="w-60 bg-[#080808] border-l border-neutral-800 flex flex-col z-20">
                                    <div className="p-4 border-b border-neutral-800 bg-neutral-900/20">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                                <Brain size={12} className="text-primary" /> Rhyme Assist
                                            </h3>
                                            <button 
                                                onClick={() => setAccent(accent === 'US' ? 'UK' : 'US')}
                                                className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-neutral-800 bg-neutral-900 text-[9px] font-bold text-neutral-400 hover:text-white"
                                                title="Toggle Accent"
                                            >
                                                <Globe size={10} /> {accent}
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-neutral-500">
                                            Context: <span className="text-primary font-mono">"{currentWord}"</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-2">
                                        {currentWord && suggestions.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {suggestions.map((word, i) => (
                                                    <span 
                                                        key={i} 
                                                        className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300 hover:text-white hover:border-primary/30 hover:bg-white/5 cursor-pointer transition-colors"
                                                        onClick={() => {
                                                            const newContent = activeNote.content + " " + word;
                                                            handleUpdateContent(newContent);
                                                        }}
                                                    >
                                                        {word}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-neutral-600 space-y-2">
                                                <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                                                    <Mic size={16} className="opacity-50" />
                                                </div>
                                                <p className="text-[10px] text-center px-4">Type a word to see rhyme suggestions based on {accent} accent.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // File Browser View
                            <div className="flex-1 p-8 overflow-y-auto">
                                <div className="max-w-4xl mx-auto">
                                    <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                        <FolderOpen size={24} className="text-primary" />
                                        Select Audio to Attach
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {MOCK_AUDIO_FILES.map(file => (
                                            <div 
                                                key={file.id}
                                                onClick={() => handleAttachFile(file.name)}
                                                className={`
                                                    p-4 rounded-xl border bg-neutral-900/50 cursor-pointer transition-all group
                                                    ${activeNote.attachedAudio === file.name 
                                                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.15)]' 
                                                        : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="p-3 bg-black/50 rounded-lg text-neutral-400 group-hover:text-white">
                                                        <Music size={20} />
                                                    </div>
                                                    {activeNote.attachedAudio === file.name && (
                                                        <span className="px-2 py-1 bg-primary text-black text-[9px] font-bold rounded uppercase">Attached</span>
                                                    )}
                                                </div>
                                                <h3 className="text-sm font-bold text-white mb-1 truncate">{file.name}</h3>
                                                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                                                    <span>{file.duration}</span>
                                                    <span>{file.size}</span>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className="border-2 border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center p-4 text-neutral-500 hover:text-white hover:border-neutral-600 hover:bg-white/5 transition-colors cursor-pointer min-h-[140px]">
                                            <Paperclip size={24} className="mb-2" />
                                            <span className="text-xs font-bold">Upload New File</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bottom AI Assistant Panel */}
                        <div className="p-4 bg-[#080808] border-t border-neutral-800 z-20">
                            {aiResponse && (
                                <div className="mb-4 p-4 bg-neutral-900/80 border border-primary/20 rounded-lg relative animate-in slide-in-from-bottom-2">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-primary/10 rounded text-primary mt-1">
                                            <Sparkles size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-white mb-1">AI Suggestion</h4>
                                            <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                                        </div>
                                        <button onClick={() => setAiResponse(null)} className="text-neutral-500 hover:text-white"><X size={14} /></button>
                                    </div>
                                    <div className="flex justify-end mt-3 gap-2">
                                        <button onClick={() => setAiResponse(null)} className="text-[10px] font-bold text-neutral-500 hover:text-white px-3 py-1.5">Discard</button>
                                        <button onClick={insertAiResponse} className="text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded border border-white/5">Insert to Note</button>
                                    </div>
                                </div>
                            )}

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Sparkles size={14} className={`text-primary ${aiLoading ? 'animate-pulse' : ''}`} />
                                </div>
                                <input 
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-12 py-3 text-xs text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 placeholder-neutral-500 transition-all font-mono"
                                    placeholder="Ask AI for advice, ideas, structure..."
                                    disabled={aiLoading}
                                />
                                <button 
                                    onClick={handleAiSubmit}
                                    disabled={aiLoading || !aiPrompt.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={12} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 bg-dot-grid">
                        <div className="w-16 h-16 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-center mb-4 shadow-xl rotate-3">
                            <FileText size={32} className="opacity-50" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Select a Note</h3>
                        <p className="text-xs">Choose a note from the sidebar or create a new one.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default NotesPage;
