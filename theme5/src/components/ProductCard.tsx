"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products as allProducts } from "@/data/products";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    age: string;
    image: string;
    badge?: string;
    originalPrice?: number;
    tags?: string[];
    isSmall?: boolean;
}

export default function ProductCard({ id, name, price, rating, reviews, age, image, badge, originalPrice, tags, isSmall }: ProductCardProps) {
    const [showQuickView, setShowQuickView] = useState(false);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(id);
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const currentProduct = allProducts.find(p => p.id === id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentProduct) addToCart(currentProduct);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentProduct) toggleWishlist(currentProduct);
    };

    return (
        <>
            <Link href={`/product/${id}`} style={{ height: '100%', display: 'block' }}>
                <motion.div
                    whileHover="hover"
                    initial="initial"
                    variants={{
                        initial: { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
                        hover: { y: -6, boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="card"
                    style={{ padding: '0', overflow: 'hidden', height: '100%', position: 'relative', background: 'white', borderRadius: '24px' }}
                >
                    {/* Image Section */}
                    <div style={{
                        width: '100%',
                        height: isSmall ? '150px' : 'auto',
                        aspectRatio: isSmall ? 'unset' : '1 / 1',
                        background: '#fcfcfc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: isSmall ? '10px' : '20px'
                    }}>
                        {image.startsWith('/') ? (
                            <motion.img
                                src={image}
                                alt={name}
                                variants={{
                                    initial: { scale: 1 },
                                    hover: { scale: 1.1 }
                                }}
                                transition={{ duration: 0.5 }}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                className="product-img"
                            />
                        ) : (
                            <span style={{ fontSize: '64px' }}>{image}</span>
                        )}

                        {/* Discount Badge */}
                        <div style={{
                            position: 'absolute',
                            top: isSmall ? '8px' : '15px',
                            left: isSmall ? '8px' : '15px',
                            background: '#FF4757',
                            color: 'white',
                            padding: isSmall ? '3px 8px' : '6px 12px',
                            borderRadius: '8px',
                            fontSize: isSmall ? '0.65rem' : '0.75rem',
                            fontWeight: '700',
                            zIndex: 2,
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 10px rgba(255, 71, 87, 0.3)'
                        }}>
                            {isSmall ? `-${discount}%` : `🔥 SAVE ${discount}%`}
                        </div>

                        {/* Wishlist Button */}
                        <motion.div
                            whileHover={{ scale: 1.15, backgroundColor: 'white' }}
                            whileTap={{ scale: 0.85 }}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(4px)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                                zIndex: 2,
                                color: isWishlisted ? '#FF4757' : '#999'
                            }}
                            onClick={handleToggleWishlist}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isWishlisted ? 'filled' : 'empty'}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Heart size={20} fill={isWishlisted ? '#FF4757' : 'transparent'} strokeWidth={isWishlisted ? 0 : 2} />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Hover Actions Overlay */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 10 },
                                hover: { opacity: 1, y: 0 }
                            }}
                            style={{
                                position: 'absolute',
                                bottom: '15px',
                                left: '15px',
                                right: '15px',
                                display: 'flex',
                                gap: '10px',
                                zIndex: 3
                            }}
                        >
                            <button style={{
                                flex: 1,
                                backgroundColor: 'white',
                                color: 'var(--text)',
                                border: '1px solid #eee',
                                padding: '12px',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowQuickView(true);
                                }}
                            >
                                <Eye size={16} />
                                Quick View
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    flex: 1,
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 8px 20px rgba(255,122,89,0.4)',
                                    transition: 'background-color 0.2s ease'
                                }}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={16} />
                                Add to Cart
                            </motion.button>
                        </motion.div>

                        {/* Badge Ribbon */}
                        {badge && !discount && (
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: 'var(--secondary)',
                                color: 'white',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: '800',
                                zIndex: 1
                            }}>
                                {badge}
                            </div>
                        )}
                    </div>

                    <div style={{ padding: isSmall ? '12px' : '15px' }}>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: isSmall ? '6px' : '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: isSmall ? '0.6rem' : '0.7rem', fontWeight: '700', color: '#6BCBFF', background: '#F0F9FF', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Ages {age.split(' ')[0]}
                            </span>
                            <span style={{ fontSize: isSmall ? '0.6rem' : '0.7rem', fontWeight: '700', color: '#FF7A59', background: '#FFF7F5', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {tags?.[0] || 'Learning'}
                            </span>
                        </div>

                        <h4 style={{
                            fontSize: isSmall ? '0.9rem' : '1.05rem',
                            marginBottom: '6px',
                            height: isSmall ? '1.2em' : '2.4em',
                            overflow: 'hidden',
                            whiteSpace: isSmall ? 'nowrap' : 'normal',
                            textOverflow: 'ellipsis',
                            color: 'var(--text)',
                            lineHeight: '1.4'
                        }}>
                            {name}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: isSmall ? '8px' : '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#FFF7ED', padding: '2px 6px', borderRadius: '6px' }}>
                                <Star size={isSmall ? 10 : 14} fill="#F59E0B" color="#F59E0B" />
                                <span style={{ fontSize: isSmall ? '0.75rem' : '0.9rem', fontWeight: '700', color: '#92400E', marginLeft: '3px' }}>{rating}</span>
                            </div>
                            <div style={{ width: '1px', height: '12px', background: '#ddd' }} />
                            <span style={{ fontSize: isSmall ? '0.75rem' : '0.85rem', color: 'var(--text-muted)' }}>
                                {reviews > 1000 ? `${(reviews / 1000).toFixed(1)}k` : reviews} reviews
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: isSmall ? '1.1rem' : '1.3rem', fontWeight: '900', color: 'var(--primary)' }}>
                                ₹{price.toLocaleString('en-IN')}
                            </span>
                            {originalPrice && (
                                <span style={{ fontSize: isSmall ? '0.8rem' : '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                                    ₹{originalPrice.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </Link>
            {currentProduct && (
                <QuickViewModal
                    isOpen={showQuickView}
                    onClose={() => setShowQuickView(false)}
                    product={currentProduct}
                />
            )}
        </>
    );
}
