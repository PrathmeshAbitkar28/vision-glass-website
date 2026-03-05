import { useState, useEffect, useRef, useCallback } from "react";
import PageHero from "@/components/PageHero";
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";

// ─────────────────────────────────────────────
// Dynamic image loader — src/images/gallery_img/
// ─────────────────────────────────────────────
const imageModules = import.meta.glob(
  "/src/images/gallery_img/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, as: "url" }
);

const galleryImages: string[] = Object.keys(imageModules)
  .sort()
  .map((key) => imageModules[key] as string);

// ─────────────────────────────────────────────
// LazyImage — only loads src when the card
// enters the viewport via IntersectionObserver
// ─────────────────────────────────────────────
const LazyImage = ({
  src,
  alt,
  index,
  onClick,
  total,
}: {
  src: string;
  alt: string;
  index: number;
  onClick: () => void;
  total: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView]   = useState(false);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // load once, then stop watching
        }
      },
      { rootMargin: "200px" } // start loading 200px before it enters viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative group mb-4 break-inside-avoid cursor-pointer rounded-xl overflow-hidden bg-muted"
      onClick={onClick}
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "none" : "translateY(12px)",
        transition: `opacity 0.5s ease ${(index % 8) * 0.06}s, transform 0.5s ease ${(index % 8) * 0.06}s`,
      }}
    >
      {/* Skeleton — visible until image loads */}
      {!loaded && (
        <div className="w-full aspect-[4/3] bg-muted animate-pulse rounded-xl" />
      )}

      {/* Only render <img> once in viewport */}
      {inView && (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover block group-hover:scale-105 transition-transform duration-500 ease-out"
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? "block" : "none" }}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Badge */}
      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {index + 1} / {total}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox((p) => p !== null ? (p < galleryImages.length - 1 ? p + 1 : 0) : null);
      if (e.key === "ArrowLeft")  setLightbox((p) => p !== null ? (p > 0 ? p - 1 : galleryImages.length - 1) : null);
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const prev = useCallback(() =>
    setLightbox((p) => p !== null ? (p > 0 ? p - 1 : galleryImages.length - 1) : null), []);
  const next = useCallback(() =>
    setLightbox((p) => p !== null ? (p < galleryImages.length - 1 ? p + 1 : 0) : null), []);

  // ── Empty state ──
  if (galleryImages.length === 0) {
    return (
      <div>
        <PageHero
          image="https://images.unsplash.com/photo-1497366412874-3415097a27c7?w=1600&q=80"
          title="Our Projects"
          subtitle="A showcase of precision and craftsmanship"
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        />
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
            <Images className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No images yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Add your project photos to{" "}
            <code className="text-primary font-mono text-sm">src/images/gallery_img/</code>{" "}
            and they'll appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1497366412874-3415097a27c7?w=1600&q=80"
        title="Our Projects"
        subtitle="A showcase of precision and craftsmanship"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      {/* ── Masonry Grid ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {galleryImages.map((src, i) => (
              <LazyImage
                key={src}
                src={src}
                alt={`Project ${i + 1}`}
                index={i}
                total={galleryImages.length}
                onClick={() => setLightbox(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
          style={{ animation: "lbFadeIn 0.2s ease both" }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <img
            key={lightbox}
            src={galleryImages[lightbox]}
            alt={`Project ${lightbox + 1}`}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "lbSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) both" }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full">
            {lightbox + 1} / {galleryImages.length}
          </div>

          {/* Dot strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[80vw] overflow-hidden">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  width: i === lightbox ? "20px" : "6px",
                  height: "6px",
                  background: i === lightbox ? "#fff" : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbSlideIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;