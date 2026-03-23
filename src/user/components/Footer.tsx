import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/images/logo_img/logo.png";
import { useQuery } from "@tanstack/react-query";
import { getSiteMetadata } from "@/shared/lib/firestore-service";

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

const servicesList = [
  "Glass Partitions",
  "Aluminium & UPVC Windows",
  "Structural Facade",
  "Glass Glazing",
  "Interior Solutions",
  "Decorative Mirrors",
  "LED Mirror Work",
  "PVC Fiber Doors",
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const socialButtons = [
    { label: "WhatsApp", href: whatsappHref, color: "#25D366", icon: <WhatsAppIcon /> },
    { label: "Instagram", href: instagramHref, color: "#E4405F", icon: <InstagramIcon /> },
  ];

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
    }, footerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const els = [dividerRef.current, bottomRef.current].filter(Boolean) as HTMLElement[];
    const show = () => els.forEach((el) => el.classList.add("ft-visible"));
    const fallback = setTimeout(show, 1500);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ft-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => { clearTimeout(fallback); observer.disconnect(); };
  }, []);

  return (
    <footer ref={footerRef} style={{ background: "rgb(2,6,23)", color: "#ffffff" }}>

      {/* ══ MARQUEE ══ */}
      <div className="overflow-hidden" style={{ background: "#0ea5e9" }}>
        <div
          className="flex py-3"
          style={{ width: "max-content", animation: "ftMarquee 30s linear infinite" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6"
              style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgb(7,18,36)" }}
            >
              {word}
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(7,18,36,0.35)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* ── Brand ── */}
          <div className="ft-col col-span-2 md:col-span-1 lg:col-span-3">
            <div className="ft-logo flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="Vision Glass Creation"
                className="h-11 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <p className="font-extrabold text-white leading-tight" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>
                  Vision Glass
                </p>
                <p className="font-semibold uppercase" style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#ffffff", marginTop: "2px" }}>
                  Creation
                </p>
              </div>
            </div>
            <p className="leading-relaxed mb-2 font-light" style={{ fontSize: "15px", color: "rgb(209,213,219)" }}>
              Expert in Window &amp; Glass Solutions for commercial, residential and industrial spaces across Pune.
            </p>
            <p className="mb-6 font-light" style={{ fontSize: "14px", color: "rgb(156,163,175)" }}>
              Proprietor: Pratap Bhagwanrao Kathare
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialButtons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}44`, color: s.color }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = s.color; el.style.color = "#fff"; el.style.borderColor = s.color; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = `${s.color}22`; el.style.color = s.color; el.style.borderColor = `${s.color}44`; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Scanner desktop ── */}
          <div className="ft-col hidden md:flex lg:col-span-2 flex-col items-start">
            <p
              className="font-semibold uppercase mb-3"
              style={{ fontSize: "13px", letterSpacing: "0.18em", color: "#ffffff" }}
            >
              Scan to Visit
            </p>
            <div
              className="inline-flex flex-col items-center rounded-xl p-3 gap-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <img
                src="/scanner_img/scanner.jpg"
                alt="Scan to visit on Google Maps"
                className="w-[110px] h-[110px] rounded-lg block"
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://api.qrserver.com/v1/create-qr-code/?size=110x110&color=e0f2fe&bgcolor=020617&data=https://maps.google.com/?q=Plot+595+Ganganagar+Nigdi+Pimpri-Chinchwad";
                }}
              />
              <p className="text-center font-light" style={{ fontSize: "12px", color: "rgb(209,213,219)" }}>
                Opens Google Maps
              </p>
            </div>
          </div>

          {/* ── Navigate ── */}
          <div className="ft-col lg:col-span-2">
            <h4
              className="font-semibold uppercase mb-5"
              style={{ fontSize: "13px", letterSpacing: "0.18em", color: "#ffffff" }}
            >
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group flex items-center justify-between font-medium transition-all duration-200"
                  style={{ fontSize: "15px", color: "rgb(209,213,219)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(209,213,219)"; }}
                >
                  {link.label}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div className="ft-col lg:col-span-2">
            <h4
              className="font-semibold uppercase mb-5"
              style={{ fontSize: "13px", letterSpacing: "0.18em", color: "#ffffff" }}
            >
              Our Services
            </h4>
            <div className="flex flex-col gap-2.5">
              {servicesList.map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="font-light transition-colors duration-200"
                  style={{ fontSize: "14.5px", color: "rgb(209,213,219)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(209,213,219)"; }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Contact — Firestore powered ── */}
          <div className="ft-col col-span-2 md:col-span-1 lg:col-span-3">
            <h4
              className="font-semibold uppercase mb-5"
              style={{ fontSize: "13px", letterSpacing: "0.18em", color: "#ffffff" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3.5">

              {contact?.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{ fontSize: "15px", color: "rgb(209,213,219)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(209,213,219)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  {contact.phone}
                </a>
              )}

              {contact?.officePhone && (
                <a
                  href={`tel:${contact.officePhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{ fontSize: "15px", color: "rgb(209,213,219)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(209,213,219)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  {contact.officePhone}
                </a>
              )}

              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 transition-colors duration-200 break-all"
                  style={{ fontSize: "14.5px", color: "rgb(209,213,219)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgb(209,213,219)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  {contact.email}
                </a>
              )}

              {contact?.address && (
                <div
                  className="flex items-start gap-3"
                  style={{ fontSize: "14.5px", color: "rgb(209,213,219)" }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="leading-relaxed font-light">{contact.address}</span>
                </div>
              )}

              {/* WhatsApp CTA */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 mt-1"
                style={{ fontSize: "15px", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", color: "#6ee7a0" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,211,102,0.25)"; el.style.borderColor = "rgba(37,211,102,0.55)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,211,102,0.15)"; el.style.borderColor = "rgba(37,211,102,0.35)"; }}
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* ── Scanner mobile ── */}
          <div className="ft-col col-span-2 flex flex-col items-start md:hidden">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "#ffffff" }}>
              Scan to Visit
            </p>
            <div
              className="inline-flex flex-col items-center rounded-lg p-2.5 gap-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <img
                src="/scanner_img/scanner.jpg"
                alt="Scan to visit on Google Maps"
                className="w-20 h-20 rounded-md block"
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://api.qrserver.com/v1/create-qr-code/?size=80x80&color=e0f2fe&bgcolor=020617&data=https://maps.google.com/?q=Plot+595+Ganganagar+Nigdi+Pimpri-Chinchwad";
                }}
              />
              <p className="text-center font-light" style={{ fontSize: "11px", color: "rgb(209,213,219)" }}>
                Opens Google Maps
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ══ DIVIDER ══ */}
      <div
        ref={dividerRef}
        className="ft-divider mx-4 md:mx-8"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.2) 80%, transparent 100%)",
        }}
      />

      {/* ══ BOTTOM BAR ══ */}
      <div
        ref={bottomRef}
        className="ft-bottom container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2"
      >
        <p className="font-light" style={{ fontSize: "14px", color: "rgba(209,213,219,0.8)" }}>
          Pune's Trusted Glass &amp; Window Solutions Since 2009
        </p>
        <p className="font-light" style={{ fontSize: "14px", color: "rgba(209,213,219,0.8)" }}>
          © {new Date().getFullYear()} Vision Glass Creation. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes ftMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ft-divider { transform: scaleX(0); transform-origin: left center; transition: transform 1.4s cubic-bezier(0.16,1,0.3,1); }
        .ft-divider.ft-visible { transform: scaleX(1); }
        .ft-bottom { opacity: 0; transform: translateY(12px); transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s; }
        .ft-bottom.ft-visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </footer>
  );
};

export default Footer;