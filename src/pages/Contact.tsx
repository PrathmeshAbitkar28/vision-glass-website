import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", phone: "", email: "", service: "", details: "" });
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 fade-in-section">
            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  placeholder="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Select
                  value={form.service}
                  onValueChange={(v) => setForm({ ...form, service: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Service Required" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Project Details"
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  rows={5}
                />
                <Button type="submit" className="w-full rounded-full" size="lg">
                  Send Message
                </Button>
              </div>
            </form>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="glass-card-strong rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Details</h3>
                <div className="space-y-4">
                  <a href="tel:+919921917083" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile</p>
                      <p className="font-medium">+91 99219 17083</p>
                    </div>
                  </a>
                  <a href="tel:+917840917083" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Office</p>
                      <p className="font-medium">+91 78409 17083</p>
                    </div>
                  </a>
                  <a href="mailto:visionglasscreation1@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">visionglasscreation1@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">
                        Plot No. 595, Ganganagar Railway Line, Sector No. 28, Ganga Nagar, Nigdi,
                        Pimpri-Chinchwad, Maharashtra 411044
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Card */}
              <div className="glass-card-strong rounded-2xl p-6 text-center">
                <h4 className="font-semibold text-foreground mb-1">Scan to Visit Us</h4>
                <p className="text-sm text-muted-foreground mb-4">Point camera to open location</p>
                <img src={qrUrl} alt="QR code for location" className="mx-auto rounded w-[150px] h-[150px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="px-4 pb-8 fade-in-section">
        <div className="container mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2!2d73.77!3d18.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzAwLjAiTiA3M8KwNDYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "1rem" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vision Glass Creation Location"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
