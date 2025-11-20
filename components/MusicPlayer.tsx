import React, { useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Maximize2, ListMusic } from 'lucide-react';
import { Project } from '../types';

interface MusicPlayerProps {
  currentProject: Project | null;
  currentTrackId: string | null;
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentProject, currentTrackId, isPlaying, togglePlay }) => {
  
  const currentTrack = useMemo(() => {
      if (!currentProject || !currentTrackId) return null;
      return currentProject.tracks.find(t => t.id === currentTrackId);
  }, [currentProject, currentTrackId]);

  if (!currentProject || !currentTrack) {
      return (
          <div className="fixed bottom-0 left-64 right-0 h-10 bg-black/40 border-t border-white/5 flex items-center justify-end px-6 z-40 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse"></div>
                  <span className="text-neutral-600 text-[10px] font-mono uppercase tracking-wider">System Idle</span>
              </div>
          </div>
      )
  }

  return (
    <div className="fixed bottom-8 left-[calc(16rem+2rem)] right-8 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
        <div className="max-w-6xl mx-auto glass-panel rounded-2xl p-4 flex items-center shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden">
            
            {/* Glowing Background Ambient */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
            
            {/* Track Info */}
            <div className="flex items-center w-1/4 min-w-[220px]">
                <div className="h-14 w-14 bg-neutral-900 rounded-lg overflow-hidden mr-4 relative group shadow-lg border border-white/10">
                    <img src={currentProject.coverImage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="overflow-hidden pr-2">
                    <div className="flex items-center space-x-2 mb-0.5">
                         <h4 className="text-sm font-bold text-white truncate font-mono leading-tight">{currentTrack.title}</h4>
                    </div>
                    <p className="text-[11px] text-primary/80 truncate font-mono tracking-tight">{currentProject.producer} // {currentProject.title}</p>
                </div>
            </div>

            {/* Main Controls */}
            <div className="flex-1 flex flex-col items-center px-8">
                <div className="flex items-center space-x-8 mb-3">
                    <button className="text-neutral-500 hover:text-neutral-300 transition-colors hover:scale-110"><Shuffle size={16} /></button>
                    <button className="text-neutral-300 hover:text-white transition-colors hover:scale-110"><SkipBack size={20} /></button>
                    
                    <button 
                        onClick={togglePlay}
                        className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    >
                        {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-1" />}
                    </button>
                    
                    <button className="text-neutral-300 hover:text-white transition-colors hover:scale-110"><SkipForward size={20} /></button>
                    <button className="text-neutral-500 hover:text-neutral-300 transition-colors hover:scale-110"><Repeat size={16} /></button>
                </div>
                
                {/* Scrubber */}
                <div className="w-full flex items-center space-x-4 text-[10px] font-mono text-neutral-500">
                    <span className="w-8 text-right">0:42</span>
                    <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-primary w-1/3 group-hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgb(var(--primary))]"></div>
                        <div className="absolute top-0 left-1/3 w-2 h-full bg-white shadow-[0_0_5px_white] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="w-8">
                        {Math.floor(currentTrack.duration / 60)}:{(currentTrack.duration % 60).toString().padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Right Actions */}
            <div className="w-1/4 flex items-center justify-end space-x-4 min-w-[180px]">
                <button className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded"><ListMusic size={18} /></button>
                <div className="flex items-center space-x-2 group mx-2">
                    <Volume2 size={18} className="text-neutral-400" />
                    <div className="w-20 h-1 bg-white/10 rounded-full relative cursor-pointer">
                        <div className="absolute top-0 left-0 h-full bg-neutral-400 w-2/3 rounded-full group-hover:bg-white transition-colors"></div>
                    </div>
                </div>
                 <button className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded"><Maximize2 size={16} /></button>
            </div>
        </div>
    </div>
  );
};

export default MusicPlayer;