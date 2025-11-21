
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Upload, 
  Gem, 
  Palette, 
  Sparkles, 
  X, 
  ArrowRight, 
  Terminal, 
  Command,
  Trash2,
  CreditCard,
  Clock,
  LogIn,
  Wallet,
  Eye,
  EyeOff,
  Check,
  LayoutDashboard
} from 'lucide-react';
import { View, Project, UserProfile } from '../types';
import { askAiAssistant } from '../services/geminiService';

interface TopBarProps {
    onSearch: (query: string) => void;
    onNavigate: (view: View) => void;
    projects: Project[];
    isLoggedIn: boolean;
    onOpenAuth: () => void;
    onLogout: () => void;
    userProfile: UserProfile;
    onClaimGems?: () => void;
    gemsClaimedToday?: boolean;
}

const THEMES = [
  { name: 'Orange', value: '249 115 22', color: '#f97316' }, // Default
  { name: 'Emerald', value: '16 185 129', color: '#10b981' },
  { name: 'Purple', value: '168 85 247', color: '#a855f7' },
  { name: 'Blue', value: '59 130 246', color: '#3b82f6' },
  { name: 'Pink', value: '236 72 153', color: '#ec4899' },
];

// Mock Data for Dropdowns
const CART_ITEMS = [
  { id: 1, title: 'Midnight Tokio', type: 'Exclusive License', price: 199.99, image: 'https://picsum.photos/id/13/200' },
  { id: 2, title: 'Trap Drums Vol. 1', type: 'Sound Kit', price: 29.99, image: 'https://picsum.photos/id/24/200' },
  { id: 3, title: 'Vocal Mixing', type: 'Service', price: 150.00, image: 'https://picsum.photos/id/32/200' },
];

const NOTIFICATIONS = [
  { id: 1, title: 'New Sale!', message: 'You sold "Midnight Tokio" for $199.99', time: '2m ago', type: 'sale', read: false },
  { id: 2, title: 'Project Exported', message: 'Your project "Neon Rain" is ready to download.', time: '1h ago', type: 'system', read: false },
  { id: 3, title: 'New Message', message: 'User @wavgod sent you a message.', time: '3h ago', type: 'message', read: true },
];

