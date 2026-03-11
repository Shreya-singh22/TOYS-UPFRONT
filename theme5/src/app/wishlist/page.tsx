"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <main style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
            <Navbar />

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Your Favorites</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>The toys you love, all in one happy place.</p>
                    </div>

                    {wishlist.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px" }}>
                            {wishlist.map(product => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0', background: 'white', borderRadius: '30px', border: '1px dashed #ddd' }}>
                            <div style={{ fontSize: '64px', marginBottom: '20px' }}>💝</div>
                            <h2 style={{ marginBottom: '10px' }}>Your wishlist is empty</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Start adding toys you love to see them here!</p>
                            <Link href="/shop" className="btn btn-primary">Discover Toys</Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
