import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFadeIn } from "@/hooks/useFadeIn";

const serviceOptions = [
  "Glass Partitions",
  "Aluminium & UPVC Windows",
  "Structural Facade",
  "Glass Glazing",
  "Interior Solutions",
  "Decorative Mirrors",
  "Acid / Stain / Bend Glass",
  "PVC Fiber Doors",
  "Other",
];

const Contact = () => {
  const { toast } = useToast();
  const containerRef = useFadeIn();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", details: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      toast({ title: "Invalid phone number", description: "Please enter exactly 10 digits." });
      return;
    }
    setLoading(true);

    const message = `*New Contact Inquiry*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || "N/A"}\n*Service Required:* ${form.service || "Not specified"}\n*Project Details:* ${form.details || "None"}`;
    const whatsappUrl = `https://wa.me/919921917083?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    toast({ title: "Redirecting...", description: "Opening WhatsApp to send your message." });
    setForm({ name: "", phone: "", email: "", service: "", details: "" });
    setLoading(false);
  };

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.google.com/?q=Plot+595+Ganganagar+Nigdi+Pimpri-Chinchwad";

  return (
    <div ref={containerRef}>
      <PageHero
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
        title="Get In Touch"
        subtitle="Let's discuss your glass project"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 fade-in-section">

            {/* ── FORM (3 cols) ── */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <div className="mb-8">
                  <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Reach Out</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Send Us a Message</h2>
                  <p className="text-muted-foreground text-sm mt-2">We'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Full Name *
                      </label>
                      <Input
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                        Phone *
                      </label>
                      <Input
                        placeholder="10-digit mobile number"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setForm({ ...form, phone: val });
                        }}
                        pattern="[0-9]{10}"
                        title="Please enter exactly 10 digits"
                        maxLength={10}
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Email Address
                    </label>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Service Required
                    </label>
                    <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Project Details
                    </label>
                    <Textarea
                      placeholder="Describe your project, requirements, dimensions, etc."
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      rows={5}
                      className="rounded-xl resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl h-12 font-semibold text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* ── CONTACT INFO (2 cols) ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="rounded-3xl border border-border bg-card p-8">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-1">Contact</p>
                <h3 className="text-xl font-bold text-foreground mb-6">Our Details</h3>
                <div className="flex flex-col gap-5">
                  <a
                    href="tel:+919921917083"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Mobile</p>
                      <p className="font-semibold text-foreground">+91 99219 17083</p>
                    </div>
                  </a>
                  <a
                    href="tel:+917840917083"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Office</p>
                      <p className="font-semibold text-foreground">+91 78409 17083</p>
                    </div>
                  </a>
                  <a
                    href="mailto:visionglasscreation1@gmail.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</p>
                      <p className="font-semibold text-foreground text-sm break-all leading-snug">visionglasscreation1@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Address</p>
                      <p className="text-sm text-foreground leading-relaxed">
                        Plot No. 595, Ganganagar Railway Line, Sector No. 28, Ganga Nagar, Nigdi, Pimpri-Chinchwad 411044
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919921917083"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl p-6 flex items-center gap-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "#25D366" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <p className="font-bold text-base">Chat on WhatsApp</p>
                  <p className="text-white/80 text-sm">Quickest way to reach us</p>
                </div>
              </a>

              {/* QR Card */}
              <div className="rounded-3xl border border-border bg-card p-6 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Scan to Open Location
                </p>
                <img src={qrUrl} alt="QR code for location" className="mx-auto rounded-xl w-[130px] h-[130px]" />
                <p className="text-xs text-muted-foreground mt-3">Points camera → Opens in Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="px-4 pb-12 fade-in-section">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden border border-border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2!2d73.77!3d18.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzAwLjAiTiA3M8KwNDYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vision Glass Creation Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;