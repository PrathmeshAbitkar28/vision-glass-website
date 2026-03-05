import { MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      {/* WhatsApp — attached to right edge, label reveals on hover */}
      <div className="group flex items-center">
        {/* Slide-in label */}
        <span className="opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-out bg-[#25D366] text-white text-xs font-semibold px-3 py-2 rounded-l-full pointer-events-none whitespace-nowrap shadow-lg select-none">
          Chat on WhatsApp
        </span>

        {/* Button tab */}
        <a
          href="https://wa.me/919921917083"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-l-2xl flex items-center justify-center shadow-xl transition-all duration-300 hover:w-[60px]"
          style={{ backgroundColor: "#25D366" }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;