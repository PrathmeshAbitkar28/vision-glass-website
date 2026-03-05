import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Wrench, Building2, HardHat, Stethoscope, GraduationCap, Factory, PenTool, Hammer, ShoppingBag } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const whyChoose = [
  { title: "One-Stop Solution", desc: "Complete window and glass work under one roof", icon: Building2 },
  { title: "Quality Workmanship", desc: "Professional finishing on every project", icon: Award },
  { title: "Trusted by Leaders", desc: "Architects, hospitals and builders rely on us", icon: Users },
  { title: "End-to-End Service", desc: "From design consultation to installation", icon: Wrench },
];

const clientTabs = [
  {
    label: "Architects",
    clients: ["Arct Uday Kulkarni", "Arct Ashish Shinde", "Arct Omkar Mansuk", "Arct Rajendra Kore", "Arct Pore Madam", "Arct Vishal Ranka", "Arct Utakarsha Madam", "Arct Lalit Surve", "Arct Jambhalkar"],
  },
  {
    label: "Interior Designers",
    clients: ["Rahul Chordiya", "Kashmira Madam", "Purva Joshi", "Vijay Patel", "Mangesh Pisal", "Hemant Sutar"],
  },
  {
    label: "Builders",
    clients: ["Garve Developers", "VT Adaskar"],
  },
  {
    label: "Hospitals",
    clients: ["Icon Hospital", "Sparsh Hospital", "Star Hospital", "Dr. Amit Wagh", "Dr. Marne", "Dr. Shrikant Rao"],
  },
  {
    label: "Schools",
    clients: ["Cambridge International School", "New Pune Public School", "Orchid School", "Puna Public School"],
  },
  {
    label: "Industrial",
    clients: ["SGS Chakan Mumbai", "Bajaj Auto", "Manmohan Decor", "Manmohan Interior", "ABN Associates", "Vinus Group"],
  },
];

const workWith = [
  { title: "Architects", icon: PenTool },
  { title: "Interior Decorators", icon: Hammer },
  { title: "Carpenters", icon: Wrench },
  { title: "HR & Purchase Departments", icon: ShoppingBag },
  { title: "Builders & Developers", icon: HardHat },
];

const contactSphere = [
  { title: "Architects", icon: PenTool },
  { title: "Facility Management Companies", icon: Building2 },
  { title: "MEP Contractors", icon: Wrench },
  { title: "Industrial Interior Decorators", icon: Factory },
  { title: "Real Estate Developers", icon: HardHat },
  { title: "HR & Purchase Department", icon: ShoppingBag },
];

const About = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef}>
      <PageHero
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
        title="About Us"
        subtitle="Building trust through glass, one project at a time"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* Company Intro */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center fade-in-section">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
              alt="Glass building exterior"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              loading="lazy"
            />
            <div>
              <Badge variant="secondary" className="mb-4">Est. in Pune, Maharashtra</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Vision Glass Creation</h2>
              <p className="text-primary font-medium mb-4">Led by Pratap Bhagwanrao Kathare</p>
              <p className="text-muted-foreground leading-relaxed">
                Vision Glass Creation is Pune's trusted expert in premium window and glass solutions.
                With years of hands-on experience across commercial, residential and industrial projects,
                we deliver end-to-end glass work — from elegant office partitions and structural facades to
                decorative mirrors and custom interiors. Our commitment to quality workmanship and professional
                finishing has earned the trust of leading architects, builders, hospitals, schools and
                industrial companies across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 fade-in-section">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-section">
            {whyChoose.map((item) => (
              <div key={item.title} className="glass-card-strong rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 fade-in-section">
            Major Clients
          </h2>
          <div className="fade-in-section">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {clientTabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="glass-card-strong rounded-xl p-8 max-w-2xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {clientTabs[activeTab].clients.map((client, i) => (
                  <span key={i} className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">{client}</span>
                    {i < clientTabs[activeTab].clients.length - 1 && (
                      <span className="text-border ml-1">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 fade-in-section">
            Who We Work With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 fade-in-section">
            {workWith.map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-5 text-center hover:shadow-lg transition-shadow">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Sphere */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 fade-in-section">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-section">
            {contactSphere.map((item) => (
              <div key={item.title} className="glass-card-strong rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
