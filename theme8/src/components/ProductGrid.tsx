'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/toysData';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
