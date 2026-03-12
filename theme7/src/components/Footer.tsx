'use client';

import React from 'react';
import Link from 'next/link';
import { useCustomization } from '@/context/CustomizationContext';
import styles from './Footer.module.css';

const Footer = () => {
    const { customization } = useCustomization();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
        }
    };

    const tagline = customization?.footer?.tagline || "Spreading joy and creativity through play since 2024.";

    return (
        <footer className={styles.footer} onClick={handleSectionClick}>
            <div className={`${styles.content} container`}>
                <div className={styles.brand}>
                    <h2 className={styles.logoText}>Toy<span className={styles.logoAccent}>World</span></h2>
                    <p className={styles.tagline}>{tagline}</p>
                    <div className={styles.socials}>
                        <span>FB</span>
                        <span>IG</span>
                        <span>TW</span>
                    </div>
                </div>

                <div className={styles.linksSection}>
                    <div className={styles.column}>
                        <h3>Shop</h3>
                        <ul>
                            <li><Link href="/new-arrivals">New Arrivals</Link></li>
                            <li><Link href="/top-rated">Top Rated</Link></li>
                            <li><Link href="/educational">Educational</Link></li>
                            <li><Link href="/outdoor">Outdoor</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>Company</h3>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>Support</h3>
                        <ul>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/shipping">Shipping</Link></li>
                            <li><Link href="/returns">Returns</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>&copy; 2024 ToyWorld. All rights reserved. Designed with ❤️ for kids.</p>
            </div>
        </footer>
    );
};

export default Footer;
