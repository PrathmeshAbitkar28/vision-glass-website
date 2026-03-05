import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import gsap from "gsap";

// ─────────────────────────────────────────────
// 10 professional glass / architecture images
// ─────────────────────────────────────────────
const carouselImages = [
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90", alt: "Structural glass facade" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90", alt: "Commercial glazing" },
  { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=90", alt: "Aluminium window systems" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90", alt: "Glass office partitions" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90", alt: "Interior glass solutions" },
  { src: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=90", alt: "Decorative mirrors" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=90", alt: "Curtain wall system" },
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=90", alt: "Modern building facade" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90", alt: "Industrial glass work" },
  { src: "https://images.unsplash.com/photo-1497366412874-3415097a27c7?w=1920&q=90", alt: "Premium glass installation" },
];

interface PageHeroProps {
  image?: string; // kept for backward compat but ignored — carousel takes over
  title: string;
  subtitle: string;
  breadcrumb: { label: string; to?: string }[];
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ── crossfade helper ──
  const crossfade = (next: number, curr: number) => {
    if (slideRefs.current[curr]) {
      gsap.to(slideRefs.current[curr], { opacity: 0, duration: 1.2, ease: "power2.inOut" });
    }
    if (slideRefs.current[next]) {
      gsap.fromTo(
        slideRefs.current[next],
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "power2.inOut" }
      );
    }
  };

  // ── dot click ──
  const goTo = (idx: number) => {
    crossfade(idx, active);
    setActive(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % carouselImages.length;
        crossfade(next, prev);
        return next;
      });
    }, 4500);
  };

  // ── init: set opacity + start autoplay ──
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % carouselImages.length;
        crossfade(next, prev);
        return next;
      });
    }, 4500);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // ── entrance: title + breadcrumb animate in ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ph-breadcrumb", { y: 12, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.3 });
      gsap.from(".ph-title", { y: 36, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power3.out", delay: 0.5 });
      gsap.from(".ph-subtitle", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.75 });
      gsap.from(".ph-dots", { opacity: 0, duration: 0.5, delay: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, [title]); // re-run when page title changes (route change)

  return (
    <section
      ref={sectionRef}
      className="relative h-[56vh] min-h-[380px] flex items-end overflow-hidden bg-black"
    >
      {/* ── Carousel slides ── */}
      {carouselImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => { slideRefs.current[i] = el; }}
          className="absolute inset-0"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            style={{
              transform: "scale(1.04)",
              animation: i === active ? "phZoom 20s ease-in-out infinite alternate" : "none",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      {/* Strong bottom-to-top dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 z-[1]" />
      {/* Left-side directional depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-[1]" />
      {/* Top gradient — blends into the navbar */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-[1]" />

      {/* ── Subtle diagonal texture ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent, transparent 4px,
            rgba(255,255,255,1) 4px, rgba(255,255,255,1) 5px
          )`,
        }}
      />

      {/* ── Text content ── */}
      <div className="relative z-[2] w-full px-4 pb-12 md:pb-16">
        <div className="container mx-auto">

          {/* Breadcrumb */}
          <div className="ph-breadcrumb flex items-center gap-1 mb-5 text-xs text-white/50">
            <Home className="w-3.5 h-3.5" />
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                {item.to ? (
                  <Link to={item.to} className="hover:text-white/80 transition-colors font-medium">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/80 font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="ph-title text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <div className="ph-subtitle flex items-center gap-4">
            <div className="w-12 h-[3px] rounded-full bg-primary shrink-0" />
            <p className="text-base md:text-lg text-white/65 font-light">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="ph-dots absolute bottom-4 right-6 z-[2] flex items-center gap-1.5">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === active ? "20px" : "5px",
              height: "5px",
              background: i === active ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes phZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1.10); }
        }
      `}</style>
    </section>
  );
};

export default PageHero;