import { useState, useEffect } from "react";
import { 
  Save, 
  Loader2,
  Home,
  Monitor,
  ImageIcon,
  Plus,
  Trash2,
  Settings2,
  Layers,
  Building2,
  Frame,
  PanelTop,
  Lamp,
  Paintbrush,
  Shield,
  Eye,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";
import { 
  getSiteMetadata, 
  updateSiteMetadata,
  uploadFile
} from "@/shared/lib/firestore-service";

const BLUE = "#0ea5e9";
const ICON_MAP: Record<string, any> = {
  "PanelTop": PanelTop,
  "Frame": Frame,
  "Building2": Building2,
  "Layers": Layers,
  "Lamp": Lamp,
  "Paintbrush": Paintbrush,
  "Shield": Shield
};

const DEFAULT_HOME_DATA = {
    heroTitle1: "Expert in Window",
    heroTitle2: "& Glass Solutions",
    heroSubtitle: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
    heroImages: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90",
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
    ],
    pageHeroImages: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90",
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
    ],
    servicesTitle: "Our Services",
    servicesSubtitle: "End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline.",
    services: [],
    
    uspTitle: "Our Operational Promise",
    uspPoints: ["ISO Standards", "Quality Verified", "On-Time Delivery"],
    uspBackgroundImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90",
    
    trustTitle: "Sector Expertise",
    trustSubtitle: "Precision engineering across high-impact industries.",
    trustedBy: [],
    
    enquiryCTATitle: "Need a Custom Engineered Solution?",
    enquiryCTASubtitle: "How to Refer Me — Bespoke glass architectures for architects, builders, and schools across Pune.",
    enquiryCTAItems: [
        "Are you looking for office cabin or glass partition work?",
        "Do you need to replace broken cabin window glass?",
        "Are you looking for soundproof glass or window solutions?"
    ],
    
    referTitle: "Know Someone Who Needs Us?",
    referSubtitle: "Help them connect with the right glass solution.",
    referCards: []
};

