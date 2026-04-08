import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Save, 
  X,
  Loader2,
  Camera,
  Layers,
  LayoutGrid,
  Filter,
  Images,
  History
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";
import { 
  getCollectionContent, 
  addDocument, 
  deleteDocument 
} from "@/shared/lib/firestore-service";

const GalleryManagement = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(true);
    const [formData, setFormData] = useState({ title: "", category: "Commercial", image: "" });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const data = await getCollectionContent("gallery");
            setItems(data);
        } catch (err) {
            toast.error("Visual repository sync failure");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { uploadFile } = await import("@/shared/lib/firestore-service");
            const url = await uploadFile(file, "gallery");
            setFormData({ ...formData, image: url });
            toast.success("Image asset ready for synchronization");
        } catch (err) {
            toast.error("Cloud storage upload failure");
        } finally {
            setUploading(false);
        }
    };

    const handleAdd = async () => {
        if (!formData.title || !formData.image) return toast.error("Missing project specifications");
        try {
            await addDocument("gallery", formData);
            toast.success("Project vision synchronized live");
            setFormData({ title: "", category: "Commercial", image: "" });
            setIsAdding(false);
            fetchGallery();
        } catch (err) {
            toast.error("Synchronization failure");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Permanently purge this visual asset?")) return;
        try {
            await deleteDocument("gallery", id);
            toast.success("Asset purged successfully");
            fetchGallery();
        } catch (err) {
            toast.error("Purge failure");
        }
    };

    return (
        <div className="w-full space-y-8 pb-20 pt-44 lg:pt-28">
            {/* 🏛️ Professional Fixed Command Header */}
            <div className="fixed top-16 lg:top-0 left-0 right-0 lg:left-80 z-40 px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#1e3a5f', borderBottom: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(30,58,95,0.3)' }}>
                <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="bg-white/10 p-3 text-sky-400 border border-white/5">
                        <Images className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Gallery Registry</h1>
                        <p className="text-[11px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
                             <History className="w-3.5 h-3.5" /> High-Density Visual Asset Distribution
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/5 px-6 py-3 border border-white/10 flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Digital Assets</span>
                        <span className="text-xl font-black text-white leading-none">{items.length}</span>
                    </div>
                    <Button 
                        onClick={() => setIsAdding(!isAdding)} 
                        className={`rounded-none h-14 px-8 font-black uppercase tracking-widest transition-all gap-3 ${isAdding ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-600 hover:bg-sky-700'}`}
                    >
                        {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {isAdding ? "Discard Entry" : "Register New Vision"}
                    </Button>
                </div>
            </div>

            {isAdding && (
                <div className="bg-white border-2 border-slate-900 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Category</label>
                            <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                                <SelectTrigger className="h-14 rounded-none border-2 border-slate-100 focus:border-slate-900 font-bold text-slate-800">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Commercial", "Residential", "Industrial", "Windows", "Partitions"].map(c => (
                                        <SelectItem key={c} value={c} className="font-bold">{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Title</label>
                            <Input 
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                className="h-14 rounded-none border-2 border-slate-100 focus:border-slate-900 font-bold" 
                                placeholder="e.g. Pune Tech Tower" 
                            />
                        </div>
                        <div className="space-y-4 md:col-span-2">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Option A: Local Upload</label>
                                    <div className="relative">
                                        <Input 
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="h-14 rounded-none border-2 border-slate-100 focus:border-slate-900 font-bold opacity-0 absolute inset-0 z-10 cursor-pointer"
                                        />
                                        <div className="h-14 border-2 border-dashed border-slate-300 flex items-center justify-center gap-3 bg-slate-50">
                                            {uploading ? <Loader2 className="w-5 h-5 animate-spin text-sky-500" /> : <Camera className="w-5 h-5 text-slate-400" />}
                                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                                {uploading ? "Uploading..." : formData.image ? "Asset Staged ✅" : "Select File"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Option B: Image Link URL</label>
                                    <Input 
                                        value={formData.image} 
                                        onChange={(e) => setFormData({...formData, image: e.target.value})} 
                                        className="h-14 rounded-none border-2 border-slate-100 focus:border-slate-900 font-bold text-xs" 
                                        placeholder="Paste CDN/Unsplash URL here" 
                                    />
                                </div>
                             </div>
                             {formData.image && (
                                <div className="flex items-center gap-3 p-3 bg-slate-900 overflow-hidden border border-slate-800">
                                     <div className="w-16 h-10 shrink-0 border border-white/10 bg-white/5">
                                         <img src={formData.image} className="w-full h-full object-cover" alt="" />
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <p className="text-[9px] font-black text-white/40 uppercase tracking-widest truncate">{formData.image}</p>
                                     </div>
                                </div>
                             )}
                        </div>
                        <Button 
                            onClick={handleAdd} 
                            disabled={uploading || !formData.image}
                            className="h-14 rounded-none bg-sky-600 text-white font-black uppercase tracking-widest hover:bg-sky-700 shadow-xl gap-3 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" /> Sync Live Asset
                        </Button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="p-32 text-center font-black animate-pulse text-sky-500 uppercase tracking-widest italic bg-slate-50 border-2 border-slate-200">
                    Synchronizing Visual Distribution Engine...
                </div>
            ) : (
                <div className="bg-white border border-slate-200 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900">
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Sr. No.</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Asset</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Project Title</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Category</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800 text-right">Action</th>
                                </tr>
                            </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {items.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-200 font-bold text-slate-700">
                                            <td className="px-8 py-5 text-sm font-black text-slate-400">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="w-20 h-14 bg-slate-100 overflow-hidden border border-slate-200">
                                                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-base text-slate-950 uppercase tracking-tight">
                                                {item.title}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 ring-1 ring-sky-200 uppercase tracking-widest">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <Button 
                                                    onClick={() => handleDelete(item.id)}
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="w-10 h-10 bg-slate-100 text-slate-400 hover:text-white hover:bg-red-500 rounded-none"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                </div>
            )}

            {!loading && !items.length && (
                <div className="py-40 bg-slate-50 border-4 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-4">
                    <Layers className="w-16 h-16 text-slate-200" />
                    <h2 className="text-xl font-black text-slate-300 uppercase italic">Visual Repository Empty</h2>
                </div>
            )}
        </div>
    );
};

export default GalleryManagement;
