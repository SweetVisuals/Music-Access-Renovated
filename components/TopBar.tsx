import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Bell, Search, User, Settings, LogOut, ChevronDown, Upload, Gem, Palette, ShoppingCart, LayoutDashboard, Sparkles } from 'lucide-react';
import { View } from '../types';
import { MOCK_USER_PROFILE } from '../constants';

interface TopBarProps {
    onSearch: (query: string) => void;
    onNavigate: (view: View) => void;
    onAiClick: () => void;
}

const THEMES = [
  { name: 'Emerald', value: '16 185 129', color: '#10b981' },
  { name: 'Purple', value: '168 85 247', color: '#a855f7' },
  { name: 'Blue', value: '59 130 246', color: '#3b82f6' },
  { name: 'Orange', value: '249 115 22', color: '#f97316' },
  { name: 'Pink', value: '236 72 153', color: '#ec4899' },
];

const TopBar: React.FC<TopBarProps> = ({ onSearch, onNavigate, onAiClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  const handleThemeChange = (themeValue: string) => {
      document.documentElement.style.setProperty('--primary', themeValue);
      setIsThemeOpen(false);
  };

  // Click outside handler for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-24 fixed top-0 left-64 right-0 z-20 flex items-center justify-center px-8 bg-gradient-to-b from-[#050505] via-[#050505]/90 to-transparent pointer-events-none">
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto relative">
        
        {/* Spacer to balance layout if needed */}
        <div className="w-32 hidden lg:block"></div>

        {/* Centered Search Command Center */}
        <div className={`flex-1 max-w-2xl transition-all duration-300 transform ${isFocused ? 'scale-105' : 'scale-100'}`}>
          <div className={`relative group rounded-xl transition-all duration-300 ${isFocused ? 'shadow-[0_0_30px_rgb(var(--primary)/0.15)]' : ''}`}>
            
            {/* Input Background & Border */}
            <div className={`absolute inset-0 rounded-xl border transition-colors duration-300 ${isFocused ? 'border-primary/50 bg-black/80' : 'border-white/10 bg-black/40'}`}></div>
            
            <div className="relative flex items-center px-4 py-3.5">
                <Search className={`w-4 h-4 mr-3 transition-colors ${isFocused ? 'text-primary' : 'text-neutral-600'}`} />
                
                <div className="flex-1 flex items-center">
                    <span className={`font-mono text-sm mr-2 transition-opacity duration-300 ${isFocused ? 'opacity-100 text-primary' : 'opacity-0'}`}>{'>'}</span>
                    <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent border-none focus:ring-0 text-neutral-200 placeholder-neutral-600 font-mono text-sm h-full p-0 tracking-wide"
                    placeholder="SEARCH DATABASE... or ask System.AI"
                    />
                </div>

                <button 
                    onClick={onAiClick}
                    title="Ask System.AI"
                    aria-label="Open AI Assistant"
                    className="ml-3 p-1.5 rounded-lg text-neutral-500 hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none"
                >
                    <Sparkles size={16} />
                </button>

                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest hidden sm:block pl-4 ml-4 border-l border-white/5">CMD+K</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="w-auto flex items-center justify-end space-x-4 ml-4">
            {/* Gems Currency */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                <Gem size={14} className="text-purple-400" />
                <span className="text-xs font-mono text-white">{MOCK_USER_PROFILE.gems.toLocaleString()}</span>
            </div>

            {/* Upload Button */}
            <button 
                onClick={() => onNavigate('upload')}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-[0_0_15px_rgb(var(--primary)/0.3)]"
            >
                <Upload size={16} />
                <span className="text-xs font-mono tracking-wide">UPLOAD</span>
            </button>

          <div className="flex items-center space-x-3">
              {/* Theme Switcher */}
              <div className="relative" ref={themeRef}>
                  <button 
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                    className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                  >
                    <Palette size={18} />
                  </button>
                  {isThemeOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 p-2">
                          <div className="text-[10px] font-mono text-neutral-500 uppercase mb-2 px-2">Select Theme</div>
                          <div className="grid grid-cols-5 gap-2">
                              {THEMES.map(theme => (
                                  <button
                                    key={theme.name}
                                    onClick={() => handleThemeChange(theme.value)}
                                    className="w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: theme.color }}
                                    title={theme.name}
                                  />
                              ))}
                          </div>
                      </div>
                  )}
              </div>

              {/* Cart Icon */}
              <button className="relative text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg group">
                <ShoppingCart size={18} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_5px_rgb(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button className="relative text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                <Bell size={18} />
                <span className="absolute top-1.5 right-2 block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_5px_rgb(var(--primary))]" />
              </button>
              
              <div className="h-6 w-px bg-white/10"></div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 pl-2 focus:outline-none group"
                  >
                      <div className="h-9 w-9 rounded-lg bg-primary/20 border border-primary/50 p-[1px] shadow-[0_0_15px_rgb(var(--primary)/0.2)] group-hover:shadow-[0_0_20px_rgb(var(--primary)/0.4)] transition-shadow">
                         <div className="h-full w-full rounded-lg bg-black flex items-center justify-center overflow-hidden relative">
                             <img src={MOCK_USER_PROFILE.avatar} alt="User" className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                         </div>
                      </div>
                      <ChevronDown size={14} className={`text-neutral-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-white/5">
                          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                              <p className="text-sm font-bold text-white truncate">{MOCK_USER_PROFILE.username}</p>
                              <div className="flex items-center mt-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></div>
                                <p className="text-[10px] font-mono text-primary tracking-wider">PRO ACCOUNT ACTIVE</p>
                              </div>
                          </div>
                          <div className="p-1.5 space-y-0.5">
                              {/* Dashboard Link */}
                              <button 
                                onClick={() => {
                                    onNavigate('dashboard-overview');
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              >
                                  <LayoutDashboard size={14} />
                                  <span>Dashboard</span>
                              </button>

                              <button 
                                onClick={() => {
                                    onNavigate('profile');
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              >
                                  <User size={14} />
                                  <span>My Profile</span>
                              </button>
                              <button 
                                onClick={() => {
                                    onNavigate('dashboard-orders');
                                    setIsProfileOpen(false);
                                }}
                                className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              >
                                  <ShoppingBag size={14} />
                                  <span>Purchases</span>
                              </button>
                               <button 
                                onClick={() => {
                                    onNavigate('dashboard-settings');
                                    setIsProfileOpen(false);
                                }}
                               className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                  <Settings size={14} />
                                  <span>Preferences</span>
                              </button>
                          </div>
                          <div className="p-1.5 border-t border-white/5">
                              <button className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                  <LogOut size={14} />
                                  <span>Disconnect</span>
                              </button>
                          </div>
                      </div>
                  )}
               </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;