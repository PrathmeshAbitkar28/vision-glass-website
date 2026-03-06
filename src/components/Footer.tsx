import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/images/logo_img/logo.png";

gsap.registerPlugin(ScrollTrigger);

const marqueeWords = [
  "Glass Partitions", "Structural Facade", "Aluminium Windows",
  "LED Mirrors", "UPVC Windows", "Glass Glazing",
  "Interior Solutions", "Curtain Wall", "PVC Doors",
  "Decorative Glass", "Acid Etching", "Bend Glass",
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "Glass Partitions",
  "Aluminium & UPVC Windows",
  "Structural Facade",
  "Glass Glazing",
  "Interior Solutions",
  "Decorative Mirrors",
  "LED Mirror Work",
  "PVC Fiber Doors",
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-col", {
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        y: 48, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out",
      });
      gsap.from(".ft-logo", {
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        x: -30, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(".ft-scanner", {
        scrollTrigger: { trigger: ".ft-scanner", start: "top 92%" },
        scale: 0.85, opacity: 0, duration: 0.9, ease: "back.out(1.4)",
      });
      gsap.from(".ft-divider", {
        scrollTrigger: { trigger: ".ft-divider", start: "top 98%" },
        scaleX: 0, transformOrigin: "left center",
        duration: 1.4, ease: "power3.inOut",
      });
      gsap.from(".ft-tagline span", {
        scrollTrigger: { trigger: ".ft-bottom", start: "top 99%" },
        opacity: 0, y: 10, duration: 0.4, stagger: 0.02, ease: "power2.out", delay: 0.3,
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const tagline = "Pune's Trusted Glass & Window Solutions Since 2009";
  const taglineChars = tagline.split("").map((ch, i) => (
    <span key={i} style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : undefined }}>
      {ch}
    </span>
  ));

  return (
    <footer ref={footerRef} style={{ background: "rgb(2,6,23)", color: "rgba(255,255,255,0.85)" }}>

      {/* ══ MARQUEE STRIP ══ */}
      <div className="overflow-hidden" style={{ borderBottom: "1px solid rgba(14,165,233,0.18)", background: "rgba(14,165,233,0.05)" }}>
        <div
          className="flex py-3"
          style={{ width: "max-content", animation: "ftMarquee 30s linear infinite" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(56,189,248,0.65)" }}
            >
              {word}
              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(56,189,248,0.35)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Brand + Scanner (4 cols) ── */}
          <div className="ft-col lg:col-span-4">

            {/* Logo */}
            <div className="ft-logo flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Vision Glass Creation"
                className="h-10 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <p className="font-extrabold text-white tracking-[-0.01em] leading-tight">Vision Glass</p>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: "rgba(56,189,248,0.7)" }}>
                  Creation
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-2 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              Expert in Window &amp; Glass Solutions for commercial, residential and industrial spaces across Pune.
            </p>
            <p className="text-xs mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
              Proprietor: Pratap Bhagwanrao Kathare
            </p>

            {/* Scanner */}
            <div className="ft-scanner">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(56,189,248,0.55)" }}>
                Scan to Visit Us
              </p>
              <div
                className="inline-flex flex-col items-center rounded-2xl p-4 gap-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 0 40px rgba(14,165,233,0.08)",
                }}
              >
                <img
                  src="/src/scanner_img/scanner.jpg"
                  alt="Scan to visit Vision Glass Creation on Google Maps"
                  className="w-[128px] h-[128px] rounded-xl block"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://api.qrserver.com/v1/create-qr-code/?size=128x128&color=e0f2fe&bgcolor=020617&data=https://maps.google.com/?q=Plot+595+Ganganagar+Nigdi+Pimpri-Chinchwad";
                  }}
                />
                <p className="text-[10px] leading-tight text-center font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Opens Google Maps
                </p>
              </div>
            </div>
          </div>

          {/* ── Quick Links (2 cols) ── */}
          <div className="ft-col lg:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: "rgba(56,189,248,0.65)" }}>
              Navigate
            </h4>
            <div className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group flex items-center justify-between text-sm font-medium transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Services (3 cols) ── */}
          <div className="ft-col lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: "rgba(56,189,248,0.65)" }}>
              Our Services
            </h4>
            <div className="flex flex-col gap-2.5">
              {services.map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="text-sm font-light transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(56,189,248,0.85)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Contact (3 cols) ── */}
          <div className="ft-col lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-6" style={{ color: "rgba(56,189,248,0.65)" }}>
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { href: "tel:+919921917083", label: "+91 99219 17083", icon: <Phone className="w-3.5 h-3.5 text-sky-400" /> },
                { href: "tel:+917840917083", label: "+91 78409 17083", icon: <Phone className="w-3.5 h-3.5 text-sky-400" /> },
                { href: "mailto:visionglasscreation1@gmail.com", label: "visionglasscreation1@gmail.com", icon: <Mail className="w-3.5 h-3.5 text-sky-400" /> },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-sm transition-colors duration-200 break-all"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.18)" }}>
                    {item.icon}
                  </div>
                  {item.label}
                </a>
              ))}

              <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.18)" }}>
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="leading-relaxed font-light">
                  Plot No. 595, Ganganagar Railway Line,<br />
                  Sector 28, Nigdi, Pimpri-Chinchwad,<br />
                  Maharashtra 411044
                </span>
              </div>

              <a
                href="https://wa.me/919921917083"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.22)", color: "#4ade80" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,211,102,0.22)"; el.style.borderColor = "rgba(37,211,102,0.4)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,211,102,0.12)"; el.style.borderColor = "rgba(37,211,102,0.22)"; }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ══ DIVIDER ══ */}
      <div
        className="ft-divider mx-4 md:mx-8"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.28) 20%, rgba(14,165,233,0.28) 80%, transparent 100%)",
        }}
      />

      {/* ══ BOTTOM BAR ══ */}
      <div className="ft-bottom container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="ft-tagline text-xs font-light" style={{ color: "rgba(255,255,255,0.28)" }}>
          {taglineChars}
        </p>
        <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} Vision Glass Creation. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes ftMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;