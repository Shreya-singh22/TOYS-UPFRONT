import CategoryPage from '@/components/CategoryPage';
import { products } from '@/data/toysData';

export default function TopRatedPage() {
    const topRated = products.filter(p => p.isTopRated);

    return (
        <CategoryPage
            title="Top Rated Toys"
            description="The favorites that kids (and parents) love the most!"
            products={topRated}
            categorySlug="top-rated"
        />
    );
}
