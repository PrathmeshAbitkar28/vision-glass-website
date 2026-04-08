import { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Save, 
  Loader2, 
  Instagram, 
  MessageCircle,
  History,
  Smartphone,
  Building2,
  Map,
  Share2,
  Send,
  ShieldCheck,
  Clock
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";
import { getSiteMetadata, updateSiteMetadata } from "@/shared/lib/firestore-service";

const BLUE = "#0ea5e9";

const ContactManagement = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSiteMetadata("contact");
        if (result) setData(result);
      } catch (err) {
        toast.error("Cloud repository sync failure");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteMetadata("contact", data);
      toast.success("Global Identity Registry Updated Live");
    } catch (err) {
      toast.error("Cloud synchronization failure");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-32 text-center font-black animate-pulse text-sky-500 uppercase tracking-widest italic shadow-xl rounded-[2rem] bg-slate-50 border-2 border-slate-200 mt-20">
       Synchronizing Identity Infrastructure...
    </div>
  );

  return (
    <div className="w-full space-y-10 pb-20 pt-44 lg:pt-28 px-4 md:px-10">
      
      {/* 🏛️ Professional Fixed Command Header */}
      <div className="fixed top-16 lg:top-0 left-0 right-0 lg:left-80 z-40 px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: '#1e3a5f', borderBottom: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(30,58,95,0.3)' }}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="hidden sm:block bg-white/10 p-3 text-sky-400 border border-white/5">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">Identity Command</h1>
            <p className="text-[10px] md:text-[11px] font-black text-sky-400/60 uppercase tracking-[0.3em] mt-2 italic flex items-center gap-2">
                 <History className="w-3.5 h-3.5" /> High-Density Brand Synchronizer
            </p>
          </div>
        </div>
        <Button 
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="rounded-none bg-sky-600 text-white hover:bg-sky-700 h-14 md:h-16 w-full md:w-auto font-black px-12 gap-4 transition-all shadow-xl active:scale-95 text-lg group tracking-widest uppercase"
        >
            {saving ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <Save className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />}
            {saving ? "Publishing..." : "Push Design Live"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* ── LEFT: VISUAL MIRROR (Information Display) ── */}
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Page Preview (Mirror)</span>
            </div>
            
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl space-y-12 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-bl-full opacity-50" />
              
              <div className="space-y-12">
                {/* Intro Part */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[2px] rounded-full bg-sky-500" />
                    <p className="text-sky-500 text-xs font-black uppercase tracking-widest">Connect With Us</p>
                  </div>
                  <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6 uppercase">Let's Build Something Together</h2>
                </div>

                <div className="space-y-10 relative z-10 pt-10 border-t border-slate-50">
                  {/* Call Section */}
                  <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-sky-100 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                          <p className="text-[11px] font-black uppercase text-sky-600 tracking-[0.2em] leading-none">Primary Hotline</p>
                          <Input 
                            value={data.phone} 
                            onChange={(e) => setData({...data, phone: e.target.value})}
                            className="bg-slate-50 border-none font-black text-2xl h-10 px-0 focus-visible:ring-0 placeholder:text-slate-200"
                            placeholder="+91 xxxxx xxxxx"
                          />
                          <p className="text-[9px] font-black text-slate-300 uppercase italic">Active on Phone & WhatsApp</p>
                      </div>
                  </div>

                  {/* Office Section */}
                  <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                          <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] leading-none">Office / Extension</p>
                          <Input 
                            value={data.officePhone} 
                            onChange={(e) => setData({...data, officePhone: e.target.value})}
                            className="bg-slate-50 border-none font-black text-xl h-10 px-0 focus-visible:ring-0 placeholder:text-slate-200"
                            placeholder="+91 xxxxx xxxxx"
                          />
                      </div>
                  </div>

                  {/* Email Section */}
                  <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                          <p className="text-[11px] font-black uppercase text-emerald-600 tracking-[0.2em] leading-none">Communication Hub</p>
                          <Input 
                            value={data.email} 
                            onChange={(e) => setData({...data, email: e.target.value})}
                            className="bg-slate-50 border-none font-black text-lg h-10 px-0 focus-visible:ring-0 placeholder:text-slate-200"
                            placeholder="brand@example.com"
                          />
                      </div>
                  </div>

                  {/* Address Section */}
                  <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-3">
                          <p className="text-[11px] font-black uppercase text-amber-600 tracking-[0.2em] leading-none">Industrial Factory Office</p>
                          <Textarea 
                            value={data.address} 
                            onChange={(e) => setData({...data, address: e.target.value})}
                            className="bg-slate-50 border-none font-bold text-lg p-0 focus-visible:ring-0 placeholder:text-slate-200 resize-none min-h-[80px]"
                            placeholder="Enter full physical address..."
                          />
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* ── RIGHT: SOCIAL & MAP INTEGRATION ── */}
        <div className="space-y-8">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Connection Infrastructure</span>
            </div>

            {/* Social Hub */}
            <div className="bg-slate-900 rounded-[2rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
                <div className="flex items-center gap-3">
                    <Share2 className="w-6 h-6 text-sky-400" />
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Social Media Hooks</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-sky-400/60 tracking-widest flex items-center gap-2 pl-1">
                            <MessageCircle className="w-4 h-4 text-emerald-500" /> WhatsApp Direct Link
                        </label>
                        <Input 
                             value={data.socials?.whatsapp} 
                             onChange={(e) => setData({...data, socials: {...data.socials, whatsapp: e.target.value}})}
                             className="h-16 rounded-xl border-white/10 bg-white/5 focus:bg-white/10 focus:border-emerald-500 text-white font-black text-2xl tracking-[0.1em] px-8"
                             placeholder="9199219xxxxx"
                        />
                        <p className="text-[10px] font-bold text-white/20 italic pl-1">Format: Country Code + Number (e.g. 9199219xxxxx)</p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-sky-400/60 tracking-widest flex items-center gap-2 pl-1">
                            <Instagram className="w-4 h-4 text-pink-500" /> Instagram Handle
                        </label>
                        <Input 
                             value={data.socials?.instagram} 
                             onChange={(e) => setData({...data, socials: {...data.socials, instagram: e.target.value}})}
                             className="h-16 rounded-xl border-white/10 bg-white/5 focus:bg-white/10 focus:border-pink-500 text-white font-black text-xl px-8"
                             placeholder="@your_handle"
                        />
                    </div>
                </div>
            </div>

            {/* Google Maps Integration */}
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-xl flex flex-col h-[480px]">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Map className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Geospatial Distribution</h3>
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 italic">Static Map Preview Below</span>
                </div>
                
                <div className="p-8 flex-1 flex flex-col gap-6">
                    <div className="space-y-3 flex-1 flex flex-col">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest pl-1">Google Maps Embed Endpoint (URL)</label>
                        <Textarea 
                            value={data.mapEmbedUrl} 
                            onChange={(e) => setData({...data, mapEmbedUrl: e.target.value})}
                            className="flex-1 rounded-2xl border-2 border-slate-50 bg-slate-50/30 focus:border-sky-500 focus:bg-white font-mono text-[10px] text-slate-400 p-4 leading-tight"
                            placeholder="https://www.google.com/maps/embed?..."
                        />
                    </div>
                    
                    {/* Tiny Mirror Link */}
                    <div className="h-40 rounded-2xl overflow-hidden border-2 border-slate-900/5 bg-slate-50 relative group">
                        <iframe 
                            src={data.mapEmbedUrl}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, opacity: 0.6 }} 
                            loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="text-[10px] font-black text-white uppercase border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">Live Preview Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactManagement;
