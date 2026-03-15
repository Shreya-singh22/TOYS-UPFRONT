import CategoryPage from '@/components/CategoryPage';
import { products } from '@/data/toysData';

export default function EducationalPage() {
    const educationalProducts = products.filter(p => p.category === 'Educational');

    return (
        <CategoryPage
            title="Educational Wonders"
            description="Ignite curiosity and learning with our STEM and brain-building toys!"
            products={educationalProducts}
            categorySlug="educational"
        />
    );
}
