"use client";

import SiteHeader from "@/components/SiteHeader";
import ShopByAge from "@/components/ShopByAge";
import SiteFooter from "@/components/SiteFooter";
import Newsletter from "@/components/Newsletter";

export default function AgePage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="pt-8">
                <ShopByAge />
                <Newsletter />
            </main>
            <SiteFooter />
        </div>
    );
}
