import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/shared/lib/firebase";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-6">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-[#0ea5e9]/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-[#0ea5e9] rounded-full animate-spin" />
        </div>
        <p className="font-black text-slate-800 tracking-tight animate-pulse text-xl">Authenticating Session...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the current location they were trying to access
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
