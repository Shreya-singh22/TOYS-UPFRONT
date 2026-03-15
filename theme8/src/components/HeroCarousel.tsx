'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { bannerImages } from '@/data/toysData';
import { useStoreContext } from '@/context/store-context';
import styles from './HeroCarousel.module.css';

const HeroCarousel = () => {
    const { customization } = useStoreContext();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    return (
        <section className={styles.hero} onClick={handleSectionClick}>
            <div className={styles.carousel}>
                {bannerImages.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === current ? styles.active : ''}`}
                    >
                        <Image
                            src={img}
                            alt={`Banner ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                        />
                        <div className={styles.overlay}>
                            <div className={`${styles.content} container`}>
                                <h1 className={styles.title}>
                                    {index === 0 && (customization?.heroSection?.title || 'Play, Learn & Grow!')}
                                    {index === 1 && (customization?.heroSection?.title2 || 'Adventure Awaits!')}
                                    {index === 2 && (customization?.heroSection?.title3 || 'New Wonders Weekly!')}
                                </h1>
                                <p className={styles.subtitle}>
                                    {index === 0 && (customization?.heroSection?.subtitle || 'Discover the best educational toys for your little ones.')}
                                    {index === 1 && (customization?.heroSection?.subtitle2 || 'Gear up for the best outdoor fun this season.')}
                                    {index === 2 && (customization?.heroSection?.subtitle3 || 'Check out our latest arrivals and top-rated picks.')}
                                </p>
                                <button className={styles.cta}>
                                    {customization?.heroSection?.buttonText || 'Shop Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.indicators}>
                {bannerImages.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;
