import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSiteMetadata } from "@/shared/lib/firestore-service";

const FloatingButtons = () => {
  const { data: contact } = useQuery({
    queryKey: ["contact-metadata"],
    queryFn: () => getSiteMetadata("contact"),
    staleTime: 1000 * 60 * 30,
  });

  const whatsappHref = contact?.socials?.whatsapp
    ? `https://wa.me/${contact.socials.whatsapp}`
    : "https://wa.me/919921917083";

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3">

      {/* WhatsApp */}
      <div className="group flex flex-row-reverse items-center gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 bg-[#25D366] text-white border-2 border-white/20 animate-pulse-slow"
        >
          <MessageCircle className="w-9 h-9" />
        </a>
        <span className="opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-out bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full pointer-events-none whitespace-nowrap shadow-xl border border-slate-100">
          Chat on WhatsApp
        </span>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(37,211,102,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 15px 45px rgba(37,211,102,0.6); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingButtons;