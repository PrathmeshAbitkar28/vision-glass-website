import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Glass Partitions", desc: "Frameless and framed partition walls for modern offices and commercial cabins.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85", icon: PanelTop, accent: "#0ea5e9" },
  { title: "Aluminium & UPVC Windows", desc: "Weather-sealed, thermally efficient window systems for every building type.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=85", icon: Frame, accent: "#6366f1" },
  { title: "Structural Facade", desc: "High-performance curtain wall and structural glazing for commercial towers.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85", icon: Building2, accent: "#10b981" },
  { title: "Glass Glazing", desc: "Toughened safety glass and composite ACP panel installations inside and out.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85", icon: Layers, accent: "#f59e0b" },
  { title: "Interior Glass Solutions", desc: "Custom glass shelving, display units, and complete interior glass fitouts.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85", icon: Lamp, accent: "#ec4899" },
  { title: "Decorative & LED Mirrors", desc: "Backlit LED mirrors, vastu mirrors, and bespoke decorative installations.", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=85", icon: Paintbrush, accent: "#8b5cf6" },
];

const trustedBy = [
  { label: "Architects", icon: "🏛️" },
  { label: "Builders", icon: "🏗️" },
  { label: "Hospitals", icon: "🏥" },
  { label: "Schools", icon: "🎓" },
  { label: "Industrial Companies", icon: "🏭" },
];

const referCards = [
  { question: "Looking for office cabin or glass partition work?", sub: "We design and install custom office partitions across Pune.", icon: PanelTop, accent: "#0ea5e9" },
  { question: "Need to replace broken cabin or window glass?", sub: "Fast, reliable glass replacement with professional finishing.", icon: Frame, accent: "#6366f1" },
  { question: "Searching for soundproof glass or window solutions?", sub: "Acoustic glass systems engineered for peace and privacy.", icon: Shield, accent: "#10b981" },
];

