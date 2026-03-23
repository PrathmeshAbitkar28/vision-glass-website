import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle } from "lucide-react";

interface EnquiryCTAProps {
    title?: string;
    subtitle?: string;
    items?: string[];
}

const BLUE = "#0ea5e9";

const EnquiryCTA = ({ title, subtitle, items }: EnquiryCTAProps) => {
    // ── High-fidelity fallbacks ──
    const displayTitle = title || "Need a Custom Engineered Solution?";
    const displaySubtitle = subtitle || "How to Refer Me — Bespoke glass architectures for architects, builders, and schools across Pune.";
    const displayItems = items && items.length > 0 ? items : [
        "Are you looking for office cabin or glass partition work?",
        "Do you need to replace broken cabin window glass?",
        "Are you looking for soundproof glass or window solutions?"
    ];

    return (
        <section className="w-full bg-background border-t border-slate-100 pb-12 md:pb-20 pt-8 md:pt-10">
            <div className="w-full px-5 md:px-16 lg:px-24">
                <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#020617] py-12 px-6 md:py-20 md:px-24 text-center relative overflow-hidden group shadow-2xl transition-all duration-700 hover:shadow-sky-500/10 border border-white/5">
                    {/* Animated background accent */}
                    <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors duration-700" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-1000" />

                    <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-[1px] w-12 bg-sky-500" />
                            <span className="text-sky-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] italic">Work with Experts</span>
                        </div>

                        <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
                            {/* We handle title parsing for the italic emphasis if needed, but for now direct display */}
                            {displayTitle}
                        </h3>

                        <p className="text-white/50 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            {displaySubtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 md:pt-6">
                            <Link to="/contact" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto rounded-full px-10 md:px-12 h-14 md:h-16 text-base md:text-lg font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.05] hover:shadow-sky-500/25 active:scale-95" style={{ backgroundColor: BLUE }}>
                                    Start Consultation
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 md:pt-10 flex flex-col items-center gap-4 text-white/70 border-t border-white/5">
                            {displayItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 group/item">
                                    <CheckCircle className="w-5 h-5 text-sky-500 group-hover/item:scale-110 transition-all duration-300" />
                                    <span className="text-sm md:text-lg font-bold tracking-tight text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnquiryCTA;