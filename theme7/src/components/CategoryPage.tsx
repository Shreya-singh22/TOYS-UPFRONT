'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductGrid from './ProductGrid';
import FiltersSidebar from './FiltersSidebar';
import BrandGrid from './BrandGrid';
import TrustBadgesSection from './TrustBadgesSection';
import { ChevronRight, Grid, List, Search } from 'lucide-react';
import styles from './CategoryPage.module.css';

interface CategoryPageProps {
    title: string;
    description: string;
    products: any[];
    categorySlug: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, description, products, categorySlug }) => {
    const [sortBy, setSortBy] = useState('popularity');

    return (
        <div className={styles.categoryPage}>
            <div className={styles.banner}>
                <div className="container">
                    <div className={styles.bannerContent}>
                        <h1 className={styles.pageTitle}>{title}</h1>
                        <p className={styles.pageDesc}>{description}</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <nav className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={16} />
                    {categorySlug === 'shop' ? (
                        <span className={styles.activeCrumb}>All Products</span>
                    ) : (
                        <>
                            <Link href="/shop">Shop</Link>
                            <ChevronRight size={16} />
                            <span className={styles.activeCrumb}>{title}</span>
                        </>
                    )}
                </nav>

                <div className={styles.mainContent}>
                    <div className={styles.toolbar}>
                        <div className={styles.resultCount}>
                            Showing <span>{products.length}</span> toys
                        </div>
                        <div className={styles.sorting}>
                            <label>Sort by:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="popularity">Popularity</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.layout}>
                        <FiltersSidebar onFilterChange={() => { }} />

                        <div className={styles.gridWrapper}>
                            {products.length > 0 ? (
                                <ProductGrid products={products} />
                            ) : (
                                <div className={styles.noResults}>
                                    <Search size={64} opacity={0.2} />
                                    <h2>No toys found in this category</h2>
                                    <p>Try adjusting your filters or browse our other sections.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className={styles.pagination}>
                                <button className={styles.pageBtn} disabled>&lt;</button>
                                <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
                                <button className={styles.pageBtn}>2</button>
                                <button className={styles.pageBtn}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>

                <section className={styles.recommended}>
                    <h2 className={styles.sectionTitle}>You May Also Like</h2>
                    <BrandGrid />
                </section>
            </div>

            <TrustBadgesSection />
        </div>
    );
};

export default CategoryPage;
