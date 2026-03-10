import SiteHeader from "@/components/SiteHeader";
import ProductList from "@/components/ProductList";
import SiteFooter from "@/components/SiteFooter";
import { newArrivals } from "@/data/products";

export default function NewArrivalsPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="pb-16">
                <ProductList
                    title="New Arrivals"
                    categoryName="New"
                    products={newArrivals}
                />
            </main>
            <SiteFooter />
        </div>
    );
}
