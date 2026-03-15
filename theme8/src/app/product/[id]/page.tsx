'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { products } from '@/data/toysData';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchaseActions from '@/components/ProductPurchaseActions';
import { ProductTabs, ProductReviews } from '@/components/ProductDetails';
import TrustBadges from '@/components/TrustBadges';
import ProductGrid from '@/components/ProductGrid';
import { Star, ChevronRight, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './ProductPage.module.css';

export default function ProductPage() {
    const { id } = useParams() as { id: string };
    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);
    const { addToCart } = useCart();
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!product) {
        notFound();
    }

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className={`${styles.pdp} container subpage-header-clear`}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumb}>
                <Link href="/" className={styles.crumbLink}>Home</Link>
                <ChevronRight size={14} className={styles.crumbSep} />
                <span className={styles.crumbText}>{product.category}</span>
                <ChevronRight size={14} className={styles.crumbSep} />
                <span className={styles.activeCrumb}>{product.name}</span>
            </nav>

            <div className={styles.mainSection}>
                {/* Left: Gallery */}
                <div className={styles.leftCol}>
                    <ProductGallery images={product.images} />
                </div>

                {/* Right: Info */}
                <div className={styles.rightCol}>
                    <div className={styles.infoHead}>
                        <span className={styles.brandName}>{product.brand}</span>
                        <h1 className={styles.productTitle}>{product.name}</h1>

                        <div className={styles.ratingBar}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < Math.floor(product.rating) ? "var(--tertiary)" : "none"}
                                        stroke={i < Math.floor(product.rating) ? "var(--tertiary)" : "#ddd"}
                                    />
                                ))}
                            </div>
                            <span className={styles.reviewSummary}>
                                {product.rating} ({product.reviewCount} customer reviews)
                            </span>
                        </div>
                    </div>

                    <div className={styles.priceSection}>
                        <div className={styles.priceContainer}>
                            <span className={styles.currentPrice}>₹{product.price}</span>
                            {product.oldPrice && (
                                <>
                                    <span className={styles.oldPrice}>₹{product.oldPrice}</span>
                                    <span className={styles.discountBadge}>
                                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <div className={`${styles.stockIndicator} ${styles[product.stockStatus.replace(' ', '').toLowerCase()]}`}>
                            <div className={styles.dot}></div>
                            {product.stockStatus} {product.stockCount && `(Only ${product.stockCount} left!)`}
                        </div>
                    </div>

                    <p className={styles.shortDesc}>{product.description}</p>

                    <ProductPurchaseActions product={product} />

                    <div className={styles.featuresChecklist}>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={16} /> <span>Safe for kids</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={16} /> <span>BPA free material</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={16} /> <span>Durable & Long-lasting</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={16} /> <span>2 Year Warranty</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={16} /> <span>Free Express Delivery</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={16} /> <span>30-Day Easy Returns</span>
                        </div>
                    </div>

                    <TrustBadges />
                </div>
            </div>

            {/* Tabs Section */}
            <ProductTabs
                description={product.description}
                specifications={product.specifications}
                safetyFeatures={product.safetyFeatures}
            />

            {/* Reviews */}
            <ProductReviews reviews={product.reviews} />

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className={styles.relatedHeader}>
                        <h2 className="section-title">You May Also Like</h2>
                        <div className={styles.sectionLine}></div>
                    </div>
                    <ProductGrid products={relatedProducts} />
                </section>
            )}

            {/* Sticky Add to Cart */}
            <div className={`${styles.stickyBar} ${showSticky ? styles.stickyVisible : ''}`}>
                <div className="container">
                    <div className={styles.stickyContent}>
                        <div className={styles.stickyInfo}>
                            <img src={product.images[0]} alt={product.name} className={styles.stickyThumb} />
                            <div>
                                <h4 className={styles.stickyTitle}>{product.name}</h4>
                                <span className={styles.stickyPrice}>₹{product.price}</span>
                            </div>
                        </div>
                        <button className={styles.stickyBtn} onClick={() => addToCart(product)}>
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
