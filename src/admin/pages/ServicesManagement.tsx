import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  Loader2,
  Package,
  ExternalLink,
  ChevronRight,
  LayoutGrid,
  Info,
  Wrench,
  Image as ImageIcon,
  Type,
  Tag,
  PenTool,
  CheckCircle
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
import { Badge } from "@/shared/components/ui/badge";
import { toast } from "sonner";
import { 
  getCollectionContent, 
  addDocument, 
  updateDocument, 
  deleteDocument,
  uploadFile
} from "@/shared/lib/firestore-service";

const ServicesManagement = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    desc: "",
    image: "",
    tags: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const data = await getCollectionContent("services");
    setServices(data);
    setLoading(false);
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      subtitle: service.subtitle || "",
      desc: service.desc,
      image: service.image,
      tags: service.tags ? service.tags.join(", ") : ""
    });
    setIsEditorOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
        const url = await uploadFile(file, "industrial-services");
        setFormData({ ...formData, image: url });
        toast.success("Visual Asset Synchronized to Cloud");
    } catch (err) {
        toast.error("Asset Upload Failure");
    } finally {
        setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.desc) {
        toast.error("Please fill in the core service details");
        return;
    }

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await updateDocument("services", editingId, payload);
        toast.success("Industrial catalog item updated");
      } else {
        await addDocument("services", payload);
        toast.success("New service entry established");
      }
      setIsEditorOpen(false);
      fetchServices();
    } catch (err) {
      toast.error("Cloud synchronization failure");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently decommission this industrial service?")) return;
    try {
      await deleteDocument("services", id);
      toast.success("Service removed from public catalog");
      fetchServices();
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="w-full space-y-8 pb-20 pt-44 lg:pt-28">
      
      {/* 🏛️ Professional Fixed Command Header */}
      <div className="fixed top-16 lg:top-0 left-0 right-0 lg:left-80 z-40 px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#1e3a5f', borderBottom: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(30,58,95,0.3)' }}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="bg-white/10 p-3 text-sky-400 border border-white/5">
            <Wrench className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Industrial Catalog</h1>
            <p className="text-[11px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
                <Info className="w-3.5 h-3.5" /> High-Performance Service Portfolio
            </p>
          </div>
        </div>
        <Button 
            onClick={() => {
                setEditingId(null);
                setFormData({ title: "", subtitle: "", desc: "", image: "", tags: "" });
                setIsEditorOpen(true);
            }}
            size="lg"
            className="rounded-none bg-sky-600 text-white hover:bg-sky-700 h-16 w-full md:w-auto font-black px-12 gap-4 transition-all shadow-xl active:scale-95 text-lg group tracking-widest uppercase"
        >
            <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            Add New Service
        </Button>
      </div>

      {loading ? (
        <div className="p-32 text-center font-black animate-pulse text-sky-500 uppercase tracking-widest italic shadow-xl rounded-[2rem] bg-slate-50 border-2 border-slate-200">
           Synchronizing Registry with Cloud Firestore...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white hover:shadow-2xl hover:border-sky-500/20 transition-all duration-500 flex flex-col">
              <div className="relative h-44 overflow-hidden shrink-0">
                <img src={service.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all" />
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <Button 
                        size="icon" 
                        variant="secondary" 
                        className="rounded-xl w-12 h-12 shadow-2xl bg-white/90 backdrop-blur-md text-slate-900 hover:text-sky-500 scale-90 group-hover:scale-100 transition-all" 
                        onClick={() => handleEdit(service)}
                    >
                        <Edit2 className="w-5 h-5" />
                    </Button>
                    <Button 
                        size="icon" 
                        variant="destructive" 
                        className="rounded-xl w-12 h-12 shadow-2xl scale-90 group-hover:scale-100 transition-all" 
                        onClick={() => handleDelete(service.id)}
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
                <div className="absolute bottom-3 left-4">
                   <div className="bg-sky-500 text-[9px] font-black text-white px-3 py-1 rounded-lg uppercase tracking-widest">
                      {service.subtitle || "Portfolio"}
                   </div>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-950 tracking-tight leading-none mb-4 uppercase group-hover:text-sky-500 transition-colors">{service.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed text-sm line-clamp-3 mb-6 flex-1">{service.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                   {service.tags?.map((tag: string) => (
                     <span key={tag} className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-tight group-hover:text-sky-500 group-hover:border-sky-100 group-hover:bg-sky-50 transition-all">
                        <CheckCircle className="w-3 h-3 text-sky-500/50 group-hover:text-sky-500" />
                        {tag}
                     </span>
                   ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ── Stabilized Architectural Slide-over ── */}
      {isEditorOpen && (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-slate-950/40 z-[100]"
                onClick={() => setIsEditorOpen(false)}
            />
            
            {/* Slide-over Container */}
            <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white z-[101] shadow-2xl flex flex-col border-l border-slate-200">
                {/* Header */}
                <div className="bg-slate-900 text-white p-8 flex items-center justify-between shrink-0">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">Catalog Entry</h2>
                        <p className="text-sky-400 font-black uppercase text-[10px] tracking-[0.3em] mt-3 italic flex items-center gap-2">
                             <Package className="w-4 h-4" /> Professional Metadata Sync
                        </p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsEditorOpen(false)} 
                        className="text-white hover:bg-white/10 h-12 w-12 rounded-xl transition-all"
                    >
                        <X className="w-7 h-7" />
                    </Button>
                </div>

                {/* Form Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 pl-1">
                                <Type className="w-3.5 h-3.5 text-sky-500" /> Service Title
                            </label>
                            <Input 
                                autoFocus
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-lg px-6 shadow-sm"
                                placeholder="e.g. Structural Glazing" 
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 pl-1">
                                <LayoutGrid className="w-3.5 h-3.5 text-sky-500" /> Department/Sector
                            </label>
                            <Input 
                                value={formData.subtitle} 
                                onChange={(e) => setFormData({...formData, subtitle: e.target.value})} 
                                className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-bold px-6 shadow-sm"
                                placeholder="e.g. Commercial Interior" 
                            />
                        </div>
                    </div>

                    {/* ── Visual Asset Repository ── */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between pl-1">
                            <div className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-sky-500" /> Visual Engine Registry</div>
                            <span className="text-[9px] font-bold text-slate-300 italic uppercase">Cloud Storage Synchronized</span>
                        </label>
                        
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* File Upload Trigger */}
                            <div className="relative group w-full md:w-1/3 aspect-square rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-4 hover:border-sky-500 hover:bg-white transition-all cursor-pointer overflow-hidden shadow-sm">
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                                        <span className="text-[10px] font-black text-sky-600 uppercase">Uploading...</span>
                                    </div>
                                ) : formData.image ? (
                                    <div className="absolute inset-0 group">
                                        <img src={formData.image} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-[10px] font-black text-white uppercase border border-white/20 px-4 py-2 rounded-full">Replace Visual</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Plus className="w-8 h-8 text-slate-300" />
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase text-slate-500">Local Upload</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Cloud Storage Hub</p>
                                        </div>
                                    </>
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                            </div>

                            {/* Manual URL Input */}
                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black uppercase text-slate-400 pl-1">Or Direct Resource URL</span>
                                    <Input 
                                        value={formData.image} 
                                        onChange={(e) => setFormData({...formData, image: e.target.value})} 
                                        className="h-14 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-mono text-xs pr-12 bg-slate-50/20"
                                        placeholder="Enter CDN link or paste Unsplash URL" 
                                    />
                                </div>
                                <div className="p-4 bg-sky-50/30 rounded-2xl border border-sky-100 flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                                    <p className="text-[11px] font-bold text-sky-700 leading-tight">Architecture Hint: Upload high-resolution landscapes for better visual impact.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 pl-1">
                            <PenTool className="w-3.5 h-3.5 text-sky-500" /> Technical Narrative
                        </label>
                        <Textarea 
                            value={formData.desc} 
                            onChange={(e) => setFormData({...formData, desc: e.target.value})} 
                            className="min-h-[160px] rounded-2xl border-2 border-slate-100 focus:border-sky-500 font-bold text-lg leading-relaxed p-6 bg-slate-50/10 shadow-inner"
                            placeholder="Detail the technical specifications..." 
                        />
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between pl-1">
                            <div className="flex items-center gap-2"><Tag className="w-3.5 h-3.5 text-amber-500" /> Global Categorization Tabs</div>
                            <span className="text-[9px] font-bold text-slate-300 lowercase tracking-tight italic">use commas to separate tags</span>
                        </label>
                        <Input 
                            value={formData.tags} 
                            onChange={(e) => setFormData({...formData, tags: e.target.value})} 
                            className="h-16 rounded-xl border-2 border-slate-100 focus:border-sky-500 font-black text-sky-600 px-8 text-base tracking-wide"
                            placeholder="Frameless, Glass Doors, PVC, Toughened" 
                        />
                    </div>
                </div>

                {/* Fixed Footer for Save Button */}
                <div className="p-8 border-t border-slate-100 bg-white/80 backdrop-blur-md absolute bottom-0 left-0 right-0 z-[102]">
                    <Button 
                        onClick={handleSave} 
                        disabled={uploading}
                        className="w-full h-18 rounded-2xl bg-slate-900 text-white hover:bg-sky-500 shadow-3xl transition-all font-black text-xl gap-4 hover:scale-[1.02] active:scale-95 group"
                    >
                        <Save className="w-6 h-6 text-sky-400 group-hover:animate-pulse" />
                        Synchronize Catalog Item
                    </Button>
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default ServicesManagement;
