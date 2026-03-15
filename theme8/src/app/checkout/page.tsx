'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [isPlaced, setIsPlaced] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 2000 ? 0 : 150;
    const total = subtotal + shipping;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPlaced(true);
        clearCart();
    };

    if (isPlaced) {
        return (
            <div className={`${styles.successPage} container`}>
                <CheckCircle2 size={80} color="#00b894" />
                <h1>Order Placed Successfully!</h1>
                <p>Your toys are being packed with love and will reach you soon.</p>
                <Link href="/" className={styles.homeBtn}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className={`${styles.checkoutPage} container`}>
            <h1 className={styles.title}>Secure Checkout <ShieldCheck size={32} color="var(--primary)" /></h1>

            <div className={styles.layout}>
                {/* Left: Shipping Form */}
                <div className={styles.formSection}>
                    <div className={styles.card}>
                        <h3><CreditCard size={20} /> Shipping Information</h3>
                        <form className={styles.form} onSubmit={handlePlaceOrder}>
                            <div className={styles.formGroup}>
                                <label>Full Name</label>
                                <input type="text" placeholder="Shreya Chauhan" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input type="email" placeholder="shreya@example.com" required />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="+91 9876543210" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Pincode</label>
                                    <input type="text" placeholder="110001" required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Address</label>
                                <textarea placeholder="House No, Street, Locality" rows={3} required></textarea>
                            </div>
                            <button type="submit" className={styles.placeBtn}>Complete Purchase - ₹{total}</button>
                        </form>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className={styles.summarySection}>
                    <div className={styles.card}>
                        <h3><ShoppingBag size={20} /> Order Summary</h3>
                        <div className={styles.itemsList}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <div className={styles.itemThumb}>
                                        <Image src={item.images[0]} alt={item.name} width={50} height={50} style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <span className={styles.itemName}>{item.name} x {item.quantity}</span>
                                        <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                            </div>
                            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                                <span>Total Amount</span>
                                <span>₹{total}</span>
                            </div>
                        </div>

                        <div className={styles.trustBanner}>
                            <ShieldCheck size={18} /> 100% Safe and Secure Payment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
