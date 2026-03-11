"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <main>
                <Navbar />
                <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
                        <h2>Your cart is empty</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Looks like you haven&apos;t added anything to your nest yet.</p>
                        <Link href="/" className="btn btn-primary">Start Shopping</Link>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <section>
                <div className="container">
                    <h2 style={{ marginBottom: '40px' }}>Your Cart</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }} className="cart-grid">
                        {/* Cart Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cart.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    className="card"
                                    style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px' }}
                                >
                                    <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                                        {item.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ marginBottom: '5px' }}>{item.name}</h4>
                                        <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{item.price.toLocaleString('en-IN')}</div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '25px', padding: '5px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ color: '#ff4d4d', padding: '10px' }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontWeight: 'bold', marginTop: '20px' }}>
                                <ArrowLeft size={20} /> Continue Shopping
                            </Link>
                        </div>

                        {/* Summary */}
                        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                            <div className="card" style={{ padding: '30px' }}>
                                <h3 style={{ marginBottom: '25px' }}>Order Summary</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <span>Shipping</span>
                                    <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>FREE</span>
                                </div>
                                <div style={{ borderTop: '1px solid #ddd', margin: '20px 0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total</span>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>

                                <Link href="/checkout">
                                    <button className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                                        Proceed to Checkout
                                    </button>
                                </Link>

                                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '20px' }}>
                                    Shipping & taxes calculated at checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <style jsx>{`
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </main>
    );
}
