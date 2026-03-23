import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import {
  ArrowRight,
  ChevronDown,
  PanelTop,
  Frame,
  Building2,
  Layers,
  Paintbrush,
  Lamp,
  Shield,
  CheckCircle,
  Loader2,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSiteMetadata } from "@/shared/lib/firestore-service";

gsap.registerPlugin(ScrollTrigger);

const BLUE = "#0ea5e9";

// Map icon string → component (Firestore stores strings, not JSX)
const iconComponents: Record<string, React.ElementType> = {
  PanelTop, Frame, Building2, Layers, Paintbrush, Lamp, Shield,
};
const resolveIcon = (name: string): React.ElementType =>
  iconComponents[name] || Building2;

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  // ── Single query for entire home document ──
  const { data: home, isLoading } = useQuery({
    queryKey: ["home-metadata"],
    queryFn: () => getSiteMetadata("home"),
    staleTime: 1000 * 60 * 30,
  });

  // ── GSAP animations ──
  useEffect(() => {
    if (!home) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });
      tl.from(".hero-badge", { y: 20, opacity: 0, scale: 0.92, duration: 0.8 })
        .from(".hero-line", { y: 60, opacity: 0, filter: "blur(8px)", duration: 1.1, stagger: 0.18 }, "-=0.3")
        .from(".hero-sub", { y: 28, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-btns > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.5")
        .from(".hero-scroll", { y: 10, opacity: 0, duration: 0.6 }, "-=0.3");

      gsap.to(".float-a", { y: -22, rotation: 2, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".float-b", { y: -15, rotation: -2, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".float-c", { y: -18, rotation: 1.5, duration: 4.8, ease: "sine.inOut", yoyo: true, repeat: -1 });

      gsap.utils.toArray<HTMLElement>(".gsap-section").forEach((section) => {
        const headings = section.querySelectorAll(".gsap-heading");
        const cards = section.querySelectorAll(".gsap-card");
        const stl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 82%" } });
        if (headings.length) stl.from(headings, { y: 32, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" });
        if (cards.length) stl.from(cards, { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4");
      });
    }, mainRef);
    return () => ctx.revert();
  }, [home]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  if (!home) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Failed to load content.</p>
    </div>
  );

  // Resolve hero image: prefer heroImages array, fall back to heroImage string
  const heroImageSrc = home.heroImages?.[0] || home.heroImage || "";

  return (
    <div ref={mainRef}>

      {/* ════════════ HERO ════════════ */}
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-black">
        {heroImageSrc && (
          <img
            src={heroImageSrc}
            alt="Modern glass curtain wall building"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
            style={{ animation: "heroZoom 24s ease-in-out infinite alternate" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-sky-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`, backgroundSize: "72px 72px" }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="float-a absolute top-[10%] left-[4%] w-36 h-52 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15" />
          <div className="float-b absolute top-[28%] right-[5%] w-28 h-40 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10" />
          <div className="float-c absolute bottom-[20%] left-[13%] w-24 h-32 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pt-28 md:pt-0 pb-16 md:pb-0">
          <div
            className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-7"
            style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.02em" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Pune's Trusted Glass Experts
          </div>

          {home.heroTitle1 && (
            <div className="overflow-hidden mb-1">
              <h1 className="hero-line text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] leading-[1.0]">
                {home.heroTitle1}
              </h1>
            </div>
          )}
          {home.heroTitle2 && (
            <div className="overflow-hidden mb-8">
              <h1
                className="hero-line text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] leading-[1.0] text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#7dd3fc 0%,#38bdf8 45%,#0ea5e9 100%)" }}
              >
                {home.heroTitle2}
              </h1>
            </div>
          )}
          {home.heroSubtitle && (
            <p className="hero-sub max-w-2xl mx-auto mb-10 leading-relaxed font-light text-white/70" style={{ fontSize: "17px" }}>
              {home.heroSubtitle}
            </p>
          )}

          <div className="hero-btns flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-full px-10 h-14 font-semibold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300"
                style={{ fontSize: "15px" }}
              >
                Get a Free Quote
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-10 h-14 text-white hover:text-white"
                style={{ fontSize: "15px", background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.35)", transition: "background 0.3s ease, border-color 0.3s ease" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.18)"; el.style.borderColor = "rgba(255,255,255,0.65)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.09)"; el.style.borderColor = "rgba(255,255,255,0.35)"; }}
              >
                View Our Work <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="hero-scroll hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40">
          <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>


      {/* ════════════ SERVICES ════════════ */}
      {Array.isArray(home.services) && home.services.length > 0 && (
        <section className="gsap-section py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="gsap-heading flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] rounded-full bg-primary" />
                <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>What We Do</p>
                <div className="w-10 h-[2px] rounded-full bg-primary" />
              </div>
              {home.servicesTitle && (
                <h2 className="gsap-heading text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-4">
                  {home.servicesTitle}
                </h2>
              )}
              {home.servicesSubtitle && (
                <p className="gsap-heading text-muted-foreground max-w-xl mx-auto leading-relaxed font-light" style={{ fontSize: "16px" }}>
                  {home.servicesSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {home.services.map((s: any, idx: number) => {
                const Icon = resolveIcon(s.icon);
                return (
                  <Link key={s.title || idx} to="/services" className="gsap-card service-card-outer group relative">
                    <div className="service-card-inner relative rounded-2xl overflow-hidden bg-card border border-border group-hover:border-transparent group-hover:shadow-2xl">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=85";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold leading-tight drop-shadow-md" style={{ fontSize: "17px" }}>{s.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground leading-relaxed mb-4 font-light" style={{ fontSize: "14.5px" }}>{s.desc}</p>
                        <span className="inline-flex items-center gap-2 font-semibold" style={{ color: BLUE, fontSize: "14.5px" }}>
                          Learn More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: BLUE }} />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="gsap-heading text-center mt-12">
              <Link to="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10 hover:bg-foreground hover:text-background transition-all duration-300"
                  style={{ fontSize: "15px", fontWeight: 500 }}
                >
                  View All Services <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* ════════════ USP BANNER ════════════ */}
      {home.uspTitle && (
        <section className="gsap-section relative py-28 overflow-hidden">
          <img
            src={home.uspBackgroundImage || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85"}
            alt="Glass building facade"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(2,6,23,0.94) 0%,rgba(14,165,233,0.82) 100%)" }} />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <p className="gsap-heading text-sky-300 font-semibold uppercase tracking-[0.25em] mb-5" style={{ fontSize: "12px" }}>Our Promise</p>
            <h2 className="gsap-heading text-3xl md:text-5xl font-extrabold tracking-[-0.02em] mb-6 max-w-3xl mx-auto leading-tight">
              {home.uspTitle}
            </h2>
            {home.uspSubtitle && (
              <p className="gsap-heading text-white/65 mb-10 font-light" style={{ fontSize: "16px" }}>
                {home.uspSubtitle}
              </p>
            )}
            {Array.isArray(home.uspPoints) && home.uspPoints.length > 0 && (
              <div className="gsap-card grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-lg mx-auto">
                {home.uspPoints.map((pt: string) => (
                  <div key={pt} className="flex items-center gap-3 text-white/85">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                    <span style={{ fontSize: "15px", fontWeight: 500 }}>{pt}</span>
                  </div>
                ))}
              </div>
            )}
            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-full px-10 font-semibold bg-white text-foreground hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-xl"
                style={{ fontSize: "15px" }}
              >
                Start Your Project
              </Button>
            </Link>
          </div>
        </section>
      )}


      {/* ════════════ TRUSTED BY ════════════ */}
      {Array.isArray(home.trustedBy) && home.trustedBy.length > 0 && (
        <section className="gsap-section py-24 md:py-28 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="gsap-heading flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] rounded-full bg-primary" />
                <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Who We Serve</p>
                <div className="w-10 h-[2px] rounded-full bg-primary" />
              </div>
              {home.trustTitle && (
                <h2 className="gsap-heading text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-3">
                  {home.trustTitle}
                </h2>
              )}
              {home.trustSubtitle && (
                <p className="gsap-heading text-muted-foreground max-w-md mx-auto font-light" style={{ fontSize: "16px" }}>
                  {home.trustSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {home.trustedBy.map((item: any, idx: number) => (
                <div key={item.label || idx} className="gsap-card trusted-card-outer group">
                  <div className="trusted-card-inner rounded-2xl overflow-hidden border border-border" style={{ height: "232px" }}>
                    <div className="relative overflow-hidden" style={{ height: "160px" }}>
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                      <p className="absolute bottom-3 left-0 right-0 text-center text-white font-bold tracking-wide drop-shadow-md px-2" style={{ fontSize: "15px" }}>
                        {item.label}
                      </p>
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: BLUE }} />
                    </div>
                    <div className="flex flex-col justify-center items-center px-3 text-center" style={{ height: "72px", background: "var(--card)" }}>
                      <p className="text-muted-foreground leading-snug" style={{ fontSize: "13.5px" }}>{item.desc}</p>
                      <div className="mt-2 h-[2px] rounded-full w-0 group-hover:w-3/4 transition-all duration-500" style={{ backgroundColor: BLUE }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════ REFER A CLIENT ════════════ */}
      {Array.isArray(home.referCards) && home.referCards.length > 0 && (
        <section className="gsap-section py-24 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="gsap-heading flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] rounded-full bg-primary" />
                <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Refer a Client</p>
                <div className="w-10 h-[2px] rounded-full bg-primary" />
              </div>
              {home.referTitle && (
                <h2 className="gsap-heading text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-4">
                  {home.referTitle}
                </h2>
              )}
              {home.referSubtitle && (
                <p className="gsap-heading text-muted-foreground max-w-md mx-auto font-light" style={{ fontSize: "16px" }}>
                  {home.referSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
              {home.referCards.map((card: any, i: number) => {
                const Icon = resolveIcon(card.icon);
                return (
                  <div key={i} className="gsap-card refer-card-outer group h-full">
                    <div className="refer-card-inner h-full flex flex-col relative rounded-3xl border border-border bg-card p-8 text-center overflow-hidden group-hover:shadow-2xl group-hover:border-transparent">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 0%,${BLUE}18 0%,transparent 70%)` }}
                      />
                      <div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${BLUE}18` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: BLUE }} />
                      </div>
                      <h3 className="font-bold text-foreground mb-3 leading-snug" style={{ fontSize: "16px" }}>
                        {card.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-light flex-1 mb-7" style={{ fontSize: "14.5px" }}>
                        {card.sub}
                      </p>
                      <Link to="/contact">
                        <Button
                          variant="outline"
                          className="rounded-full w-full transition-all duration-300"
                          style={{ fontSize: "15px", fontWeight: 500 }}
                          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = BLUE; el.style.borderColor = BLUE; el.style.color = "#fff"; }}
                          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = ""; el.style.borderColor = ""; el.style.color = ""; }}
                        >
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}


      {/* ════════════ ENQUIRY CTA ════════════ */}
      {(home.enquiryCTATitle || home.enquiryCTASubtitle) && (
        <section className="w-full bg-background border-t border-slate-100 pb-12 md:pb-20 pt-8 md:pt-10">
          <div className="w-full px-5 md:px-16 lg:px-24">
            <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#020617] py-12 px-6 md:py-20 md:px-24 text-center relative overflow-hidden group shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors duration-700" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-1000" />
              <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-[1px] w-12 bg-sky-500" />
                  <span className="text-sky-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] italic">Work with Experts</span>
                </div>
                <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                  {home.enquiryCTATitle}
                </h3>
                {home.enquiryCTASubtitle && (
                  <p className="text-white/50 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    {home.enquiryCTASubtitle}
                  </p>
                )}
                <div className="flex items-center justify-center pt-4 md:pt-6">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="rounded-full px-10 md:px-12 h-14 md:h-16 text-base md:text-lg font-black uppercase tracking-widest shadow-2xl hover:scale-[1.05] hover:shadow-sky-500/25 active:scale-95"
                      style={{ backgroundColor: BLUE }}
                    >
                      Start Consultation
                    </Button>
                  </Link>
                </div>
                {Array.isArray(home.enquiryCTAItems) && home.enquiryCTAItems.length > 0 && (
                  <div className="pt-8 md:pt-10 flex flex-col items-center gap-4 text-white/70 border-t border-white/5">
                    {home.enquiryCTAItems.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-sky-500" />
                        <span className="text-sm md:text-lg font-bold tracking-tight text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1.11); }
        }
        .service-card-outer, .refer-card-outer { padding-bottom: 6px; }
        .service-card-inner, .refer-card-inner {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease;
          will-change: transform;
        }
        .service-card-outer:hover .service-card-inner,
        .refer-card-outer:hover   .refer-card-inner { transform: translateY(-6px); }
        .refer-card-outer { display: flex; flex-direction: column; }
        .refer-card-inner { flex: 1; }
        .trusted-card-outer { padding-bottom: 6px; }
        .trusted-card-inner {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease;
          will-change: transform;
        }
        .trusted-card-outer:hover .trusted-card-inner {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          border-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Index;