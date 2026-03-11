'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, Truck, ShieldCheck, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { items, totalPrice } = useCart();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success

    const shipping = 5.00;
    const total = totalPrice + shipping;

    if (items.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                </div>
                <h1 className="font-display text-3xl font-black text-slate-900 mb-4">Your cart is empty</h1>
                <Link href="/shop" className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs hover:underline">
                    Go back to shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center gap-4 mb-10">
                    <Link href="/shop" className="p-2 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <h1 className="font-display text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Main Form Area */}
                    <div className="lg:col-span-7 space-y-6">
                        {step === 3 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[3rem] p-12 text-center border border-slate-100 shadow-xl shadow-sky-100/20"
                            >
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h2 className="font-display text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h2>
                                <p className="text-slate-500 font-medium mb-8">
                                    Your eco-friendly toys are being sanitized and packed with care. <br />
                                    We'll send you a tracking link shortly!
                                </p>
                                <Link href="/">
                                    <button className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">
                                        Return Home
                                    </button>
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step === 1 ? 'bg-[#0EA5E9] text-white' : 'bg-emerald-500 text-white'}`}>
                                            {step > 1 ? '✓' : '1'}
                                        </div>
                                        <span className="font-black text-slate-900 tracking-tight">Shipping Information</span>
                                    </div>
                                    {step > 1 && (
                                        <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-[#0EA5E9] tracking-widest">Edit</button>
                                    )}
                                </div>

                                <div className="p-8">
                                    {step === 1 ? (
                                        <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Full Name</label>
                                                <input type="text" required placeholder="John Doe" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Email</label>
                                                <input type="email" required placeholder="john@example.com" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
                                            </div>
                                            <div className="sm:col-span-2 space-y-1.5">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Address</label>
                                                <input type="text" required placeholder="123 Eco Lane" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">City</label>
                                                <input type="text" required placeholder="Toy Town" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Postal Code</label>
                                                <input type="text" required placeholder="123456" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
                                            </div>
                                            <button type="submit" className="sm:col-span-2 h-14 mt-4 bg-[#0EA5E9] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 shadow-lg shadow-sky-100 transition-all">
                                                Continue to Payment
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="font-bold text-slate-800">Review Shipping</p>
                                            <p className="text-sm text-slate-500">John Doe, 123 Eco Lane, Toy Town</p>
                                        </div>
                                    )}
                                </div>

                                <div className={`p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between ${step < 2 ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step === 2 ? 'bg-[#0EA5E9] text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
                                        <span className="font-black text-slate-900 tracking-tight">Payment Details</span>
                                    </div>
                                </div>

                                {step === 2 && (
                                    <div className="p-8 space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl border-2 border-[#0EA5E9] bg-sky-50/50 flex flex-col items-center gap-2">
                                                <CreditCard className="w-6 h-6 text-[#0EA5E9]" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Card</span>
                                            </div>
                                            <div className="p-4 rounded-2xl border-2 border-slate-100 flex flex-col items-center gap-2 opacity-60">
                                                <span className="text-xl">🅿️</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">PayPal</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Card Number</label>
                                                <input type="text" placeholder="**** **** **** 1234" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Expiry</label>
                                                    <input type="text" placeholder="MM/YY" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">CVC</label>
                                                    <input type="text" placeholder="123" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:outline-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep(3)}
                                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-100 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Complete Purchase — ₹{total.toLocaleString('en-IN')}
                                        </button>
                                        <p className="text-center text-[10px] font-bold text-slate-400">Secured with 256-bit SSL encryption</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
                            <h3 className="font-display text-xl font-black text-slate-900 flex items-center gap-2">
                                Your Order Summary
                            </h3>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-50">
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-800 text-sm truncate">{item.product.name}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-[10px] font-black uppercase text-[#0EA5E9] tracking-widest">Qty: {item.quantity}</p>
                                                <p className="font-black text-slate-900 text-sm">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                    <span className="font-bold text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-[#0EA5E9]" />
                                        <span className="text-slate-500 font-medium">Eco Shipping</span>
                                    </div>
                                    <span className="font-bold text-slate-900">₹{shipping.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t-2 border-slate-50">
                                    <span className="font-display text-xl font-black text-slate-900 tracking-tight">Total</span>
                                    <span className="font-display text-2xl font-black text-[#0EA5E9] tracking-tight">₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
                                <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest flex items-center gap-2">
                                    <Recycle className="w-3 h-3" /> Sustainability Impact
                                </p>
                                <p className="text-[11px] font-medium text-sky-800 leading-relaxed">
                                    By choosing pre-loved, you just saved <span className="font-bold underline">2.4kg</span> of plastic waste and <span className="font-bold underline">5,000 liters</span> of water. High five! 🙌
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Recycle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 11V7a5 5 0 0 1 5-5c1.1 0 2.03.35 2.73.94" />
            <path d="M11 22a5 5 0 0 0 5-5v-4" />
            <path d="M15.42 21.06a5 5 0 0 1-8.42-3.06V14" />
            <path d="M17 11l4-4-4-4" />
            <path d="M11 13l4 4-4 4" />
            <path d="M13 7l4 4-4 4" />
        </svg>
    );
}
