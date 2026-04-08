import { useQuery } from "@tanstack/react-query";
import PageHero from "@/user/components/PageHero";
import { ArrowRight, ShieldCheck, CheckCircle, MessageCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { getCollectionContent } from "@/shared/lib/firestore-service";
import EnquiryCTA from "@/user/components/EnquiryCTA";
import { optimizeUrl, Breakpoints } from "@/shared/lib/image-optimizer";

const BLUE = "#0ea5e9";

const Services = () => {
  const { data: servicesList = [], isLoading: loading } = useQuery({
    queryKey: ["services-list"],
    queryFn: async () => {
      const data = await getCollectionContent("services");
      return data;
    },
    staleTime: 1000 * 60 * 15,
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-700">
      <PageHero
        title="Our Services"
        subtitle="Industrial glass and window systems for modern architecture"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      {/* ── Intro strip ── */}
      <div className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground max-w-xl font-light" style={{ fontSize: "15px" }}>
            From a single window replacement to a full commercial glass fitout — we handle it all with expertise and professionalism.
          </p>
          <Link to="/contact">
            <Button
              size="sm"
              className="rounded-full shrink-0 font-semibold"
              style={{ backgroundColor: BLUE, fontSize: "14px" }}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Get a Free Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Services grid ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] rounded-full bg-primary" />
              <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Our Expertise</p>
              <div className="w-10 h-[2px] rounded-full bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-4">Expert Solutions</h2>
            <p className="text-muted-foreground leading-relaxed font-light" style={{ fontSize: "16px" }}>
              Professional finishing has earned the trust of leading architects, builders, and schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {servicesList.map((s: any, i: number) => (
              <div
                key={i}
                className="svc-card-outer group flex flex-col"
              >
                <div className="svc-card-inner flex flex-col flex-1 rounded-2xl overflow-hidden border border-border bg-card group-hover:border-transparent group-hover:shadow-2xl">
                  <div className="relative h-60 shrink-0 overflow-hidden">
                    <img
                      src={optimizeUrl(s.image, Breakpoints.Card)}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading={i < 3 ? "eager" : "lazy"}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=85";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-white font-semibold uppercase tracking-wide px-3 py-1 rounded-full"
                        style={{ fontSize: "11px", background: BLUE }}
                      >
                        {s.subtitle || "Service Line"}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-bold text-foreground leading-tight mb-3" style={{ fontSize: "18px" }}>{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 font-light" style={{ fontSize: "14.5px" }}>{s.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1.5 text-muted-foreground bg-muted rounded-lg px-2.5 py-1.5 uppercase"
                          style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em" }}
                        >
                          <CheckCircle className="w-3 h-3" style={{ color: BLUE }} /> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-5 border-t border-border flex items-center justify-between">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 font-semibold transition-all duration-300 group-hover:translate-x-1"
                        style={{ color: BLUE, fontSize: "14.5px" }}
                      >
                        Enquire Now <ArrowRight className="w-4 h-4" />
                      </Link>
                      <div className="flex items-center gap-1.5 text-muted-foreground/60 group-hover:text-sky-500 transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Certified</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" style={{ backgroundColor: BLUE }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-16 rounded-2xl overflow-hidden">
            <div
              className="relative p-10 md:p-14 text-center text-white"
              style={{ background: "linear-gradient(135deg,rgba(2,6,23,0.97) 0%,rgba(14,165,233,0.85) 100%)" }}
            >
              <p className="font-semibold uppercase tracking-[0.22em] mb-4 text-sky-300" style={{ fontSize: "12px" }}>Custom Work</p>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-[-0.02em] mb-3">Don't see what you're looking for?</h3>
              <p className="text-white/65 mb-8 font-light max-w-lg mx-auto" style={{ fontSize: "16px" }}>
                We offer custom glass solutions. Get in touch and we'll find the perfect fit for your project.
              </p>
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-10 font-semibold hover:scale-[1.02] transition-all duration-300"
                  style={{ fontSize: "15px" }}
                >
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />

      <style>{`
        .svc-card-outer { padding-bottom: 6px; position: relative; }
        .svc-card-inner {
          position: relative;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease;
          will-change: transform;
        }
        .svc-card-outer:hover .svc-card-inner { transform: translateY(-6px); }
      `}</style>
    </div>
  );
};

export default Services;