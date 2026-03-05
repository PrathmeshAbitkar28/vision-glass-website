import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronDown, Layers, Building2, PanelTop, Frame, Paintbrush, Lamp } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const services = [
  {
    title: "Glass Partitions",
    desc: "Office & commercial spaces",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    icon: PanelTop,
  },
  {
    title: "Aluminium & UPVC Windows",
    desc: "Durable framing solutions",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    icon: Frame,
  },
  {
    title: "Structural Facade",
    desc: "Exterior glass facade work",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    icon: Building2,
  },
  {
    title: "Glass Glazing",
    desc: "Composite panel glazing",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
    icon: Layers,
  },
  {
    title: "Interior Solutions",
    desc: "Complete glass interiors",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    icon: Lamp,
  },
  {
    title: "Decorative Mirrors",
    desc: "LED & decorative mirrors",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
    icon: Paintbrush,
  },
];

const trustedBy = ["Architects", "Builders", "Hospitals", "Schools", "Industrial Companies"];

const referCards = [
  "Are you looking for office cabin or glass partition work?",
  "Do you need to replace broken cabin window glass?",
  "Are you looking for soundproof glass or window solutions?",
];

const Index = () => {
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef}>
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
          alt="Modern glass building facade"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Floating glass panels */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-40 h-56 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-float-glass" />
          <div className="absolute top-[30%] right-[8%] w-32 h-44 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/15 animate-float-glass-slow" />
          <div className="absolute bottom-[20%] left-[15%] w-28 h-36 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-float-glass-fast" />
          <div className="absolute top-[50%] right-[25%] w-24 h-32 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 animate-float-glass" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/80 mb-4">
            Welcome to Vision Glass Creation
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Expert in Window &<br />Glass Solutions
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Premium glass partitions, facades, mirrors and window solutions for commercial,
            residential and industrial spaces across Pune.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-8 text-base">
                Contact Us
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Services</h2>
            <p className="text-muted-foreground text-lg">Complete glass solutions under one roof</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-section">
            {services.map((s) => (
              <Link
                key={s.title}
                to="/services"
                className="group rounded-xl overflow-hidden glass-card hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USP BANNER */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white fade-in-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Complete solution for all types of window and glass work under one roof.
          </h2>
          <p className="text-lg text-white/90">Quality workmanship with professional finishing.</p>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 bg-background fade-in-section">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Trusted By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {trustedBy.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="px-5 py-2 text-sm font-medium rounded-full"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO REFER */}
      <section className="section-padding bg-muted/50 fade-in-section">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
            How to Refer Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {referCards.map((text, i) => (
              <div
                key={i}
                className="glass-card-strong rounded-xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <p className="text-foreground text-lg font-medium">{text}</p>
                <Link to="/contact">
                  <Button variant="outline" className="mt-6 rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
