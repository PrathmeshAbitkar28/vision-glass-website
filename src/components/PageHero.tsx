import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle: string;
  breadcrumb: { label: string; to?: string }[];
}

const PageHero = ({ image, title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 text-center text-white px-4">
        <div className="flex items-center justify-center gap-1 mb-4 text-sm text-white/80">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {item.to ? (
                <Link to={item.to} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
              {i < breadcrumb.length - 1 && <ChevronRight className="w-4 h-4" />}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
