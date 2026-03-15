'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, ClipboardList, ShieldCheck, Info } from 'lucide-react';
import styles from './ProductDetails.module.css';
import { Specification, Review } from '@/data/toysData';

interface DetailedInfoProps {
    description: string;
    specifications: Specification[];
    safetyFeatures: string[];
}

export const ProductTabs: React.FC<DetailedInfoProps> = ({ description, specifications, safetyFeatures }) => {
    const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'safety'>('desc');

    const tabs = [
        { id: 'desc', label: 'Description', icon: <Info size={18} /> },
        { id: 'specs', label: 'Specifications', icon: <ClipboardList size={18} /> },
        { id: 'safety', label: 'Safety & Features', icon: <ShieldCheck size={18} /> },
    ] as const;

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabHeader}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'desc' && (
                    <div className={`${styles.contentBox} ${styles.fadeIn}`}>
                        <p className={styles.descText}>{description}</p>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className={`${styles.contentBox} ${styles.fadeIn}`}>
                        <ul className={styles.specList}>
                            {specifications.map((spec, i) => (
                                <li key={i}>
                                    <span className={styles.specLabel}>{spec.label}</span>
                                    <span className={styles.specValue}>{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'safety' && (
                    <div className={`${styles.contentBox} ${styles.fadeIn}`}>
                        <ul className={styles.featureList}>
                            {safetyFeatures.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

interface ReviewsProps {
    reviews: Review[];
}

export const ProductReviews: React.FC<ReviewsProps> = ({ reviews }) => {
    return (
        <div className={styles.reviewsSection}>
            <div className={styles.reviewHeader}>
                <div className={styles.titleWithCount}>
                    <h3 className={styles.boxTitle}>Customer Reviews</h3>
                    <span className={styles.countBadge}>{reviews.length}</span>
                </div>
                <button className={styles.writeBtn}><MessageSquare size={18} /> Write a Review</button>
            </div>
            <div className={styles.reviewList}>
                {reviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewMeta}>
                            <span className={styles.userName}>{review.user}</span>
                            <span className={styles.reviewDate}>{review.date}</span>
                        </div>
                        <div className={styles.reviewStars}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < review.rating ? "var(--tertiary)" : "none"}
                                    stroke={i < review.rating ? "var(--tertiary)" : "#ddd"}
                                />
                            ))}
                        </div>
                        <p className={styles.comment}>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
