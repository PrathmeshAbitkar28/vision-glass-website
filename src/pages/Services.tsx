import PageHero from "@/components/PageHero";
import { useFadeIn } from "@/hooks/useFadeIn";

const services = [
  {
    title: "Glass Partitions (Office & Commercial)",
    desc: "Full and partial glass partition walls for offices, cabins and conference rooms.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Aluminium & UPVC Windows & Partition",
    desc: "Durable weather-resistant window frames and partition systems for all building types.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    title: "Structural & Semi-Structural Facade Work",
    desc: "High-performance exterior glass facade systems for commercial buildings and IT parks.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    title: "Glass Glazing / Composite Panel",
    desc: "Toughened glass glazing and composite ACP panel work for building exteriors and interiors.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
  },
  {
    title: "Complete Glass Interior Solutions",
    desc: "Custom glass shelving, cabinets, display units and full interior glass fitouts.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    title: "Decorative & LED Mirror Work",
    desc: "Backlit LED mirrors, decorative mirrors, vastu mirrors and custom mirror installations.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
  },
  {
    title: "Acid Work, Stain Glass, Air Brush, Bend Glass",
    desc: "Artistic glass treatments — acid etching, stained glass and curved glass fabrication.",
    image: "https://images.unsplash.com/photo-1520110120835-c96534a4c984?w=600&q=80",
  },
  {
    title: "PVC Fiber Doors & Profile Doors",
    desc: "Moisture-resistant PVC fiber doors and premium profile door systems.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
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

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-section">
            {services.map((s) => (
              <div
                key={s.title}
                className="group glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
