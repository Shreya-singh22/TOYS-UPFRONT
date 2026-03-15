'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/toysData';
import { ShoppingCart, Heart, Plus, Minus, Zap } from 'lucide-react';
import styles from './ProductPurchaseActions.module.css';

interface Props {
    product: Product;
}

const ProductPurchaseActions: React.FC<Props> = ({ product }) => {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className={styles.actions}>
            <div className={styles.quantityWrapper}>
                <span className={styles.label}>Quantity</span>
                <div className={styles.selector}>
                    <button onClick={decrement} className={styles.qBtn}><Minus size={16} /></button>
                    <span className={styles.count}>{quantity}</span>
                    <button onClick={increment} className={styles.qBtn}><Plus size={16} /></button>
                </div>
            </div>

            <div className={styles.btnGroup}>
                <button
                    className={styles.cartBtn}
                    onClick={() => {
                        for (let i = 0; i < quantity; i++) addToCart(product);
                    }}
                >
                    <ShoppingCart size={20} /> Add to Cart
                </button>
                <button className={styles.buyBtn}>
                    <Zap size={20} /> Buy Now
                </button>
                <button
                    className={`${styles.wishBtn} ${isInWishlist(product.id) ? styles.activeWish : ''}`}
                    onClick={handleWishlist}
                >
                    <Heart size={24} fill={isInWishlist(product.id) ? "var(--primary)" : "none"} />
                </button>
            </div>
        </div>
    );
};

export default ProductPurchaseActions;
