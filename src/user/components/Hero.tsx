import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { optimizeUrl, Breakpoints } from "@/shared/lib/image-optimizer";

interface HeroProps {
  data: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    heroImages?: string[];
    heroImage?: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const [activeHero, setActiveHero] = useState(0);
  const heroSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroImages = data.heroImages || [data.heroImage || ""];

  useEffect(() => {
    if (!heroImages || heroImages.length <= 1) return;

    const interval = setInterval(() => {
      const next = (activeHero + 1) % heroImages.length;

      // GSAP Crossfade
      if (heroSlideRefs.current[activeHero]) {
        gsap.to(heroSlideRefs.current[activeHero], { opacity: 0, duration: 1.5, ease: "power2.inOut" });
      }
      if (heroSlideRefs.current[next]) {
        gsap.fromTo(heroSlideRefs.current[next],
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 2, ease: "power2.inOut" }
        );
      }
      setActiveHero(next);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages, activeHero]);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
      {heroImages.map((img: string, i: number) => (
        <div
          key={i}
          ref={(el) => { heroSlideRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === activeHero ? 1 : 0, zIndex: i === activeHero ? 1 : 0 }}
        >
          <img
            src={optimizeUrl(img)}
            alt="Vision Glass Hero"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: i === activeHero ? "heroZoom 24s ease-in-out infinite alternate" : "none" }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.15)" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-sky-900/10 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[2]" />
      <div className="absolute inset-0 opacity-[0.025] z-[2]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2] hidden lg:block">
        <div className="float-a absolute top-[10%] left-[4%] w-36 h-52 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15" />
        <div className="float-b absolute top-[28%] right-[5%] w-28 h-40 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10" />
        <div className="float-c absolute bottom-[20%] left-[13%] w-24 h-32 rounded-2xl bg-white/5 backdrop-blur-md border border-white/15" />
      </div>

      <div className="relative z-[10] text-center text-white px-6 max-w-5xl mx-auto pt-24 md:pt-0">
        <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-xs sm:text-sm font-medium tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Pune's Trusted Glass Experts
        </div>
        <div className="overflow-hidden mb-1">
          <h1 className="hero-line text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] leading-tight md:leading-[1.0] drop-shadow-[0_8px_30px_rgb(0,0,0,0.4)]">{data.heroTitle1}</h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1 className="hero-line text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] leading-tight md:leading-[1.0] text-transparent bg-clip-text drop-shadow-[0_8px_30px_rgb(0,0,0,0.2)]" style={{ backgroundImage: "linear-gradient(135deg,#7dd3fc 0%,#38bdf8 45%,#0ea5e9 100%)" }}>
            {data.heroTitle2}
          </h1>
        </div>
        <p className="hero-sub text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-12 leading-relaxed font-bold md:font-semibold drop-shadow-[0_4px_10px_rgb(0,0,0,0.5)]">
          {data.heroSubtitle}
        </p>
        <div className="hero-btns flex flex-col sm:flex-row gap-5 justify-center">
          <Link to="/contact">
            <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black tracking-widest shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300 uppercase">
              Contact Us
            </Button>
          </Link>
          <Link to="/gallery">
            <Button size="lg" variant="ghost" className="rounded-full px-12 h-14 text-lg font-black tracking-widest text-white hover:text-white uppercase transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.45)", backdropFilter: "blur(4px)" }}
            >
              View Our Work <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-scroll hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40 z-[10]">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;