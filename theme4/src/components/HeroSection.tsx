import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Image from "next/image";
import Link from "next/link";
import { useStoreContext } from "@/context/store-context";

export default function HeroSection() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const title = customization?.heroSection?.title || "Toys That Spark Creativity";
  const subtitle = customization?.heroSection?.subtitle || "Educational, safe, and fun toys loved by parents. Handcrafted quality for every stage of childhood.";
  const ctaText = customization?.heroSection?.ctaText || "Shop Now";
  const badgeText = customization?.heroSection?.badge || "New Collection 2026";
  const bgImage = customization?.heroSection?.backgroundImage || heroBg;

  return (
    <section
      className="relative overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center cursor-pointer"
      onClick={handleSectionClick}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={bgImage} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-secondary text-secondary-foreground font-display font-bold text-sm px-4 py-1.5 rounded-full mb-6"
          >
            {badgeText}
          </motion.span>

          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-card leading-tight mb-4 whitespace-pre-line">
            {title}
          </h1>

          <p className="font-body text-lg text-card/80 mb-8 max-w-md">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              {ctaText} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm text-card font-display font-bold px-6 py-3 rounded-lg hover:bg-card/30 transition-colors border border-card/30"
            >
              Browse Shop
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


