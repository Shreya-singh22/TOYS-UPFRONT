'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/toysData';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

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
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    priority={product.id <= 4}
                />
                <div className={styles.quickActions}>
                    <button
                        className={styles.actionBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        <ShoppingCart size={18} />
                    </button>
                    <button className={styles.actionBtn}>
                        <Eye size={18} />
                    </button>
                    <button
                        className={`${styles.actionBtn} ${isInWishlist(product.id) ? styles.activeWish : ''}`}
                        onClick={handleWishlist}
                    >
                        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                </div>
                {product.isNew && <span className={styles.badgeNew}>New</span>}
                {product.oldPrice && (
                    <span className={styles.discountBadge}>
                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.brand}>{product.brand}</span>
                    <div className={styles.rating}>
                        <Star size={12} fill="var(--tertiary)" stroke="var(--tertiary)" />
                        <span className={styles.score}>{product.rating}</span>
                    </div>
                </div>
                <h3 className={styles.name}>{product.name}</h3>
                <span className={styles.category}>{product.category}</span>

                <div className={styles.footer}>
                    <div className={styles.priceGroup}>
                        <span className={styles.price}>₹{product.price}</span>
                        {product.oldPrice && <span className={styles.oldPrice}>₹{product.oldPrice}</span>}
                    </div>
                    <button
                        className={styles.addBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
