import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "@/user/components/PageHero";
import {
  CheckCircle, Users, Award, Wrench, Building2,
  HardHat, Stethoscope, GraduationCap, Factory,
  PenTool, Hammer, ShoppingBag, ArrowRight,
  LucideIcon, Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { getSiteMetadata } from "@/shared/lib/firestore-service";
import EnquiryCTA from "@/user/components/EnquiryCTA";
import { optimizeUrl, Breakpoints } from "@/shared/lib/image-optimizer";

const BLUE = "#0ea5e9";

// ── Icon mapping ──
const iconMap: Record<string, LucideIcon> = {
  "Architects": PenTool,
  "Interior Designers": Hammer,
  "Interior Decorators": Hammer,
  "Builders": HardHat,
  "Builders & Developers": HardHat,
  "Hospitals": Stethoscope,
  "Schools": GraduationCap,
  "Industrial": Factory,
  "Industrial Decorators": Factory,
  "One-Stop Solution": Building2,
  "Quality Workmanship": Award,
  "Trusted by Leaders": Users,
  "End-to-End Service": Wrench,
  "Facility Management": Building2,
  "Carpenters": Wrench,
  "MEP Contractors": Wrench,
  "Real Estate Developers": HardHat,
  "HR & Purchase Depts.": ShoppingBag,
  "HR & Purchase Dept.": ShoppingBag,
};
const getIcon = (label: string): LucideIcon => iconMap[label] || Building2;

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { data: about, isLoading: loading } = useQuery({
    queryKey: ["about-metadata"],
    queryFn: () => getSiteMetadata("about"),
    staleTime: 1000 * 60 * 30,
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  if (!about) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Failed to load content.</p>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-700">
      <PageHero
        title="About Us"
        subtitle="Building trust through glass, one project at a time"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* ══ 1. COMPANY INTRO ══ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="relative">
              <img
                src={optimizeUrl("https://images.unsplash.com/photo-1486325212027-8081e485255e", Breakpoints.Card)}
                alt="Vision Glass"
                className="rounded-2xl shadow-2xl w-full h-[440px] object-cover"
              />
              {about.yearsExperience && (
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-background border border-border rounded-2xl p-5 shadow-xl hidden md:block max-w-[200px]">
                  <p className="font-extrabold tracking-[-0.02em] mb-1" style={{ fontSize: "28px", color: BLUE }}>
                    {about.yearsExperience}
                  </p>
                  <p className="text-muted-foreground leading-tight font-light" style={{ fontSize: "14px" }}>
                    Years of excellence in glass work
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 lg:pt-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] rounded-full bg-primary" />
                <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Our Story</p>
              </div>
              {about.introTitle && (
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-3 leading-tight">
                  {about.introTitle}
                </h2>
              )}
              {about.leaderName && (
                <p className="font-semibold mb-5" style={{ color: BLUE, fontSize: "14px" }}>
                  Led by {about.leaderName}
                </p>
              )}
              {about.introText1 && (
                <p className="text-muted-foreground leading-relaxed mb-4 font-light" style={{ fontSize: "16px" }}>
                  {about.introText1}
                </p>
              )}
              {about.introText2 && (
                <p className="text-muted-foreground leading-relaxed mb-8 font-light" style={{ fontSize: "16px" }}>
                  {about.introText2}
                </p>
              )}
              {(about.projectCount || about.directLiaison) && (
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[about.projectCount, about.directLiaison].filter(Boolean).map((item: string) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${BLUE}15` }}>
                        <CheckCircle className="w-4 h-4" style={{ color: BLUE }} />
                      </div>
                      <span className="font-medium text-foreground" style={{ fontSize: "14.5px" }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <Link to="/contact">
                <Button
                  className="rounded-full px-8 font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                  style={{ fontSize: "15px" }}
                >
                  Work With Us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. WHY CHOOSE US ══ */}
      {Array.isArray(about.whyChoose) && about.whyChoose.length > 0 && (
        <section className="relative py-24 md:py-28 overflow-hidden">
          <img
            src={optimizeUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00", Breakpoints.Hero)}
            alt="Modern Architecture"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(2,6,23,0.94) 0%,rgba(14,165,233,0.82) 100%)" }} />
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-sky-300 font-semibold uppercase tracking-[0.25em] mb-5" style={{ fontSize: "12px" }}>Why Us</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-white">Why Choose Vision Glass?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.whyChoose.map((item: any, i: number) => {
                const Icon = getIcon(item.title);
                return (
                  <div
                    key={i}
                    className="relative rounded-2xl p-7 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                  >
                    <span className="absolute top-5 right-5 font-black select-none" style={{ fontSize: "48px", color: "rgba(255,255,255,0.07)" }}>
                      0{i + 1}
                    </span>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <Icon className="w-6 h-6 text-sky-300" />
                    </div>
                    <h3 className="font-bold text-white mb-2" style={{ fontSize: "16px" }}>{item.title}</h3>
                    <p className="text-white/60 leading-relaxed font-light" style={{ fontSize: "14.5px" }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ 3. CLIENTS ══ */}
      {Array.isArray(about.clientTabs) && about.clientTabs.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] rounded-full bg-primary" />
                <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Our Portfolio</p>
                <div className="w-10 h-[2px] rounded-full bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground">Clients We've Served</h2>
            </div>

            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {about.clientTabs.map((tab: any, i: number) => {
                const Icon = getIcon(tab.label);
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200"
                    style={{
                      fontSize: "14px",
                      fontWeight: activeTab === i ? 600 : 500,
                      background: activeTab === i ? "var(--primary)" : "var(--muted)",
                      color: activeTab === i ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      boxShadow: activeTab === i ? `0 4px 14px ${BLUE}33` : "none",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Client list panel */}
            <div className="rounded-2xl border border-border bg-card p-8 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.clientTabs[activeTab]?.clients?.map((client: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground font-medium" style={{ fontSize: "14.5px" }}>{client}</span>
                  </div>
                ))}
              </div>
              {!about.clientTabs[activeTab]?.clients?.length && (
                <p className="text-center text-muted-foreground italic font-light py-8" style={{ fontSize: "15px" }}>
                  No entries for this sector yet.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ 4. WHO WE WORK WITH ══ */}
      {Array.isArray(about.workWith) && about.workWith.length > 0 && (
        <section className="relative py-24 overflow-hidden">
          <img
            src={optimizeUrl("https://images.unsplash.com/photo-1503387762-592deb58ef4e", Breakpoints.Hero)}
            alt="Modern architectural glass facade"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(14,165,233,0.88) 0%,rgba(2,6,23,0.96) 100%)" }} />
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-sky-300 font-semibold uppercase tracking-[0.25em] mb-5" style={{ fontSize: "12px" }}>Partners</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-white">Who We Work With</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {about.workWith.map((item: any, idx: number) => {
                const Icon = getIcon(item.title);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl px-6 py-4"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      transition: "background 0.25s ease, transform 0.25s ease",
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.16)"; el.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.transform = ""; }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <Icon className="w-4 h-4 text-sky-300" />
                    </div>
                    <p className="font-semibold text-white" style={{ fontSize: "14.5px" }}>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ 5. INDUSTRIES WE SERVE ══ */}
      {Array.isArray(about.industries) && about.industries.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] rounded-full bg-primary" />
                <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Sectors</p>
                <div className="w-10 h-[2px] rounded-full bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground">Industries We Serve</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {about.industries.map((item: any, i: number) => {
                const Icon = getIcon(item.title);
                return (
                  <div key={i} className="about-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-xl">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${BLUE}15` }}>
                      <Icon className="w-6 h-6" style={{ color: BLUE }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{item.title}</h3>
                      <p className="text-muted-foreground mt-0.5 font-light" style={{ fontSize: "13px" }}>Trusted partner</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <EnquiryCTA />

      <style>{`
        .about-lift {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease;
          will-change: transform;
        }
        .about-lift:hover { transform: translateY(-5px); }
      `}</style>
    </div>
  );
};

export default About;