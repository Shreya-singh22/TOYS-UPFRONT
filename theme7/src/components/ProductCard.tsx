'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/toysData';
import { Heart, Star } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={styles.image}
                />
                <button
                    className={`${styles.wishlistBtn} ${isInWishlist(product.id) ? styles.activeWish : ''}`}
                    onClick={handleWishlist}
                >
                    <Heart size={20} fill={isInWishlist(product.id) ? "var(--primary)" : "none"} stroke={isInWishlist(product.id) ? "var(--primary)" : "currentColor"} />
                </button>
                {product.isNew && <span className={styles.badgeNew}>New</span>}
                {product.oldPrice && (
                    <span className={styles.discountBadge}>
                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                    </span>
                )}
            </div>

            <div className={styles.content}>
                <span className={styles.brand}>{product.brand}</span>
                <h3 className={styles.name}>{product.name}</h3>

                <div className={styles.meta}>
                    <div className={styles.priceGroup}>
                        <span className={styles.price}>₹{product.price}</span>
                        {product.oldPrice && <span className={styles.oldPrice}>₹{product.oldPrice}</span>}
                    </div>
                    <div className={styles.rating}>
                        <Star size={16} fill="var(--tertiary)" stroke="var(--tertiary)" />
                        <span className={styles.score}>{product.rating}</span>
                    </div>
                </div>

                <button
                    className={styles.addBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
