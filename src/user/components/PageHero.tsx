import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import gsap from "gsap";
import { getSiteMetadata } from "@/shared/lib/firestore-service";
import { optimizeUrl, Breakpoints } from "@/shared/lib/image-optimizer";

const FALLBACK_CAROUSEL = [
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90", alt: "Structural glass facade" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90", alt: "Commercial glazing" },
  { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=90", alt: "Aluminium window systems" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90", alt: "Glass office partitions" },
];

interface PageHeroProps {
  image?: string;
  title: string;
  subtitle: string;
  breadcrumb: { label: string; to?: string }[];
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Non-blocking: start with fallback instantly, upgrade when Firestore responds ──
  const { data: images = FALLBACK_CAROUSEL } = useQuery({
    queryKey: ["page-hero-images"],
    queryFn: async () => {
      const data = await getSiteMetadata("home");
      if (data?.pageHeroImages?.length > 0) {
        return data.pageHeroImages.map((src: string) => ({
          src,
          alt: "Vision Glass Project",
        }));
      }
      return FALLBACK_CAROUSEL;
    },
    // Show fallback immediately — no loading state, no spinner
    initialData: FALLBACK_CAROUSEL,
    staleTime: 1000 * 60 * 20,
  });

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

  const goTo = (idx: number) => {
    if (images.length <= 1) return;
    crossfade(idx, active);
    setActive(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % images.length;
        crossfade(next, prev);
        return next;
      });
    }, 5500);
  };

  // ── Autoplay ──
  useEffect(() => {
    if (images.length <= 1) return;
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % images.length;
        crossfade(next, prev);
        return next;
      });
    }, 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images]);

  // ── Text entrance ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ph-breadcrumb", { y: 12, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.2 });
      gsap.from(".ph-title", { y: 36, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power3.out", delay: 0.35 });
      gsap.from(".ph-subtitle", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.55 });
      gsap.from(".ph-dots", { opacity: 0, duration: 0.5, delay: 0.8 });
    }, sectionRef);
    return () => ctx.revert();
  }, [title]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[35vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Carousel slides — first image eager loaded */}
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => { slideRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <img
            src={optimizeUrl(img.src, Breakpoints.Hero)}
            alt={img.alt}
            className="w-full h-full object-cover"
            style={{
              transform: "scale(1.04)",
              animation: i === active ? "phZoom 20s ease-in-out infinite alternate" : "none",
            }}
            // Only first slide loads eagerly — rest lazy
            loading={i === 0 ? "eager" : "lazy"}
            // Explicit dimensions prevent layout shift
            width={1920}
            height={1080}
            decoding={i === 0 ? "sync" : "async"}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-[1]" />
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 4px,rgba(255,255,255,1) 4px,rgba(255,255,255,1) 5px)`,
        }}
      />

      {/* Text */}
      <div className="relative z-[2] w-full px-4 pt-32 pb-12 text-center">
        <div className="container mx-auto flex flex-col items-center">
          <div className="ph-breadcrumb flex items-center justify-center gap-3 mb-8 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
            {breadcrumb.map((crumb, i) => (
              <div key={i} className="flex items-center gap-3">
                {crumb.to ? (
                  <Link to={crumb.to} className="text-white/40 hover:text-white transition-colors text-[10px] uppercase font-black tracking-[0.2em] flex items-center gap-2">
                    {crumb.label === "Home" && <Home className="w-3 h-3" />}
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-sky-400 text-[10px] uppercase font-black tracking-[0.2em]">{crumb.label}</span>
                )}
                {i < breadcrumb.length - 1 && <div className="w-1.5 h-1.5 rounded-full bg-white/10" />}
              </div>
            ))}
          </div>

          <h1 className="ph-title text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-white mb-4 leading-none uppercase drop-shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            {title}
          </h1>

          <div className="ph-subtitle flex items-center justify-center gap-2 md:gap-4 px-4 text-center">
            <div className="w-6 md:w-10 h-[2px] rounded-full bg-primary shrink-0" />
            <p className="text-[10px] md:text-lg text-white font-bold uppercase tracking-widest leading-tight">{subtitle}</p>
            <div className="w-6 md:w-10 h-[2px] rounded-full bg-primary shrink-0" />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="ph-dots absolute bottom-4 right-6 z-[2] flex items-center gap-1.5">
          {images.map((_, i) => (
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
      )}

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