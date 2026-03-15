import CategoryPage from '@/components/CategoryPage';
import { products } from '@/data/toysData';

export default function ShopPage() {
    return (
        <CategoryPage
            title="Our Toy Shop"
            description="Discover our full collection of magical toys for every child!"
            products={products}
            categorySlug="shop"
        />
    );
}