const HomeManagement = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        setLoading(true);
        try {
            const result = await getSiteMetadata("home");
            if (result) {
                setData({ ...DEFAULT_HOME_DATA, ...result });
            } else {
                setData(DEFAULT_HOME_DATA);
            }
        } catch (err) {
            setData(DEFAULT_HOME_DATA);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSiteMetadata("home", data);
            toast.success("Design Live and Published");
        } catch (err) {
            toast.error("Cloud Sync Failure");
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string, field: string, index?: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadId = index !== undefined ? `${field}-${index}` : field;
        setUploading(uploadId);
        try {
            const url = await uploadFile(file, path);
            if (index !== undefined) {
                const newList = [...data[field]];
                newList[index] = url;
                setData({ ...data, [field]: newList });
            } else {
                setData({ ...data, [field]: url });
            }
            toast.success("Visual Asset Staged");
        } catch (err) {
            toast.error("Upload Failure");
        } finally {
            setUploading(null);
        }
    };

    const handleFileUploadComplex = async (e: React.ChangeEvent<HTMLInputElement>, path: string, field: string, index: number, subfield: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(`${field}-${index}`);
        try {
            const url = await uploadFile(file, path);
            const newList = [...data[field]];
            newList[index] = { ...newList[index], [subfield]: url };
            setData({ ...data, [field]: newList });
            toast.success("Asset Staged");
        } catch (err) {
            toast.error("Upload Failure");
        } finally {
            setUploading(null);
        }
    };

    const updateListItem = (field: string, index: number, subfield: string, value: any) => {
        const newList = [...data[field]];
        newList[index] = { ...newList[index], [subfield]: value };
        setData({ ...data, [field]: newList });
    };

    const addListItem = (field: string, defaultValue: any) => {
        setData({ ...data, [field]: [...(data[field] || []), defaultValue] });
    };

    const removeListItem = (field: string, index: number) => {
        const newList = data[field].filter((_: any, i: number) => i !== index);
        setData({ ...data, [field]: newList });
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
            <Loader2 className="w-12 h-12 animate-spin text-sky-500" />
            <p className="font-black uppercase tracking-[0.3em] text-slate-400 italic">Synchronizing Visual Engine</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-32">
            {/* ── LIVE HEADER & COMMANDS ── */}
            <div className="fixed top-0 left-0 right-0 lg:left-80 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 sm:px-12 py-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                        <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 leading-none uppercase tracking-tight">Home Visual Editor</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                             <Eye className="w-3 h-3" /> WYSIWYG Experience Mode
                        </p>
                    </div>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={saving || !!uploading}
                    className="h-12 px-8 bg-sky-600 hover:bg-sky-500 rounded-xl font-black uppercase tracking-widest gap-2 shadow-xl"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Publish Changes
                </Button>
            </div>

            <div className="w-full pt-32 px-4 sm:px-10 lg:px-14">
                
                {/* ── 1. HERO (SECTION FLOW) ── */}
                <div className="space-y-12 mb-24">
                    <div className="flex flex-col items-center text-center space-y-4 mb-10">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-[2px] bg-sky-500" />
                             <span className="text-sky-600 text-[11px] font-black uppercase tracking-[0.3em]">Section 01: Hero Presence</span>
                             <div className="w-8 h-[2px] bg-sky-500" />
                        </div>
                        <div className="flex gap-4 w-full max-w-4xl">
                            <Input value={data.heroTitle1} onChange={(e) => setData({...data, heroTitle1: e.target.value})} className="h-14 text-center text-2xl font-black text-slate-900 border-b-2 border-slate-200 rounded-none bg-transparent focus:border-sky-500 transition-all uppercase" />
                            <Input value={data.heroTitle2} onChange={(e) => setData({...data, heroTitle2: e.target.value})} className="h-14 text-center text-2xl font-black text-slate-900 border-b-2 border-slate-200 rounded-none bg-transparent focus:border-sky-500 transition-all uppercase" />
                        </div>
                        <Textarea value={data.heroSubtitle} onChange={(e) => setData({...data, heroSubtitle: e.target.value})} className="h-16 text-center text-lg font-bold text-slate-400 border-0 bg-transparent focus:ring-0 shadow-none resize-none max-w-3xl" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.heroImages?.map((url: string, idx: number) => (
                            <div key={idx} className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg group border border-slate-100">
                                 <img src={url} className="w-full h-full object-cover" />
                                 {uploading === `heroImages-${idx}` ? (
                                     <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
                                         <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
                                     </div>
                                 ) : (
                                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "hero", "heroImages", idx)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <ImageIcon className="w-8 h-8 text-white" />
                                     </div>
                                 )}
                                 <Button onClick={() => removeListItem('heroImages', idx)} size="icon" variant="destructive" className="absolute top-3 right-3 h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 shadow-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                 </Button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('heroImages', "")} className="border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all hover:bg-slate-50 min-h-[150px]">
                            <Plus className="w-10 h-10" />
                            <span className="font-black uppercase tracking-widest text-[10px]">Add Slide</span>
                        </button>
                    </div>
                </div>
                
                {/* ── 2. SERVICES (SECTION FLOW) ── */}
                <div className="space-y-12 mb-24">
                    <div className="flex flex-col items-center text-center space-y-4 mb-10">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-[2px] bg-sky-500" />
                             <span className="text-sky-600 text-[11px] font-black uppercase tracking-[0.3em]">Section 02: Services</span>
                             <div className="w-8 h-[2px] bg-sky-500" />
                        </div>
                        <Input value={data.servicesTitle} onChange={(e) => setData({...data, servicesTitle: e.target.value})} className="h-16 text-center text-4xl font-black text-slate-900 border-0 bg-transparent focus:ring-0 uppercase tracking-tighter" />
                        <Textarea value={data.servicesSubtitle} onChange={(e) => setData({...data, servicesSubtitle: e.target.value})} className="h-14 text-center text-lg font-bold text-slate-400 border-0 bg-transparent focus:ring-0 shadow-none resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {data.services?.map((s: any, idx: number) => (
                            <div key={idx} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                <div className="absolute top-3 right-3 z-20">
                                    <Button onClick={() => removeListItem('services', idx)} variant="destructive" size="icon" className="h-8 w-8 rounded-xl"><Trash2 className="w-4 h-4" /></Button>
                                </div>
                                <div className="relative h-48 bg-slate-100 overflow-hidden">
                                     <img src={s.image} className="w-full h-full object-cover" />
                                     {uploading === `services-${idx}` ? (
                                         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
                                             <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
                                         </div>
                                     ) : (
                                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <input type="file" accept="image/*" onChange={(e) => handleFileUploadComplex(e, "homepage", "services", idx, "image")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full">Change Asset</span>
                                         </div>
                                     )}
                                </div>
                                <div className="p-8 space-y-6">
                                     <div className="space-y-1">
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Asset Link (URL)</span>
                                         <Input value={s.image} onChange={(e) => updateListItem("services", idx, "image", e.target.value)} className="h-9 text-[11px] font-medium text-sky-600 bg-slate-50 border-slate-100 rounded-lg focus:ring-sky-500" placeholder="Paste image link..." />
                                     </div>
                                     <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
                                         <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                                              <select value={s.icon} onChange={(e) => updateListItem("services", idx, "icon", e.target.value)} className="w-full h-full opacity-0 absolute inset-0 cursor-pointer" />
                                              {(() => { const Icon = ICON_MAP[s.icon] || Settings2; return <Icon className="w-5 h-5 text-sky-500" />; })()}
                                         </div>
                                         <Input value={s.title} onChange={(e) => updateListItem("services", idx, "title", e.target.value)} className="h-10 font-black text-slate-900 uppercase border-0 p-0 focus-visible:ring-0 text-lg" />
                                     </div>
                                     <Textarea value={s.desc} onChange={(e) => updateListItem("services", idx, "desc", e.target.value)} className="min-h-[80px] text-sm font-bold text-slate-400 border-0 p-0 focus-visible:ring-0 resize-none leading-relaxed" />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => addListItem('services', { title: "Elite Service", desc: "Crafting architectural excellence...", image: "", icon: "PanelTop" })} className="border-2 border-dashed border-slate-200 rounded-[2.5rem] min-h-[400px] flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all hover:bg-white shadow-sm">
                            <Plus className="w-12 h-12" />
                            <span className="font-black uppercase tracking-widest text-[11px]">Add Service Node</span>
                        </button>
                    </div>
                </div>

                {/* ── 3. PROMISE (SECTION FLOW) ── */}
                <div className="space-y-12 mb-24">
                    <div className="relative bg-gradient-to-br from-slate-900 to-sky-950 rounded-[3.5rem] p-12 md:p-24 text-white shadow-2xl overflow-hidden border border-white/10">
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <img src={data.uspBackgroundImage} className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-10 space-y-10">
                             <div className="flex items-center gap-6">
                                <span className="bg-sky-500 h-[2px] w-12 rounded-full" />
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-sky-400">Section 03: Operational Promise</span>
                                <span className="bg-sky-500 h-[2px] w-12 rounded-full" />
                             </div>
                             <Input value={data.uspTitle} onChange={(e) => setData({...data, uspTitle: e.target.value})} className="h-20 text-3xl md:text-5xl font-black bg-white/5 border-white/10 rounded-3xl p-8 focus:border-sky-500 text-center" />
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/10">
                                {data.uspPoints?.map((pt: string, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-center group bg-white/5 p-4 rounded-2xl border border-white/5">
                                         <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0"><CheckCircle className="w-5 h-5" /></div>
                                         <Input value={pt} onChange={(e) => {
                                             const newPts = [...data.uspPoints];
                                             newPts[idx] = e.target.value;
                                             setData({...data, uspPoints: newPts});
                                         }} className="bg-transparent border-0 p-0 h-10 font-bold text-white uppercase text-sm focus-visible:ring-0" />
                                         <Button onClick={() => {
                                             const newPts = data.uspPoints.filter((_: any, i: number) => i !== idx);
                                             setData({...data, uspPoints: newPts});
                                         }} variant="ghost" size="icon" className="h-8 w-8 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></Button>
                                    </div>
                                ))}
                                <Button onClick={() => setData({...data, uspPoints: [...(data.uspPoints || []), "Quality Performance Matrix"]})} variant="ghost" className="border-2 border-dashed border-white/20 h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-sky-400 hover:border-sky-500">
                                    <Plus className="w-5 h-5 mr-3" /> Add Promise Metric
                                </Button>
                             </div>
                             
                             <div className="relative h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                                 <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "homepage", "uspBackgroundImage")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                 <ImageIcon className="w-5 h-5 mr-3 text-sky-400" /> 
                                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">Change Atmospheric Background</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* ── 4. TRUST (SECTION FLOW) ── */}
                <div className="space-y-12 mb-24">
                    <div className="flex flex-col items-center text-center space-y-4 mb-10">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-[2px] bg-emerald-500" />
                             <span className="text-emerald-600 text-[11px] font-black uppercase tracking-[0.3em]">Section 04: Sector Expertise</span>
                             <div className="w-8 h-[2px] bg-emerald-500" />
                        </div>
                        <Input value={data.trustTitle} onChange={(e) => setData({...data, trustTitle: e.target.value})} className="h-16 text-center text-4xl font-black text-slate-900 border-0 bg-transparent focus:ring-0 uppercase tracking-tighter" />
                        <Input value={data.trustSubtitle} onChange={(e) => setData({...data, trustSubtitle: e.target.value})} className="h-10 text-center text-lg font-bold text-slate-400 border-0 bg-transparent focus:ring-0" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                         {data.trustedBy?.map((item: any, idx: number) => (
                             <div key={idx} className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-md hover:shadow-xl transition-all">
                                 <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-5">
                                      <img src={item.image} className="w-full h-full object-cover" />
                                      {uploading === `trustedBy-${idx}` ? (
                                          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
                                              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                                          </div>
                                      ) : (
                                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                              <input type="file" accept="image/*" onChange={(e) => handleFileUploadComplex(e, "homepage", "trustedBy", idx, "image")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                              <ImageIcon className="w-6 h-6 text-white" />
                                          </div>
                                      )}
                                 </div>
                                 <Input value={item.label} onChange={(e) => updateListItem("trustedBy", idx, "label", e.target.value)} className="h-8 font-black text-slate-900 border-0 p-0 text-center mb-1 uppercase text-sm" />
                                 <Input value={item.image} onChange={(e) => updateListItem("trustedBy", idx, "image", e.target.value)} className="h-7 text-center text-[10px] text-sky-600 font-bold border-0 bg-slate-50 rounded-md mb-1" placeholder="Asset Link" />
                                 <Input value={item.desc} onChange={(e) => updateListItem("trustedBy", idx, "desc", e.target.value)} className="h-8 font-bold text-slate-400 border-0 p-0 text-center text-[11px]" />
                                 <Button onClick={() => removeListItem('trustedBy', idx)} variant="ghost" size="icon" className="absolute -top-2 -right-2 bg-white shadow-md rounded-full text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></Button>
                             </div>
                         ))}
                         <button onClick={() => addListItem('trustedBy', { label: "Designers", desc: "Leading Firms", image: "" })} className="border-2 border-dashed border-slate-200 rounded-[2.5rem] aspect-[4/5] flex flex-col items-center justify-center gap-3 text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-all">
                             <Plus className="w-8 h-8" />
                         </button>
                    </div>
                </div>

                {/* ── 5. GLOBAL CTA (ENQUIRY) ── */}
                <div className="space-y-12 mb-24">
                    <div className="bg-[#020617] rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl border border-white/5">
                        <div className="absolute inset-0 bg-sky-500/5" />
                        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-sky-400 text-[11px] font-black uppercase tracking-[0.4em] italic">Section 05: Work with Experts</span>
                            </div>
                            <Input value={data.enquiryCTATitle} onChange={(e) => setData({...data, enquiryCTATitle: e.target.value})} className="h-20 text-3xl md:text-6xl font-black bg-white/5 border-white/10 rounded-2xl p-8 focus:border-sky-500 text-center text-white uppercase tracking-tighter" />
                            <Textarea value={data.enquiryCTASubtitle} onChange={(e) => setData({...data, enquiryCTASubtitle: e.target.value})} className="h-16 text-center text-lg font-bold text-white/50 border-0 bg-transparent focus:ring-0 shadow-none resize-none" />
                            
                            <div className="flex flex-wrap items-center justify-center gap-6 pt-10 border-t border-white/5">
                                {data.enquiryCTAItems?.map((pt: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 group/item">
                                        <CheckCircle className="w-4 h-4 text-sky-500" />
                                        <Input value={pt} onChange={(e) => {
                                             const newPts = [...data.enquiryCTAItems];
                                             newPts[idx] = e.target.value;
                                             setData({...data, enquiryCTAItems: newPts});
                                         }} className="bg-transparent border-0 p-0 h-6 font-black tracking-widest uppercase text-[10px] text-white/40 focus-visible:ring-0 w-32" />
                                         <Button onClick={() => {
                                             const newPts = data.enquiryCTAItems.filter((_: any, i: number) => i !== idx);
                                             setData({...data, enquiryCTAItems: newPts});
                                         }} variant="ghost" size="icon" className="h-5 w-5 text-red-500 opacity-0 group-hover/item:opacity-100"><Trash2 className="w-3 h-3" /></Button>
                                    </div>
                                ))}
                                <Button onClick={() => setData({...data, enquiryCTAItems: [...(data.enquiryCTAItems || []), "Quality Verified"]})} variant="ghost" className="h-10 px-6 rounded-full border border-dashed border-white/20 text-[10px] font-black uppercase text-white/30 hover:text-sky-400">
                                    <Plus className="w-4 h-4 mr-2" /> Add Merit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 6. REFERRAL MATRIX (SECTION FLOW) ── */}
                <div className="space-y-12 mb-24">
                     <div className="flex flex-col items-center text-center space-y-4 mb-10">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-[2px] bg-sky-500" />
                             <span className="text-sky-600 text-[11px] font-black uppercase tracking-[0.3em]">Section 06: Referral Matrix</span>
                             <div className="w-8 h-[2px] bg-sky-500" />
                        </div>
                        <Input value={data.referTitle} onChange={(e) => setData({...data, referTitle: e.target.value})} className="h-16 text-center text-4xl font-black text-slate-900 border-0 bg-transparent focus:ring-0 uppercase tracking-tighter" />
                        <Textarea value={data.referSubtitle} onChange={(e) => setData({...data, referSubtitle: e.target.value})} className="h-14 text-center text-lg font-bold text-slate-400 border-0 bg-transparent focus:ring-0 shadow-none resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {data.referCards?.map((card: any, idx: number) => (
                            <div key={idx} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-lg group relative hover:shadow-2xl transition-all">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-sky-50 flex items-center justify-center mb-6 relative">
                                        <select value={card.icon} onChange={(e) => updateListItem("referCards", idx, "icon", e.target.value)} className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-10" />
                                        {(() => { const Icon = ICON_MAP[card.icon] || Shield; return <Icon className="w-7 h-7 text-sky-500" />; })()}
                                    </div>
                                    <Input value={card.question} onChange={(e) => updateListItem("referCards", idx, "question", e.target.value)} className="h-10 text-xl font-black text-slate-900 text-center uppercase border-0 p-0 focus-visible:ring-0" />
                                    <Textarea value={card.sub} onChange={(e) => updateListItem("referCards", idx, "sub", e.target.value)} className="min-h-[60px] text-[15px] font-bold text-slate-400 text-center border-0 p-0 focus-visible:ring-0 resize-none" />
                                </div>
                                <Button onClick={() => removeListItem('referCards', idx)} variant="ghost" size="icon" className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('referCards', { question: "Quick Inquiry?", sub: "Connect with our technical desk for custom solutions.", icon: "Shield" })} className="border-2 border-dashed border-slate-100 rounded-[2.5rem] h-auto min-h-[300px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-sky-500 hover:border-sky-500 transition-all hover:bg-white shadow-sm">
                            <Plus className="w-12 h-12" />
                            <span className="font-black uppercase tracking-widest text-[11px]">Add Referral Card</span>
                        </button>
                    </div>
                </div>

                {/* ── 7. GLOBAL ASSETS (BANNERS) ── */}
                <div className="bg-white rounded-[3.5rem] p-12 md:p-20 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-1.5 h-12 bg-indigo-500 rounded-full" />
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Internal Page Banners</h3>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Site-wide architectural assets for inner pages</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
                        {data.pageHeroImages?.map((url: string, idx: number) => (
                            <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group border border-slate-100">
                                 <img src={url} className="w-full h-full object-cover" />
                                 {uploading === `pageHeroImages-${idx}` ? (
                                     <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center">
                                         <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                                     </div>
                                 ) : (
                                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "pagehero", "pageHeroImages", idx)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <ImageIcon className="w-8 h-8 text-white" />
                                     </div>
                                 )}
                                 <Button onClick={() => removeListItem('pageHeroImages', idx)} size="icon" variant="destructive" className="absolute top-3 right-3 h-7 w-7 rounded-xl opacity-0 group-hover:opacity-100 shadow-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                 </Button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('pageHeroImages', "")} className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-indigo-500 hover:border-indigo-500 transition-all hover:bg-slate-50">
                            <Plus className="w-10 h-10" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomeManagement;
