import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const categories = ["All", "Commercial", "Residential", "Industrial", "Hospitals", "Facades", "Mirrors & Decorative"];

// Replace with actual project photos
const images = [
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", cat: "Commercial" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", cat: "Facades" },
  { src: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80", cat: "Mirrors & Decorative" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", cat: "Residential" },
  { src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80", cat: "Commercial" },
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", cat: "Commercial" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", cat: "Residential" },
  { src: "https://images.unsplash.com/photo-1520110120835-c96534a4c984?w=600&q=80", cat: "Mirrors & Decorative" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", cat: "Industrial" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", cat: "Residential" },
  { src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80", cat: "Commercial" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80", cat: "Facades" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", cat: "Residential" },
  { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80", cat: "Hospitals" },
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80", cat: "Facades" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", cat: "Residential" },
  { src: "https://images.unsplash.com/photo-1497366412874-3415097a27c7?w=600&q=80", cat: "Industrial" },
  { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80", cat: "Mirrors & Decorative" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const containerRef = useFadeIn();

  const filtered = filter === "All" ? images : images.filter((img) => img.cat === filter);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p !== null && p > 0 ? p - 1 : filtered.length - 1));
  const next = () => setLightbox((p) => (p !== null && p < filtered.length - 1 ? p + 1 : 0));

  return (
    <div ref={containerRef}>
      <PageHero
        image="https://images.unsplash.com/photo-1497366412874-3415097a27c7?w=1600&q=80"
        title="Our Projects"
        subtitle="A showcase of precision and craftsmanship"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      {/* Filter Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border py-3">
        <div className="container mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 fade-in-section">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="relative group mb-4 break-inside-avoid cursor-pointer rounded-xl overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={`Project ${i + 1}`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <Badge className="absolute bottom-3 left-3 text-xs">{img.cat}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={filtered[lightbox].src.replace("w=600", "w=1200")}
            alt="Project detail"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
