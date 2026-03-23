import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Images, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X, 
  Wrench,
  ChevronRight,
  Info,
  Phone
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import logo from "@/images/logo_img/logo.png";
import { auth } from "@/shared/lib/firebase";
import { signOut } from "firebase/auth";

const adminNavLinks = [
  { label: "Home Content", to: "/admin/home", icon: LayoutDashboard },
  { label: "About Us", to: "/admin/about", icon: Info },
  { label: "Industrial Services", to: "/admin/services", icon: Wrench },
  { label: "Project Gallery", to: "/admin/gallery", icon: Images },
  { label: "Contact Registry", to: "/admin/contact", icon: Phone },
  { label: "Inquiry Pipeline", to: "/admin/inquiries", icon: MessageSquare },
];

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(typeof window !== "undefined" ? window.innerWidth >= 1024 : true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ backgroundColor: '#f0f5f9' }}>
      {/* ── Mobile Header ── */}
      <header className="lg:hidden fixed top-0 w-full h-16 bg-white border-b border-slate-200 z-[60] flex items-center justify-between px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-slate-800">Admin Panel</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transition-transform duration-300 transform",
          !isSidebarOpen && "-translate-x-full"
        )}
        style={{ backgroundColor: '#1e3a5f' }}
      >
        <div className="h-full flex flex-col p-6 shadow-2xl">
          {/* Brand */}
          <div className="flex items-center gap-4 mb-10 pl-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <img src={logo} alt="Vision Glass" className="h-10 w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black leading-none tracking-tight text-xl">Vision Glass</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black mt-1.5" style={{ color: '#38bdf8' }}>
                Industrial Panel
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1">
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 transition-all duration-200 group text-[13px] font-black uppercase tracking-[0.1em]",
                    isActive
                      ? "text-white"
                      : "text-white hover:text-white"
                  )}
                  style={isActive ? { backgroundColor: '#38bdf8', boxShadow: '0 4px 20px rgba(56,189,248,0.3)' } : {}}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/40 group-hover:text-white")} />
                  {link.label}
                  {isActive && <div className="w-1 h-1 bg-white/60 ml-auto rounded-full" />}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              className="w-full justify-center gap-3 bg-red-600 text-white hover:bg-red-700 rounded-none px-5 h-14 font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 shadow-xl"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className={cn(
        "flex-1 overflow-auto pt-16 lg:pt-0 transition-all duration-300",
        isSidebarOpen ? "lg:pl-80" : "lg:pl-0"
      )}>
        <div className="w-full p-4 lg:p-4">
          <Outlet />
        </div>
      </main>

      {/* ── Mobile Overlay ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
