import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "@/user/components/Navbar";
import Footer from "@/user/components/Footer";
import FloatingButtons from "@/user/components/FloatingButtons";
import GlobalFont from "@/user/components/GlobalFont";
import ScrollToTop from "@/user/components/ScrollToTop";

// ── User pages — all lazy (Index too, no reason to eager-load it) ──
const Index = lazy(() => import("@/user/pages/Index"));
const Services = lazy(() => import("@/user/pages/Services"));
const Gallery = lazy(() => import("@/user/pages/Gallery"));
const About = lazy(() => import("@/user/pages/About"));
const Contact = lazy(() => import("@/user/pages/Contact"));
const NotFound = lazy(() => import("@/user/pages/NotFound"));

// ── Admin pages — lazy (never downloaded by regular visitors) ──
const AdminLayout = lazy(() => import("@/admin/pages/Layout"));
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AdminAbout = lazy(() => import("@/admin/pages/About"));
const AdminContact = lazy(() => import("@/admin/pages/Contact"));
const AdminServices = lazy(() => import("@/admin/pages/ServicesManagement"));
const AdminGallery = lazy(() => import("@/admin/pages/GalleryManagement"));
const AdminInquiries = lazy(() => import("@/admin/pages/InquiryManagement"));
const HomeManagement = lazy(() => import("@/admin/pages/HomeManagement"));
const AdminLogin = lazy(() => import("@/admin/pages/Login"));
const ProtectedRoute = lazy(() => import("@/admin/components/ProtectedRoute"));

import { seedInitialData } from "@/shared/lib/firestore-service";

// ── React Query client ──
// Key changes vs original:
//   staleTime:            5 min → 30 min  (4x fewer Firestore reads per session)
//   refetchOnMount:       true  → false   (no re-fetch when navigating back to a page)
//   refetchOnWindowFocus: true  → false   (no re-fetch when user alt-tabs back)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 60, // keep in memory 1 hour
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// ── Minimal loader for user pages ──
// Navbar + Footer render instantly — only the page content shows this
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "#0ea5e9 transparent transparent transparent" }}
      />
      <span
        className="text-muted-foreground font-medium uppercase tracking-[0.2em]"
        style={{ fontSize: "10px" }}
      >
        Loading
      </span>
    </div>
  </div>
);

// Full-screen loader only for admin (heavy bundle, worth a full-screen wait)
const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
  </div>
);

// ── Shared user layout ──
const UserLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalFont />
    <ScrollToTop />
    <Navbar />
    {children}
    <Footer />
    <FloatingButtons />
  </>
);

const App = () => {
  useEffect(() => {
    // Seed only once per day — avoids Firestore writes on every refresh
    const lastSeed = localStorage.getItem("last_seed_date");
    const today = new Date().toDateString();
    if (lastSeed !== today) {
      seedInitialData().then(() => {
        localStorage.setItem("last_seed_date", today);
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>

            {/* ── Public User Routes ──
                Each route has its OWN Suspense boundary so only the page content
                shows a loader — Navbar and Footer are always visible immediately. ── */}
            <Route
              path="/"
              element={
                <UserLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Index />
                  </Suspense>
                </UserLayout>
              }
            />
            <Route
              path="/about"
              element={
                <UserLayout>
                  <Suspense fallback={<PageLoader />}>
                    <About />
                  </Suspense>
                </UserLayout>
              }
            />
            <Route
              path="/services"
              element={
                <UserLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Services />
                  </Suspense>
                </UserLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <UserLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Gallery />
                  </Suspense>
                </UserLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <UserLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Contact />
                  </Suspense>
                </UserLayout>
              }
            />

            {/* ── Admin Login (no layout) ── */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            {/* ── Admin Dashboard (protected + layout) ── */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route index element={<Suspense fallback={<PageLoader />}><HomeManagement /></Suspense>} />
              <Route path="home" element={<Suspense fallback={<PageLoader />}><HomeManagement /></Suspense>} />
              <Route path="about" element={<Suspense fallback={<PageLoader />}><AdminAbout /></Suspense>} />
              <Route path="contact" element={<Suspense fallback={<PageLoader />}><AdminContact /></Suspense>} />
              <Route path="services" element={<Suspense fallback={<PageLoader />}><AdminServices /></Suspense>} />
              <Route path="gallery" element={<Suspense fallback={<PageLoader />}><AdminGallery /></Suspense>} />
              <Route path="inquiries" element={<Suspense fallback={<PageLoader />}><AdminInquiries /></Suspense>} />
              <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
            </Route>

            {/* ── 404 ── */}
            <Route
              path="*"
              element={
                <UserLayout>
                  <Suspense fallback={<PageLoader />}>
                    <NotFound />
                  </Suspense>
                </UserLayout>
              }
            />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;