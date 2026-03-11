"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, ageCategories } from "@/data/products";
import { Filter, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedAge, setSelectedAge] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("popularity");
    const [priceRange, setPriceRange] = useState<number>(3000);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => {
                const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
                const ageMatch = selectedAge === "All" || p.age === selectedAge;
                const priceMatch = p.price <= priceRange;
                return categoryMatch && ageMatch && priceMatch;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                if (sortBy === "rating") return b.rating - a.rating;
                if (sortBy === "newest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
                if (sortBy === "popularity") return b.reviews - a.reviews;
                return 0;
            });
    }, [selectedCategory, selectedAge, priceRange, sortBy]);

    const activeFiltersCount = (selectedCategory !== "All" ? 1 : 0) + (selectedAge !== "All" ? 1 : 0);

    // Filter counts helper
    const getCategoryCount = (cat: string) => products.filter(p => p.category === cat).length;
    const getAgeCount = (age: string) => products.filter(p => p.age === age).length;

    return (
        <main style={{ backgroundColor: "#FDFBF7", minHeight: "100vh" }}>
            <Navbar />

            {/* Breadcrumb Section */}
            <div style={{ padding: '24px 0 16px', backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                        <span>/</span>
                        <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>Shop</Link>
                        {selectedCategory !== 'All' && (
                            <>
                                <span>/</span>
                                <span style={{ color: 'var(--primary)' }}>{selectedCategory}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Professional Header Section */}
            <section style={{ padding: "40px 0", backgroundColor: "white", borderBottom: "1px solid #F0F0F0" }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h1 style={{ fontSize: "3rem", marginBottom: "12px", color: 'var(--text)' }}>
                            {selectedCategory === 'All' ? 'Shop All Toys' : selectedCategory}
                        </h1>
                        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px" }}>
                            Discover {selectedCategory === 'All' ? 'our entire collection' : selectedCategory.toLowerCase()} expert-curated to spark creativity and developmental learning.
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ padding: "40px 0 100px" }}>
                <div className="container">
                    <div style={{ display: "flex", gap: "50px" }}>
                        {/* Sidebar Filters (Desktop) */}
                        <aside className="shop-sidebar" style={{ width: "260px", flexShrink: 0 }}>
                            <div style={{ position: "sticky", top: "100px" }}>
                                <div style={{ marginBottom: "30px", paddingBottom: '30px', borderBottom: '1px solid #F0F0F0' }}>
                                    <h3 style={{ fontSize: "1rem", fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: "20px", color: 'var(--text)' }}>
                                        Categories
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <button
                                            onClick={() => setSelectedCategory("All")}
                                            style={{
                                                display: 'flex', justifyContent: 'space-between', border: 'none',
                                                background: selectedCategory === 'All' ? '#FFF3EE' : 'transparent',
                                                padding: '10px 15px', borderRadius: '12px', cursor: 'pointer',
                                                fontSize: '0.95rem', color: selectedCategory === 'All' ? '#FF6B4A' : 'var(--text)',
                                                fontWeight: selectedCategory === 'All' ? '700' : '500',
                                                transition: '0.2s ease'
                                            }}
                                        >
                                            All Products <span style={{ opacity: 0.6 }}>({products.length})</span>
                                        </button>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.title}
                                                onClick={() => setSelectedCategory(cat.title)}
                                                style={{
                                                    display: 'flex', justifyContent: 'space-between', border: 'none',
                                                    background: selectedCategory === cat.title ? '#FFF3EE' : 'transparent',
                                                    padding: '10px 15px', borderRadius: '12px', cursor: 'pointer',
                                                    fontSize: '0.95rem', color: selectedCategory === cat.title ? '#FF6B4A' : 'var(--text-muted)',
                                                    fontWeight: selectedCategory === cat.title ? '700' : '500',
                                                    transition: '0.2s ease'
                                                }}
                                            >
                                                {cat.title} <span style={{ opacity: 0.6 }}>({getCategoryCount(cat.title)})</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: "30px", paddingBottom: '30px', borderBottom: '1px solid #F0F0F0' }}>
                                    <h3 style={{ fontSize: "1rem", fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: "20px", color: 'var(--text)' }}>
                                        Age Group
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {["All", ...ageCategories.map(c => c.age)].map(age => (
                                            <button
                                                key={age}
                                                onClick={() => setSelectedAge(age)}
                                                style={{
                                                    display: 'flex', justifyContent: 'space-between', border: 'none', background: 'none', padding: '8px 0', cursor: 'pointer',
                                                    fontSize: '0.95rem', color: selectedAge === age ? 'var(--primary)' : 'var(--text-muted)', fontWeight: selectedAge === age ? '700' : '500'
                                                }}
                                            >
                                                {age} {age !== 'All' && <span>({getAgeCount(age)})</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: "30px" }}>
                                    <h3 style={{ fontSize: "1rem", fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: "20px", color: 'var(--text)' }}>
                                        Price Range
                                    </h3>
                                    <input
                                        type="range"
                                        min="0"
                                        max="3000"
                                        step="100"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        style={{ width: "100%", accentColor: "var(--primary)", height: '4px' }}
                                    />
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "0.9rem", fontWeight: '600', color: "var(--text)" }}>
                                        <span>₹0</span>
                                        <span style={{ color: 'var(--primary)' }}>₹{priceRange}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { setSelectedCategory("All"); setSelectedAge("All"); setPriceRange(3000); }}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #ddd',
                                        background: 'white',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#666',
                                        transition: '0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#999'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div style={{ flex: 1 }}>
                            {/* Toolbar / Results Indicator */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                                <div style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
                                    Showing <span style={{ fontWeight: "800", color: "var(--text)" }}>{filteredProducts.length}</span> of {products.length} toys
                                    {selectedCategory !== 'All' && <span> for <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{selectedCategory}</span></span>}
                                </div>

                                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", background: 'white', padding: '8px 16px', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
                                        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: '600' }}>Sort by:</span>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            style={{ border: "none", outline: "none", fontWeight: "700", color: "var(--text)", backgroundColor: "transparent", cursor: "pointer", fontSize: '0.9rem' }}
                                        >
                                            <option value="popularity">Popularity</option>
                                            <option value="newest">Newest First</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Best Rating</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Active Tags */}
                            {activeFiltersCount > 0 && (
                                <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: 'wrap' }}>
                                    {selectedCategory !== "All" && (
                                        <div style={{ background: "white", border: '1px solid #FFD9D0', color: 'var(--primary)', padding: "8px 16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", fontWeight: '700' }}>
                                            Category: {selectedCategory} <X size={14} style={{ cursor: "pointer" }} onClick={() => setSelectedCategory("All")} />
                                        </div>
                                    )}
                                    {selectedAge !== "All" && (
                                        <div style={{ background: "white", border: '1px solid #D0EFFF', color: 'var(--secondary)', padding: "8px 16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", fontWeight: '700' }}>
                                            Age: {selectedAge} <X size={14} style={{ cursor: "pointer" }} onClick={() => setSelectedAge("All")} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Grid */}
                            {filteredProducts.length > 0 ? (
                                <>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px" }}>
                                        {filteredProducts.map(product => (
                                            <ProductCard key={product.id} {...product} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '80px' }}>
                                        <button style={{ border: '1px solid #ddd', background: 'white', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>←</button>
                                        <button style={{ border: 'none', background: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '10px', fontWeight: '700' }}>1</button>
                                        <button style={{ border: '1px solid #eee', background: 'white', width: '40px', height: '40px', borderRadius: '10px', fontWeight: '600' }}>2</button>
                                        <button style={{ border: '1px solid #eee', background: 'white', width: '40px', height: '40px', borderRadius: '10px', fontWeight: '600' }}>3</button>
                                        <span style={{ color: '#999', margin: '0 5px' }}>...</span>
                                        <button style={{ border: '1px solid #ddd', background: 'white', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
                                    </div>
                                </>
                            ) : (
                                <div style={{
                                    textAlign: "center",
                                    padding: "100px 40px",
                                    backgroundColor: 'white',
                                    borderRadius: '30px',
                                    border: '1px dashed #ddd',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                                }}>
                                    <div style={{ fontSize: '80px', marginBottom: '30px' }}>🔍</div>
                                    <h2 style={{ fontSize: '2rem', marginBottom: "15px", color: 'var(--text)' }}>No toys found 😢</h2>
                                    <p style={{ color: "var(--text-muted)", fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto' }}>
                                        We couldn't find any products matching your current combination of filters. Try adjusting them!
                                    </p>
                                    <button
                                        onClick={() => { setSelectedCategory("All"); setSelectedAge("All"); setPriceRange(3000); }}
                                        className="btn btn-primary"
                                        style={{ marginTop: "32px", padding: '16px 48px', borderRadius: '15px' }}
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ marginTop: '80px' }}>
                <Footer />
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .shop-sidebar {
                        display: none;
                    }
                }
            `}</style>
        </main>
    );
}
