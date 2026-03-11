'use client';

import { useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Filter, ChevronDown, SlidersHorizontal, LayoutGrid, List, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOP_CATEGORIES = ['All', 'Building Sets', 'Wooden Toys', 'Stuffed Animals', 'STEM & Montessori', 'Creative', 'Outdoor', 'Educational'];
const AGE_GROUPS = ['All', '0-2 years', '3-5 years', '6-8 years', '8-12 years'];
const SORT_OPTIONS = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Top Rated', value: 'rating' }
];

const ShopContent = () => {
    const searchParams = useSearchParams();

    // State
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
    const [activeAge, setActiveAge] = useState(searchParams.get('age') || 'All');
    const [sortBy, setSortBy] = useState('popularity');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    // Filtering & Sorting Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category Filter
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // Age Filter
        if (activeAge !== 'All') {
            result = result.filter(p => p.age === activeAge || p.ageRecommendation.includes(activeAge));
        }

        // Search Query
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price Filter
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // For dummy data, assume reverse ID or random
                result.reverse();
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default popularity/none
                break;
        }

        return result;
    }, [activeCategory, activeAge, searchQuery, sortBy, priceRange]);

    const displayProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-100 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">EcoPlay Library</h1>
                    <p className="text-slate-500 font-medium max-w-xl leading-relaxed italic">
                        Explore our collection of fun, educational, and safe toys for kids of all ages.
                        Join the <span className="text-[#0EA5E9] font-black">Joy Loop</span> today.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* PC Sidebar: Filters */}
                    <aside className="hidden lg:block w-72 shrink-0 space-y-8">
                        {/* Search in Sidebar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-11 bg-white border border-slate-100 rounded-2xl pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Toy Category</h3>
                            <div className="grid gap-2">
                                {SHOP_CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeCategory === cat
                                                ? 'bg-sky-50 text-[#0EA5E9]'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {cat}
                                        <span>{cat === 'All' ? products.length : products.filter(p => p.category === cat).length}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Age Filter */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Age Recommendation</h3>
                            <div className="flex flex-wrap gap-2">
                                {AGE_GROUPS.map(age => (
                                    <button
                                        key={age}
                                        onClick={() => setActiveAge(age)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeAge === age
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        {age}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sustainability Tip */}
                        <div className="p-5 rounded-[2rem] bg-[#10B981]/5 border border-[#10B981]/10 space-y-2">
                            <div className="flex items-center gap-2 text-[#10B981]">
                                <Filter className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Green Fact</span>
                            </div>
                            <p className="text-[11px] font-medium text-emerald-800 leading-relaxed italic">
                                Second-hand toys reduce carbon footprint by up to 80%! Thanks for playing green.
                            </p>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Top Bar: Sort & Mobile Filter Toggle */}
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-5 h-11 bg-white border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600"
                            >
                                <SlidersHorizontal className="w-4 h-4" /> Filters
                            </button>

                            <div className="hidden lg:flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400">Total:</span>
                                <span className="text-xs font-black text-slate-900">{filteredProducts.length} Toys Found</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="hidden sm:block text-[10px] font-black uppercase text-slate-400 tracking-widest">Sort:</span>
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none h-11 pl-5 pr-10 bg-white border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
                                    >
                                        {SORT_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Search result breadcrumb/tag */}
                        {searchQuery && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-[#0EA5E9] rounded-full text-xs font-bold mb-6">
                                Results for "{searchQuery}"
                                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                            </div>
                        )}

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {displayProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i % 4} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100">
                                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                    <X className="w-8 h-8 text-slate-200" />
                                </div>
                                <h2 className="font-display text-2xl font-black text-slate-900 mb-2">No toys match your criteria</h2>
                                <p className="text-slate-500 font-medium">Try adjusting your filters or search query.</p>
                                <button
                                    onClick={() => { setActiveCategory('All'); setActiveAge('All'); setSearchQuery(''); }}
                                    className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#0EA5E9]"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}

                        {/* Load More */}
                        {visibleCount < filteredProducts.length && (
                            <div className="flex flex-col items-center mt-16 gap-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Showing {displayProducts.length} of {filteredProducts.length} products
                                </p>
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 4)}
                                    className="h-14 px-10 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-100"
                                >
                                    Load More Toys
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer Overlay */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[85%] bg-white z-[110] shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-display text-2xl font-black text-slate-900">Filters</h2>
                                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-50 rounded-lg"><X className="w-5 h-5 text-slate-600" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {SHOP_CATEGORIES.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => { setActiveCategory(cat); setShowMobileFilters(false); }}
                                                className={`px-4 py-3 rounded-xl text-left text-xs font-bold ${activeCategory === cat ? 'bg-sky-50 text-sky-600' : 'bg-slate-50 text-slate-600'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Age Range</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {AGE_GROUPS.map(age => (
                                            <button
                                                key={age}
                                                onClick={() => { setActiveAge(age); setShowMobileFilters(false); }}
                                                className={`px-4 py-3 rounded-xl text-xs font-bold ${activeAge === age ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600'}`}
                                            >
                                                {age}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="mt-8 h-14 bg-[#0EA5E9] text-white rounded-2xl font-black text-xs uppercase tracking-widest"
                            >
                                Apply Filters
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const Shop = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-display font-black text-slate-200 uppercase tracking-widest">Initializing...</div>}>
            <ShopContent />
        </Suspense>
    );
};

export default Shop;
