import { useState, useEffect } from "react";
import { 
  Target, 
  Award,
  Plus,
  Trash2,
  Save,
  Loader2,
  History,
  Users,
  Building2,
  PenTool,
  Hammer,
  HardHat,
  Stethoscope,
  GraduationCap,
  Factory,
  CheckCircle,
  Briefcase,
  Info,
  ChevronRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";
import { getSiteMetadata, updateSiteMetadata } from "@/shared/lib/firestore-service";

const AboutManagement = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSiteMetadata("about");
        if (result) setData(result);
      } catch (err) {
        toast.error("Failed to fetch about data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteMetadata("about", data);
      toast.success("About page synchronization complete!");
    } catch (err) {
      toast.error("Cloud synchronization failed. Check Firestore Rules.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center font-black animate-pulse text-sky-500 uppercase tracking-widest italic shadow-xl rounded-3xl bg-slate-50 border-2 border-slate-100">
       Synchronizing Brand Identity with Cloud Firestore...
    </div>
  );

  return (
    <div className="w-full space-y-8 pb-20 pt-44 lg:pt-28">
      {/* 🏛️ Professional Fixed Command Header */}
      <div className="fixed top-16 lg:top-0 left-0 right-0 lg:left-80 z-40 px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#1e3a5f', borderBottom: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(30,58,95,0.3)' }}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="bg-white/10 p-3 text-sky-400 border border-white/5">
            <Info className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">About Us Policy Center</h1>
            <p className="text-[11px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
                 <History className="w-3.5 h-3.5" /> High-Performance Brand Deployment
            </p>
          </div>
        </div>
        <Button 
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="rounded-none bg-sky-600 text-white hover:bg-sky-700 h-16 w-full md:w-auto font-black px-12 gap-4 transition-all shadow-xl active:scale-95 text-lg group tracking-widest uppercase"
        >
            {saving ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <Save className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />}
            {saving ? "Publishing Data..." : "Push Changes Live"}
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 gap-8">
            
            {/* 1. Core Identity & Experience (Increased Text Size) */}
            <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 border-b border-slate-800 py-4 px-8">
                   <div className="flex items-center gap-4">
                      <History className="w-5 h-5 text-sky-400" />
                      <CardTitle className="text-base font-black tracking-widest text-white uppercase">Brand Narrative Core</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Experience Counter</label>
                            <Input 
                                value={data?.yearsExperience || ""}
                                onChange={(e) => setData({...data, yearsExperience: e.target.value})}
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-xl text-slate-900 px-6 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2.5">
                             <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Leader Authority</label>
                             <Input 
                                value={data?.leaderName || ""}
                                onChange={(e) => setData({...data, leaderName: e.target.value})}
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-lg text-slate-900 px-6 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2.5">
                             <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Project Milestone</label>
                             <Input 
                                value={data?.projectCount || "500+ Projects"}
                                onChange={(e) => setData({...data, projectCount: e.target.value})}
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-lg text-emerald-600 px-6 shadow-sm"
                                placeholder="e.g. 500+ Projects"
                            />
                        </div>
                        <div className="space-y-2.5">
                             <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Service Slogan</label>
                             <Input 
                                value={data?.directLiaison || "Direct Liaison"}
                                onChange={(e) => setData({...data, directLiaison: e.target.value})}
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-lg text-sky-600 px-6 shadow-sm"
                                placeholder="e.g. Direct Liaison"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        <div className="space-y-2.5">
                             <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Primary Header</label>
                             <Input 
                                value={data?.introTitle || ""}
                                onChange={(e) => setData({...data, introTitle: e.target.value})}
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-xl text-slate-900 px-6 uppercase tracking-tighter"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Primary Brand Narrative</label>
                            <Textarea 
                                value={data?.introText1 || ""}
                                onChange={(e) => setData({...data, introText1: e.target.value})}
                                className="min-h-[160px] rounded-2xl border-2 border-slate-100 font-bold text-slate-600 text-lg leading-relaxed p-6 focus:border-sky-500"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 pl-1">Quality & Trust Factor</label>
                            <Textarea 
                                value={data?.introText2 || ""}
                                onChange={(e) => setData({...data, introText2: e.target.value})}
                                className="min-h-[160px] rounded-2xl border-2 border-slate-100 font-bold text-slate-600 text-lg leading-relaxed p-6 focus:border-sky-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Competitive Pillars (Increased Text Size) */}
            <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 border-b border-slate-800 py-4 px-8 flex flex-row items-center justify-between flex-nowrap gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <Target className="w-5 h-5 text-sky-400 shrink-0" />
                        <CardTitle className="text-base font-black tracking-widest text-white uppercase truncate">Competitive Advantages</CardTitle>
                    </div>
                    <button 
                        className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95 whitespace-nowrap"
                        onClick={() => {
                            const newWC = data.whyChoose ? [...data.whyChoose, { title: "New Pillar", desc: "" }] : [{ title: "New Pillar", desc: "" }];
                            setData({...data, whyChoose: newWC});
                            setTimeout(() => {
                                const container = document.getElementById('pillar-container');
                                if (container) container.scrollIntoView({ behavior: 'smooth', block: 'end' });
                            }, 100);
                        }}
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Pillar
                    </button>
                </CardHeader>
                <CardContent className="p-8" id="pillar-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {data?.whyChoose?.map((item: any, idx: number) => (
                            <div key={idx} className="p-8 rounded-3xl bg-slate-50/50 border-2 border-slate-100 space-y-4 group transition-all hover:bg-white hover:shadow-xl hover:border-emerald-500/20">
                                <div className="flex items-center justify-between">
                                    <Input 
                                        value={item.title}
                                        onChange={(e) => {
                                            const newWC = [...data.whyChoose];
                                            newWC[idx].title = e.target.value;
                                            setData({...data, whyChoose: newWC});
                                        }}
                                        className="h-12 border-2 border-slate-200 bg-white rounded-xl text-lg font-black text-slate-900 px-6 uppercase tracking-tight"
                                    />
                                    <button 
                                        onClick={() => {
                                            if (confirm("Remove this advantage pillar?")) {
                                                const newWC = data.whyChoose.filter((_: any, i: number) => i !== idx);
                                                setData({...data, whyChoose: newWC});
                                            }
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 transition-all bg-white rounded-lg shadow-sm border border-slate-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <Textarea 
                                    value={item.desc}
                                    onChange={(e) => {
                                        const newWC = [...data.whyChoose];
                                        newWC[idx].desc = e.target.value;
                                        setData({...data, whyChoose: newWC});
                                    }}
                                    className="border-2 border-slate-100 bg-white rounded-xl font-bold p-6 text-slate-500 text-base leading-relaxed min-h-[100px]"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* 3. Client Sectors — Fully Dynamic */}
                <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white lg:col-span-1">
                    <CardHeader className="bg-slate-900 border-b border-slate-800 py-4 px-6 flex flex-row items-center justify-between flex-nowrap gap-2">
                        <CardTitle className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2 whitespace-nowrap">
                           <Users className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" /> Sectors
                        </CardTitle>
                        <button
                            className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-all shadow-lg active:scale-95 whitespace-nowrap"
                            onClick={() => {
                                const label = prompt("Enter sector name:");
                                if (label && label.trim()) {
                                    const newTabs = data.clientTabs
                                        ? [...data.clientTabs, { label: label.trim(), clients: [] }]
                                        : [{ label: label.trim(), clients: [] }];
                                    setData({ ...data, clientTabs: newTabs });
                                    setActiveTab(newTabs.length - 1);
                                    setTimeout(() => {
                                        const container = document.getElementById('sector-list');
                                        if (container) container.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                    }, 100);
                                }
                            }}
                        >
                            <Plus className="w-3 h-3" /> Add Sector
                        </button>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2" id="sector-list">
                        {data?.clientTabs?.map((tab: any, idx: number) => (
                            <div key={idx} className={`flex items-center gap-2 rounded-xl px-2 py-1 transition-all ${activeTab === idx ? "bg-sky-50 ring-2 ring-sky-400/30" : "hover:bg-slate-50"}`}>
                                <button
                                    onClick={() => setActiveTab(idx)}
                                    className="flex-1 text-left px-3 py-3 text-xs font-black uppercase tracking-widest text-slate-700 truncate"
                                >
                                    {tab.label}
                                </button>
                                <button
                                    onClick={() => {
                                        const newLabel = prompt("Rename sector:", tab.label);
                                        if (newLabel && newLabel.trim()) {
                                            const newTabs = [...data.clientTabs];
                                            newTabs[idx].label = newLabel.trim();
                                            setData({ ...data, clientTabs: newTabs });
                                        }
                                    }}
                                    title="Rename"
                                    className="p-1.5 text-sky-500 hover:bg-sky-50 transition-all rounded-md"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Delete sector "${tab.label}" and all its clients?`)) {
                                            const newTabs = data.clientTabs.filter((_: any, i: number) => i !== idx);
                                            setData({ ...data, clientTabs: newTabs });
                                            setActiveTab(Math.max(0, activeTab - 1));
                                        }
                                    }}
                                    title="Delete"
                                    className="p-1.5 text-red-500 hover:bg-red-50 transition-all rounded-md"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {!data?.clientTabs?.length && (
                            <p className="text-center text-slate-400 italic text-xs py-6 uppercase tracking-widest">No sectors yet</p>
                        )}
                    </CardContent>
                </Card>

                {/* 4. Partners Data Hub */}
                <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white lg:col-span-3">
                    <CardHeader className="bg-slate-900 border-b border-slate-800 py-4 px-8 flex flex-row items-center justify-between flex-nowrap gap-4">
                         <div className="flex items-center gap-3 min-w-0">
                            <div className="w-1.5 h-6 bg-sky-500 rounded-full shrink-0" />
                            <h3 className="text-base font-black text-white uppercase tracking-tighter italic truncate">
                                {data?.clientTabs?.[activeTab]?.label || "Select Sector"}
                            </h3>
                         </div>
                         <button 
                            className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95 whitespace-nowrap"
                            onClick={() => {
                                const name = prompt(`Add client to ${data?.clientTabs?.[activeTab]?.label}:`);
                                if (name && name.trim()) {
                                    const newTabs = [...data.clientTabs];
                                    if (!newTabs[activeTab].clients) newTabs[activeTab].clients = [];
                                    newTabs[activeTab].clients.unshift(name.trim());
                                    setData({...data, clientTabs: newTabs});
                                    setTimeout(() => {
                                        const container = document.getElementById('client-table-top');
                                        if (container) container.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 100);
                                }
                            }}
                            disabled={!data?.clientTabs?.length}
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Client
                        </button>
                    </CardHeader>
                    <CardContent className="p-0" id="client-table-top">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Client / Partner Name</th>
                                        <th className="px-8 py-4 text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.clientTabs?.[activeTab]?.clients?.map((client: string, cIdx: number) => (
                                        <tr key={cIdx} className="border-b border-slate-50 hover:bg-slate-50/80 group transition-all">
                                            <td className="px-8 py-5 text-base font-bold text-slate-900">{client}</td>
                                            <td className="px-8 py-5 text-right">
                                                <button 
                                                    onClick={() => {
                                                        const newTabs = [...data.clientTabs];
                                                        newTabs[activeTab].clients.splice(cIdx, 1);
                                                        setData({...data, clientTabs: newTabs});
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 transition-all bg-white rounded-lg shadow-sm border border-red-100"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {!data?.clientTabs?.[activeTab]?.clients?.length && (
                                        <tr>
                                            <td colSpan={2} className="px-8 py-20 text-center text-slate-300 italic font-bold uppercase tracking-widest">
                                                {data?.clientTabs?.length ? "No clients in this sector yet — add one above" : "Create a sector first"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 5. Industrial Sectors (Increased Text Size) */}
            <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 border-b border-slate-800 py-4 px-8 flex flex-row items-center justify-between flex-nowrap gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <Briefcase className="w-5 h-5 text-sky-400 shrink-0" />
                        <CardTitle className="text-base font-black tracking-widest text-white uppercase truncate">Global Industry Sectors</CardTitle>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95 whitespace-nowrap"
                        onClick={() => {
                            const title = prompt("Enter industry sector name:");
                            if (title && title.trim()) {
                                const newIndustries = data.industries ? [...data.industries, { title: title.trim() }] : [{ title: title.trim() }];
                                setData({...data, industries: newIndustries});
                                setTimeout(() => {
                                    const container = document.getElementById('industry-grid');
                                    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                }, 100);
                            }
                        }}
                    >
                        <Plus className="w-3.5 h-3.5" /> Register Market
                    </button>
                </CardHeader>
                <CardContent className="p-8" id="industry-grid">
                    <div className="flex flex-wrap gap-3">
                        {data?.industries?.map((ind: any, i: number) => (
                            <div key={i} className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border-2 border-slate-100 group hover:border-sky-500/20 hover:shadow-lg transition-all active:scale-95">
                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{ind.title}</span>
                                <button 
                                    onClick={() => {
                                        const newIndustries = data.industries.filter((_: any, idx: number) => idx !== i);
                                        setData({...data, industries: newIndustries});
                                    }}
                                    className="p-1 text-red-500 hover:scale-110 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
      </div>
    </div>
  );
};

export default AboutManagement;
