import { useState, useEffect } from "react";
import { 
  Inbox, 
  Trash2, 
  Eye, 
  Loader2,
  X,
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
import { toast } from "sonner";
import { getCollectionContent, deleteDocument } from "@/shared/lib/firestore-service";

const InquiryManagement = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const data = await getCollectionContent("inquiries");
            const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setInquiries(sorted);
        } catch (err) {
            toast.error("Cloud synchronization failure");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Permanently purge this item?")) return;
        try {
            await deleteDocument("inquiries", id);
            toast.success("Lead purged successfully");
            fetchInquiries();
        } catch (err) {
            toast.error("Purge failure");
        }
    };

    return (
        <div className="w-full space-y-8 pb-20 pt-28">
            
            {/* 🏛️ Professional Fixed Command Header */}
            <div className="fixed top-0 left-0 right-0 lg:left-80 z-40 px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#1e3a5f', borderBottom: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(30,58,95,0.3)' }}>
                <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="bg-white/10 p-3 text-sky-400 shadow-xl border border-white/5">
                        <Inbox className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Inquiry Registry</h1>
                        <p className="text-[11px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
                             <History className="w-3.5 h-3.5" /> High-Performance Lead Distribution
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/5 px-6 py-3 border border-white/10 flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Digital Entries</span>
                        <span className="text-xl font-black text-white leading-none">{inquiries.length}</span>
                    </div>
                    <Button 
                        onClick={fetchInquiries} 
                        variant="ghost"
                        className="h-14 w-14 border border-white/10 bg-white/5 hover:bg-white/10 text-white shadow-sm transition-all"
                    >
                        <Loader2 className={`w-6 h-6 text-sky-400 ${loading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            {loading && inquiries.length === 0 ? (
                <div className="p-32 text-center font-black animate-pulse text-sky-500 uppercase tracking-widest italic bg-slate-50 border-2 border-slate-200">
                    Synchronizing Lead Repository...
                </div>
            ) : (
                <div className="bg-white border border-slate-200 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900">
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Sr. No.</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Date</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Name</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Contact No.</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800">Email</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {inquiries.map((inq, index) => (
                                    <tr key={inq.id} className="hover:bg-slate-50 transition-colors duration-200 font-bold text-slate-700">
                                        <td className="px-8 py-5 text-sm font-black text-slate-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="px-8 py-5 text-sm uppercase">
                                            {(() => {
                                                const d = new Date(inq.createdAt);
                                                return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                                            })()}
                                        </td>
                                        <td className="px-8 py-5 text-base text-slate-950 uppercase">
                                            {inq.name}
                                        </td>
                                        <td className="px-8 py-5 text-sm">
                                            {inq.phone}
                                        </td>
                                        <td className="px-8 py-5 text-sm lowercase">
                                            {inq.email || inq.service || "N/A"}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Button 
                                                    onClick={() => setSelectedInquiry(inq)}
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="w-10 h-10 bg-slate-100 text-slate-600 hover:bg-sky-500 hover:text-white"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Button>
                                                <Button 
                                                    onClick={() => handleDelete(inq.id)}
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="w-10 h-10 bg-slate-100 text-slate-400 hover:text-white hover:bg-red-500"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Lead Detail Audit Centered Modal ── */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer" 
                        onClick={() => setSelectedInquiry(null)} 
                    />
                    
                    {/* Content */}
                    <div className="relative w-full max-w-2xl bg-white shadow-[0_32px_128px_rgba(0,0,0,0.2)] border border-slate-200 flex flex-col">
                        {/* Header */}
                        <div className="bg-sky-600 text-white p-8 flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none italic">Technical Audit</h2>
                                <p className="text-white/60 font-black uppercase text-[10px] tracking-[0.4em] mt-3">
                                     Lead Specification Analysis
                                </p>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setSelectedInquiry(null)} 
                                className="text-white hover:bg-white/20 h-10 w-10 rounded-none hover:rotate-90 transition-all duration-300"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Body */}
                        <div className="p-10 space-y-10 overflow-y-auto max-h-[80vh] custom-scrollbar bg-white">
                           <div className="grid grid-cols-1 gap-10">
                                
                                <div className="grid grid-cols-2 gap-10 items-start">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600/60 mb-1">Name</p>
                                        <p className="text-2xl font-black text-slate-950 uppercase tracking-tight leading-none">{selectedInquiry.name}</p>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600/60 mb-1">Timestamp</p>
                                        <p className="text-base font-bold text-slate-800 tracking-tighter uppercase leading-none">
                                            {(() => {
                                                const d = new Date(selectedInquiry.createdAt);
                                                return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                                            })()}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-10 items-start border-y border-sky-100 py-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600/60 mb-1">Mobile</p>
                                        <p className="text-xl font-black text-slate-950 tracking-tight leading-none">{selectedInquiry.phone}</p>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600/60 mb-1">Email Address</p>
                                        <p className="text-sm font-black text-slate-950 lowercase tracking-tight break-all leading-tight italic">{selectedInquiry.email || "N/A"}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600/60 mb-1">Service</p>
                                    <p className="text-xl font-black text-slate-950 uppercase tracking-tight leading-none">{selectedInquiry.service || "N/A"}</p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-600/80 pl-1">Message</p>
                                    <div className="p-8 bg-white border-2 border-sky-100 shadow-xl relative">
                                        <p className="text-xl font-bold leading-relaxed italic text-slate-950">
                                            "{selectedInquiry.message}"
                                        </p>
                                        <div className="absolute -top-3 -left-3 bg-sky-500 w-8 h-8 flex items-center justify-center text-white font-black italic shadow-lg">"</div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InquiryManagement;
