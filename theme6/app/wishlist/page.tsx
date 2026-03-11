'use client';

import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">Your Wishlist</h1>
                        <p className="text-slate-500 font-medium">{wishlist.length} items saved for later</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center">
                            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                        </div>
                    </div>
                </div>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlist.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50"
                    >
                        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-slate-200" />
                        </div>
                        <h2 className="font-display text-2xl font-black text-slate-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 font-medium mb-8 text-center max-w-xs">
                            Save your favorite toys here to keep track of what your little ones will love!
                        </p>
                        <Link href="/shop">
                            <button className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                                Start Exploring <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
