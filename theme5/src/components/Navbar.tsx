"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useStoreContext } from "@/contexts/store-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'header' }, '*');
    }
  };

  const storeName = customization?.header?.storeName || "PlayNest";
  const logoText1 = storeName.slice(0, 4);
  const logoText2 = storeName.slice(4);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      onClick={handleSectionClick}
      style={{
        cursor: (typeof window !== "undefined" && window.parent !== window) ? 'pointer' : 'default',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '18px 0'
      }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--primary)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px'
          }}>{logoText1?.[0] || 'P'}</div>
          <span className="nav-logo-text" style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text)', fontFamily: 'var(--font-poppins)' }}>
            {logoText1}<span style={{ color: 'var(--primary)' }}>{logoText2}</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ gap: '35px' }} className="desktop-only">
          <Link href="/shop" className="nav-link">Shop All</Link>
          <Link href="/age" className="nav-link">Shop by Age</Link>
          <Link href="/learning" className="nav-link">Learning Toys</Link>
          <Link href="/blog" className="nav-link">Play Ideas</Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="desktop-only" style={{ flex: 1, maxWidth: '300px', margin: '0 40px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Find the perfect toy..."
              style={{
                width: '100%',
                padding: '10px 15px 10px 40px',
                borderRadius: '30px',
                border: '1px solid rgba(0,0,0,0.1)',
                background: 'rgba(0,0,0,0.02)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button className="icon-btn"><Search size={22} /></button>
          <Link href="/wishlist" className="icon-btn" style={{ position: 'relative' }}>
            <Heart size={22} />
            {mounted && totalWishlistItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--secondary)',
                color: 'white',
                fontSize: '10px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>{totalWishlistItems}</span>
            )}
          </Link>
          <Link href="/cart" className="icon-btn" style={{ position: 'relative' }}>
            <ShoppingCart size={22} />
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'var(--primary)',
              color: 'white',
              fontSize: '10px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>{mounted ? totalItems : 0}</span>
          </Link>
          <button
            className="mobile-only menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ padding: '8px', color: 'var(--text)' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'white',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              padding: '20px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            <Link href="/shop" onClick={() => setIsOpen(false)}>Shop All</Link>
            <Link href="/age" onClick={() => setIsOpen(false)}>Shop by Age</Link>
            <Link href="/learning" onClick={() => setIsOpen(false)}>Learning Toys</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)}>Play Ideas</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          fontWeight: '600';
          color: var(--text);
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover:after {
          width: 100%;
        }
        .icon-btn {
          color: var(--text);
          transition: all 0.2s;
          padding: 8px;
          border-radius: 50%;
        }
        .icon-btn:hover {
          color: var(--primary);
          background: rgba(255, 122, 89, 0.08);
        }
        .desktop-only {
          display: flex;
          align-items: center;
        }
        .mobile-only {
          display: none;
        }
        @media (max-width: 991px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
            align-items: center;
          }
          .icon-btn {
            padding: 4px;
          }
          :global(.container) {
            padding: 0 15px;
          }
        }
        @media (max-width: 600px) {
          .nav-logo-text {
            display: none !important;
          }
        }
      `}</style>
    </nav >
  );
}
