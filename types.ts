
export interface Track {
  id: string;
  title: string;
  duration: number; // in seconds
  waveformData?: number[];
}

export interface Project {
  id: string;
  title: string;
  producer: string;
  // coverImage removed as per request
  price: number;
  bpm: number;
  key: string;
  genre: string;
  tags: string[];
  tracks: Track[];
  description?: string;
  notes?: string; // Added for studio management
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
}

export interface SoundPack {
  id: string;
  title: string;
  type: 'Drum Kit' | 'Loop Kit' | 'Preset Bank';
  price: number;
  fileSize: string;
  itemCount: number;
}

export interface UserProfile {
  username: string;
  handle: string;
  avatar: string;
  banner: string;
  subscribers: number;
  gems: number;
  bio: string;
  website?: string;
  projects: Project[];
  services: Service[];
  soundPacks: SoundPack[];
}

export interface TalentProfile {
    id: string;
    username: string;
    handle: string;
    avatar: string;
    role: string;
    tags: string[];
    followers: string;
    isVerified?: boolean;
}

export interface CollabService {
    id: string;
    name: string;
    platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Spotify' | 'Blog';
    handle: string;
    avatar: string;
    serviceTitle: string;
    description: string;
    priceRange: string;
    stats: { label: string; value: string }[];
    verified?: boolean;
}

export enum PlayState {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED'
}

export interface FilterState {
  genre: string;
  key: string;
  minBpm: number;
  maxBpm: number;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
}

export interface AiMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  user: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

export interface Order {
  id: string;
  serviceTitle: string;
  clientName: string;
  clientAvatar: string;
  amount: number;
  status: 'pending' | 'active' | 'delivered' | 'completed' | 'cancelled';
  deadline: string;
  requirements: string;
  files?: { name: string; size: string; }[];
}

export interface Contract {
  id: string;
  title: string;
  type: 'exclusive' | 'lease' | 'service' | 'audio';
  status: 'draft' | 'signed' | 'pending';
  created: string;
  clientName?: string;
  content?: string; // Simulated PDF content
  
  // Editable fields
  royaltySplit?: number;
  revenueSplit?: number;
  notes?: string;
  terms?: string;
  distNotes?: string;
  pubNotes?: string;
  publisherName?: string;
  producerSignature?: string;
  clientSignature?: string;
}

export interface Note {
  id: string;
  title: string;
  preview: string;
  content: string;
  tags: string[];
  updated: string;
  attachedAudio?: string;
}

export type View = 
  | 'home' 
  | 'profile' 
  | 'upload' 
  | 'post-service'
  | 'notes'
  | 'contracts'
  | 'browse-talent' // New
  | 'collaborate'   // New
  | 'library'       // New
  | 'dashboard-overview'
  | 'dashboard-studio'
  | 'dashboard-sales'
  | 'dashboard-manage'
  | 'dashboard-wallet'
  | 'dashboard-orders'
  | 'dashboard-messages'
  | 'dashboard-analytics'
  | 'dashboard-settings'
  | 'dashboard-help';