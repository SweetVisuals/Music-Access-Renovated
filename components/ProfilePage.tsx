import React, { useState } from 'react';
import { UserProfile, Project } from '../types';
import { 
  Verified, 
  Mic2, 
  Box, 
  Download, 
  Globe, 
  MessageSquare, 
  Disc, 
  LayoutList, 
  Info, 
  Gem, 
  UserPlus, 
} from 'lucide-react';
import ProjectCard from './ProjectCard';

interface ProfilePageProps {
  profile: UserProfile;
  currentTrackId: string | null;
  currentProject: Project | null;
  isPlaying: boolean;
  onPlayTrack: (project: Project, trackId: string) => void;
  onTogglePlay: () => void;
}

type Tab = 'beat_tapes' | 'services' | 'sound_packs' | 'about';

const ProfilePage: React.FC<ProfilePageProps> = ({ 
    profile, 
    currentTrackId, 
    currentProject,
    isPlaying, 
    onPlayTrack, 
    onTogglePlay 
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('beat_tapes');
  const [isFollowing, setIsFollowing] = useState(true);

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-32 pt-6 px-6 lg:px-8 animate-in fade-in duration-500">
        
        {/* Static Header Design */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 mb-8">
            
            {/* Banner Background - No hover effects */}
            <div className="h-64 w-full relative bg-neutral-900">
                <img src={profile.banner} className="w-full h-full object-cover opacity-40" alt="Banner" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Profile Info Layer */}
            <div className="relative px-8 pb-8 -mt-20 flex flex-col md:flex-row items-end gap-6">
                
                {/* Avatar */}
                <div className="relative z-10">
                    <div className="h-40 w-40 rounded-2xl border-4 border-[#0a0a0a] bg-neutral-900 shadow-2xl overflow-hidden">
                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#0a0a0a] p-1 rounded-full border border-neutral-800 z-20">
                        <Verified className="text-blue-400 fill-blue-400/10" size={20} />
                    </div>
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                         <h1 className="text-4xl font-black text-white tracking-tight">{profile.username}</h1>
                         <span className="px-2 py-0.5 bg-primary/10 rounded text-[10px] font-mono font-bold text-primary border border-primary/20 uppercase">
                            Pro
                         </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <span className="font-mono text-neutral-500">{profile.handle}</span>
                        {profile.website && (
                             <a href={profile.website} className="flex items-center gap-1.5 hover:text-white transition-colors">
                                 <Globe size={12} />
                                 <span className="text-xs">
                                    {profile.website.replace('https://', '')}
                                 </span>
                             </a>
                        )}
                    </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex flex-col items-end gap-4 pb-2 w-full md:w-auto">
                     <div className="flex items-center gap-8 bg-white/5 px-6 py-3 rounded-xl border border-white/5">
                         <div className="text-center">
                             <div className="text-xl font-bold text-white font-mono">1.2M</div>
                             <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Streams</div>
                         </div>
                         <div className="w-px h-8 bg-white/10"></div>
                         <div className="text-center">
                             <div className="text-xl font-bold text-white font-mono">{profile.subscribers.toLocaleString()}</div>
                             <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Followers</div>
                         </div>
                         <div className="w-px h-8 bg-white/10"></div>
                         <div className="text-center">
                             <div className="text-xl font-bold text-primary flex items-center justify-center gap-1 font-mono">
                                 {profile.gems.toLocaleString()} <Gem size={14} />
                             </div>
                             <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Gems</div>
                         </div>
                     </div>

                     <div className="flex items-center gap-3">
                          <button className="h-10 px-5 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors flex items-center gap-2">
                             <MessageSquare size={16} />
                             MESSAGE
                         </button>
                         <button 
                             onClick={() => setIsFollowing(!isFollowing)}
                             className={`h-10 px-5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all border ${
                                 isFollowing 
                                 ? 'bg-transparent border-neutral-600 text-neutral-300 hover:border-red-500 hover:text-red-500' 
                                 : 'bg-primary border-primary text-black hover:bg-primary/90'
                             }`}
                         >
                             <UserPlus size={16} />
                             {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                         </button>
                     </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-800 mb-8 sticky top-24 bg-[#050505]/95 backdrop-blur-xl z-20 -mx-6 px-6 lg:-mx-8 lg:px-8">
            <div className="flex items-center gap-8 overflow-x-auto custom-scrollbar">
                <TabButton active={activeTab === 'beat_tapes'} onClick={() => setActiveTab('beat_tapes')} icon={<Disc size={18} />} label="Projects" count={profile.projects.length} />
                <TabButton active={activeTab === 'sound_packs'} onClick={() => setActiveTab('sound_packs')} icon={<Box size={18} />} label="Sound Packs" count={profile.soundPacks.length} />
                <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<LayoutList size={18} />} label="Services" count={profile.services.length} />
                <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={<Info size={18} />} label="About" />
            </div>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {activeTab === 'beat_tapes' && (
                <div>
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            Latest Projects
                        </h2>
                        <button className="text-[10px] font-mono text-neutral-500 border border-white/10 px-3 py-1.5 rounded hover:text-white hover:bg-white/5 transition-colors uppercase">
                            FILTER: ALL
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {profile.projects.map(project => (
                            <div key={project.id} className="h-[340px]">
                                <ProjectCard 
                                    project={project}
                                    currentTrackId={currentTrackId}
                                    isPlaying={currentProject?.id === project.id && isPlaying}
                                    onPlayTrack={(trackId) => onPlayTrack(project, trackId)}
                                    onTogglePlay={onTogglePlay}
                                />
                            </div>
                        ))}
                        {/* Add New Project Card for Owner */}
                        <div className="border border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center h-[340px] text-neutral-600 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                            <div className="h-14 w-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Box size={20} />
                            </div>
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">Create Project</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile.services.map(service => (
                        <div key={service.id} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all group hover:shadow-[0_0_30px_rgb(var(--primary)/0.1)] relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="p-3 bg-neutral-900 rounded-lg text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-colors shadow-lg">
                                    <Mic2 size={24} />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-bold text-white font-mono tracking-tight">${service.price}</span>
                                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Starting at</span>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-3 relative z-10">{service.title}</h3>
                            <p className="text-neutral-400 text-sm mb-6 leading-relaxed relative z-10">{service.description}</p>
                            
                            <div className="space-y-2 mb-6 relative z-10">
                                {service.features.map((feat, i) => (
                                    <div key={i} className="flex items-center text-xs text-neutral-300 font-mono">
                                        <div className="h-1 w-1 rounded-full bg-primary mr-3 shadow-[0_0_5px_rgb(var(--primary))]"></div>
                                        {feat}
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-primary transition-all relative z-10 text-[10px] tracking-widest uppercase">
                                Book Service
                            </button>
                        </div>
                    ))}
                </div>
            )}

             {activeTab === 'sound_packs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {profile.soundPacks.map(pack => (
                        <div key={pack.id} className="bg-neutral-900/50 border border-white/5 rounded-xl overflow-hidden group hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg">
                             <div className="h-40 bg-black flex items-center justify-center relative overflow-hidden">
                                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-50"></div>
                                 <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                                 <Box size={48} className="text-neutral-700 group-hover:text-primary transition-all duration-500 relative z-10 group-hover:scale-110 group-hover:rotate-3" />
                                 
                                 <div className="absolute top-2 right-2">
                                     <span className="px-2 py-0.5 bg-black/80 backdrop-blur text-[10px] font-mono font-bold text-white border border-white/10 rounded">
                                         ${pack.price}
                                     </span>
                                 </div>
                             </div>
                             <div className="p-4">
                                 <div className="flex justify-between items-center mb-1">
                                     <span className="text-[9px] font-mono text-primary uppercase tracking-wider">{pack.type}</span>
                                 </div>
                                 <h3 className="text-sm font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">{pack.title}</h3>
                                 
                                 <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mb-4 border-t border-white/5 pt-2">
                                     <span className="flex items-center gap-1"><Download size={10} /> {pack.fileSize}</span>
                                     <span>{pack.itemCount} Files</span>
                                 </div>
                                 
                                 <button className="w-full py-2 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded text-[10px] font-bold text-white transition-all flex items-center justify-center gap-2">
                                     ADD TO CART
                                 </button>
                             </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'about' && (
                <div className="glass-panel p-8 rounded-xl max-w-4xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4">About {profile.username}</h3>
                    <div className="prose prose-invert prose-sm max-w-none">
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            {profile.bio}
                        </p>
                        <p className="text-neutral-400 leading-relaxed text-sm mt-4">
                            With over 5 years of experience in the industry, I specialize in dark, atmospheric trap and soulful R&B. 
                            My beats have been used by upcoming artists across the globe. I am dedicated to providing high-quality sound 
                            selection and professional mixing services.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
                        <div className="p-4 rounded-lg bg-white/5 text-center">
                            <div className="text-xl font-bold text-primary mb-1">5+</div>
                            <div className="text-[10px] text-neutral-500 font-mono uppercase">Years Exp.</div>
                        </div>
                         <div className="p-4 rounded-lg bg-white/5 text-center">
                            <div className="text-xl font-bold text-white mb-1">300+</div>
                            <div className="text-[10px] text-neutral-500 font-mono uppercase">Projects Sold</div>
                        </div>
                         <div className="p-4 rounded-lg bg-white/5 text-center">
                            <div className="text-xl font-bold text-white mb-1">100%</div>
                            <div className="text-[10px] text-neutral-500 font-mono uppercase">Satisfaction</div>
                        </div>
                         <div className="p-4 rounded-lg bg-white/5 text-center">
                            <div className="text-xl font-bold text-white mb-1">24h</div>
                            <div className="text-[10px] text-neutral-500 font-mono uppercase">Turnaround</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    count?: number;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label, count }) => (
    <button 
        onClick={onClick}
        className={`
            pb-4 flex items-center gap-2 text-sm font-medium border-b-2 transition-all relative whitespace-nowrap
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

export default ProfilePage;