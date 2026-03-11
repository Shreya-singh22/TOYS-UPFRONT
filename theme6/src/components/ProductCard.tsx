'use client';

import { Star, ShoppingCart, Heart, ShieldCheck, Zap, Truck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-sky-100/50 hover:border-sky-100 transition-all duration-500 relative cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <Link href={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.condition && (
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border ${product.condition === 'Mint'
              ? 'bg-emerald-50/80 text-emerald-600 border-emerald-100'
              : 'bg-orange-50/80 text-orange-600 border-orange-100'
              }`}>
              {product.condition}
            </span>
          )}
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-sky-50/80 text-sky-600 border border-sky-100 backdrop-blur-xl">
              {product.badge}
            </span>
          )}
        </div>

        {/* Hover Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] flex flex-col items-center justify-end p-6 gap-3 z-20"
            >
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full h-12 bg-[#0EA5E9] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-200/50 hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </motion.button>

              <div className="flex gap-2 w-full">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlist(e);
                  }}
                  className={`flex-1 h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-2 ${isInWishlist(product.id)
                    ? 'bg-rose-50 border-rose-100 text-rose-500'
                    : 'bg-white border-white text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(product.id) ? 'Saved' : 'Wishlist'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5">
        <Link href={`/product/${product.id}`} className="group/title">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-[0.2em]">{product.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400">{product.age}</span>
          </div>
          <h3 className="font-display font-black text-slate-800 text-lg leading-tight mb-2 group-hover/title:text-[#0EA5E9] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-400 ml-1">({product.reviewCount})</span>
        </div>

        {/* Benefit Icons */}
        <div className="flex items-center gap-3 mb-4 py-3 border-y border-slate-50">
          <div className="flex items-center gap-1.5" title="Safe Material">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Safe</span>
          </div>
          <div className="flex items-center gap-1.5" title="Educational">
            <Zap className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Learn</span>
          </div>
          <div className="flex items-center gap-1.5" title="Free Shipping">
            <Truck className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Free Ship</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-display font-black text-2xl text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
