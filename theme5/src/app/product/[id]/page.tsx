"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Star, ShieldCheck, Truck, RotateCcw, Brain, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const product = products.find((p) => p.id === params.id);
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState("description");

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <main style={{ backgroundColor: '#fff' }}>
            <Navbar />
            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    {/* Breadcrumbs */}
                    <nav style={{ marginBottom: '30px', display: 'flex', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span style={{ color: 'var(--text)', fontWeight: '600' }}>{product.name}</span>
                    </nav>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }} className="pdp-grid">
                        {/* Gallery */}
                        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    aspectRatio: '1.1/1',
                                    background: '#F8F9FA',
                                    borderRadius: '40px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                    border: '1px solid #EEF2F6'
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <button style={{ position: 'absolute', top: '24px', right: '24px', background: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}>
                                    <Heart size={22} color="var(--primary)" />
                                </button>

                                {/* Badge */}
                                <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '12px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700', fontSize: '0.9rem' }}>
                                    <ShieldCheck size={18} color="#2ecc71" />
                                    <span>Certified Safe</span>
                                </div>
                            </motion.div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
                                {(product.images || [product.image]).map((img, i) => (
                                    <div key={i} style={{
                                        aspectRatio: '1/1',
                                        background: '#F8F9FA',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: i === 0 ? '2.5px solid var(--primary)' : '1px solid #EEF2F6',
                                        opacity: i === 0 ? 1 : 0.7
                                    }}>
                                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: '10px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <span style={{ background: 'rgba(255, 122, 89, 0.1)', color: 'var(--primary)', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    {product.category}
                                </span>
                                <span style={{ background: '#F1F5F9', color: '#64748B', padding: '6px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '800' }}>
                                    Age: {product.age}
                                </span>
                            </div>

                            <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', lineHeight: '1.1', fontWeight: '800' }}>{product.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '35px' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "var(--accent)" : "none"} color="var(--accent)" />)}
                                </div>
                                <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>{product.rating} <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>({product.reviews} Parents approved)</span></span>
                            </div>

                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '35px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                ₹{product.price.toLocaleString('en-IN')}
                                <span style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: '500', textDecoration: 'line-through' }}>₹{(product.price * 1.25).toFixed(0)}</span>
                            </div>

                            <p style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#475569', marginBottom: '45px' }}>
                                {product.description}
                            </p>

                            <div style={{ marginBottom: '45px' }}>
                                <h4 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: '800' }}>Skills Sparked:</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                    {product.skills.map(skill => (
                                        <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '0.95rem', fontWeight: '600', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid #EEF2F6' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>
                                <button
                                    onClick={handleAddToCart}
                                    className="btn btn-primary"
                                    style={{ flex: 1, padding: '22px', fontSize: '1.1rem', borderRadius: '20px' }}
                                >
                                    Add to Cart
                                </button>
                                <button className="btn btn-outline" style={{ width: '68px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
                                    <Share2 size={24} />
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '30px', background: '#F8F9FA', borderRadius: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                                    <Truck size={24} color="var(--primary)" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Free Fast Shipping</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                                    <RotateCcw size={24} color="var(--primary)" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>30-Day Returns</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                                    <ShieldCheck size={24} color="var(--primary)" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Premium Quality</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs / Rich Info */}
                    <div style={{ marginTop: '100px' }}>
                        <div style={{ display: 'flex', gap: '50px', borderBottom: '2px solid #F1F5F9', marginBottom: '40px' }}>
                            {['Description', 'Specifications', 'Play Benefits'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    style={{
                                        padding: '20px 0',
                                        fontSize: '1.2rem',
                                        fontWeight: '800',
                                        color: activeTab === tab.toLowerCase() ? 'var(--primary)' : '#94A3B8',
                                        borderBottom: activeTab === tab.toLowerCase() ? '4px solid var(--primary)' : 'none',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div style={{ background: '#FDFDFD', padding: '40px', borderRadius: '40px', border: '1px solid #F1F5F9' }}>
                            {activeTab === 'description' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ lineHeight: '1.8', fontSize: '1.15rem', color: '#475569' }}>
                                    <h3 style={{ marginBottom: '20px', color: 'var(--text)' }}>Why every child loves it:</h3>
                                    <p>{product.longDescription || product.description}</p>
                                    <p style={{ marginTop: '20px' }}>Designed to foster a curiosity-driven childhood, this toy is more than just an item—it's an investment in your child's developmental journey.</p>
                                </motion.div>
                            )}
                            {activeTab === 'specifications' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                                            <div key={key} style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid #EEF2F6' }}>
                                                <div style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '5px', fontWeight: '600' }}>{key}</div>
                                                <div style={{ fontWeight: '800', color: 'var(--text)' }}>{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === 'benefits' && <div>Educational Benefits details...</div>}
                        </div>
                    </div>

                    {/* Related Products Mock */}
                    <div style={{ marginTop: '100px' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '40px' }}>You Might Also Love</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                                <div key={p.id}>
                                    <Link href={`/product/${p.id}`}>
                                        <div style={{ aspectRatio: '1/1', background: '#F8F9FA', borderRadius: '30px', overflow: 'hidden', marginBottom: '20px' }}>
                                            <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </Link>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{p.name}</h4>
                                    <div style={{ fontWeight: '800', color: 'var(--primary)' }}>₹{p.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            <style jsx>{`
        @media (max-width: 1024px) {
          .pdp-grid {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
        </main>
    );
}
