import { MessageCircle, MapPin } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://maps.google.com/?q=Plot+595+Ganganagar+Railway+Line+Sector+28+Nigdi+Pimpri-Chinchwad+Maharashtra+411044"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Find us on Google Maps"
      >
        <MapPin className="w-5 h-5" />
      </a>
      <a
        href="https://wa.me/919921917083"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;
