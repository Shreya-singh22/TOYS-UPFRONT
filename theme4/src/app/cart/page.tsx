"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { items, removeFromCart, totalPrice, totalItems } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="container mx-auto px-4 lg:px-8 py-12">
                <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-foreground mb-8">
                    Your Shopping Cart ({totalItems})
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                        <p className="font-body text-lg text-muted-foreground mb-6">Your cart is empty!</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm">
                                    <div className="relative h-24 w-24 flex-shrink-0 bg-muted rounded-xl overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-display font-bold text-foreground">{item.name}</h3>
                                        <p className="font-body text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        <p className="font-display font-bold text-primary mt-1">₹{item.price * item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 hover:bg-destructive/10 text-destructive rounded-full transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm h-fit">
                            <h2 className="font-display font-bold text-xl mb-6">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-accent font-bold italic">FREE</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-display font-extrabold text-xl text-foreground">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                            <button className="w-full bg-foreground text-card font-display font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <SiteFooter />
        </div>
    );
}
