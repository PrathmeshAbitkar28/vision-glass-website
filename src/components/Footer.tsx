import { Link } from "react-router-dom";
import { Layers, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://maps.google.com/?q=Plot+595+Ganganagar+Nigdi+Pimpri-Chinchwad";

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Layers className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Vision Glass Creation</span>
            </div>
            <p className="text-background/70 text-sm mb-2">Expert in Window & Glass Solutions</p>
            <p className="text-background/60 text-sm">Proprietor: Pratap Bhagwanrao Kathare</p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Services", "Gallery", "About", "Contact"].map((label) => (
                <Link
                  key={label}
                  to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  className="text-sm text-background/70 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <span>Glass Partitions</span>
              <span>Aluminium & UPVC Windows</span>
              <span>Structural Facade</span>
              <span>Glass Glazing</span>
              <span>Interior Solutions</span>
              <span>Decorative Mirrors</span>
              <span>LED Mirror Work</span>
              <span>PVC Fiber Doors</span>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <a href="tel:+919921917083" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> +91 99219 17083
              </a>
              <a href="tel:+917840917083" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> +91 78409 17083
              </a>
              <a href="mailto:visionglasscreation1@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> visionglasscreation1@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Plot No. 595, Ganganagar Railway Line, Sector 28, Ganga Nagar, Nigdi, Pimpri-Chinchwad, Maharashtra 411044</span>
              </div>
              <div className="mt-4 glass-card rounded-xl p-4 text-center">
                <p className="text-xs text-background/60 mb-2">Scan to Find Us</p>
                <img src={qrUrl} alt="QR code for Google Maps location" className="mx-auto w-[120px] h-[120px] rounded" />
                <p className="text-xs text-background/60 mt-2">Open in Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 py-4 text-center text-sm text-background/50">
        © 2025 Vision Glass Creation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
