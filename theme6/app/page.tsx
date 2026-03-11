'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw, Recycle, Star, ArrowRight, Blocks, TreeDeciduous, Dog, BrainCircuit, Dices, CheckCircle2, PackageCheck, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useStoreContext } from '@/contexts/store-context';

const trustBadges = [
    { icon: CheckCircle2, label: 'Certified Clean', desc: 'Professionally Sanitized' },
    { icon: Shield, label: 'Safety Inspected', desc: 'Zero Defect Policy' },
    { icon: TreeDeciduous, label: 'Eco-Friendly', desc: 'Sustainable Packaging' },
    { icon: RotateCcw, label: '30-Day Guarantee', desc: 'Happiness Guaranteed' },
];

const categoryData = [
    { name: 'Building Sets', icon: Blocks, color: 'bg-sky-50 text-sky-600' },
    { name: 'Wooden Toys', icon: TreeDeciduous, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Stuffed Animals', icon: Dog, color: 'bg-blue-50 text-blue-600' },
    { name: 'STEM & Montessori', icon: BrainCircuit, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Board Games', icon: Dices, color: 'bg-cyan-50 text-cyan-600' },
];

const howItWorks = [
    {
        step: '01',
        title: 'We Curate',
        desc: 'Conscious families donate or sell us their high-quality toys.',
        icon: PackageCheck
    },
    {
        step: '02',
        title: 'We Refresh',
        desc: 'Each toy is professionally cleaned, safety checked, and packaged.',
        icon: Recycle
    },
    {
        step: '03',
        title: 'You Play',
        desc: 'Your child enjoys premium toys at up to 70% off the original price.',
        icon: Star
    }
];

const Index = () => {
    const { customization } = useStoreContext();
    const featuredFinds = products.slice(0, 4);

    const handleSectionClick = (sectionId: string) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    // Hero Customization Fallbacks
    const heroTitle = customization?.heroSection?.title || (
        <>
            PRE-LOVED TOYS, <br />
            <span className="text-[#0EA5E9]">ENDLESS JOY.</span>
        </>
    );
    const heroDesc = customization?.heroSection?.description || "Discover curated, sanitized toys at up to 70% OFF. Sustainable play, delivered.";
    const heroImage = customization?.heroSection?.image || "/assets/hero-toys.jpg";

    return (
        <div className="relative min-h-screen bg-[#F8FAFC]">
            {/* Dynamic Mesh Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {/* Large animated blobs for depth */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-sky-200/50 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-[130px]"
                />
                <motion.div
                    animate={{
                        x: [20, -20, 20],
                        y: [-20, 20, -20],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] left-[10%] w-[55%] h-[55%] bg-blue-100/40 rounded-full blur-[160px]"
                />
            </div>

            <div className="relative z-10">
                {/* Refined Hero Section */}
                <section
                    onClick={() => handleSectionClick('heroSection')}
                    className="relative min-h-[70vh] flex items-center pt-20 pb-8 overflow-hidden cursor-pointer"
                >
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-12 gap-10 items-center">
                            {/* Text Content */}
                            <div className="lg:col-span-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur-md border border-sky-100/50 text-[#0EA5E9] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Premium Pre-Loved Experience
                                    </motion.div>

                                    <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] text-slate-900 tracking-tighter mb-6">
                                        {heroTitle}
                                    </h1>

                                    <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
                                        {heroDesc}
                                    </p>

                                    <div className="flex flex-wrap gap-4 mb-10">
                                        <Link href="/shop" className="group">
                                            <button className="bg-[#0EA5E9] text-white h-14 px-8 rounded-2xl font-display font-black text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-sky-100 flex items-center gap-3">
                                                Shop All Toys <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                        <Link href="/sell">
                                            <button className="bg-white/90 backdrop-blur-md border-2 border-slate-100 text-slate-700 h-14 px-8 rounded-2xl font-display font-black text-base transition-all hover:bg-white active:scale-95 shadow-lg shadow-slate-100/50">
                                                Sell Your Toys
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-4 p-3 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm w-fit">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                                    <img src={`/assets/hero-toys.jpg`} alt="user" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs font-black text-slate-800 tracking-tight">2,000+ Happy Families</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Staggered Photo Collage */}
                            <div className="lg:col-span-6 relative h-[450px] md:h-[550px]">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-200/50 rounded-full opacity-30"
                                />

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="absolute top-0 right-0 w-[58%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-[8px] border-white group"
                                >
                                    <img src={heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Playtime" />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -30, y: 50 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="absolute top-20 left-4 w-[42%] aspect-square rounded-[1.5rem] overflow-hidden shadow-xl z-30 border-[6px] border-white rotate-6 group"
                                >
                                    <img src="/assets/toy-blocks.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Blocks" />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="absolute bottom-10 right-10 w-[35%] aspect-square rounded-2xl overflow-hidden shadow-lg z-30 border-[4px] border-white -rotate-12 group"
                                >
                                    <img src="/assets/toy-dollhouse.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Details" />
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.8 }}
                                    className="absolute bottom-12 left-12 bg-[#10B981] text-white p-4 rounded-full shadow-xl z-40 border-4 border-white rotate-12 flex flex-col items-center justify-center"
                                >
                                    <span className="text-lg font-black leading-none">-70%</span>
                                    <span className="text-[7px] font-bold uppercase tracking-tighter">Off</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tightened Trust Bar */}
                <section className="relative z-30 -mt-6 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <div className="bg-slate-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {trustBadges.map((badge) => (
                                    <div key={badge.label} className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                            <badge.icon className="w-4 h-4 text-sky-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-white text-[13px] leading-tight mb-0.5">{badge.label}</p>
                                            <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">{badge.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reduced Padding Sections */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <h2 className="font-display text-4xl font-black text-slate-900 mb-3 tracking-tight">Our Curated Library</h2>
                            <p className="text-slate-500 font-medium text-base italic text-sky-600/80">Sustainable play, sorted by stage.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {categoryData.map((cat) => (
                                <Link key={cat.name} href={`/shop?category=${cat.name}`}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="flex flex-col items-center p-6 rounded-[2.5rem] bg-white/50 backdrop-blur-md hover:bg-white border border-white/50 hover:border-sky-100/50 hover:shadow-lg transition-all duration-300 group text-center"
                                    >
                                        <div className={`w-16 h-16 rounded-[1.5rem] ${cat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
                                            <cat.icon className="w-8 h-8" />
                                        </div>
                                        <span className="font-display font-black text-slate-800 text-sm leading-tight">{cat.name}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="py-16">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-4xl font-black text-slate-900 mb-2 tracking-tight">The Joy Loop</h2>
                            <p className="text-[#0EA5E9] font-black text-[10px] uppercase tracking-[0.3em]">How EcoPlay powers the circle</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                            {howItWorks.map((item) => (
                                <div key={item.step} className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-[2rem] bg-white/70 backdrop-blur-md shadow-lg flex items-center justify-center mb-6 border border-white group-hover:scale-105 transition-transform">
                                        <item.icon className="w-9 h-9 text-[#0EA5E9]" />
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-[#0EA5E9] text-white flex items-center justify-center font-black text-[10px] shadow-md">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="font-display font-black text-slate-900 text-xl mb-2">{item.title}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed px-4">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
                            <div>
                                <h2 className="font-display text-4xl font-black text-slate-900 tracking-tight leading-none mb-3">Today's Fresh Picks</h2>
                                <p className="text-[#0EA5E9] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-ping" />
                                    Recently Sanitized & Ready for Play
                                </p>
                            </div>
                            <Link href="/shop" className="group">
                                <button className="h-12 px-6 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg">
                                    View Catalog <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredFinds.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-16">
                    <div className="rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden bg-slate-900 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 max-w-xl mx-auto">
                            <h2 className="font-display text-4xl font-black mb-4 leading-none tracking-tight">Small Footprints, <br /> Big Imaginations.</h2>
                            <p className="text-base text-slate-400 font-medium mb-8 max-w-md mx-auto">Join the movement. Get early access to arrivals.</p>

                            <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 h-12 rounded-xl bg-white/10 border border-white/20 px-5 text-white focus:outline-none focus:border-sky-500 transition-colors font-medium text-xs placeholder:text-white/30"
                                />
                                <button className="h-12 px-6 rounded-xl bg-sky-500 text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                                    Go Green
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Index;
