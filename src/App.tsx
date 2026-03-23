import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "@/user/components/Navbar";
import Footer from "@/user/components/Footer";
import FloatingButtons from "@/user/components/FloatingButtons";
import GlobalFont from "@/user/components/GlobalFont";
import ScrollToTop from "@/user/components/ScrollToTop";

// ── ProtectedRoute: MUST be eager — it renders <Navigate> synchronously.
// If lazy, Suspense intercepts before the redirect fires → blank screen. ──
import ProtectedRoute from "@/admin/components/ProtectedRoute";

// ── User pages ──
const Index = lazy(() => import("@/user/pages/Index"));
const Services = lazy(() => import("@/user/pages/Services"));
const Gallery = lazy(() => import("@/user/pages/Gallery"));
const About = lazy(() => import("@/user/pages/About"));
const Contact = lazy(() => import("@/user/pages/Contact"));
const NotFound = lazy(() => import("@/user/pages/NotFound"));

// ── Admin pages ──
const AdminLayout = lazy(() => import("@/admin/pages/Layout"));
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AdminAbout = lazy(() => import("@/admin/pages/About"));
const AdminContact = lazy(() => import("@/admin/pages/Contact"));
const AdminServices = lazy(() => import("@/admin/pages/ServicesManagement"));
const AdminGallery = lazy(() => import("@/admin/pages/GalleryManagement"));
const AdminInquiries = lazy(() => import("@/admin/pages/InquiryManagement"));
const HomeManagement = lazy(() => import("@/admin/pages/HomeManagement"));
const AdminLogin = lazy(() => import("@/admin/pages/Login"));

import { seedInitialData } from "@/shared/lib/firestore-service";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
  </div>
);

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

            {/* ── Public routes ── */}
            <Route path="/" element={<UserLayout><Suspense fallback={<PageLoader />}><Index /></Suspense></UserLayout>} />
            <Route path="/about" element={<UserLayout><Suspense fallback={<PageLoader />}><About /></Suspense></UserLayout>} />
            <Route path="/services" element={<UserLayout><Suspense fallback={<PageLoader />}><Services /></Suspense></UserLayout>} />
            <Route path="/gallery" element={<UserLayout><Suspense fallback={<PageLoader />}><Gallery /></Suspense></UserLayout>} />
            <Route path="/contact" element={<UserLayout><Suspense fallback={<PageLoader />}><Contact /></Suspense></UserLayout>} />

            {/* ── Admin login (public, no layout) ── */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminLoader />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            {/* ── /admin with no sub-path → go to /admin/login
                ProtectedRoute handles this too, but this makes the
                intent explicit and avoids any ambiguity ── */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminLoader />}>
                    <AdminLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              {/* Default /admin → /admin/home */}
              <Route index element={<Navigate to="/admin/home" replace />} />
              <Route path="home" element={<Suspense fallback={<PageLoader />}><HomeManagement /></Suspense>} />
              <Route path="about" element={<Suspense fallback={<PageLoader />}><AdminAbout /></Suspense>} />
              <Route path="contact" element={<Suspense fallback={<PageLoader />}><AdminContact /></Suspense>} />
              <Route path="services" element={<Suspense fallback={<PageLoader />}><AdminServices /></Suspense>} />
              <Route path="gallery" element={<Suspense fallback={<PageLoader />}><AdminGallery /></Suspense>} />
              <Route path="inquiries" element={<Suspense fallback={<PageLoader />}><AdminInquiries /></Suspense>} />
              <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
            </Route>

            {/* ── 404 ── */}
            <Route path="*" element={<UserLayout><Suspense fallback={<PageLoader />}><NotFound /></Suspense></UserLayout>} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;