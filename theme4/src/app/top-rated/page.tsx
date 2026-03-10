"use client";

import SiteHeader from "@/components/SiteHeader";
import ProductList from "@/components/ProductList";
import SiteFooter from "@/components/SiteFooter";
import { products } from "@/data/products";

export default function TopRatedPage() {
    const topRated = products.filter(p => p.rating >= 4.8);
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="pb-16">
                <ProductList
                    title="Top Rated by Parents"
                    categoryName="Top Rated"
                    products={topRated}
                />
            </main>
            <SiteFooter />
        </div>
    );
}