const uspPoints = [
  "One-stop glass solution provider",
  "Professional installation team",
  "Trusted by 50+ architects & builders",
  "Quality workmanship guaranteed",
];

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      const sections = gsap.utils.toArray<HTMLElement>(".gsap-section");
      sections.forEach((section) => {
        const headings = section.querySelectorAll(".gsap-heading");
        const cards = section.querySelectorAll(".gsap-card");
        const pills = section.querySelectorAll(".gsap-pill");
        const stl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 82%" } });
        if (headings.length) stl.from(headings, { y: 32, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" });
        if (cards.length) stl.from(cards, { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4");
        if (pills.length) stl.from(pills, { y: 20, opacity: 0, scale: 0.95, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)" }, "-=0.4");
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90"
          alt="Modern glass curtain wall building"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          style={{ animation: "heroZoom 24s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-sky-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),
                              linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="float-a absolute top-[10%] left-[4%] w-36 h-52 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15" />
          <div className="float-b absolute top-[28%] right-[5%] w-28 h-40 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10" />
          <div className="float-c absolute bottom-[20%] left-[13%] w-24 h-32 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm font-medium tracking-wide mb-7">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Pune's Trusted Glass Experts
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="hero-line text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] leading-[1.0]">
              Expert in Window
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1
              className="hero-line text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] leading-[1.0] text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#7dd3fc 0%,#38bdf8 45%,#0ea5e9 100%)" }}
            >
              &amp; Glass Solutions
            </h1>
          </div>
          <p className="hero-sub text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Premium glass partitions, facades, mirrors and window solutions for commercial,
            residential and industrial spaces across Pune.
          </p>
          <div className="hero-btns flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300">
                Get a Free Quote
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                size="lg" variant="ghost"
                className="rounded-full px-10 h-14 text-base text-white hover:text-white"
                style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.35)", transition: "background 0.3s ease, border-color 0.3s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.65)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; }}
              >
                View Our Work <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>


      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section className="gsap-section py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="gsap-heading flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] rounded-full bg-primary" />
              <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">What We Do</p>
              <div className="w-10 h-[2px] rounded-full bg-primary" />
            </div>
            <h2 className="gsap-heading text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-4">Our Services</h2>
            <p className="gsap-heading text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed font-light">
              End-to-end glass solutions, crafted with precision and delivered with care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <Link
                key={s.title}
                to="/services"
                /*
                  FIX: removed hover-lift class entirely.
                  translateY on the card itself causes the cursor to leave
                  the element boundary → mouseout fires → transform resets →
                  cursor re-enters → mouseover fires → infinite flicker loop.

                  Solution: wrap in an outer shell that catches the hover,
                  and only lift the inner card. The outer shell stays put so
                  the cursor never "escapes" the hover zone.
                */
                className="gsap-card service-card-outer group relative"
              >
                {/* Inner card that actually lifts */}
                <div className="service-card-inner relative rounded-2xl overflow-hidden bg-card border border-border group-hover:border-transparent group-hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <h3 className="text-white text-lg font-bold leading-tight drop-shadow-md">{s.title}</h3>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-3" style={{ background: `${s.accent}44` }}>
                        <s.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-light">{s.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: s.accent }}>
                      Learn More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: s.accent }} />
                </div>
              </Link>
            ))}
          </div>

          <div className="gsap-heading text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="rounded-full px-10 hover:bg-foreground hover:text-background transition-all duration-300">
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          USP BANNER
      ════════════════════════════════════════ */}
      <section className="gsap-section relative py-28 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85" alt="Glass building facade" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(2,6,23,0.94) 0%,rgba(14,165,233,0.82) 100%)" }} />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <p className="gsap-heading text-sky-300 text-xs font-semibold uppercase tracking-[0.25em] mb-5">Our Promise</p>
          <h2 className="gsap-heading text-3xl md:text-5xl font-extrabold tracking-[-0.02em] mb-6 max-w-3xl mx-auto leading-tight">
            Complete glass solutions under one roof — quality guaranteed.
          </h2>
          <p className="gsap-heading text-white/60 text-lg mb-10 font-light">Professional finishing on every project, large or small.</p>
          <div className="gsap-card grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-lg mx-auto">
            {uspPoints.map((pt) => (
              <div key={pt} className="flex items-center gap-3 text-white/80">
                <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sm">{pt}</span>
              </div>
            ))}
          </div>
          <Link to="/contact">
            <Button size="lg" className="rounded-full px-10 text-base font-semibold bg-white text-foreground hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-xl">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>


      {/* ════════════════════════════════════════
          TRUSTED BY
      ════════════════════════════════════════ */}
      <section className="gsap-section py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <p className="gsap-heading text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-10">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {trustedBy.map((t) => (
              <div
                key={t.label}
                className="gsap-pill hover-lift-sm flex items-center gap-2 px-7 py-3 rounded-full bg-background border border-border text-sm font-medium text-foreground cursor-default hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <span>{t.icon}</span>{t.label}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          REFER A CLIENT
      ════════════════════════════════════════ */}
      <section className="gsap-section py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="gsap-heading flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] rounded-full bg-primary" />
              <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em]">Refer a Client</p>
              <div className="w-10 h-[2px] rounded-full bg-primary" />
            </div>
            <h2 className="gsap-heading text-4xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-4">Know Someone Who Needs Us?</h2>
            <p className="gsap-heading text-muted-foreground text-lg max-w-md mx-auto font-light">Help them connect with the right glass solution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {referCards.map((card, i) => (
              <div
                key={i}
                className="gsap-card refer-card-outer group relative"
              >
                <div
                  className="refer-card-inner relative rounded-3xl border border-border bg-card p-8 text-center overflow-hidden group-hover:shadow-2xl group-hover:border-transparent"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%,${card.accent}18 0%,transparent 70%)` }} />
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: `${card.accent}18` }}>
                    <card.icon className="w-7 h-7" style={{ color: card.accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">{card.question}</h3>
                  <p className="text-muted-foreground text-sm mb-7 leading-relaxed font-light">{card.sub}</p>
                  <Link to="/contact">
                    <Button
                      variant="outline" className="rounded-full w-full font-semibold transition-all duration-300"
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = card.accent; el.style.borderColor = card.accent; el.style.color = "#fff"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = ""; el.style.borderColor = ""; el.style.color = ""; }}
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1.11); }
        }

        /*
          FLICKER FIX:
          The outer shell (.service-card-outer / .refer-card-outer) is the
          hover target — it does NOT move. Only the inner card lifts.
          This means the cursor always stays inside the hover zone, so
          mouseout never fires during the lift, eliminating the flicker.
        */
        .service-card-outer,
        .refer-card-outer {
          /* reserve the space the card will move into so layout doesn't shift */
          padding-bottom: 6px;
        }

        .service-card-inner,
        .refer-card-inner {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s ease,
                      border-color 0.25s ease;
          will-change: transform;
        }

        .service-card-outer:hover .service-card-inner,
        .refer-card-outer:hover   .refer-card-inner {
          transform: translateY(-6px);
        }

        .hover-lift-sm {
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1),
                      background 0.25s ease,
                      color 0.25s ease,
                      border-color 0.25s ease;
        }
        .hover-lift-sm:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Index;