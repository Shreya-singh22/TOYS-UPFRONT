"use client";

import SiteHeader from "@/components/SiteHeader";
import ProductList from "@/components/ProductList";
import SiteFooter from "@/components/SiteFooter";
import Newsletter from "@/components/Newsletter";
import TrustSection from "@/components/TrustSection";
import { products } from "@/data/products";

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="pb-16">
                <ProductList
                    title="Our Toy Shop"
                    products={products}
                />
                <TrustSection />
                <Newsletter />
            </main>
            <SiteFooter />
        </div>
    );
}
