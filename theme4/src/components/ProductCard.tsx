import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";


export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-full max-w-[280px] mx-auto sm:mx-0"

      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge */}
          {product.badge === "sale" && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-display font-bold px-2.5 py-1 rounded-full z-10 uppercase tracking-wider">
              SALE
            </span>
          )}
          {product.badge === "new" && (
            <span className="absolute top-3 left-3 bg-sky text-primary-foreground text-[10px] font-display font-bold px-2.5 py-1 rounded-full z-10 uppercase tracking-wider">
              NEW
            </span>
          )}
          {product.badge === "parent-favorite" && (
            <span className="absolute top-3 left-3 bg-sunshine text-secondary-foreground text-[10px] font-display font-bold px-2.5 py-1 rounded-full z-10 uppercase tracking-wider">
              Parent Favorite
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-sm font-bold text-foreground leading-tight mb-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-sunshine text-sunshine" : "text-border"}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-body text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="font-body text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>

      <motion.button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
        className="absolute bottom-[110px] left-3 right-3 flex items-center justify-center gap-2 bg-foreground text-card font-display font-bold text-sm py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/90 z-20"
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="h-4 w-4" /> Add to Cart
      </motion.button>
    </motion.div>
  );
}
