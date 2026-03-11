'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Check, Heart, Recycle, Package, BrainCircuit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
    const params = useParams();
    const id = params.id as string;
    const { addToCart, setIsCartOpen } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const product = products.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-slate-200" />
                </div>
                <h1 className="font-display text-4xl font-black text-slate-900 mb-4">Toy Not Found</h1>
                <p className="text-slate-500 mb-8">It looks like this toy has already found a new home!</p>
                <Link href="/shop">
                    <button className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">
                        Back to Library
                    </button>
                </Link>
            </div>
        );
    }

    const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-10 pb-24">
            <div className="container mx-auto px-4">
                {/* Navigation Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <Link href="/shop" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to Shop
                    </Link>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Link href="/" className="hover:text-[#0EA5E9]">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-[#0EA5E9]">{product.category}</Link>
                        <span>/</span>
                        <span className="text-slate-900">{product.name}</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Visual Side */}
                    <div className="lg:col-span-6 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden bg-white border border-slate-100 shadow-xl shadow-sky-100/20"
                        >
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

                            {/* Badges Overlay */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                {product.condition && (
                                    <span className="px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white text-[10px] font-black uppercase tracking-widest text-[#0EA5E9] shadow-sm">
                                        Condition: {product.condition}
                                    </span>
                                )}
                                {product.badge && (
                                    <span className="px-4 py-2 rounded-2xl bg-[#0EA5E9] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sky-200">
                                        {product.badge}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={handleWishlist}
                                className={`absolute top-6 right-6 w-12 h-12 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all shadow-lg ${isInWishlist(product.id)
                                        ? 'bg-rose-500 text-white scale-110 shadow-rose-200'
                                        : 'bg-white/90 text-slate-600 hover:text-rose-500'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                            </button>
                        </motion.div>

                        {/* Extra Visual Proof */}
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 hover:border-sky-200 transition-colors cursor-pointer group">
                                    <img src={product.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-6 flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0EA5E9] text-[9px] font-black uppercase tracking-widest">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                    ))}
                                    <span className="text-xs font-bold text-slate-400 ml-1">{product.reviewCount} Ratings</span>
                                </div>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
                                {product.name}
                            </h1>

                            <p className="text-slate-500 font-medium leading-relaxed mb-6 italic text-lg border-l-4 border-sky-100 pl-4">
                                {product.shortDescription}
                            </p>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="font-display text-4xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                                {product.originalPrice && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                        <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">
                                            Save {(100 - (product.price / product.originalPrice * 100)).toFixed(0)}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Core Action Zone */}
                            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 mb-10 space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="flex items-center h-14 bg-slate-50 rounded-2xl border border-slate-100 p-1 w-full sm:w-fit">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="w-12 h-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-black text-slate-900">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="w-12 h-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={added}
                                        className={`flex-1 h-14 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all w-full ${added
                                                ? 'bg-emerald-500 text-white shadow-emerald-200'
                                                : 'bg-[#0EA5E9] text-white hover:bg-sky-600 shadow-sky-200 active:scale-95 shadow-xl'
                                            }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {added ? (
                                                <motion.div key="check" initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-2">
                                                    <Check className="w-5 h-5" /> Secured in Bag!
                                                </motion.div>
                                            ) : (
                                                <motion.div key="cart" initial={{ y: -20 }} animate={{ y: 0 }} className="flex items-center gap-2">
                                                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        Sanitized & Cleaned
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#0EA5E9]">
                                            <Truck className="w-4 h-4" />
                                        </div>
                                        Fast Eco-Shipping
                                    </div>
                                </div>
                            </div>

                            {/* Why Parents Love It */}
                            <div className="space-y-4 mb-10">
                                <h3 className="font-display text-xl font-black text-slate-900 flex items-center gap-2">
                                    <BrainCircuit className="w-5 h-5 text-[#0EA5E9]" />
                                    Why Parents Love It
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {product.whyParentsLoveIt}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Detailed Tabs/Sections */}
                <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Key Features */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Key Features</h4>
                        <ul className="space-y-3">
                            {product.features.map((feature, i) => (
                                <li key={i} className="flex gap-3 text-sm font-bold text-slate-700 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm">
                                    <span className="shrink-0 text-[#0EA5E9]">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Product Specifications</h4>
                        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                            <table className="w-full text-sm">
                                <tbody className="divide-y divide-slate-50">
                                    <tr className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-black text-slate-400 uppercase text-[9px] tracking-widest w-1/3">Material</td>
                                        <td className="px-6 py-4 font-bold text-slate-700">{product.specifications.material}</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-black text-slate-400 uppercase text-[9px] tracking-widest">Age Range</td>
                                        <td className="px-6 py-4 font-bold text-slate-700">{product.ageRecommendation}</td>
                                    </tr>
                                    {product.specifications.pieces && (
                                        <tr className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4 font-black text-slate-400 uppercase text-[9px] tracking-widest">Pieces</td>
                                            <td className="px-6 py-4 font-bold text-slate-700">{product.specifications.pieces}</td>
                                        </tr>
                                    )}
                                    {product.specifications.weight && (
                                        <tr className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4 font-black text-slate-400 uppercase text-[9px] tracking-widest">Weight</td>
                                            <td className="px-6 py-4 font-bold text-slate-700">{product.specifications.weight}</td>
                                        </tr>
                                    )}
                                    {product.specifications.dimensions && (
                                        <tr className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4 font-black text-slate-400 uppercase text-[9px] tracking-widest">Dimensions</td>
                                            <td className="px-6 py-4 font-bold text-slate-700">{product.specifications.dimensions}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* What's In The Box */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">What's in the box?</h4>
                        <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                            <ul className="space-y-4">
                                {product.whatsInTheBox.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                                        <Package className="w-4 h-4 text-[#0EA5E9]" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sustainability Impact */}
                        <div className="p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 space-y-2">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                <Recycle className="w-3 h-3" /> Earth Saver Impact
                            </p>
                            <p className="text-[11px] font-medium text-emerald-800 leading-relaxed italic">
                                Buying this pre-loved toy prevents <span className="font-bold underline">1.2kg</span> of plastic waste.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="font-display text-3xl font-black text-slate-900 tracking-tight">You might also like...</h2>
                        <Link href="/shop" className="text-xs font-black uppercase tracking-widest text-[#0EA5E9] hover:underline underline-offset-8">Explore Store</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {related.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
