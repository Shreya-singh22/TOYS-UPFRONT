"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { ChevronRight, Filter, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProductListProps {
    products: Product[];
    title: string;
    categoryName?: string;
}

export default function ProductList({ products, title, categoryName }: ProductListProps) {
    const [sortBy, setSortBy] = useState("newest");
    const [view, setView] = useState<"grid" | "list">("grid");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // "newest" or default
    });

    return (
        <div className="container mx-auto px-4 lg:px-8 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                {categoryName && (
                    <>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-semibold capitalize">{categoryName}</span>
                    </>
                )}
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters (Visual Only for now) */}
                <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-display font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-2 font-body text-sm text-muted-foreground">
                            <li className="hover:text-primary cursor-pointer transition-colors">Educational Toys</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">STEM Kits</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Outdoor Play</li>
                            <li className="hover:text-primary cursor-pointer transition-colors">Puzzles & Games</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-display font-bold text-lg mb-4">Age Range</h3>
                        <ul className="space-y-2 font-body text-sm text-muted-foreground">
                            <li className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors" />
                                <span>0-2 Years</span>
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors" />
                                <span>3-5 Years</span>
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors" />
                                <span>6-8 Years</span>
                            </li>
                            <li className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors" />
                                <span>9-12 Years</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-display font-bold text-lg mb-4">Price Range</h3>
                        <input type="range" className="w-full accent-primary" min="0" max="10000" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>₹0</span>
                            <span>₹10,000+</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-grow">
                    {/* Header & Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="font-display font-black text-3xl lg:text-4xl leading-tight">{title}</h1>
                            <p className="font-body text-muted-foreground mt-2">{sortedProducts.length} products found</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-muted rounded-lg p-1">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-muted font-body text-sm py-2.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 rotate-90 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {sortedProducts.length === 0 && (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
                            <p className="font-body text-muted-foreground text-lg">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
