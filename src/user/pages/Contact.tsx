import { useState } from "react";
import PageHero from "@/user/components/PageHero";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Phone, Mail, MapPin, Send, MessageCircle, Loader2, ShieldCheck, Clock,
} from "lucide-react";
import { addDocument, getSiteMetadata } from "@/shared/lib/firestore-service";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const BLUE = "#0ea5e9";

const serviceOptions = [
  "Glass Partitions",
  "Windows Systems",
  "Structural Facade",
  "Decorative Mirror",
  "Other Requirement",
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", message: "",
  });

  // ── Same query key as Footer & FloatingButtons → shared cache, one fetch ──
  const { data: contact, isLoading: loading } = useQuery({
    queryKey: ["contact-metadata"],
    queryFn: () => getSiteMetadata("contact"),
    staleTime: 1000 * 60 * 30,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please provide your name and contact number");
      return;
    }
    setSubmitting(true);
    try {
      await addDocument("inquiries", { ...formData, createdAt: new Date().toISOString() });
      toast.success("Inquiry sent successfully! We will contact you shortly.");
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (err) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappHref = contact?.socials?.whatsapp
    ? `https://wa.me/${contact.socials.whatsapp}`
    : null;

  const instagramHref = contact?.socials?.instagram
    ? `https://instagram.com/${contact.socials.instagram.replace(/^@/, "")}`
    : null;

  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.google.com/?q=Plot+595+Ganganagar+Nigdi+Pimpri-Chinchwad";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  if (!contact) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Failed to load contact details.</p>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-700 bg-background pb-32">
      <PageHero
        title="Contact Us"
        subtitle="Get in touch for expert glass and window solutions"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: BLUE }} />
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-[2px] rounded-full bg-primary" />
                    <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Reach Out</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-foreground mb-2">
                    Send a Quotation Request
                  </h2>
                  <p className="text-muted-foreground font-light" style={{ fontSize: "15px" }}>We'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-muted-foreground font-semibold uppercase tracking-[0.12em] block" style={{ fontSize: "11px" }}>Full Name *</label>
                      <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-12 rounded-xl" style={{ fontSize: "14.5px" }} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground font-semibold uppercase tracking-[0.12em] block" style={{ fontSize: "11px" }}>Contact Number *</label>
                      <Input placeholder="+91 xxxxx xxxxx" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="h-12 rounded-xl" style={{ fontSize: "14.5px" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-muted-foreground font-semibold uppercase tracking-[0.12em] block" style={{ fontSize: "11px" }}>Email (Optional)</label>
                      <Input placeholder="john@example.com" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 rounded-xl" style={{ fontSize: "14.5px" }} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground font-semibold uppercase tracking-[0.12em] block" style={{ fontSize: "11px" }}>Requirement</label>
                      <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full h-12 rounded-xl border border-input bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" style={{ fontSize: "14.5px" }}>
                        <option value="">Select Service Type</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-muted-foreground font-semibold uppercase tracking-[0.12em] block" style={{ fontSize: "11px" }}>Tell us about your project</label>
                    <Textarea placeholder="Please provide site location and specific details..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="min-h-[130px] rounded-xl resize-none" style={{ fontSize: "14.5px" }} />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full h-12 rounded-xl font-semibold gap-3 transition-all hover:scale-[1.01] active:scale-95" style={{ backgroundColor: BLUE, fontSize: "15px" }}>
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    {submitting ? "Sending..." : "Request Call-Back"}
                  </Button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-6 text-muted-foreground/40">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Secure Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Fast Response</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Info column ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Contact details */}
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-[2px] rounded-full bg-primary" />
                  <p className="text-primary font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "12px" }}>Contact</p>
                </div>
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground mb-6">Our Details</h3>
                <div className="flex flex-col gap-5">

                  {contact.phone && (
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors" style={{ background: `${BLUE}15` }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${BLUE}15`; }}
                      >
                        <Phone className="w-5 h-5" style={{ color: BLUE }} />
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium uppercase tracking-[0.1em]" style={{ fontSize: "11px" }}>Mobile</p>
                        <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{contact.phone}</p>
                      </div>
                    </a>
                  )}

                  {contact.officePhone && (
                    <a href={`tel:${contact.officePhone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors" style={{ background: `${BLUE}15` }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${BLUE}15`; }}
                      >
                        <Phone className="w-5 h-5" style={{ color: BLUE }} />
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium uppercase tracking-[0.1em]" style={{ fontSize: "11px" }}>Office</p>
                        <p className="font-semibold text-foreground" style={{ fontSize: "15px" }}>{contact.officePhone}</p>
                      </div>
                    </a>
                  )}

                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors" style={{ background: `${BLUE}15` }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${BLUE}15`; }}
                      >
                        <Mail className="w-5 h-5" style={{ color: BLUE }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-muted-foreground font-medium uppercase tracking-[0.1em]" style={{ fontSize: "11px" }}>Email</p>
                        <p className="font-semibold text-foreground break-all" style={{ fontSize: "14px" }}>{contact.email}</p>
                      </div>
                    </a>
                  )}

                  {contact.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${BLUE}15` }}>
                        <MapPin className="w-5 h-5" style={{ color: BLUE }} />
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium uppercase tracking-[0.1em] mb-1" style={{ fontSize: "11px" }}>Visit Factory / Office</p>
                        <p className="text-foreground leading-relaxed font-light" style={{ fontSize: "14.5px" }}>{contact.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social CTAs — only if present in Firestore */}
              <div className="flex flex-col gap-3">
                {whatsappHref && (
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                    className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <p className="font-bold" style={{ fontSize: "15px" }}>Chat on WhatsApp</p>
                      <p className="text-white/80 font-light" style={{ fontSize: "13.5px" }}>
                        {contact.socials?.whatsapp ? `+${contact.socials.whatsapp}` : "Quickest way to reach us"}
                      </p>
                    </div>
                  </a>
                )}

                {instagramHref && (
                  <a href={instagramHref} target="_blank" rel="noopener noreferrer"
                    className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ backgroundColor: "#E4405F" }}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <InstagramIcon />
                    </div>
                    <div className="text-white">
                      <p className="font-bold" style={{ fontSize: "15px" }}>Follow on Instagram</p>
                      <p className="text-white/80 font-light" style={{ fontSize: "13.5px" }}>
                        {contact.socials?.instagram || "See our latest work"}
                      </p>
                    </div>
                  </a>
                )}
              </div>

              {/* QR */}
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="text-muted-foreground font-semibold uppercase tracking-[0.12em] mb-4" style={{ fontSize: "11px" }}>Scan to Open Location</p>
                <img src={qrUrl} alt="QR code for location" className="mx-auto rounded-xl w-[130px] h-[130px]" />
                <p className="text-muted-foreground mt-3 font-light" style={{ fontSize: "12px" }}>Point camera → Opens Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {contact.mapEmbedUrl && (
        <section className="w-full h-[500px] mt-12 overflow-hidden border-t border-border">
          <iframe
            src={contact.mapEmbedUrl} width="100%" height="100%"
            style={{ border: 0, filter: "grayscale(0.1) contrast(1.1)" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </section>
      )}
    </div>
  );
};

export default Contact;