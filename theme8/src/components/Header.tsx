'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useStoreContext } from '@/context/store-context';
import { Search, Heart, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
    const { customization } = useStoreContext();
    const { cart, wishlist } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'header' }, '*');
        }
    };

    const logoText = customization?.header?.logoText || "ToyWorld";

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.blurStrip} />
            <header className={styles.header} onClick={handleSectionClick}>
                <div className={`${styles.topRow} container`}>
                    <button className={styles.menuToggle} onClick={toggleMenu}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <div className={styles.logo}>
                        <Link href="/">{logoText}</Link>
                    </div>

                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Search for toys..." />
                        <Search className={styles.searchIcon} size={20} />
                    </div>

                    <div className={styles.actions}>
                        <Link href="/wishlist" className={styles.iconBtn}>
                            <Heart size={24} />
                            {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
                        </Link>
                        <Link href="/checkout" className={styles.iconBtn}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                        </Link>
                    </div>
                </div>

                <div className={`${styles.bottomRow} ${isMenuOpen ? styles.menuOpen : ''}`}>
                    <div className="container">
                        <nav className={styles.nav}>
                            <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link href="/shop" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Shop</Link>
                            <div className={styles.dropdown}>
                                <Link href="/by-age" className={styles.navLink}>
                                    By Age <ChevronDown size={14} />
                                </Link>
                                <div className={styles.dropdownContent}>
                                    <Link href="/age/0-2" onClick={() => setIsMenuOpen(false)}>0-2 Years</Link>
                                    <Link href="/age/3-5" onClick={() => setIsMenuOpen(false)}>3-5 Years</Link>
                                    <Link href="/age/6-8" onClick={() => setIsMenuOpen(false)}>6-8 Years</Link>
                                    <Link href="/age/9+" onClick={() => setIsMenuOpen(false)}>9+ Years</Link>
                                </div>
                            </div>
                            <Link href="/educational" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Educational</Link>
                            <Link href="/outdoor" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Outdoor</Link>
                            <Link href="/new-arrivals" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
                            <Link href="/top-rated" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Top Rated</Link>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
