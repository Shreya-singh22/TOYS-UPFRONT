'use client';

import React from 'react';
import { Star } from 'lucide-react';
import styles from './FiltersSidebar.module.css';

interface FiltersSidebarProps {
    onFilterChange: (filters: any) => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ onFilterChange }) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Price Range</h3>
                <div className={styles.filterOptions}>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="price" value="0-500" />
                        <span>₹0 – ₹500</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="price" value="500-1500" />
                        <span>₹500 – ₹1500</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="price" value="1500+" />
                        <span>₹1500+</span>
                    </label>
                </div>
            </div>

            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Age Group</h3>
                <div className={styles.filterOptions}>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="age" value="0-2" />
                        <span>0–2 years</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="age" value="3-5" />
                        <span>3–5 years</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="age" value="6-8" />
                        <span>6–8 years</span>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="age" value="9+" />
                        <span>9+ years</span>
                    </label>
                </div>
            </div>

            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Rating</h3>
                <div className={styles.filterOptions}>
                    {[4, 3, 2].map((rating) => (
                        <label key={rating} className={styles.checkboxLabel}>
                            <input type="checkbox" name="rating" value={rating.toString()} />
                            <div className={styles.ratingStars}>
                                {rating} <Star size={14} fill="var(--tertiary)" stroke="var(--tertiary)" /> & up
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Availability</h3>
                <div className={styles.filterOptions}>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" name="availability" value="in-stock" />
                        <span>In Stock</span>
                    </label>
                </div>
            </div>
        </aside>
    );
};

export default FiltersSidebar;
