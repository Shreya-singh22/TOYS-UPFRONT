import CategoryPage from '@/components/CategoryPage';
import { products } from '@/data/toysData';

export default function NewArrivalsPage() {
    const newArrivals = products.filter(p => p.isNew);

    return (
        <CategoryPage
            title="New Arrivals"
            description="Be the first to play! Check out our latest and greatest toy additions."
            products={newArrivals}
            categorySlug="new-arrivals"
        />
    );
}
