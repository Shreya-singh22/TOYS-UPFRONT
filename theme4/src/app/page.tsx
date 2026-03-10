"use client";

import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ShopByAge from "@/components/ShopByAge";
import ProductShelf from "@/components/ProductShelf";
import TrustSection from "@/components/TrustSection";
import CustomerReviews from "@/components/CustomerReviews";
import Newsletter from "@/components/Newsletter";
import SiteFooter from "@/components/SiteFooter";
import { bestSellers, parentFavorites, educationalProducts, outdoorProducts, newArrivals } from "@/data/products";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <HeroSection />
            <CategoryGrid />
            <ShopByAge />

            <ProductShelf
                id="best-sellers"
                title="Best Sellers"
                subtitle="Most loved by kids and parents."
                products={bestSellers}
                bgClass="bg-card"
            />

            <ProductShelf
                id="top-rated"
                title="Top Rated by Parents"
                subtitle="Highly recommended for quality and fun."
                products={parentFavorites}
            />

            <ProductShelf
                id="educational"
                title="Educational Toys"
                subtitle="Toys that make learning fun."
                products={educationalProducts}
                bgClass="bg-card"
            />

            <ProductShelf
                id="outdoor"
                title="Outdoor Adventure Toys"
                subtitle="Get outside and explore!"
                products={outdoorProducts}
            />

            <ProductShelf
                id="new"
                title="New Arrivals"
                subtitle="Fresh finds, just landed."
                products={newArrivals}
                bgClass="bg-card"
            />

            <TrustSection />
            <CustomerReviews />
            <Newsletter />
            <SiteFooter />
        </div>
    );
}
