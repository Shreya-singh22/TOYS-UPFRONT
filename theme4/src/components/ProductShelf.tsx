import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  bgClass?: string;
};

export default function ProductShelf({ id, title, subtitle, products, bgClass }: Props) {
  if (products.length === 0) return null;

  return (
    <section id={id} className={`py-12 lg:py-16 ${bgClass ?? ""}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground">{title}</h2>
          {subtitle && <p className="font-body text-muted-foreground mt-1">{subtitle}</p>}
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
