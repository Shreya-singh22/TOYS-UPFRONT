import { motion } from "framer-motion";
import { Baby, Puzzle, TreePine, Sparkles, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";

const categories: { id: string; label: string; subtitle: string; icon: ReactNode; bgClass: string }[] = [
  { id: "age", label: "By Age", subtitle: "Explore toys for every stage", icon: <Baby className="h-8 w-8" />, bgClass: "bg-sunshine/20 hover:bg-sunshine/30" },
  { id: "educational", label: "Educational", subtitle: "Learn through play", icon: <Puzzle className="h-8 w-8" />, bgClass: "bg-sky/20 hover:bg-sky/30" },
  { id: "outdoor", label: "Outdoor", subtitle: "Adventures await", icon: <TreePine className="h-8 w-8" />, bgClass: "bg-mint/20 hover:bg-mint/30" },
  { id: "new", label: "New Arrivals", subtitle: "Fresh finds every week", icon: <Sparkles className="h-8 w-8" />, bgClass: "bg-coral/20 hover:bg-coral/30" },
];

export default function CategoryGrid() {
  return (
    <section id="shop" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-foreground mb-3">
            Shop Toys by Category
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Find the perfect toys for every age and activity.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className={`group relative flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl text-foreground transition-all duration-300 shadow-sm hover:shadow-xl ${cat.bgClass}`}
            >
              <div className="mb-3 text-foreground/70 group-hover:text-foreground transition-colors">
                {cat.icon}
              </div>
              <h3 className="font-display font-bold text-base lg:text-lg mb-1">{cat.label}</h3>
              <p className="font-body text-xs text-muted-foreground text-center">{cat.subtitle}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-display font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Shop Now <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

