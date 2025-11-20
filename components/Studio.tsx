
import React, { useState } from 'react';
import { Project } from '../types';
import { 
    Plus, 
    Search, 
    Music, 
    HardDrive, 
    Box, 
    LayoutGrid, 
    MoreVertical,
    Edit,
    FileAudio,
    Download,
    Trash2,
    Save,
    ArrowLeft,
    Play,
    Pause,
    Folder,
    Settings
} from 'lucide-react';

interface StudioProps {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const Studio: React.FC<StudioProps> = ({ projects, setProjects }) => {
    const [activeTab, setActiveTab] = useState<'projects' | 'soundpacks' | 'files' | 'services'>('projects');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Project Editor State
    const [editingNotes, setEditingNotes] = useState('');
    const [activeLibraryTab, setActiveLibraryTab] = useState<'uploads' | 'purchased'>('uploads');

    // Mock Purchased Files
    const PURCHASED_FILES = [
        { id: 'pf1', name: 'Spinz_808.wav', size: '2.4 MB', type: 'WAV' },
        { id: 'pf2', name: 'Snare_Chop.wav', size: '1.1 MB', type: 'WAV' },
        { id: 'pf3', name: 'Vox_Chant.wav', size: '4.5 MB', type: 'WAV' },
        { id: 'pf4', name: 'Kick_Hard.wav', size: '0.8 MB', type: 'WAV' },
    ];

    const MY_FILES = [
        { id: 'mf1', name: 'My_Melody_Loop.wav', size: '12.4 MB', type: 'WAV' },
        { id: 'mf2', name: 'Rough_Idea_1.mp3', size: '3.1 MB', type: 'MP3' },
    ];

    const handleOpenProject = (project: Project) => {
        setSelectedProject(project);
        setEditingNotes(project.notes || '');
    };

    const handleSaveNotes = () => {
        if (selectedProject) {
            const updatedProjects = projects.map(p => 
                p.id === selectedProject.id ? { ...p, notes: editingNotes } : p
            );
            setProjects(updatedProjects);
            // Update locally for immediate feedback if needed, though setProjects triggers re-render
        }
    };

    const handleAddFileToProject = (file: any) => {
        // In a real app, this would add a file reference to the project
        alert(`Added ${file.name} to project ${selectedProject?.title}`);
    };

    if (selectedProject) {
        return (
            <div className="h-full flex flex-col bg-[#0a0a0a]">
                {/* Workbench Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050505]">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSelectedProject(null)}
                            className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                {selectedProject.title}
                                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">EDITING</span>
                            </h2>
                            <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono">
                                <span>{selectedProject.bpm} BPM</span>
                                <span>{selectedProject.key}</span>
                                <span>{selectedProject.genre}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleSaveNotes}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary hover:text-black border border-white/10 rounded-lg text-xs font-bold text-white transition-all"
                        >
                            <Save size={14} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </div>

                {/* Workbench Layout */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Tracks */}
                    <div className="flex-1 border-r border-white/5 flex flex-col">
                         <div className="p-4 border-b border-white/5 flex justify-between items-center bg-neutral-900/30">
                             <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tracks & Stems</h3>
                             <button className="p-1.5 hover:bg-white/5 rounded text-neutral-400 hover:text-white">
                                 <Plus size={14} />
                             </button>
                         </div>
                         <div className="flex-1 overflow-y-auto p-4 space-y-2">
                             {selectedProject.tracks.map((track, i) => (
                                 <div key={track.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 group">
                                     <div className="w-6 h-6 flex items-center justify-center rounded bg-black/50 text-neutral-500 text-xs font-mono">
                                         {i + 1}
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <div className="text-xs font-bold text-white truncate">{track.title}</div>
                                         <div className="text-[10px] text-neutral-500 font-mono">WAV • 24bit • 44.1kHz</div>
                                     </div>
                                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <button className="p-1.5 hover:bg-white/10 rounded text-neutral-400 hover:text-white"><Play size={12} /></button>
                                         <button className="p-1.5 hover:bg-white/10 rounded text-neutral-400 hover:text-white"><Settings size={12} /></button>
                                         <button className="p-1.5 hover:bg-red-500/20 rounded text-neutral-400 hover:text-red-500"><Trash2 size={12} /></button>
                                     </div>
                                 </div>
                             ))}
                             
                             <div className="border-2 border-dashed border-white/5 rounded-lg p-8 flex flex-col items-center justify-center text-neutral-500 gap-2 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                                 <FileAudio size={24} />
                                 <span className="text-xs font-mono">Drop stems here</span>
                             </div>
                         </div>
                    </div>

                    {/* Right Panel - Notes & Assets */}
                    <div className="w-96 flex flex-col bg-[#080808]">
                        {/* Notes Section */}
                        <div className="h-1/2 flex flex-col border-b border-white/5">
                             <div className="p-4 border-b border-white/5 bg-neutral-900/30">
                                 <h3 className="text-xs font-bold text-white uppercase tracking-wider">Project Notes</h3>
                             </div>
                             <textarea 
                                className="flex-1 bg-transparent p-4 text-sm text-neutral-300 focus:outline-none font-mono resize-none placeholder-neutral-700"
                                placeholder="// Add session notes, lyrics, or ideas here..."
                                value={editingNotes}
                                onChange={(e) => setEditingNotes(e.target.value)}
                             />
                        </div>

                        {/* Asset Browser */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center border-b border-white/5 bg-neutral-900/30">
                                <button 
                                    onClick={() => setActiveLibraryTab('uploads')}
                                    className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider border-b-2 ${activeLibraryTab === 'uploads' ? 'border-primary text-white' : 'border-transparent text-neutral-500'}`}
                                >
                                    My Uploads
                                </button>
                                <button 
                                    onClick={() => setActiveLibraryTab('purchased')}
                                    className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider border-b-2 ${activeLibraryTab === 'purchased' ? 'border-primary text-white' : 'border-transparent text-neutral-500'}`}
                                >
                                    Purchased
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-2">
                                {(activeLibraryTab === 'uploads' ? MY_FILES : PURCHASED_FILES).map(file => (
                                    <div key={file.id} className="group flex items-center justify-between p-2 hover:bg-white/5 rounded mb-1 cursor-grab active:cursor-grabbing">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <Music size={14} className="text-neutral-500 shrink-0" />
                                            <div className="truncate">
                                                <div className="text-xs text-neutral-300 truncate">{file.name}</div>
                                                <div className="text-[9px] text-neutral-600 font-mono">{file.size} • {file.type}</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleAddFileToProject(file)}
                                            className="p-1.5 bg-white/10 hover:bg-primary hover:text-black rounded text-white opacity-0 group-hover:opacity-100 transition-all"
                                            title="Add to Project"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col animate-in fade-in duration-500">
            {/* Main Studio Header */}
            <div className="px-6 lg:px-8 py-6 flex items-end justify-between border-b border-white/5">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-1">My Studio</h1>
                    <p className="text-neutral-500 text-sm">Manage your creative workspace.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input 
                            type="text" 
                            placeholder="Search studio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-neutral-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-neutral-700 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgb(var(--primary)/0.3)]">
                        <Plus size={14} />
                        <span>CREATE NEW</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 lg:px-8 border-b border-white/5 flex items-center gap-8">
                <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<LayoutGrid size={16} />} label="Projects" count={projects.length} />
                <TabButton active={activeTab === 'soundpacks'} onClick={() => setActiveTab('soundpacks')} icon={<Box size={16} />} label="Soundpacks" count={12} />
                <TabButton active={activeTab === 'files'} onClick={() => setActiveTab('files')} icon={<HardDrive size={16} />} label="Files" />
                <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<Settings size={16} />} label="Services" />
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
                {activeTab === 'projects' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Create New Card */}
                        <button className="h-[280px] border border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center text-neutral-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all group bg-white/[0.01]">
                            <div className="h-16 w-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <Plus size={24} />
                            </div>
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">New Project</span>
                        </button>

                        {/* Project Cards */}
                        {projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(project => (
                            <div key={project.id} className="h-[280px] group bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 hover:shadow-xl transition-all flex flex-col relative">
                                {/* Status Stripe */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-50"></div>
                                
                                <div className="p-5 flex-1 relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="px-2 py-1 bg-black/50 rounded text-[10px] font-mono text-neutral-400 border border-white/5">
                                            {project.genre}
                                        </div>
                                        <button className="text-neutral-500 hover:text-white">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                                            <span>BPM / Key</span>
                                            <span className="text-neutral-300">{project.bpm} / {project.key}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                                            <span>Tracks</span>
                                            <span className="text-neutral-300">{project.tracks.length}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                                            <span>Updated</span>
                                            <span className="text-neutral-300">2h ago</span>
                                        </div>
                                    </div>

                                    {project.notes && (
                                        <div className="mt-2 p-2 bg-yellow-500/5 border border-yellow-500/10 rounded">
                                            <p className="text-[9px] text-yellow-500/80 line-clamp-2 font-mono">
                                                // {project.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 border-t border-white/5 bg-black/20 flex gap-2">
                                    <button 
                                        onClick={() => handleOpenProject(project)}
                                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded text-xs font-bold text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit size={12} /> Edit
                                    </button>
                                    <button className="p-2 hover:bg-white/5 rounded text-neutral-400 hover:text-white">
                                        <Download size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'files' && (
                    <div className="border border-dashed border-neutral-800 rounded-xl p-12 text-center">
                        <HardDrive size={48} className="mx-auto text-neutral-700 mb-4" />
                        <h3 className="text-neutral-400 font-bold mb-2">File Management</h3>
                        <p className="text-neutral-600 text-sm mb-6">Drag and drop files here to upload to your cloud storage.</p>
                        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white">
                            Browse Files
                        </button>
                    </div>
                )}

                {/* Placeholders for other tabs to demonstrate structure */}
                {activeTab === 'soundpacks' && (
                     <div className="text-center py-20">
                        <Box size={48} className="mx-auto text-neutral-800 mb-4" />
                        <p className="text-neutral-500 font-mono text-sm">No Soundpacks created yet.</p>
                     </div>
                )}
                {activeTab === 'services' && (
                     <div className="text-center py-20">
                        <Settings size={48} className="mx-auto text-neutral-800 mb-4" />
                        <p className="text-neutral-500 font-mono text-sm">Manage your services and pricing here.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label, count }: any) => (
    <button 
        onClick={onClick}
        className={`
            py-4 flex items-center gap-2 text-sm font-medium border-b-2 transition-all relative
            ${active 
                ? 'border-primary text-white' 
                : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:border-neutral-800'
            }
        `}
    >
        <span className={active ? 'text-primary' : ''}>{icon}</span>
        <span className="tracking-wide">{label}</span>
        {count !== undefined && (
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ml-1 ${active ? 'bg-primary/20 text-primary' : 'bg-neutral-800 text-neutral-500'}`}>
                {count}
            </span>
        )}
    </button>
);

export default Studio;
