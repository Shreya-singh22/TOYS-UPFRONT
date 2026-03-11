"use client";

import { motion } from "framer-motion";
import { Star, Truck, Lightbulb } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

export default function HeroSection() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
        }
    };

    const headline = customization?.heroSection?.title || "Where Every Play Tells a Story.";
    const subtitle = customization?.heroSection?.subtitle || "Educational, creative and safe toys curated for every developmental stage. Spark curiosity through purposeful play.";
    const heroImage = customization?.heroSection?.image || "/images/lifestyle/hero_child_playing.png";

    return (
        <section
            className="hero-section"
            onClick={handleSectionClick}
            style={{
                cursor: (typeof window !== "undefined" && window.parent !== window) ? 'pointer' : 'default',
                background: 'linear-gradient(180deg, #FFF9F5 0%, #FFFFFF 100%)',
                position: 'relative',
                overflow: 'hidden',
                padding: '60px 0'
            }}>
            {/* Subtle Pattern Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
                backgroundImage: `radial-gradient(var(--primary) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                zIndex: 0
            }} />
            <div className="container hero-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '40px', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 122, 89, 0.1)',
                        padding: '8px 16px',
                        borderRadius: '30px',
                        color: 'var(--primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        marginBottom: '24px'
                    }}>
                        <Star size={16} fill="var(--primary)" />
                        Trusted by 10,000+ Parents
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '4.2rem', lineHeight: '1', fontWeight: '900', color: 'var(--text)', marginBottom: '25px' }}>
                        {headline}
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.35rem', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '550px', fontWeight: '500' }}>
                        {subtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>Shop by Age</button>
                        <button className="btn btn-outline" style={{ padding: '16px 32px' }}>Explore Learning Toys</button>
                    </div>

                    <div style={{ display: 'flex', gap: '40px', marginTop: '60px', opacity: 0.8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', background: 'var(--accent)', borderRadius: '50%', padding: '8px' }}>
                                <Truck size={20} color="#fff" />
                            </div>
                            <span style={{ fontWeight: '600' }}>Free Fast Shipping</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', background: 'var(--secondary)', borderRadius: '50%', padding: '8px' }}>
                                <Star size={20} color="#fff" />
                            </div>
                            <span style={{ fontWeight: '600' }}>4.8 Parent Rating</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                >
                    {/* Main Image */}
                    <div className="hero-image-wrapper" style={{
                        width: '100%',
                        maxWidth: '550px',
                        height: '650px',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <img
                            src={heroImage}
                            alt="Hero Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '40px',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
                            }}
                        />

                        {/* Floating Product Card 1 */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                top: '20%',
                                right: '-40px',
                                background: 'white',
                                padding: '12px',
                                borderRadius: '20px',
                                boxShadow: 'var(--shadow-premium)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '220px'
                            }}
                        >
                            <img src="/images/products/magnetic_blocks.png" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover' }} />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Magnetic Blocks</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>₹1,299</div>
                            </div>
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            style={{
                                position: 'absolute',
                                bottom: '15%',
                                left: '-30px',
                                background: 'var(--accent)',
                                color: 'var(--text)',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: '0.9rem',
                                boxShadow: '0 10px 20px rgba(255, 217, 61, 0.3)',
                                border: '4px solid white'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>BEST</span>
                            <span>SELLER</span>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '110%',
                        background: 'radial-gradient(circle, rgba(255, 122, 89, 0.05) 0%, transparent 70%)',
                        zIndex: 1
                    }} />
                </motion.div>
            </div>

            <style jsx>{`
                @media (max-width: 991px) {
                    .hero-container {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                        gap: 60px !important;
                    }
                    .hero-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .hero-title {
                        font-size: 3rem !important;
                    }
                    .hero-subtitle {
                        font-size: 1rem !important;
                    }
                }
                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 2.2rem !important;
                    }
                    .hero-image-wrapper {
                        transform: scale(0.9);
                    }
                }
        @media (max-width: 992px) {
          .container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          div[style*="justify-content: center"] {
            margin: 0 auto;
          }
          div[style*="max-width: 500px"] {
            max-width: 100%;
          }
          div[style*="justify-content: space-between"] {
            justify-content: center !important;
          }
          div[style*="margin-top: 50px"] {
            justify-content: center;
          }
        }
      `}</style>
        </section>
    );
}
