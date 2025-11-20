
import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, 
    Folder, 
    MoreVertical, 
    Upload, 
    Plus, 
    ChevronRight, 
    ArrowUpDown, 
    Filter,
    Music,
    Trash2,
    Edit,
    Download,
    Share,
    Info,
    FolderInput,
    Eye,
    Copy,
    File
} from 'lucide-react';

const INITIAL_FOLDERS = [
    { id: 'f1', name: 'Project 1', created: '17/09/2025' }
];

const INITIAL_FILES = [
    { id: '1', title: 'Beat 2', format: 'MP3', size: '1.31 MB', uploaded: '17/09/2025' },
    { id: '2', title: 'Beat 4', format: 'MP3', size: '2.23 MB', uploaded: '17/09/2025' },
    { id: '3', title: 'Beat 5', format: 'MP3', size: '1.75 MB', uploaded: '17/09/2025' },
    { id: '4', title: '(FREE) PARTYNEXTDOOR TYPE BEAT', format: 'MP3', size: '1.61 MB', uploaded: '07/10/2025' },
    { id: '5', title: '(FREE) PARTYNEXTDOOR TYPE BEAT', format: 'MP3', size: '2.23 MB', uploaded: '07/10/2025' },
    { id: '6', title: '(FREE) PARTYNEXTDOOR TYPE BEAT', format: 'MP3', size: '1.75 MB', uploaded: '07/10/2025' },
];

interface ContextMenuState {
    x: number;
    y: number;
    type: 'file' | 'folder' | 'background';
    targetId?: string;
}

