import { MessageCircle, Instagram } from "lucide-react";
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

  const instagramHref = contact?.socials?.instagram
    ? `https://instagram.com/${contact.socials.instagram.replace(/^@/, "")}`
    : "https://instagram.com/vision_glass";

  return (
    <div className="fixed bottom-6 right-6 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-[9999] flex flex-col gap-3">

      {/* WhatsApp */}
      <div className="group flex items-center justify-end">
        <span className="hidden lg:block opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-out bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest px-4 py-2.5 rounded-l-full pointer-events-none whitespace-nowrap shadow-xl select-none">
          WhatsApp
        </span>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full lg:rounded-none lg:rounded-l-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 lg:hover:scale-100 lg:hover:w-[70px] bg-[#25D366] text-white"
        >
          <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
        </a>
      </div>

      {/* Instagram */}
      <div className="group flex items-center justify-end">
        <span className="hidden lg:block opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-out bg-[#E4405F] text-white text-[11px] font-black uppercase tracking-widest px-4 py-2.5 rounded-l-full pointer-events-none whitespace-nowrap shadow-xl select-none">
          Instagram
        </span>
        <a
          href={instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full lg:rounded-none lg:rounded-l-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 lg:hover:scale-100 lg:hover:w-[70px] bg-[#E4405F] text-white"
        >
          <Instagram className="w-5 h-5 lg:w-6 lg:h-6" />
        </a>
      </div>

    </div>
  );
};

export default FloatingButtons;