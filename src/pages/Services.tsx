import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { useFadeIn } from "@/hooks/useFadeIn";
import { ArrowRight, MessageCircle } from "lucide-react";

const services = [
  {
    title: "Glass Partitions",
    subtitle: "Office & Commercial",
    desc: "Full and partial glass partition walls for offices, cabins and conference rooms. Custom sizes, frameless or framed.",
    // Glass office partitions hallway — Unsplash
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=85",
    tags: ["Frameless", "Framed", "Office Cabins"],
  },
  {
    title: "Aluminium & UPVC Windows",
    subtitle: "Windows & Partitions",
    desc: "Durable, weather-resistant window frames and partition systems for all building types — residential to industrial.",
    // Building facade with windows and shadows, Dubai — aboodi vesakaran
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=85",
    tags: ["Aluminium", "UPVC", "Casement", "Sliding"],
  },
  {
    title: "Structural Facade",
    subtitle: "Exterior Facade Systems",
    desc: "High-performance structural and semi-structural exterior glass facade systems for commercial buildings and IT parks.",
    // Glass curtain wall on commercial tower
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=85",
    tags: ["Structural", "Semi-Structural", "Curtain Wall"],
  },
  {
    title: "Glass Glazing",
    subtitle: "Composite Panel Work",
    desc: "Toughened glass glazing and composite ACP panel installations for building exteriors and interiors.",
    // Glass panels building exterior reflection — verified Unsplash
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=85",
    tags: ["Toughened Glass", "ACP Panels", "Safety Glass"],
  },
  {
    title: "Glass Interior Solutions",
    subtitle: "Complete Interior Fitouts",
    desc: "Custom glass shelving, cabinets, display units and full glass interior fitouts tailored to your design.",
    // Glass interior fitout
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27c7?w=700&q=85",
    tags: ["Shelving", "Cabinets", "Display Units"],
  },
  {
    title: "Decorative & LED Mirrors",
    subtitle: "Mirror Work",
    desc: "Backlit LED mirrors, decorative mirrors, vastu mirrors and custom mirror installations for all spaces.",
    // Modern bathroom with large wall mirror — verified Unsplash
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=85",
    tags: ["LED Backlit", "Decorative", "Vastu"],
  },
  {
    title: "Acid, Stain & Bend Glass",
    subtitle: "Artistic Glass Treatments",
    desc: "Acid etching, stained glass, airbrush work and curved glass fabrication for unique architectural features.",
    // Three colorful stained glass windows in dark room — Possessed Photography (ID: gqTceVX5ZOs)
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=85",
    tags: ["Acid Etching", "Stained Glass", "Bend Glass"],
  },
  {
    title: "PVC Fiber & Profile Doors",
    subtitle: "Door Systems",
    desc: "Moisture-resistant PVC fiber doors and premium profile door systems for all environments.",
    // Clean modern interior door
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=85",
    tags: ["PVC Fiber", "Profile Doors", "Moisture Resistant"],
  },
];

const Services = () => {
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef}>
      <PageHero
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
        title="Our Services"
        subtitle="End-to-end glass solutions for every space"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      {/* Intro Strip */}
      <div className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm max-w-xl">
            From a single window replacement to a full commercial glass fitout — we handle it all with expertise and professionalism.
          </p>
          <Link to="/contact">
            <Button className="rounded-full shrink-0" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" /> Get a Free Quote
            </Button>
          </Link>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-section">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading={i < 4 ? "eager" : "lazy"}
                    onError={(e) => {
                      // Fallback to a safe generic image if photo ID doesn't resolve
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=85";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                      {s.subtitle}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-bold text-xl text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 md:p-14 text-center text-white fade-in-section">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Don't see what you're looking for?</h3>
            <p className="text-white/70 mb-7 text-lg">We offer custom glass solutions. Get in touch and we'll find the perfect fit for your project.</p>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="rounded-full px-10 font-semibold">
                Discuss Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;