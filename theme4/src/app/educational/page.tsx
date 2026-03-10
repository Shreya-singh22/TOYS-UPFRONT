"use client";

import SiteHeader from "@/components/SiteHeader";
import ProductList from "@/components/ProductList";
import SiteFooter from "@/components/SiteFooter";
import { educationalProducts } from "@/data/products";

export default function EducationalPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="pb-16">
                <ProductList
                    title="Educational Toys"
                    categoryName="Educational"
                    products={educationalProducts}
                />
            </main>
            <SiteFooter />
        </div>
    );
}
