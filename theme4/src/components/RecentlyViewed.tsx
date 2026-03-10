"use client";

import { useEffect, useState } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function RecentlyViewed() {
    const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const viewedIDs = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        if (viewedIDs.length > 0) {
            const filtered = viewedIDs
                .map((id: string) => products.find((p) => p.id === id))
                .filter(Boolean) as Product[];
            setViewedProducts(filtered);
        }
    }, []);

    if (viewedProducts.length === 0) return null;

    return (
        <section className="py-16 border-t overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="font-display font-black text-3xl lg:text-4xl leading-tight">Recently Viewed</h2>
                        <p className="font-body text-muted-foreground mt-2">Pick up where you left off.</p>
                    </div>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4 lg:-mx-8 lg:px-8">
                    {viewedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
