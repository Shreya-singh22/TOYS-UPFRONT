"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
    const { addToCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(5px)'
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            background: 'white',
                            width: '100%',
                            maxWidth: '900px',
                            borderRadius: '30px',
                            position: 'relative',
                            zIndex: 1,
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'white',
                                border: '1px solid #eee',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Product Image */}
                        <div style={{ padding: '40px', background: '#fcfcfc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Product Details */}
                        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ background: 'rgba(255, 122, 89, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>
                                    {product.category}
                                </span>
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{product.name}</h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: '#FFF7ED', padding: '4px 10px', borderRadius: '8px' }}>
                                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#92400E', marginLeft: '6px' }}>{product.rating}</span>
                                </div>
                                <span style={{ color: 'var(--text-muted)' }}>({product.reviews.toLocaleString()} reviews)</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '30px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                                {product.originalPrice && (
                                    <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                                        ₹{product.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                )}
                            </div>

                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '35px' }}>
                                {product.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#555' }}>
                                    <Truck size={18} color="var(--primary)" />
                                    <span>Free Delivery</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#555' }}>
                                    <ShieldCheck size={18} color="var(--primary)" />
                                    <span>7 Day Returns</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '18px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
