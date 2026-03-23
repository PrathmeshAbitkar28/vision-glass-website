import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, MapPin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/shared/components/ui/sheet";
import { useQueryClient } from "@tanstack/react-query";
import { getSiteMetadata, getCollectionContent } from "@/shared/lib/firestore-service";
import logo from "@/images/logo_img/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
];

// Map each route → which data to prefetch on hover
const prefetchMap: Record<string, () => Promise<any>> = {
  "/about": () => getSiteMetadata("about"),
  "/services": () => getCollectionContent("services"),
  "/gallery": () => getCollectionContent("gallery"),
  "/contact": () => getSiteMetadata("contact"),
};

const prefetchKeyMap: Record<string, string> = {
  "/about": "about-metadata",
  "/services": "services-list",
  "/gallery": "gallery-items",
  "/contact": "contact-metadata",
};

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Prefetch a route's data on link hover — data arrives before user clicks
  const handlePrefetch = (to: string) => {
    const queryKey = prefetchKeyMap[to];
    const fetchFn = prefetchMap[to];
    if (!queryKey || !fetchFn) return;
    queryClient.prefetchQuery({
      queryKey: [queryKey],
      queryFn: fetchFn,
      staleTime: 1000 * 60 * 30,
    });
  };

  const progress = Math.min(scrollY / 80, 1);
  const isHeroPage = ["/", "/about", "/services", "/gallery", "/contact"].includes(location.pathname);
  const bgOpacity = isHeroPage ? progress * 0.97 : 0.97;
  const blurAmount = isHeroPage ? progress * 20 : 20;
  const shadowOpacity = isHeroPage ? progress * 0.08 : 0.08;
  const borderOpacity = isHeroPage ? progress * 0.08 : 0.08;
  const isTransparent = isHeroPage && progress < 0.5;
  const isMobile = windowWidth < 768;
  const navHeight = (isMobile ? 48 : 72) - progress * (isMobile ? 4 : 16);
  const currentLogoHeight = (isMobile ? 27 : 36) - progress * (isMobile ? 4 : 6);
  const hoverBg = isTransparent ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)";

  const getLinkColor = (isActive: boolean) => {
    if (isActive) return isTransparent ? "#ffffff" : "var(--primary)";
    return isTransparent ? "#ffffff" : "var(--foreground)";
  };

  return (
    <>
      <style>{`
        .nav-link-hover:hover { background: ${hoverBg}; border-radius: 8px; }
        .nav-link-hover { transition: color 0.5s ease, background 0.2s ease; }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: `${navHeight}px`,
          background: `rgba(255,255,255,${bgOpacity})`,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          boxShadow: `0 1px 24px rgba(0,0,0,${shadowOpacity})`,
          borderBottom: `1px solid rgba(0,0,0,${borderOpacity})`,
          transition: "height 0.2s ease",
        }}
      >
        <div className="relative w-full flex items-center justify-between h-full px-6 md:px-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group shrink-0 z-10">
            <img
              src={logo}
              alt="Vision Glass Creation"
              className="object-contain flex-shrink-0"
              style={{
                height: `${currentLogoHeight}px`,
                width: "auto",
                transition: "height 0.2s ease",
                filter: isTransparent ? "brightness(0) invert(1)" : "none",
              }}
            />
            <div>
              <span
                className="font-black text-sm sm:text-lg leading-tight block"
                style={{ color: isTransparent ? "rgba(255,255,255,1)" : "var(--foreground)", transition: "color 0.5s ease", letterSpacing: "-0.01em" }}
              >
                Vision Glass
              </span>
              <span
                className="block font-semibold"
                style={{ fontSize: isMobile ? "9px" : "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: isTransparent ? "#ffffff" : "rgba(0,0,0,0.9)", transition: "color 0.5s ease", marginTop: "1px" }}
              >
                Creation
              </span>
            </div>
          </Link>

          {/* Desktop Nav — centred */}
          <div
            className="hidden md:flex items-center gap-0.5"
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link-hover relative px-5 py-2"
                  style={{ fontSize: "15px", fontWeight: 500, color: getLinkColor(isActive), letterSpacing: "0.01em", whiteSpace: "nowrap" }}
                  // ← Prefetch data on hover before user clicks
                  onMouseEnter={() => handlePrefetch(link.to)}
                >
                  {link.label}
                  <span
                    style={{
                      position: "absolute", bottom: 2, left: "10px", right: "10px",
                      height: "2.5px", borderRadius: "999px", background: "#0ea5e9",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scaleX(1)" : "scaleX(0.4)",
                      transformOrigin: "center",
                      transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3 z-10">
            <a
              href="tel:+919921917083"
              className="hidden lg:flex items-center gap-2"
              style={{ fontSize: "14px", fontWeight: 500, color: isTransparent ? "#ffffff" : "var(--muted-foreground)", transition: "color 0.5s ease" }}
            >
              <Phone className="w-4 h-4" />
              +91 99219 17083
            </a>

            <Link
              to="/contact"
              className="hidden md:block"
              onMouseEnter={() => handlePrefetch("/contact")}
            >
              <Button
                size="sm"
                className="rounded-full px-6 h-9 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold"
                style={{ fontSize: "14px" }}
              >
                Contact Us
              </Button>
            </Link>

            <a
              href="https://maps.google.com/?q=Plot+595+Ganganagar+Railway+Line+Sector+28+Nigdi+Pimpri-Chinchwad+Maharashtra+411044"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find us on Google Maps"
              className="hidden md:flex items-center justify-center rounded-full shadow-md hover:scale-110 transition-all duration-200"
              style={{
                width: "34px", height: "34px", flexShrink: 0,
                background: isTransparent ? "rgba(255,255,255,0.15)" : "rgba(14,165,233,0.10)",
                border: isTransparent ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(14,165,233,0.30)",
                transition: "background 0.5s ease, border-color 0.5s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = isTransparent ? "rgba(255,255,255,0.28)" : "rgba(14,165,233,0.22)"; el.style.borderColor = isTransparent ? "rgba(255,255,255,0.65)" : "rgba(14,165,233,0.60)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = isTransparent ? "rgba(255,255,255,0.15)" : "rgba(14,165,233,0.10)"; el.style.borderColor = isTransparent ? "rgba(255,255,255,0.35)" : "rgba(14,165,233,0.30)"; }}
            >
              <MapPin className="w-4 h-4" style={{ color: isTransparent ? "rgba(255,255,255,0.90)" : "var(--primary)", transition: "color 0.5s ease" }} />
            </a>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2 rounded-lg" style={{ color: isTransparent ? "rgba(255,255,255,1)" : "var(--foreground)", transition: "color 0.5s ease" }}>
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2.5 mb-8">
                  <img src={logo} alt="Vision Glass Creation" className="h-12 w-auto object-contain flex-shrink-0" />
                  <div>
                    <p className="font-extrabold text-base leading-tight" style={{ letterSpacing: "-0.01em" }}>Vision Glass</p>
                    <p className="font-semibold" style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(0,0,0,0.95)", marginTop: "1px" }}>
                      Creation
                    </p>
                  </div>
                </SheetTitle>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => handlePrefetch(link.to)}
                      className={`px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === link.to ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"}`}
                      style={{ fontSize: "15px" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 mt-2 border-t border-border space-y-3">
                    <a href="tel:+919921917083" className="flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted transition-colors" style={{ fontSize: "15px" }}>
                      <Phone className="w-4 h-4" /> +91 99219 17083
                    </a>
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      <Button className="w-full rounded-full font-semibold" style={{ fontSize: "15px" }}>Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;