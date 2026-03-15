import CategoryPage from '@/components/CategoryPage';
import { products } from '@/data/toysData';

export default function OutdoorPage() {
    const outdoorProducts = products.filter(p => p.category === 'Outdoor');

    return (
        <CategoryPage
            title="Outdoor Adventure"
            description="Fun toys for active kids who love to explore the great outdoors!"
            products={outdoorProducts}
            categorySlug="outdoor"
        />
    );
}