const TopBar: React.FC<TopBarProps> = ({ 
    onSearch, 
    onNavigate, 
    projects, 
    isLoggedIn,
    onOpenAuth,
    onLogout,
    userProfile,
    onClaimGems,
    gemsClaimedToday = false
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchMode, setSearchMode] = useState<'search' | 'ai'>('search');
  
  // AI State
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Typewriter State
  const [placeholderText, setPlaceholderText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const aiPlaceholders = useMemo(() => [
    "Analyze the structure of my latest project...",
    "Suggest a chord progression for a dark trap beat...",
    "Find producers with a similar style to Metro...",
    "Draft a split sheet agreement for my collaborator...",
    "Recommend marketing strategies for my new album..."
  ], []);

  // Dropdown States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Wallet State
  const [showBalance, setShowBalance] = useState(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter Effect
  useEffect(() => {
    if (searchMode !== 'ai') {
        setPlaceholderText("SEARCH DATABASE...");
        return;
    }

    const currentPhrase = aiPlaceholders[placeholderIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCharIndex(prev => prev + 1);
        setPlaceholderText(currentPhrase.substring(0, charIndex + 1));
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(prev => prev - 1);
        setPlaceholderText(currentPhrase.substring(0, charIndex - 1));
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPlaceholderIndex(prev => (prev + 1) % aiPlaceholders.length);
      }
    }, isDeleting ? 20 : 40); // Typing speed

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex, searchMode, aiPlaceholders]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    if (searchMode === 'search') {
        onSearch(val);
    }
  };

  const toggleSearchMode = () => {
      const newMode = searchMode === 'search' ? 'ai' : 'search';
      setSearchMode(newMode);
      setSearchValue('');
      onSearch(''); 
      setAiResponse(null);
      
      if (newMode === 'ai') {
          setPlaceholderIndex(0);
          setCharIndex(0);
          setIsDeleting(false);
      }
      
      setTimeout(() => {
          inputRef.current?.focus();
      }, 50);
  };

  const handleAiSubmit = async () => {
      if (!searchValue.trim()) return;
      setAiLoading(true);
      setAiResponse(null);
      
      onSearch(searchValue);
      const response = await askAiAssistant(searchValue, projects);
      
      setAiResponse(response);
      setAiLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          if (searchMode === 'ai') {
              handleAiSubmit();
          }
      }
      if (e.key === 'Escape') {
          if (aiResponse) setAiResponse(null);
          searchRef.current?.blur();
      }
  };

  const handleThemeChange = (themeValue: string) => {
      document.documentElement.style.setProperty('--primary', themeValue);
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartTotal = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);

  return (
    <header className="h-20 fixed top-0 left-64 right-0 z-40 bg-[#050505]/90 backdrop-blur-lg border-b border-white/5 flex items-center px-6 lg:px-8 justify-end gap-6">
        
        {/* SEARCH BAR */}
        <div 
            className="absolute top-1/2 w-full max-w-xl z-30 transition-transform duration-300"
            style={{ 
                left: 'calc(50vw - 16rem)',
                transform: `translate(-50%, -50%) scale(${isFocused ? 1.05 : 1})` 
            }}
        >
          <div 
            ref={searchRef}
            className={`relative group rounded-xl transition-all duration-300 ${isFocused ? 'shadow-[0_0_40px_rgb(var(--primary)/0.15)]' : ''}`}
          >
            {/* Input Background */}
            <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${isFocused || aiResponse ? 'border-primary/50 bg-black' : 'border-white/10 bg-black/40'}`}></div>
            
            {/* Main Input Area */}
            <div className="relative flex items-center px-3 py-2">
                
                {/* Mode Toggle */}
                <button 
                    onClick={toggleSearchMode}
                    className={`
                        flex items-center justify-center px-2.5 py-1.5 mr-3 rounded-lg transition-all duration-300 gap-2 border relative overflow-hidden shrink-0
                        ${searchMode === 'ai' 
                            ? 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_15px_rgb(var(--primary)/0.2)]' 
                            : 'bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-white hover:bg-white/10 hover:border-white/10'
                        }
                    `}
                >
                    <div className="relative z-10 flex items-center gap-2">
                        {searchMode === 'ai' ? <Sparkles size={14} className="animate-pulse" /> : <Search size={14} />}
                        <span className="text-[10px] font-black font-mono tracking-wider uppercase hidden sm:inline-block min-w-[50px] text-center">
                            {searchMode === 'ai' ? 'AI' : 'FIND'}
                        </span>
                    </div>
                </button>
                
                <div className="flex-1 flex items-center relative h-8 min-w-0">
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`
                            w-full h-full bg-transparent border-none focus:ring-0 focus:outline-none 
                            text-neutral-200 font-mono text-sm p-0 tracking-wide transition-colors
                            selection:bg-primary/30 selection:text-white placeholder-transparent z-10
                            ${searchMode === 'ai' ? 'text-primary' : ''}
                        `}
                        autoComplete="off"
                    />
                    {!searchValue && (
                         <div className={`absolute inset-0 flex items-center pointer-events-none select-none font-mono text-sm transition-opacity duration-300 ${isFocused ? 'opacity-30' : 'opacity-50'}`}>
                            <span className={`truncate ${searchMode === 'ai' ? 'text-primary' : 'text-neutral-500'}`}>
                                {placeholderText}
                            </span>
                         </div>
                    )}
                </div>

                {/* Right Icon */}
                <div className="flex items-center pl-3 ml-2 border-l border-white/5 h-6 shrink-0">
                    {searchMode === 'ai' ? (
                        <button 
                            onClick={handleAiSubmit}
                            disabled={!searchValue.trim() || aiLoading}
                            className={`p-1 rounded transition-all flex items-center justify-center ${searchValue.trim() ? 'text-primary hover:bg-primary/10' : 'text-neutral-600'}`}
                        >
                            {aiLoading ? <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div> : <ArrowRight size={14} />}
                        </button>
                    ) : (
                        <div className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-mono text-neutral-500">
                            <Command size={10} /> K
                        </div>
                    )}
                </div>
            </div>

            {/* AI Response Panel */}
            {(aiResponse || (aiLoading && searchMode === 'ai')) && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-primary" />
                            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">AI Analysis</span>
                        </div>
                        <button onClick={() => setAiResponse(null)} className="text-neutral-500 hover:text-white transition-colors p-1"><X size={12} /></button>
                    </div>
                    <div className="p-5 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {aiLoading ? (
                            <div className="flex flex-col items-center justify-center py-8 space-y-3">
                                <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="text-xs font-mono text-primary animate-pulse">PROCESSING...</p>
                            </div>
                        ) : (
                            <p className="text-neutral-300 text-sm leading-relaxed font-sans whitespace-pre-wrap">{aiResponse}</p>
                        )}
                    </div>
                </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center justify-end gap-4 z-40 h-full shrink-0">
            
            {/* Group 1: Balances */}
            {isLoggedIn && (
                <div className="flex items-center gap-3">
                    {/* Daily Claim Button */}
                    {!gemsClaimedToday && (
                        <button 
                            onClick={onClaimGems} 
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 text-primary border border-primary/30 rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors shadow-[0_0_15px_rgb(var(--primary)/0.2)] animate-pulse h-9"
                        >
                            <Gem size={12} /> 
                            <span className="font-mono tracking-tight">CLAIM +10</span>
                        </button>
                    )}

                    {/* Gem Balance (Fixed Height, Coherent) */}
                    <div 
                        onClick={() => onNavigate('dashboard-wallet')}
                        className="h-9 bg-neutral-900 border border-white/10 rounded-full flex items-center px-4 gap-2.5 cursor-pointer hover:bg-neutral-800 transition-colors"
                    >
                        <Gem size={14} className="text-primary" />
                        <span className="text-xs font-bold text-white font-mono mt-0.5">
                            {userProfile.gems.toLocaleString()}
                        </span>
                    </div>

                    {/* Wallet Balance (Fixed Height, Hideable, Coherent) */}
                    <div className="h-9 bg-neutral-900 border border-white/10 rounded-full flex items-center pl-4 pr-1 gap-3 hover:border-white/20 transition-colors group">
                        <div 
                            onClick={() => onNavigate('dashboard-wallet')}
                            className="flex items-center gap-2.5 cursor-pointer"
                        >
                            <Wallet size={14} className="text-emerald-500" />
                            <span className="text-xs font-bold text-white font-mono mt-0.5 min-w-[60px] text-right">
                                {showBalance ? `$${(userProfile.balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '****'}
                            </span>
                        </div>
                        <button 
                            onClick={() => setShowBalance(!showBalance)} 
                            className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                        >
                            {showBalance ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                    </div>
                </div>
            )}

            <div className="h-6 w-px bg-white/10 mx-1"></div>

            {/* Group 2: Icons (Theme, Notif, Cart) */}
            <div className="flex items-center gap-1">
                
                {/* Color Picker */}
                <div className="relative" ref={themeRef}>
                    <button 
                        onClick={() => setIsThemeOpen(!isThemeOpen)}
                        className={`p-2.5 rounded-lg transition-all duration-200 ${isThemeOpen ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Palette size={18} />
                    </button>
                    {isThemeOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 p-3 rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="text-[10px] font-mono text-neutral-500 uppercase mb-2 px-1">Accent Color</div>
                            <div className="grid grid-cols-5 gap-2 px-1">
                                {THEMES.map(theme => (
                                    <button
                                    key={theme.name}
                                    onClick={() => handleThemeChange(theme.value)}
                                    className="w-6 h-6 rounded-full border border-white/10 hover:scale-110 transition-transform shadow-lg"
                                    style={{ backgroundColor: theme.color }}
                                    title={theme.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                {isLoggedIn && (
                    <div className="relative" ref={notifRef}>
                        <button 
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className={`relative p-2.5 rounded-lg transition-all duration-200 ${isNotificationsOpen ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Bell size={18} />
                            <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.6)] animate-pulse"></span>
                        </button>

                        {isNotificationsOpen && (
                            <div className="absolute right-0 top-full mt-3 w-80 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-3 border-b border-white/5 flex justify-between items-center">
                                    <h3 className="text-xs font-bold text-white">Notifications</h3>
                                    <button className="text-[10px] text-primary hover:underline">Mark all read</button>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {NOTIFICATIONS.map(notif => (
                                        <div key={notif.id} className={`p-3 border-b border-white/5 hover:bg-white/5 transition-colors ${!notif.read ? 'bg-white/[0.02]' : ''}`}>
                                            <div className="flex gap-3">
                                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.type === 'sale' ? 'bg-green-500' : notif.type === 'system' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white mb-0.5">{notif.title}</h4>
                                                    <p className="text-[11px] text-neutral-400 leading-snug mb-1.5">{notif.message}</p>
                                                    <div className="flex items-center gap-1 text-[10px] text-neutral-600">
                                                        <Clock size={10} /> {notif.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 bg-neutral-900/50 text-center">
                                    <button className="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors">View Activity Log</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Cart */}
                <div className="relative" ref={cartRef}>
                    <button 
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className={`relative p-2.5 rounded-lg transition-all duration-200 group ${isCartOpen ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <ShoppingBag size={18} />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[9px] font-black text-black flex items-center justify-center border border-[#050505]">
                            {CART_ITEMS.length}
                        </span>
                    </button>

                    {isCartOpen && (
                        <div className="absolute right-0 top-full mt-3 w-80 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-3 border-b border-white/5 flex justify-between items-center bg-neutral-900/30">
                                <h3 className="text-xs font-bold text-white">Your Cart <span className="text-neutral-500">({CART_ITEMS.length})</span></h3>
                                <button className="text-[10px] text-neutral-500 hover:text-white">Clear</button>
                            </div>
                            
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {CART_ITEMS.map(item => (
                                    <div key={item.id} className="p-3 flex gap-3 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-white truncate mb-0.5">{item.title}</h4>
                                            <p className="text-[10px] text-neutral-500 mb-1">{item.type}</p>
                                            <div className="text-xs font-mono text-primary">${item.price.toFixed(2)}</div>
                                        </div>
                                        <button className="text-neutral-600 hover:text-red-500 transition-colors self-center p-1 opacity-0 group-hover:opacity-100">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-neutral-900/50 border-t border-white/5">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-xs font-bold text-neutral-400">Total</span>
                                    <span className="text-lg font-black text-white font-mono">${cartTotal.toFixed(2)}</span>
                                </div>
                                <button 
                                    onClick={() => { setIsCartOpen(false); isLoggedIn ? onNavigate('checkout') : onOpenAuth(); }}
                                    className="w-full py-2.5 bg-primary text-black rounded-lg font-bold text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <CreditCard size={14} /> Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Button (Moved next to Avatar) */}
            <button 
                onClick={() => isLoggedIn ? onNavigate('upload') : onOpenAuth()}
                className="hidden xl:flex items-center gap-2 px-4 h-9 bg-primary hover:bg-primary/90 text-black rounded-lg transition-colors font-bold text-xs shadow-[0_0_15px_rgb(var(--primary)/0.3)]"
            >
                <Upload size={14} />
                <span className="font-mono tracking-wide">UPLOAD</span>
            </button>

            {/* Group 3: Profile or Login */}
            <div className="relative" ref={dropdownRef}>
                {isLoggedIn ? (
                    <>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`flex items-center gap-2.5 pl-2 rounded-lg transition-all ${isProfileOpen ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                        >
                            <div className="h-9 w-9 rounded-lg bg-primary/20 border border-primary/50 p-[1px] shadow-[0_0_10px_rgb(var(--primary)/0.2)]">
                                <img src={userProfile.avatar} alt="User" className="h-full w-full rounded-lg object-cover" />
                            </div>
                            <ChevronDown size={12} className={`text-neutral-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                                <div className="p-3 border-b border-white/5 bg-white/[0.02]">
                                    <p className="text-xs font-bold text-white truncate">{userProfile.username}</p>
                                    <p className="text-[10px] text-neutral-500 truncate">{userProfile.handle}</p>
                                </div>
                                <div className="p-1 space-y-0.5">
                                    <button onClick={() => { onNavigate('profile'); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <User size={14} /> My Profile
                                    </button>
                                    <button onClick={() => { onNavigate('dashboard-overview'); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <LayoutDashboard size={14} /> Dashboard
                                    </button>
                                    <button onClick={() => { onNavigate('dashboard-orders'); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <ShoppingBag size={14} /> Purchases
                                    </button>
                                    <button onClick={() => { onNavigate('dashboard-settings'); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <Settings size={14} /> Settings
                                    </button>
                                </div>
                                <div className="p-1 border-t border-white/5">
                                    <button 
                                        onClick={() => {
                                            onLogout();
                                            setIsProfileOpen(false);
                                        }} 
                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <LogOut size={14} /> Disconnect
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <button 
                        onClick={onOpenAuth}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors"
                    >
                        <LogIn size={14} />
                        <span>Sign In</span>
                    </button>
                )}
            </div>

        </div>
    </header>
  );
};

export default TopBar;
