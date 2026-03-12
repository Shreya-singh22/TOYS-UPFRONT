'use client';

import CategoryPage from '@/components/CategoryPage';
import { products } from '@/data/toysData';
import { use } from 'react';

export default function AgeGroupPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    const ageGroupProducts = products.filter(p => p.ageGroup === slug);
    const titles: Record<string, string> = {
        '0-2': 'Toys for Ages 0-2',
        '3-5': 'Toys for Ages 3-5',
        '6-8': 'Toys for Ages 6-8',
        '9+': 'Toys for Ages 9+',
    };

    return (
        <CategoryPage
            title={titles[slug] || 'Age Specific Toys'}
            description={`Find the perfect playmates for ${slug} year olds!`}
            products={ageGroupProducts}
            categorySlug={`age/${slug}`}
        />
    );
}
