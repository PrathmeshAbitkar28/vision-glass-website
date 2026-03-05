import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, Users, Award, Wrench, Building2,
  HardHat, Stethoscope, GraduationCap, Factory,
  PenTool, Hammer, ShoppingBag, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const whyChoose = [
  { title: "One-Stop Solution", desc: "Complete window and glass work under one roof — no need to juggle contractors.", icon: Building2 },
  { title: "Quality Workmanship", desc: "Professional finishing and attention to detail on every single project.", icon: Award },
  { title: "Trusted by Leaders", desc: "Architects, hospitals, schools and builders rely on us consistently.", icon: Users },
  { title: "End-to-End Service", desc: "From initial consultation and design right through to final installation.", icon: Wrench },
];

const clientTabs = [
  {
    label: "Architects", icon: PenTool,
    clients: ["Arct Uday Kulkarni", "Arct Ashish Shinde", "Arct Omkar Mansuk", "Arct Rajendra Kore", "Arct Pore Madam", "Arct Vishal Ranka", "Arct Utakarsha Madam", "Arct Lalit Surve", "Arct Jambhalkar"],
  },
  {
    label: "Interior Designers", icon: Hammer,
    clients: ["Rahul Chordiya", "Kashmira Madam", "Purva Joshi", "Vijay Patel", "Mangesh Pisal", "Hemant Sutar"],
  },
  {
    label: "Builders", icon: HardHat,
    clients: ["Garve Developers", "VT Adaskar"],
  },
  {
    label: "Hospitals", icon: Stethoscope,
    clients: ["Icon Hospital", "Sparsh Hospital", "Star Hospital", "Dr. Amit Wagh", "Dr. Marne", "Dr. Shrikant Rao"],
  },
  {
    label: "Schools", icon: GraduationCap,
    clients: ["Cambridge International School", "New Pune Public School", "Orchid School", "Puna Public School"],
  },
  {
    label: "Industrial", icon: Factory,
    clients: ["SGS Chakan Mumbai", "Bajaj Auto", "Manmohan Decor", "Manmohan Interior", "ABN Associates", "Vinus Group"],
  },
];

const workWith = [
  { title: "Architects", icon: PenTool },
  { title: "Interior Decorators", icon: Hammer },
  { title: "Carpenters", icon: Wrench },
  { title: "HR & Purchase Depts.", icon: ShoppingBag },
  { title: "Builders & Developers", icon: HardHat },
];

const contactSphere = [
  { title: "Architects", icon: PenTool },
  { title: "Facility Management", icon: Building2 },
  { title: "MEP Contractors", icon: Wrench },
  { title: "Industrial Decorators", icon: Factory },
  { title: "Real Estate Developers", icon: HardHat },
  { title: "HR & Purchase Dept.", icon: ShoppingBag },
];

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
        title="About Us"
        subtitle="Building trust through glass, one project at a time"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* ══ 1. COMPANY INTRO — light ══ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85"
                alt="Glass building exterior"
                className="rounded-3xl shadow-2xl w-full h-[440px] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-background border border-border rounded-2xl p-5 shadow-xl max-w-[200px]">
                <p className="text-3xl font-bold text-primary mb-1">15+</p>
                <p className="text-sm text-muted-foreground leading-tight">Years of excellence in glass work</p>
              </div>
            </div>
            <div className="pt-6 lg:pt-0">
              <Badge variant="secondary" className="mb-5 rounded-full">Est. in Pune, Maharashtra</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-foreground mb-2 leading-tight">
                Vision Glass Creation
              </h2>
              <p className="text-primary font-semibold mb-5 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                Led by Pratap Bhagwanrao Kathare
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mb-6 font-light">
                Vision Glass Creation is Pune's trusted expert in premium window and glass solutions.
                With years of hands-on experience across commercial, residential and industrial projects,
                we deliver end-to-end glass work — from elegant office partitions and structural facades to
                decorative mirrors and custom interiors.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mb-8 font-light">
                Our commitment to quality workmanship and professional finishing has earned the trust of
                leading architects, builders, hospitals, schools and industrial companies across the region.
              </p>
              <Link to="/contact">
                <Button className="rounded-full px-8">
                  Work With Us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. WHY CHOOSE US — blue-tone dark ══ */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=85"
          alt="Glass curtain wall building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* exact same gradient as Our Promise */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(14,165,233,0.85) 100%)" }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sky-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white">
              Why Choose Vision Glass?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <div
                key={item.title}
                className="relative rounded-2xl p-7 group transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <span className="absolute top-5 right-5 text-5xl font-black select-none" style={{ color: "rgba(255,255,255,0.07)" }}>
                  0{i + 1}
                </span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <item.icon className="w-6 h-6 text-sky-300" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. CLIENTS WE'VE SERVED — light ══ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em] mb-3">Our Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-foreground">Clients We've Served</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {clientTabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === i
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clientTabs[activeTab].clients.map((client, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground font-medium">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. WHO WE WORK WITH — blue-tone dark, flipped gradient direction ══ */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=85"
          alt="Modern architectural glass facade"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.88) 0%, rgba(2,6,23,0.96) 100%)" }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sky-300 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Partners</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-white">Who We Work With</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {workWith.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl px-6 py-4"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.16)"; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.transform = ""; }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <item.icon className="w-4 h-4 text-sky-300" />
                </div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. INDUSTRIES WE SERVE — light ══ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.22em] mb-3">Sectors</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-foreground">Industries We Serve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contactSphere.map((item) => (
              <div
                key={item.title}
                className="about-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Trusted partner</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-lift {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease;
        }
        .about-lift:hover { transform: translateY(-4px); }
      `}</style>
    </div>
  );
};

export default About;