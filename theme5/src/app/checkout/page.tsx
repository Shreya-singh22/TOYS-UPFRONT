"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, Home } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);

    const nextStep = () => {
        if (step === 3) {
            handleComplete();
        } else {
            setStep(step + 1);
        }
    };

    const handleComplete = () => {
        setIsSuccess(true);
        clearCart();
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF7A59', '#6BCBFF', '#FFD93D']
        });
    };

    if (isSuccess) {
        return (
            <main>
                <Navbar />
                <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 10 }}
                            style={{ fontSize: '100px', marginBottom: '30px' }}
                        >
                            🎉
                        </motion.div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Order Success!</h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
                            Thank you for shopping at PlayNest. Your toys are being prepared for adventure!
                        </p>
                        <Link href="/" className="btn btn-primary">Go Back Home</Link>
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
                <div className="container" style={{ maxWidth: '800px' }}>
                    {/* Progress Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '24px', left: '0', right: '0', height: '2px', background: '#ddd', zIndex: -1 }}></div>
                        <div style={{ position: 'absolute', top: '24px', left: '0', width: `${(step - 1) * 50}%`, height: '2px', background: 'var(--primary)', zIndex: -1, transition: 'width 0.3s ease' }}></div>

                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: step >= i ? 'var(--primary)' : 'white',
                                    color: step >= i ? 'white' : '#999',
                                    border: step >= i ? 'none' : '2px solid #ddd',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {step > i ? <CheckCircle2 size={24} /> : i}
                                </div>
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: step >= i ? 'var(--text)' : '#999' }}>
                                    {i === 1 ? 'Shipping' : i === 2 ? 'Payment' : 'Review'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ padding: '40px' }}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 style={{ marginBottom: '30px' }}><Home size={24} style={{ marginRight: '10px', verticalAlign: 'bottom' }} /> Shipping Details</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div className="input-field">
                                            <label>First Name</label>
                                            <input type="text" placeholder="First Name" />
                                        </div>
                                        <div className="input-field">
                                            <label>Last Name</label>
                                            <input type="text" placeholder="Last Name" />
                                        </div>
                                        <div className="input-field" style={{ gridColumn: 'span 2' }}>
                                            <label>Address</label>
                                            <input type="text" placeholder="Street address" />
                                        </div>
                                        <div className="input-field">
                                            <label>City</label>
                                            <input type="text" placeholder="City" />
                                        </div>
                                        <div className="input-field">
                                            <label>Pincode</label>
                                            <input type="text" placeholder="123456" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 style={{ marginBottom: '30px' }}><CreditCard size={24} style={{ marginRight: '10px', verticalAlign: 'bottom' }} /> Payment Method</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {['UPI', 'Credit/Debit Card', 'Cash on Delivery'].map(method => (
                                            <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '15px', cursor: 'pointer' }}>
                                                <input type="radio" name="payment" defaultChecked={method === 'UPI'} />
                                                <span style={{ fontWeight: 'bold' }}>{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 style={{ marginBottom: '30px' }}><CheckCircle2 size={24} style={{ marginRight: '10px', verticalAlign: 'bottom' }} /> Review Order</h3>
                                    <div style={{ marginBottom: '30px' }}>
                                        {cart.map(item => (
                                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span>{item.name} x {item.quantity}</span>
                                                <span style={{ fontWeight: 'bold' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ borderTop: '2px dashed #ddd', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total Amount</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                            {step > 1 && (
                                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</button>
                            )}
                            <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep}>
                                {step === 3 ? 'Place Order' : 'Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <style jsx>{`
        .input-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-field label {
          font-weight: bold;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .input-field input {
          padding: 12px 15px;
          border: 1px solid #ddd;
          borderRadius: 10px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field input:focus {
          border-color: var(--primary);
        }
      `}</style>
        </main>
    );
}
