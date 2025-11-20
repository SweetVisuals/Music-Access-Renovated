
import React from 'react';
import { 
  Upload, 
  PlusCircle, 
  Search, 
  Users, 
  MessageSquare, 
  Headphones, 
  TrendingUp, 
  Library, 
  FileText, 
  Settings, 
  HelpCircle, 
  MoreVertical,
  Terminal,
  LayoutDashboard,
  Wallet,
  DollarSign,
  Clipboard,
  Briefcase,
  ArrowLeft,
  ShoppingBag,
  LayoutGrid,
  Disc
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const isDashboard = currentView.startsWith('dashboard');

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#050505] border-r border-neutral-800 flex flex-col z-30 font-sans">
      {/* Logo Area */}
      <div className="h-24 flex items-center px-6 border-b border-neutral-800">
         <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="p-2 bg-primary/10 rounded-md border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Terminal size={20} className="text-primary" />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-base font-black text-white tracking-tighter leading-none">
                    MUSIC<span className="text-primary">ACCESS</span>
                </h1>
                <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">Terminal v2.0</span>
            </div>
         </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 py-6 px-4 overflow-y-auto custom-scrollbar space-y-8">
        
        {isDashboard ? (
            /* --- DASHBOARD SIDEBAR LAYOUT --- */
            <>
                {/* Back to Marketplace */}
                <div>
                     <button 
                        onClick={() => onNavigate('home')}
                        className="flex items-center space-x-2 text-[10px] font-bold text-neutral-500 hover:text-white mb-4 px-2 transition-colors uppercase tracking-wider group"
                     >
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Marketplace</span>
                     </button>

                     <div className="space-y-1.5 mb-2">
                        <button onClick={() => onNavigate('upload')} className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-primary text-black rounded-lg font-bold text-xs hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                            <Upload size={16} />
                            <span>Upload Track</span>
                        </button>
                         <button onClick={() => onNavigate('dashboard-studio')} className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-white/5 text-white border border-white/10 rounded-lg font-bold text-xs hover:bg-white/10 transition-colors">
                            <PlusCircle size={16} />
                            <span>New Project</span>
                        </button>
                     </div>
                </div>

                {/* DASHBOARD */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Dashboard
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarItem 
                            icon={<LayoutDashboard size={16} />} 
                            label="Overview" 
                            active={currentView === 'dashboard-overview'} 
                            onClick={() => onNavigate('dashboard-overview')}
                        />
                        <SidebarItem 
                            icon={<Headphones size={16} />} 
                            label="My Studio" 
                            active={currentView === 'dashboard-studio'}
                            onClick={() => onNavigate('dashboard-studio')}
                        />
                        <SidebarItem 
                            icon={<DollarSign size={16} />} 
                            label="Sales" 
                            active={currentView === 'dashboard-sales'}
                            onClick={() => onNavigate('dashboard-sales')}
                        />
                        <SidebarItem 
                            icon={<Briefcase size={16} />} 
                            label="Manage Orders" 
                            active={currentView === 'dashboard-manage'}
                            onClick={() => onNavigate('dashboard-manage')}
                        />
                    </nav>
                </div>

                {/* ACCOUNT */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Account
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarItem icon={<Users size={16} />} label="Profile" onClick={() => onNavigate('profile')} />
                        <SidebarItem 
                            icon={<Wallet size={16} />} 
                            label="Wallet" 
                            active={currentView === 'dashboard-wallet'}
                            onClick={() => onNavigate('dashboard-wallet')}
                        />
                        <SidebarItem 
                            icon={<ShoppingBag size={16} />} 
                            label="Orders" 
                            active={currentView === 'dashboard-orders'}
                            onClick={() => onNavigate('dashboard-orders')}
                        />
                        <SidebarItem 
                            icon={<MessageSquare size={16} />} 
                            label="Messages" 
                            active={currentView === 'dashboard-messages'}
                            onClick={() => onNavigate('dashboard-messages')}
                        />
                    </nav>
                </div>

                {/* TOOLS */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Tools
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarItem 
                            icon={<FileText size={16} />} 
                            label="Contracts" 
                            active={currentView === 'contracts'}
                            onClick={() => onNavigate('contracts')}
                        />
                        <SidebarItem 
                            icon={<PlusCircle size={16} />} 
                            label="Post A Service" 
                            active={currentView === 'post-service'}
                            onClick={() => onNavigate('post-service')}
                        />
                        <SidebarItem 
                            icon={<Clipboard size={16} />} 
                            label="Notes & Lyrics" 
                            active={currentView === 'notes'}
                            onClick={() => onNavigate('notes')}
                        />
                        <SidebarItem 
                            icon={<TrendingUp size={16} />} 
                            label="Analytics" 
                            active={currentView === 'dashboard-analytics'}
                            onClick={() => onNavigate('dashboard-analytics')}
                        />
                    </nav>
                </div>

                {/* RESOURCES */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Resources
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarItem 
                            icon={<Settings size={16} />} 
                            label="Settings" 
                            active={currentView === 'dashboard-settings'}
                            onClick={() => onNavigate('dashboard-settings')}
                        />
                        <SidebarItem icon={<HelpCircle size={16} />} label="Get Help" />
                    </nav>
                </div>
            </>
        ) : (
            /* --- MARKETPLACE SIDEBAR LAYOUT --- */
            <>
                {/* QUICK ACTIONS */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Quick Actions
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarAction icon={<Upload size={16} />} label="Upload Track" onClick={() => onNavigate('upload')} />
                        <SidebarAction icon={<PlusCircle size={16} />} label="New Project" onClick={() => onNavigate('dashboard-studio')} />
                    </nav>
                </div>

                {/* NAVIGATION */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Navigation
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarItem 
                            icon={<Search size={16} />} 
                            label="Discover" 
                            active={currentView === 'home'}
                            onClick={() => onNavigate('home')}
                        />
                        <SidebarItem 
                            icon={<Users size={16} />} 
                            label="Browse Talent" 
                            active={currentView === 'browse-talent'}
                            onClick={() => onNavigate('browse-talent')}
                        />
                        <SidebarItem 
                            icon={<MessageSquare size={16} />} 
                            label="Collaborate" 
                            active={currentView === 'collaborate'}
                            onClick={() => onNavigate('collaborate')}
                        />
                        <SidebarItem 
                            icon={<Headphones size={16} />} 
                            label="My Studio" 
                            onClick={() => onNavigate('dashboard-studio')}
                        />
                        <SidebarItem 
                            icon={<Briefcase size={16} />} 
                            label="Manage Orders" 
                            onClick={() => onNavigate('dashboard-manage')}
                        />
                    </nav>
                </div>

                {/* LIBRARY */}
                <div>
                    <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-widest">
                        Library
                    </div>
                    <nav className="space-y-0.5">
                        <SidebarItem 
                            icon={<LayoutGrid size={16} />} 
                            label="My Library" 
                            active={currentView === 'library'}
                            onClick={() => onNavigate('library')}
                        />
                        <SidebarItem 
                            icon={<ShoppingBag size={16} />} 
                            label="Purchased" 
                            onClick={() => onNavigate('dashboard-orders')}
                        />
                        <SidebarItem 
                            icon={<FileText size={16} />} 
                            label="Contracts" 
                            onClick={() => onNavigate('contracts')}
                        />
                        <SidebarItem 
                            icon={<Clipboard size={16} />} 
                            label="Notes" 
                            onClick={() => onNavigate('notes')}
                        />
                    </nav>
                </div>
            </>
        )}

      </div>

      {/* Footer - Storage & Profile */}
      <div className="p-4 border-t border-neutral-800 bg-[#080808]">
          
          {/* Storage Info */}
          <div className="mb-4 px-1">
             <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] font-medium text-neutral-400">Storage</span>
                 <span className="text-[9px] font-mono text-neutral-500 font-bold">16.6 MB / 500.0 MB</span>
             </div>
             <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-[3%] rounded-full"></div>
             </div>
          </div>

          <div className="h-px bg-neutral-800 mb-4"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors" onClick={() => onNavigate('profile')}>
             {/* Avatar - Square */}
             <div className="h-9 w-9 rounded-md bg-blue-500/20 border border-blue-500/30 flex items-center justify-center overflow-hidden relative shrink-0">
                 <img src="https://i.pravatar.cc/150?u=admin1" alt="Admin" className="h-full w-full object-cover" />
             </div>
             
             <div className="flex-1 min-w-0">
                 <div className="text-xs font-bold text-white truncate group-hover:text-primary transition-colors">Admin1</div>
                 <div className="text-[10px] text-neutral-500 truncate font-mono">acedkmgmt@gmail.com</div>
             </div>

             <button className="text-neutral-500 hover:text-white transition-colors">
                 <MoreVertical size={14} />
             </button>
          </div>
      </div>
    </aside>
  );
};

interface SidebarActionProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const SidebarAction: React.FC<SidebarActionProps> = ({ icon, label, onClick }) => {
    return (
        <button onClick={onClick} className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-bold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all mb-1 group">
            <span className="text-primary group-hover:scale-110 transition-transform">{icon}</span>
            <span>{label}</span>
        </button>
    )
}

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all group
                ${active 
                    ? 'bg-primary/10 text-primary font-bold border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.15)]' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }
            `}
        >
            <span className={active ? '' : 'group-hover:text-white transition-colors'}>{icon}</span>
            <span className="text-xs tracking-wide">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgb(var(--primary))]"></div>}
        </button>
    )
}

export default Sidebar;