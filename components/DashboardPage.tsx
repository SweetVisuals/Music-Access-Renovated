
import React from 'react';
import { View, Project } from '../types';
import DashboardOverview from './DashboardPage'; // This will actually be the internal name if I kept the file but I am replacing the content.
// To avoid circular dependency or confusion, I'm implementing the layout here.
// The previous DashboardPage content is now considered the "Overview"
import { 
  DollarSign, 
  ShoppingCart, 
  Target, 
  AlertTriangle, 
  Users, 
  Briefcase, 
  Play, 
  Gem, 
  MoreHorizontal,
  Radio,
  ChevronDown,
  TrendingUp,
  User,
  Plus,
  FileText,
  Settings,
  Calendar,
  CreditCard,
  ArrowUpRight
} from 'lucide-react';
import Studio from './Studio';

interface DashboardPageProps {
    view: View;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ view, projects, setProjects }) => {

  // --- SUB-COMPONENTS FOR SIMPLE VIEWS ---
  
  const SalesView = () => (
      <div className="w-full max-w-[1600px] mx-auto p-8 animate-in fade-in duration-500">
          <h1 className="text-3xl font-black text-white mb-8">Sales History</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total Revenue" value="$12,450.00" icon={<DollarSign size={20}/>} trend="+12%" positive color="text-emerald-400" bgColor="bg-emerald-400/10"/>
              <StatCard title="Pending Payouts" value="$450.00" icon={<CreditCard size={20}/>} subtext="Next payout: Fri" color="text-blue-400" bgColor="bg-blue-400/10"/>
              <StatCard title="Avg. Order Value" value="$32.40" icon={<ShoppingCart size={20}/>} trend="-2%" positive={false} color="text-orange-400" bgColor="bg-orange-400/10"/>
          </div>
          <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden">
               <div className="p-6 border-b border-white/5">
                   <h3 className="text-sm font-bold text-white">Transactions</h3>
               </div>
               <table className="w-full text-left">
                   <thead className="bg-neutral-900/50 text-[10px] font-mono uppercase text-neutral-500">
                       <tr><th className="px-6 py-3">ID</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Status</th></tr>
                   </thead>
                   <tbody className="text-xs text-neutral-300">
                       {[1,2,3,4,5].map(i => (
                           <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                               <td className="px-6 py-4 font-mono text-neutral-500">#TRX-88{i}</td>
                               <td className="px-6 py-4">Oct {25-i}, 2025</td>
                               <td className="px-6 py-4">user{i}@example.com</td>
                               <td className="px-6 py-4 font-mono font-bold text-white">${(29.99 * i).toFixed(2)}</td>
                               <td className="px-6 py-4"><span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] uppercase font-bold">Paid</span></td>
                           </tr>
                       ))}
                   </tbody>
               </table>
          </div>
      </div>
  );

  const WalletView = () => (
      <div className="w-full max-w-4xl mx-auto p-8 animate-in fade-in duration-500">
          <h1 className="text-3xl font-black text-white mb-8">Wallet</h1>
          <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl"></div>
               <div className="relative z-10">
                   <div className="text-neutral-500 font-mono text-sm uppercase tracking-widest mb-2">Total Balance</div>
                   <div className="text-5xl font-black text-white mb-6">$4,520.50</div>
                   <div className="flex gap-4">
                       <button className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90">Withdraw Funds</button>
                       <button className="px-6 py-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 border border-white/10">View Statement</button>
                   </div>
               </div>
          </div>
          <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Payment Methods</h3>
              <div className="p-4 bg-[#0a0a0a] border border-neutral-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                      <div>
                          <div className="text-sm font-bold text-white">•••• •••• •••• 4242</div>
                          <div className="text-xs text-neutral-500">Expires 12/28</div>
                      </div>
                  </div>
                  <button className="text-xs text-neutral-400 hover:text-white">Edit</button>
              </div>
              <div className="p-4 bg-[#0a0a0a] border border-neutral-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-6 bg-[#003087] rounded flex items-center justify-center text-[8px] font-bold text-white">PAYPAL</div>
                      <div>
                          <div className="text-sm font-bold text-white">user@example.com</div>
                          <div className="text-xs text-neutral-500">Primary Payout Method</div>
                      </div>
                  </div>
                  <button className="text-xs text-neutral-400 hover:text-white">Edit</button>
              </div>
          </div>
      </div>
  );

  // --- ROUTING ---

  if (view === 'dashboard-studio') {
      return <Studio projects={projects} setProjects={setProjects} />;
  }

  if (view === 'dashboard-sales') {
      return <SalesView />;
  }

  if (view === 'dashboard-wallet') {
      return <WalletView />;
  }

  if (view === 'dashboard-orders') {
       return (
           <div className="w-full max-w-[1600px] mx-auto p-8">
               <h1 className="text-3xl font-black text-white mb-6">My Purchases</h1>
               <p className="text-neutral-500 mb-8">Access your purchased beats and sound kits.</p>
               <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-12 text-center">
                   <ShoppingCart size={48} className="mx-auto text-neutral-800 mb-4" />
                   <p className="text-neutral-500">No orders found in history.</p>
               </div>
           </div>
       );
  }

  // Default: Overview (The code from the original DashboardPage)
  
  return (
    <div className="w-full max-w-[1600px] mx-auto pb-32 pt-6 px-6 lg:px-8 animate-in fade-in duration-500">
       
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
           <div>
               <h1 className="text-3xl font-black text-white tracking-tight mb-1">Dashboard</h1>
               <p className="text-neutral-500 text-sm">Overview of your studio performance.</p>
           </div>

           <div className="flex items-center gap-3">
               <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs font-medium text-neutral-400">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span>System Online</span>
               </div>
               
               <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-xs font-bold text-white hover:bg-white/5 transition-colors">
                   <Calendar size={14} className="text-neutral-500" />
                   <span>Last 30 days</span>
                   <ChevronDown size={12} className="text-neutral-500 ml-1" />
               </button>
           </div>
       </div>

       {/* Top Stats Row */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
           <StatCard 
              title="Live Listeners" 
              value="842" 
              icon={<Radio size={20} />}
              live={true}
              color="text-red-500"
              bgColor="bg-red-500/10"
              borderColor="border-red-500/20"
           />
           <StatCard 
              title="Total Revenue" 
              value="$12,450" 
              icon={<DollarSign size={20} />}
              trend="+12.5%"
              positive
              color="text-emerald-400"
              bgColor="bg-emerald-400/10"
              borderColor="border-emerald-400/20"
           />
           <StatCard 
              title="Total Plays" 
              value="843.2K" 
              icon={<Play size={20} />}
              trend="+5.2%"
              positive
              color="text-blue-400"
              bgColor="bg-blue-400/10"
              borderColor="border-blue-400/20"
           />
           <StatCard 
              title="Active Orders" 
              value="14" 
              icon={<ShoppingCart size={20} />}
              trend="-2.1%"
              positive={false}
              color="text-orange-400"
              bgColor="bg-orange-400/10"
              borderColor="border-orange-400/20"
           />
           <StatCard 
              title="Gems Balance" 
              value="4,520" 
              icon={<Gem size={20} />}
              subtext="Approx. $45.20"
              color="text-purple-400"
              bgColor="bg-purple-400/10"
              borderColor="border-purple-400/20"
           />
       </div>

       {/* Main Content Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
           
           {/* Chart Section (Placeholder for now using CSS bars) */}
           <div className="lg:col-span-2 bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6 min-h-[300px] flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 z-10">
                    <div>
                        <h3 className="text-sm font-bold text-white">Revenue Analytics</h3>
                        <p className="text-[10px] text-neutral-500 font-mono">Income over time</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-neutral-500 hover:text-white transition-colors">
                        <MoreHorizontal size={16} />
                    </button>
                </div>

                {/* CSS Bar Chart Placeholder */}
                <div className="flex-1 flex items-end justify-between gap-2 mt-4 z-10 px-2">
                    {[40, 65, 45, 80, 55, 70, 60, 90, 75, 85, 65, 95].map((h, i) => (
                        <div key={i} className="w-full bg-neutral-800/50 rounded-t-sm hover:bg-primary/50 transition-colors relative group h-full flex items-end">
                            <div 
                                style={{ height: `${h}%` }} 
                                className="w-full bg-neutral-800 group-hover:bg-primary transition-all duration-500 rounded-t-sm"
                            ></div>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] py-1 px-2 rounded border border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                ${h * 100}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-mono text-neutral-600 border-t border-white/5 pt-2">
                    <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
                    <span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
                </div>

                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] pointer-events-none"></div>
           </div>

           {/* Recent Activity */}
           <div className="lg:col-span-1 bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6 flex flex-col">
               <div className="mb-6">
                   <h3 className="text-sm font-bold text-white">Recent Activity</h3>
                   <p className="text-[10px] text-neutral-500 font-mono">Latest notifications</p>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-6 relative">
                   <div className="absolute left-[11px] top-2 bottom-2 w-px bg-neutral-800"></div>
                   
                   <ActivityItem 
                      icon={<ShoppingCart size={12} />}
                      iconColor="bg-green-500" 
                      title="New Beat Sale"
                      desc="Sold 'Night Rider' to @User123"
                      time="2m ago"
                   />
                   <ActivityItem 
                      icon={<User size={12} />}
                      iconColor="bg-blue-500" 
                      title="New Follower"
                      desc="@ProdByJack started following you"
                      time="1h ago"
                   />
                   <ActivityItem 
                      icon={<DollarSign size={12} />}
                      iconColor="bg-emerald-500" 
                      title="Payout Processed"
                      desc="$450.00 sent to PayPal"
                      time="5h ago"
                   />
                   <ActivityItem 
                      icon={<AlertTriangle size={12} />}
                      iconColor="bg-orange-500" 
                      title="Dispute Opened"
                      desc="Order #12390 needs attention"
                      time="1d ago"
                   />
                    <ActivityItem 
                      icon={<Briefcase size={12} />}
                      iconColor="bg-purple-500" 
                      title="Service Update"
                      desc="Mixing Service updated"
                      time="2d ago"
                   />
               </div>
           </div>
       </div>

       {/* Bottom Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Orders Table */}
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <div>
                        <h3 className="text-sm font-bold text-white">Recent Orders</h3>
                        <p className="text-[10px] text-neutral-500 font-mono">Manage your sales</p>
                    </div>
                    <button className="text-[10px] font-bold text-primary hover:text-white transition-colors">VIEW ALL</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider border-b border-white/5 bg-neutral-900/50">
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Item</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-neutral-300">
                            <TableRow id="#ORD-001" item="Night Rider (Exclusive)" date="Oct 24, 2025" amount="$299.00" status="Completed" statusColor="text-green-400 bg-green-400/10" />
                            <TableRow id="#ORD-002" item="Soul Pack Vol. 1" date="Oct 23, 2025" amount="$29.99" status="Processing" statusColor="text-blue-400 bg-blue-400/10" />
                            <TableRow id="#ORD-003" item="Mixing Service" date="Oct 22, 2025" amount="$150.00" status="Pending" statusColor="text-orange-400 bg-orange-400/10" />
                            <TableRow id="#ORD-004" item="Trap Drums" date="Oct 21, 2025" amount="$19.99" status="Completed" statusColor="text-green-400 bg-green-400/10" />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1 bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6">
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-white">Quick Actions</h3>
                    <p className="text-[10px] text-neutral-500 font-mono">Shortcuts</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <QuickActionTile icon={<Plus size={18} />} label="New Upload" />
                    <QuickActionTile icon={<FileText size={18} />} label="Invoices" />
                    <QuickActionTile icon={<Settings size={18} />} label="Settings" />
                    <QuickActionTile icon={<Target size={18} />} label="Goals" />
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-800">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-4 relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <h4 className="text-primary font-bold text-sm mb-1">Pro Tips</h4>
                            <p className="text-[10px] text-neutral-400 leading-relaxed">
                                Complete your profile to increase visibility by 25%.
                            </p>
                        </div>
                        <Gem className="absolute -bottom-2 -right-2 text-primary/10 w-16 h-16 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
       </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, trend, positive, live, subtext, color, bgColor, borderColor }: any) => (
    <div className={`
        bg-[#0a0a0a] border rounded-xl p-5 transition-all duration-300 hover:shadow-lg group relative overflow-hidden
        ${borderColor ? borderColor : 'border-neutral-800'}
    `}>
        <div className={`absolute top-0 right-0 p-20 rounded-full blur-3xl opacity-5 transition-opacity group-hover:opacity-10 ${color ? color.replace('text-', 'bg-') : 'bg-white'}`}></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
                    {icon}
                </div>
                {live ? (
                    <div className="flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full text-red-500 bg-red-500/10 border border-red-500/20 animate-pulse">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></div>
                        LIVE
                    </div>
                ) : trend && (
                    <div className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${positive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                        {positive ? <TrendingUp size={10} className="mr-1" /> : <TrendingUp size={10} className="mr-1 rotate-180" />}
                        {trend}
                    </div>
                )}
            </div>
            
            <div>
                <div className="text-[11px] font-medium text-neutral-500 font-mono uppercase tracking-wider mb-0.5">{title}</div>
                <div className="text-2xl font-black text-white tracking-tight">{value}</div>
                {subtext && <div className="text-[10px] text-neutral-500 mt-1">{subtext}</div>}
            </div>
        </div>
    </div>
);

const ActivityItem = ({ icon, iconColor, title, desc, time }: any) => (
    <div className="relative flex gap-3 group cursor-pointer">
        <div className={`w-6 h-6 rounded-full ${iconColor} flex items-center justify-center text-black shadow-[0_0_10px_rgba(0,0,0,0.5)] shrink-0 relative z-10 ring-4 ring-[#0a0a0a]`}>
            {icon}
        </div>
        <div className="flex-1 min-w-0 pb-4 border-b border-neutral-800/50 group-last:border-0">
            <div className="flex justify-between items-start">
                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">{title}</p>
                <span className="text-[9px] text-neutral-600 whitespace-nowrap ml-2">{time}</span>
            </div>
            <p className="text-[11px] text-neutral-500 truncate">{desc}</p>
        </div>
    </div>
);

const TableRow = ({ id, item, date, amount, status, statusColor }: any) => (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
        <td className="px-6 py-3 font-mono text-neutral-500 group-hover:text-white transition-colors">{id}</td>
        <td className="px-6 py-3 font-bold text-white">{item}</td>
        <td className="px-6 py-3 text-neutral-500">{date}</td>
        <td className="px-6 py-3 font-mono text-white">{amount}</td>
        <td className="px-6 py-3 text-right">
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                {status}
            </span>
        </td>
    </tr>
);

const QuickActionTile = ({ icon, label }: any) => (
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:scale-[1.02] transition-all group">
        <div className="text-neutral-400 group-hover:text-primary transition-colors">
            {icon}
        </div>
        <span className="text-[10px] font-bold text-neutral-300 group-hover:text-white uppercase tracking-wider">{label}</span>
    </button>
);

export default DashboardPage;