const UploadPage: React.FC = () => {
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [files, setFiles] = useState(INITIAL_FILES);
  
  // Drag and Drop State
  const [draggedFileId, setDraggedFileId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
      const handleClick = () => setContextMenu(null);
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
  }, []);

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e: React.DragEvent, fileId: string) => {
      setDraggedFileId(fileId);
      e.dataTransfer.effectAllowed = "move";
      // Create a cleaner drag image if desired, strictly mostly handled by browser
  };

  const handleDragOver = (e: React.DragEvent, folderId: string) => {
      e.preventDefault(); // Necessary to allow dropping
      if (dragOverFolderId !== folderId) {
          setDragOverFolderId(folderId);
      }
  };

  const handleDragLeave = (e: React.DragEvent) => {
      // Only clear if we are leaving the element (simple check)
      // setDragOverFolderId(null); // Can be glitchy with children, skipping for smoother UX
  };

  const handleDrop = (e: React.DragEvent, folderId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOverFolderId(null);

      if (draggedFileId) {
          const fileMoved = files.find(f => f.id === draggedFileId);
          if (fileMoved) {
              // Remove file from current list (Simulating move)
              setFiles(prev => prev.filter(f => f.id !== draggedFileId));
              
              // In a real app, we'd API call here. For now, console log.
              console.log(`Moved "${fileMoved.title}" to folder ID: ${folderId}`);
          }
          setDraggedFileId(null);
      }
  };

  // --- Context Menu Handlers ---

  const handleContextMenu = (e: React.MouseEvent, type: 'file' | 'folder' | 'background', targetId?: string) => {
      e.preventDefault(); // Prevent browser menu
      e.stopPropagation(); // Prevent bubbling (e.g. clicking file shouldn't trigger background menu)
      
      // Adjust position if close to edge (basic implementation)
      const x = e.clientX;
      const y = e.clientY;

      setContextMenu({ x, y, type, targetId });
  };

  return (
    <div 
        className="w-full max-w-[1600px] mx-auto pb-32 pt-6 px-6 lg:px-8 animate-in fade-in duration-500 min-h-[80vh]"
        onContextMenu={(e) => handleContextMenu(e, 'background')}
    >
        
        {/* Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-2 text-sm font-medium text-neutral-400">
                <span className="hover:text-white cursor-pointer transition-colors">All Files</span>
                <ChevronRight size={14} />
                <span className="text-white font-bold">Beats</span>
            </div>
            
            <div className="flex items-center space-x-3">
                 <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/10 text-neutral-300 hover:bg-white/5 hover:text-white transition-colors text-xs font-bold">
                    <Plus size={14} />
                    <span>New Folder</span>
                 </button>
                 <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    <Upload size={14} />
                    <span>Upload Files</span>
                 </button>
            </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 bg-neutral-900/30 border border-white/5 p-1.5 rounded-xl backdrop-blur-sm">
             <div className="relative flex-1 max-w-md">
                 <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                 <input 
                    type="text" 
                    placeholder="Search files and folders..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-white pl-9 pr-4 py-2 placeholder-neutral-600"
                 />
             </div>
             
             <div className="flex items-center space-x-2 px-2">
                 <button className="flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors text-xs font-mono border border-transparent hover:border-white/5">
                    <ArrowUpDown size={12} />
                    <span>Sort: Date</span>
                 </button>
                 <button className="p-2 rounded hover:bg-white/5 text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-white/5">
                    <Filter size={14} />
                 </button>
             </div>
        </div>

        {/* Folders Section */}
        <div className="mb-8">
            <h3 className="text-sm font-bold text-white mb-4">Folders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {folders.map(folder => (
                    <div 
                        key={folder.id} 
                        className={`
                            group p-4 bg-[#0a0a0a] border rounded-xl transition-all cursor-pointer flex items-center justify-between
                            ${dragOverFolderId === folder.id 
                                ? 'border-primary bg-primary/10 scale-105 shadow-[0_0_20px_rgba(var(--primary),0.2)]' 
                                : 'border-white/5 hover:border-white/20'
                            }
                        `}
                        onDragOver={(e) => handleDragOver(e, folder.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, folder.id)}
                        onContextMenu={(e) => handleContextMenu(e, 'folder', folder.id)}
                    >
                        <div className="flex items-center space-x-3 pointer-events-none">
                            <Folder 
                                size={20} 
                                className={`
                                    transition-colors 
                                    ${dragOverFolderId === folder.id ? 'text-primary' : 'text-neutral-500 group-hover:text-white'}
                                `} 
                            />
                            <div>
                                <div className={`text-sm font-bold transition-colors ${dragOverFolderId === folder.id ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                                    {folder.name}
                                </div>
                                <div className="text-[10px] text-neutral-500 font-mono">Created {folder.created}</div>
                            </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-white p-1">
                            <MoreVertical size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Dropzone */}
        <div className="mb-8 border border-dashed border-neutral-800 rounded-xl py-8 flex flex-col items-center justify-center text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-colors cursor-pointer bg-white/[0.01] hover:bg-white/[0.02]">
            <span className="text-xs font-mono tracking-wide">Drop files/folders here to move back to root directory</span>
        </div>

        {/* Beats Section */}
        <div className="min-h-[200px]">
             <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-sm font-bold text-white">Beats</h3>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                 {files.map(file => (
                     <div 
                        key={file.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, file.id)}
                        onContextMenu={(e) => handleContextMenu(e, 'file', file.id)}
                        className={`
                            group bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden transition-all
                            ${draggedFileId === file.id ? 'opacity-50 border-dashed' : 'hover:border-primary/30 hover:shadow-[0_0_20px_rgba(var(--primary),0.05)]'}
                        `}
                     >
                         {/* Thumbnail Area */}
                         <div className="aspect-video bg-neutral-900 relative flex items-center justify-center group-hover:bg-neutral-800 transition-colors cursor-grab active:cursor-grabbing">
                             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                                <Music size={16} className="text-neutral-500 group-hover:text-primary transition-colors" />
                             </div>
                             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button 
                                    onClick={(e) => handleContextMenu(e, 'file', file.id)}
                                    className="p-1 bg-black/50 rounded hover:bg-black text-white"
                                >
                                     <MoreVertical size={12} />
                                 </button>
                             </div>
                         </div>
                         
                         {/* Info */}
                         <div className="p-3">
                             <div className="flex items-start justify-between gap-2 mb-3">
                                 <h4 className="text-xs font-bold text-white truncate leading-snug group-hover:text-primary transition-colors select-none">{file.title}</h4>
                             </div>
                             
                             <div className="space-y-1 pointer-events-none">
                                 <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500">
                                     <span>Format:</span>
                                     <span className="text-neutral-300">{file.format}</span>
                                 </div>
                                 <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500">
                                     <span>Size:</span>
                                     <span className="text-neutral-300">{file.size}</span>
                                 </div>
                                 <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500">
                                     <span>Uploaded:</span>
                                     <span className="text-neutral-300">{file.uploaded}</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* CUSTOM CONTEXT MENU */}
        {contextMenu && (
            <div 
                ref={menuRef}
                className="fixed z-[100] w-48 bg-[#0a0a0a] border border-neutral-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-lg py-1.5 text-xs font-medium backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 origin-top-left"
                style={{ top: contextMenu.y, left: contextMenu.x }}
                onClick={(e) => e.stopPropagation()} // Prevent click from closing immediately via document listener
            >
                {/* FILE CONTEXT MENU */}
                {contextMenu.type === 'file' && (
                    <>
                        <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider opacity-50 mb-1">
                            Actions
                        </div>
                        <ContextMenuItem icon={<Eye size={14} />} label="Preview" />
                        <ContextMenuItem icon={<Download size={14} />} label="Download" />
                        <ContextMenuItem icon={<Copy size={14} />} label="Copy Link" />
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <ContextMenuItem icon={<Edit size={14} />} label="Rename" />
                        <ContextMenuItem icon={<FolderInput size={14} />} label="Move to..." />
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <ContextMenuItem icon={<Info size={14} />} label="Get Info" />
                        <ContextMenuItem icon={<Trash2 size={14} />} label="Delete" className="text-red-400 hover:bg-red-500/10 hover:text-red-400" />
                    </>
                )}

                {/* FOLDER CONTEXT MENU */}
                {contextMenu.type === 'folder' && (
                    <>
                        <ContextMenuItem icon={<Folder size={14} />} label="Open" />
                        <ContextMenuItem icon={<Share size={14} />} label="Share" />
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <ContextMenuItem icon={<Edit size={14} />} label="Rename" />
                        <ContextMenuItem icon={<Download size={14} />} label="Download .zip" />
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <ContextMenuItem icon={<Trash2 size={14} />} label="Delete" className="text-red-400 hover:bg-red-500/10 hover:text-red-400" />
                    </>
                )}

                {/* BACKGROUND CONTEXT MENU */}
                {contextMenu.type === 'background' && (
                    <>
                        <ContextMenuItem icon={<Folder size={14} />} label="New Folder" />
                        <ContextMenuItem icon={<File size={14} />} label="New Text File" />
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <ContextMenuItem icon={<Upload size={14} />} label="Upload Files" />
                        <ContextMenuItem icon={<ArrowUpDown size={14} />} label="Sort By" />
                        <ContextMenuItem icon={<Filter size={14} />} label="Filter" />
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <ContextMenuItem icon={<Info size={14} />} label="Properties" />
                    </>
                )}
            </div>
        )}
    </div>
  );
};

interface ContextMenuItemProps {
    icon: React.ReactNode;
    label: string;
    className?: string;
    onClick?: () => void;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ icon, label, className, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-3 py-2 hover:bg-white/10 transition-colors text-left ${className || 'text-neutral-300 hover:text-white'}`}
    >
        <span className="opacity-70">{icon}</span>
        <span>{label}</span>
    </button>
)

export default UploadPage;
