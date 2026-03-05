import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const LOGO = "/src/images/logo_img/logo.png";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const progress = Math.min(scrollY / 80, 1);
  const isHome = location.pathname === "/";

  const bgOpacity = isHome ? progress * 0.97 : 0.97;
  const blurAmount = isHome ? progress * 20 : 20;
  const shadowOpacity = isHome ? progress * 0.08 : 0.08;
  const borderOpacity = isHome ? progress * 0.08 : 0.08;
  const navHeight = 80 - progress * 12;

  const isTransparent = isHome && progress < 0.5;
  const hoverBg = isTransparent ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)";

  const getLinkColor = (isActive: boolean) => {
    if (isActive) return isTransparent ? "#ffffff" : "var(--primary)";
    return isTransparent ? "rgba(255,255,255,0.85)" : "var(--foreground)";
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
        <div className="container mx-auto flex items-center justify-between h-full px-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={LOGO}
              alt="Vision Glass Creation"
              className="object-contain flex-shrink-0"
              style={{
                height: `${38 - progress * 4}px`,
                width: "auto",
                transition: "height 0.2s ease",
                filter: isTransparent ? "brightness(0) invert(1)" : "none",
              }}
            />
            <div className="hidden sm:block">
              <span
                className="font-bold text-base leading-none block"
                style={{
                  color: isTransparent ? "rgba(255,255,255,1)" : "var(--foreground)",
                  transition: "color 0.5s ease",
                }}
              >
                Vision Glass
              </span>
              <span
                className="text-xs font-medium block"
                style={{
                  color: isTransparent ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)",
                  transition: "color 0.5s ease",
                }}
              >
                Creation
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link-hover relative px-4 py-2 text-sm font-medium"
                  style={{ color: getLinkColor(isActive) }}
                >
                  {link.label}

                  {/* ── Active indicator bar ── */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "8px",
                      right: "8px",
                      height: "2.5px",
                      borderRadius: "999px",
                      background: "#0ea5e9",          // always sky-500 blue, visible on both bg states
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

          {/* ── Right: phone → Get Quote → Location → hamburger ── */}
          <div className="flex items-center gap-3">

            {/* Phone */}
            <a
              href="tel:+919921917083"
              className="hidden lg:flex items-center gap-2 text-sm font-medium"
              style={{
                color: isTransparent ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
                transition: "color 0.5s ease",
              }}
            >
              <Phone className="w-4 h-4" />
              +91 99219 17083
            </a>

            {/* Get Quote */}
            <Link to="/contact" className="hidden md:block">
              <Button
                size="sm"
                className="rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Get Quote
              </Button>
            </Link>

            {/* Location */}
            <a
              href="https://maps.google.com/?q=Plot+595+Ganganagar+Railway+Line+Sector+28+Nigdi+Pimpri-Chinchwad+Maharashtra+411044"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find us on Google Maps"
              className="hidden md:flex items-center justify-center rounded-full shadow-md hover:scale-110 transition-all duration-200"
              style={{
                width: "34px",
                height: "34px",
                flexShrink: 0,
                background: isTransparent ? "rgba(255,255,255,0.15)" : "rgba(14,165,233,0.10)",
                border: isTransparent ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(14,165,233,0.30)",
                transition: "background 0.5s ease, border-color 0.5s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = isTransparent ? "rgba(255,255,255,0.28)" : "rgba(14,165,233,0.22)";
                el.style.borderColor = isTransparent ? "rgba(255,255,255,0.65)" : "rgba(14,165,233,0.60)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = isTransparent ? "rgba(255,255,255,0.15)" : "rgba(14,165,233,0.10)";
                el.style.borderColor = isTransparent ? "rgba(255,255,255,0.35)" : "rgba(14,165,233,0.30)";
              }}
            >
              <MapPin
                className="w-4 h-4"
                style={{
                  color: isTransparent ? "rgba(255,255,255,0.90)" : "var(--primary)",
                  transition: "color 0.5s ease",
                }}
              />
            </a>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button
                  className="p-2 rounded-lg"
                  style={{
                    color: isTransparent ? "rgba(255,255,255,1)" : "var(--foreground)",
                    transition: "color 0.5s ease",
                  }}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2 mb-8">
                  <img
                    src={LOGO}
                    alt="Vision Glass Creation"
                    className="h-8 w-auto object-contain"
                  />
                  <span className="font-bold">Vision Glass Creation</span>
                </SheetTitle>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.to
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 mt-2 border-t border-border space-y-3">
                    <a
                      href="tel:+919921917083"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Phone className="w-4 h-4" /> +91 99219 17083
                    </a>
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      <Button className="w-full rounded-full">Get Free Quote</Button>
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