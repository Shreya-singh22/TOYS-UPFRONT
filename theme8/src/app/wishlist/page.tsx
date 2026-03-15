'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star, ExternalLink, MoveRight } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { products as allProducts } from '@/data/toysData';
import styles from './Wishlist.module.css';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, addToCart, clearWishlist } = useCart();

    const handleMoveToCart = (product: any) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    const recommendedProducts = allProducts
        .filter(p => !wishlist.find(wp => wp.id === p.id))
        .slice(0, 4);

    return (
        <div className={`${styles.wishlistPage} container subpage-header-clear`}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={18} /> Back to Shop
                </Link>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title}>
                        Your Wishlist
                        <span className={styles.countBadge}>{wishlist.length}</span>
                    </h1>
                    {wishlist.length > 0 && (
                        <button className={styles.clearBtn} onClick={clearWishlist}>
                            Clear Wishlist
                        </button>
                    )}
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.illustrationWrapper}>
                        <div className={styles.toyIllustration}>🧸</div>
                        <div className={styles.heartPulse}>❤️</div>
                    </div>
                    <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
                    <p className={styles.emptyDesc}>Save toys you love so you can find them later.</p>
                    <Link href="/" className={styles.shopBtn}>Explore Toys</Link>
                </div>
            ) : (
                <div className={styles.wishlistGrid}>
                    {wishlist.map((product) => {
                        const discount = product.oldPrice
                            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                            : null;

                        return (
                            <div key={product.id} className={styles.wishlistCard}>
                                <div className={styles.imageWrapper}>
                                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'contain' }} />
                                    {discount && <span className={styles.discountTag}>{discount}% OFF</span>}
                                    <button
                                        className={styles.removeIconBtn}
                                        onClick={() => removeFromWishlist(product.id)}
                                        title="Remove"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className={styles.cardContent}>
                                    <div className={styles.cardInfo}>
                                        <span className={styles.brand}>{product.brand}</span>
                                        <h3 className={styles.productName}>{product.name}</h3>

                                        <div className={styles.metaRow}>
                                            <div className={styles.rating}>
                                                <Star size={14} fill="var(--tertiary)" stroke="var(--tertiary)" />
                                                <span>{product.rating}</span>
                                            </div>
                                            <div className={styles.priceRow}>
                                                <span className={styles.price}>₹{product.price}</span>
                                                {product.oldPrice && <span className={styles.oldPrice}>₹{product.oldPrice}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button
                                            className={styles.moveToCartBtn}
                                            onClick={() => handleMoveToCart(product)}
                                        >
                                            <MoveRight size={18} /> Move to Cart
                                        </button>
                                        <Link href={`/product/${product.id}`} className={styles.viewBtn}>
                                            <ExternalLink size={18} /> View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <section className={styles.recommendedSection}>
                <h2 className={styles.sectionTitle}>You May Also Like</h2>
                <ProductGrid products={recommendedProducts} />
            </section>
        </div>
    );
}
