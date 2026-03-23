import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  LogIn, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/shared/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { auth } from "@/shared/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import logo from "@/images/logo_img/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/admin");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      setError("Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* ── Background Decoration ── */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#0ea5e9]/10 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />

      {/* ── Go Back Home ── */}
      <Button 
        variant="ghost" 
        className="absolute top-6 left-6 gap-2 font-bold text-slate-500 hover:text-slate-900 z-10"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4" /> Go to Website
      </Button>

      {/* ── Login Card ── */}
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl relative z-10 rounded-[2rem]">
        <CardHeader className="text-center pt-10 pb-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center mb-6 shadow-inner">
             <img src={logo} alt="Vision Glass" className="h-10 w-auto" />
          </div>
          <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">Access Control</CardTitle>
          <CardDescription className="text-slate-500 font-bold mt-2">Vision Glass Creation — Admin Panel</CardDescription>
        </CardHeader>
        <CardContent className="px-8 flex flex-col space-y-5">
          {error && (
            <Alert variant="destructive" className="rounded-xl border-red-500/20 bg-red-50 text-red-700 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Error!</AlertTitle>
              <AlertDescription className="font-semibold">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-[#0ea5e9]" />
                <Input 
                  type="email" 
                  placeholder="name@visionglass.com" 
                  className="pl-12 rounded-xl h-12 bg-white border-slate-200 outline-none focus-visible:ring-1 focus-visible:ring-[#0ea5e9] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-[#0ea5e9]" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-12 pr-12 rounded-xl h-12 bg-white border-slate-200 outline-none focus-visible:ring-1 focus-visible:ring-[#0ea5e9] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
                type="submit" 
                className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white font-black h-14 rounded-xl shadow-xl shadow-sky-500/30 group transition-all"
                disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                   Sign In <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-10 pt-4">
             <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                 Encrypted & Secure Session
             </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
