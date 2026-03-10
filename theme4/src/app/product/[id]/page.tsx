"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductShelf from "@/components/ProductShelf";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useCart } from "@/context/CartContext";

import {
    Star,
    ShoppingCart,
    ChevronRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    CheckCircle2,
    Clock,
    ArrowLeft
} from "lucide-react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const product = products.find((p) => p.id === id);

    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);

    // Recently Viewed Logic
    useEffect(() => {
        if (product) {
            const viewedIDs = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
            const updated = [product.id, ...viewedIDs.filter((vid: string) => vid !== product.id)].slice(0, 5);
            localStorage.setItem("recentlyViewed", JSON.stringify(updated));
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <SiteHeader />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
                        <Link href="/shop" className="text-primary hover:underline font-body">Back to Shop</Link>
                    </div>
                </main>
                <SiteFooter />
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            {/* Breadcrumb */}
            <nav className="container mx-auto px-4 lg:px-8 py-4 flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/${product.category}`} className="capitalize hover:text-primary transition-colors">{product.category}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-semibold truncate">{product.name}</span>
            </nav>

            <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square bg-muted rounded-3xl overflow-hidden group cursor-zoom-in">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover transition-transform duration-500 hover:scale-110"
                            />
                            {product.badge && (
                                <span className="absolute top-6 left-6 bg-sunshine text-secondary-foreground text-xs font-display font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                                    {product.badge === "parent-favorite" ? "Parent Favorite" : product.badge}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-4">
                            {[0, 1, 2, 3].map((idx) => (
                                <div
                                    key={idx}
                                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${selectedImage === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    onClick={() => setSelectedImage(idx)}
                                >
                                    <Image src={product.image} alt="" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h1 className="font-display font-extrabold text-3xl lg:text-5xl mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1 bg-sunshine/10 text-sunshine px-3 py-1 rounded-full border border-sunshine/20">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="font-display font-bold">{product.rating}</span>
                                </div>
                                <span className="font-body text-sm text-muted-foreground underline">
                                    {product.reviews} customer reviews
                                </span>
                                <span className="h-4 w-px bg-border hidden sm:block" />
                                <span className="font-display font-bold text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">
                                    Ages {product.ageRange}
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="font-display font-black text-4xl text-primary">₹{product.price}</span>
                                {product.originalPrice && (
                                    <span className="font-body text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                                )}
                            </div>

                            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                                {product.description || `Spark joy and creativity with our handcrafted ${product.name}. Designed specifically for children aged ${product.ageRange}, this toy encourages cognitive development and safe play.`}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-display font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                <ShoppingCart className="h-5 w-5" /> Add to Cart
                            </button>
                            <button className="flex items-center justify-center bg-foreground text-background font-display font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg">
                                Buy Now
                            </button>
                        </div>

                        {/* Trust Info */}
                        <div className="grid grid-cols-2 gap-y-4 border-t border-b py-6 mb-8 group">
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-display font-bold">Free Shipping</p>
                                    <p className="text-[10px] text-muted-foreground font-body leading-none">On orders over ₹999</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-display font-bold">Non-Toxic</p>
                                    <p className="text-[10px] text-muted-foreground font-body leading-none">100% Child-Safe</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RotateCcw className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-display font-bold">Easy Returns</p>
                                    <p className="text-[10px] text-muted-foreground font-body leading-none">30-Day Policy</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-display font-bold">Fast Delivery</p>
                                    <p className="text-[10px] text-muted-foreground font-body leading-none">2-4 Business Days</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Highlights */}
                        {product.highlights && (
                            <div className="bg-muted/50 rounded-2xl p-6">
                                <h3 className="font-display font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    Product Highlights
                                </h3>
                                <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-4">
                                    {product.highlights.map((h, i) => (
                                        <li key={i} className="font-body text-sm flex items-start gap-2 text-muted-foreground">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Detailed Sections Tabs */}
                <div className="mt-20 lg:mt-32">
                    <div className="flex border-b border-border mb-8 overflow-x-auto">
                        {["Description", "Details", "How It Works", "FAQ"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`px-8 py-4 font-display font-bold text-sm whitespace-nowrap transition-all relative ${activeTab === tab.toLowerCase() ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase() && (
                                    <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto py-8 min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "description" && (
                                <motion.div
                                    key="desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="prose prose-slate max-w-none font-body leading-loose text-muted-foreground text-lg"
                                >
                                    <p>{product.description || "Building foundations for creativity has never been more fun. Our thoughtfully designed toys combine educational value with pure entertainment, ensuring that children develop essential skills while they play."}</p>
                                </motion.div>
                            )}
                            {activeTab === "details" && (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid sm:grid-cols-2 gap-8"
                                >
                                    <div className="bg-card p-8 rounded-3xl border shadow-sm">
                                        <h4 className="font-display font-bold text-xl mb-6">Learning focus</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-sky/20 flex items-center justify-center text-sky font-bold">1</div>
                                                <p className="font-body">Fine motor skills and dexterity</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-mint/20 flex items-center justify-center text-mint font-bold">2</div>
                                                <p className="font-body">Spatial awareness and logic</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-coral/20 flex items-center justify-center text-coral font-bold">3</div>
                                                <p className="font-body">Problem-solving abilities</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-card p-8 rounded-3xl border shadow-sm">
                                        <h4 className="font-display font-bold text-xl mb-6">Materials & Safety</h4>
                                        <ul className="space-y-4 font-body text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-mint mt-0.5 flex-shrink-0" />
                                                <span>FSC-certified sustainable wood and organic cotton</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-mint mt-0.5 flex-shrink-0" />
                                                <span>Tested by independent labs (ASTM F963 & EN-71)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-mint mt-0.5 flex-shrink-0" />
                                                <span>100% lead-free, non-toxic, water-based finishes</span>
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === "faq" && (
                                <motion.div
                                    key="faq"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    {(product.faqs || [
                                        { q: "Is this toy safe for my child?", a: "ABSOLUTELY. All our toys meet and exceed US and European safety standards. They are rigorously tested by independent laboratories." },
                                        { q: "What is your return policy?", a: "We want you to be 100% happy. If it's not the right fit, you can return it within 30 days for a full refund." },
                                        { q: "How do I clean this product?", a: "Wipe with a damp cloth and mild soap. Do not soak in water as it's made from natural wood." }
                                    ]).map((faq, i) => (
                                        <div key={i} className="bg-card p-6 rounded-2xl border">
                                            <h4 className="font-display font-bold text-foreground mb-2">{faq.q}</h4>
                                            <p className="font-body text-muted-foreground">{faq.a}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Lifestyle Section */}
                <section className="mt-20 grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="font-display font-black text-3xl lg:text-4xl mb-6">How Kids Play</h2>
                        <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                            Watch as they explore, learn, and grow. Our toys are built to withstand years of imaginative play,
                            becoming a cherished part of your child's developmental journey. From building skyscrapers to
                            composing their first melody, the possibilities are endless.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-primary/10 p-4 rounded-2xl flex-grow">
                                <p className="font-display font-bold text-primary">Skill Level</p>
                                <p className="text-sm font-body text-muted-foreground">Beginner Friendly</p>
                            </div>
                            <div className="bg-sky/10 p-4 rounded-2xl flex-grow">
                                <p className="font-display font-bold text-sky">Focus</p>
                                <p className="text-sm font-body text-muted-foreground">Creativity & Logic</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl">
                        <Image
                            src={product.lifestyleImage || product.image}
                            alt="Kid playing"
                            fill
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* Customer Reviews Section */}
                <section className="mt-20 py-16 border-t">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/3">
                            <h2 className="font-display font-black text-3xl mb-4">Customer Reviews</h2>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-5xl font-display font-black text-primary">{product.rating}</span>
                                <div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-sunshine text-sunshine" : "text-border"}`} />
                                        ))}
                                    </div>
                                    <p className="text-sm font-body text-muted-foreground">Based on {product.reviews} reviews</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((stars) => (
                                    <div key={stars} className="flex items-center gap-4">
                                        <span className="text-sm font-body text-muted-foreground w-4">{stars}</span>
                                        <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-sunshine"
                                                style={{ width: stars === 5 ? '85%' : stars === 4 ? '12%' : '1%' }}
                                            />
                                        </div>
                                        <span className="text-sm font-body text-muted-foreground w-8">
                                            {stars === 5 ? '85%' : stars === 4 ? '12%' : '1%'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-2/3 space-y-8">
                            {[
                                { name: "Emily H.", date: "2 months ago", rating: 5, text: "My daughter hasn't stopped playing with this since it arrived. The quality is exceptional and I love that it's all natural wood." },
                                { name: "David L.", date: "3 weeks ago", rating: 5, text: "Perfect gift for a 4-year-old. It's educational but they don't even realize they're learning. Fast shipping too!" }
                            ].map((review, i) => (
                                <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-display font-bold">{review.name}</p>
                                            <p className="text-xs font-body text-muted-foreground">{review.date}</p>
                                        </div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`h-3 w-3 ${idx < review.rating ? "fill-sunshine text-sunshine" : "text-border"}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="font-body text-muted-foreground leading-relaxed">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Visual Grid */}
                <section className="mt-20 py-16 bg-foreground text-background rounded-[40px] px-8 lg:px-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
                    <div className="relative z-10 text-center mb-16">
                        <h2 className="font-display font-black text-3xl lg:text-5xl mb-4">Why Parents Love It</h2>
                        <p className="font-body text-background/60 text-lg max-w-2xl mx-auto">Thoughtfully engineered for safety, durability, and endless fun.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            { title: "STEM Learning", desc: "Built with developmental experts to target specific milestones.", icon: <CheckCircle2 className="h-10 w-10 text-sunshine" /> },
                            { title: "Premium Materials", desc: "We use only the highest quality wood and non-toxic finishes.", icon: <Star className="h-10 w-10 text-coral" /> },
                            { title: "Parent Trusted", desc: "Voted #1 choice by parent associations three years running.", icon: <ShieldCheck className="h-10 w-10 text-sky" /> }
                        ].map((f, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors group">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                                <h3 className="font-display font-bold text-xl mb-4">{f.title}</h3>
                                <p className="font-body text-background/50 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recently Viewed Triggered in useEffect */}
            </main>

            <ProductShelf
                title="You May Also Like"
                subtitle="Related items for more fun."
                products={relatedProducts}
            />

            <RecentlyViewed />

            <SiteFooter />

            {/* Sticky Bottom Bar (Mobile Only) */}
            <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t p-4 lg:hidden z-[60] flex items-center justify-between gap-4 animate-slide-up">
                <div className="flex flex-col">
                    <span className="font-display font-black text-xl text-primary">₹{product.price}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">In Stock</span>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="flex-grow bg-primary text-primary-foreground font-display font-bold py-3 rounded-xl shadow-lg"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
