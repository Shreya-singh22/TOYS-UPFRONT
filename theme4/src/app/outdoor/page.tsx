"use client";

import SiteHeader from "@/components/SiteHeader";
import ProductList from "@/components/ProductList";
import SiteFooter from "@/components/SiteFooter";
import { outdoorProducts } from "@/data/products";

export default function OutdoorPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="pb-16">
                <ProductList
                    title="Outdoor Play"
                    categoryName="Outdoor"
                    products={outdoorProducts}
                />
            </main>
            <SiteFooter />
        </div>
    );
}
