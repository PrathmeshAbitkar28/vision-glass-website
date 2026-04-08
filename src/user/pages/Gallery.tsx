import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "@/user/components/PageHero";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Loader2 } from "lucide-react";
import { getCollectionContent } from "@/shared/lib/firestore-service";
import EnquiryCTA from "@/user/components/EnquiryCTA";
import { optimizeUrl, Breakpoints } from "@/shared/lib/image-optimizer";

const BLUE = "#0ea5e9";

interface GalleryItem {
  id?: string;
  title: string;
  category: string;
  image: string;
}

// ── IntersectionObserver-based lazy image ──
const LazyImage = ({
  src, alt, index, total, onClick,
}: { src: string; alt: string; index: number; total: number; onClick: () => void }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      onClick={onClick}
      className="relative group mb-4 break-inside-avoid cursor-pointer rounded-2xl overflow-hidden bg-muted border border-border"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "none" : "translateY(12px)",
        transition: `opacity 0.5s ease ${(index % 8) * 0.06}s, transform 0.5s ease ${(index % 8) * 0.06}s, box-shadow 0.3s ease, border-color 0.25s ease`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${BLUE}55`;
        el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }}
    >
      {!loaded && <div className="w-full aspect-[4/3] bg-muted animate-pulse rounded-2xl" />}
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
      <div
        className="absolute bottom-3 right-3 text-white px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", fontSize: "11px", fontWeight: 600 }}
      >
        {index + 1} / {total}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { data: galleryItems = [], isLoading: loading } = useQuery<GalleryItem[]>({
    queryKey: ["gallery-items"],
    queryFn: async () => {
      const data = await getCollectionContent("gallery");
      return (data as GalleryItem[]).sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    },
    staleTime: 1000 * 60 * 15,
  });

  const categories = ["All", ...Array.from(new Set(galleryItems.map(i => i.category)))];
  const filteredItems = filter === "All" ? galleryItems : galleryItems.filter(i => i.category === filter);

  // Keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox(p => p !== null ? (p < filteredItems.length - 1 ? p + 1 : 0) : null);
      if (e.key === "ArrowLeft") setLightbox(p => p !== null ? (p > 0 ? p - 1 : filteredItems.length - 1) : null);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, filteredItems.length]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const prev = useCallback(() =>
    setLightbox(p => p !== null ? (p > 0 ? p - 1 : filteredItems.length - 1) : null), [filteredItems.length]);
  const next = useCallback(() =>
    setLightbox(p => p !== null ? (p < filteredItems.length - 1 ? p + 1 : 0) : null), [filteredItems.length]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-700 min-h-screen bg-background">
      <PageHero
        title="Our Gallery"
        subtitle="Exploring the art of architectural glass"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      {/* ── Filter bar ── */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-10 relative z-20">
        <div className="bg-card border border-border rounded-2xl p-3 md:p-5 shadow-xl flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setLightbox(null); }}
              className="px-5 md:px-7 py-2.5 rounded-full uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                background: filter === cat ? "var(--primary)" : "var(--muted)",
                color: filter === cat ? "var(--primary-foreground)" : "var(--muted-foreground)",
                boxShadow: filter === cat ? `0 4px 14px ${BLUE}33` : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Masonry grid ── */}
      <section className="container mx-auto px-4 pt-14 md:pt-16 pb-20">
        {filteredItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredItems.map((item, i) => (
              <LazyImage
                key={item.id || i}
                src={optimizeUrl(item.image, Breakpoints.Card)}
                alt={item.title}
                index={i}
                total={filteredItems.length}
                onClick={() => setLightbox(i)}
              />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center" style={{ opacity: 0.15 }}>
            <Camera className="w-20 h-20 mx-auto mb-6" />
            <h3 className="font-bold uppercase tracking-widest" style={{ fontSize: "16px" }}>No photos in this category</h3>
          </div>
        )}
      </section>

      <EnquiryCTA />

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
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.20)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.20)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="flex flex-col items-center gap-4 max-h-[90vh] max-w-[88vw]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "lbSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <img
              key={lightbox}
              src={optimizeUrl(filteredItems[lightbox].image, Breakpoints.Section)}
              alt={filteredItems[lightbox].title}
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-white uppercase tracking-tight" style={{ fontSize: "16px" }}>
                {filteredItems[lightbox].title}
              </h3>
              <span
                className="text-white font-semibold uppercase px-3 py-1 rounded-full"
                style={{ fontSize: "10px", letterSpacing: "0.1em", background: BLUE }}
              >
                {filteredItems[lightbox].category}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-colors z-10"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.20)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white px-5 py-2 rounded-full"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", fontSize: "14px", fontWeight: 500 }}
          >
            {lightbox + 1} / {filteredItems.length}
          </div>

          {/* Dot strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[80vw] overflow-hidden">
            {filteredItems.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  width: i === lightbox ? "20px" : "6px",
                  height: "6px",
                  background: i === lightbox ? "#fff" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes lbFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbSlideIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default Gallery;