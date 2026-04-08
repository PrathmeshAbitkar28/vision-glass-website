import { 
  Users, 
  MessageSquare, 
  Settings, 
  LayoutDashboard
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

const statistics = [
  { label: "Pending Inquiries", value: "12", icon: MessageSquare, delta: "+2 today", color: "text-sky-500", bg: "bg-sky-500/10" },
  { label: "Active Services", value: "8", icon: LayoutDashboard, delta: "Live", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "Staff Members", value: "4", icon: Users, delta: "Active", color: "text-amber-500", bg: "bg-amber-500/10" },
];

const Dashboard = () => {
  return (
    <div className="w-full space-y-8 pb-20 pt-44 lg:pt-28">
      {/* 🏛️ Professional Fixed Command Header */}
      <div className="fixed top-16 lg:top-0 left-0 right-0 lg:left-80 z-40 px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#1e3a5f', borderBottom: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(30,58,95,0.3)' }}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="bg-white/10 p-3 text-sky-400 border border-white/5">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Command Center</h1>
            <p className="text-[11px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" /> High-Performance Digital Management
            </p>
          </div>
        </div>
        <div className="bg-white/5 px-6 py-3 border border-white/10 flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">System Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-black text-white tracking-widest uppercase">Live</span>
          </div>
        </div>
      </div>

      {/* ── Welcome Narrative ── */}
      <div className="p-10 bg-white border border-slate-200 rounded-[2rem] shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 -rotate-45 translate-x-32 -translate-y-32" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none italic">Welcome Back, Command</h2>
                <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em] italic pl-1 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-sky-500" /> Managing Vision Glass Creation's Digital Presence
                </p>
              </div>
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 italic font-black text-slate-300">VG</div>
                  <div className="flex flex-col">
                      <span className="text-slate-900 font-black text-sm uppercase tracking-tight">Industrial Elite</span>
                      <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Active Session</span>
                  </div>
              </div>
          </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statistics.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="group border border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-2xl hover:border-sky-500/20 transition-all duration-500">
               <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                 <div className="flex flex-col">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                        {stat.label}
                    </CardTitle>
                    <div className="text-4xl font-black text-slate-950 leading-none mt-2 tracking-tighter italic">{stat.value}</div>
                 </div>
                 <div className={cn("p-5 rounded-3xl transition-all group-hover:rotate-12 group-hover:scale-110", stat.bg)}>
                   <Icon className={cn("w-8 h-8", stat.color)} />
                 </div>
               </CardHeader>
               <CardContent className="px-8 pb-8">
                  <div className="h-[1px] w-full bg-slate-100 mb-6" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 italic">
                     <span className={cn("px-2 py-0.5 rounded-md text-[9px]", stat.bg, stat.color)}>{stat.delta}</span> update pending
                  </p>
               </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Recent Activity ── */}
      <div className="grid grid-cols-1 gap-8">
        <Card className="border border-slate-200 shadow-sm rounded-[3rem] overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-10">
            <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                        <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-black text-slate-950 uppercase tracking-tight">Recent Contact Inquiries</CardTitle>
                </div>
                <CardDescription className="font-bold text-slate-400 uppercase text-xs tracking-[0.1em] italic">Latest messages from potential clients across Pune metropolitan region.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center text-center p-10 bg-slate-50/10">
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center mx-auto transition-transform hover:scale-110 duration-500">
                <MessageSquare className="w-10 h-10 text-slate-200" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-950 font-black text-2xl uppercase tracking-tighter italic">Registry Empty</p>
                <p className="text-slate-400 font-bold max-w-sm mx-auto text-xs uppercase tracking-widest leading-relaxed"> 
                  Check back later or refresh to synchronize with new client outreach.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

// Custom utility for class merging
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
