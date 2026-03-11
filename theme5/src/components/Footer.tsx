"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

export default function Footer() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof window !== "undefined" && window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
        }
    };

    const storeName = customization?.header?.storeName || "PlayNest";
    const description = customization?.footer?.description || "Sparking curiosity and joy through purposeful play. We curate the world's most engaging educational toys for the next generation of thinkers.";
    const socialLinks = customization?.footer?.socialLinks || { facebook: "#", instagram: "#", twitter: "#" };

    return (
        <footer
            onClick={handleSectionClick}
            style={{
                cursor: (typeof window !== "undefined" && window.parent !== window) ? 'pointer' : 'default',
                background: '#2D3436',
                color: 'white',
                padding: '100px 0 40px'
            }}
        >
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', marginBottom: '80px' }}>
                    {/* Brand Info */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--primary)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}>P</div>
                            <span style={{ fontSize: '26px', fontWeight: 'bold', color: 'white' }}>{storeName}</span>
                        </Link>
                        <p style={{ color: '#BDC3C7', marginBottom: '30px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                            {description}
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Link href={socialLinks.facebook} className="social-link"><Facebook size={22} /></Link>
                            <Link href={socialLinks.instagram} className="social-link"><Instagram size={22} /></Link>
                            <Link href={socialLinks.twitter} className="social-link"><Twitter size={22} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '1.3rem', color: 'white' }}>Shop Categories</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><Link href="/shop" className="footer-link">All Products</Link></li>
                            <li><Link href="/learning" className="footer-link">Educational Toys</Link></li>
                            <li><Link href="/stem" className="footer-link">STEM Kits</Link></li>
                            <li><Link href="/creative" className="footer-link">Creative Arts</Link></li>
                            <li><Link href="/outdoor" className="footer-link">Outdoor Adventure</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '1.3rem', color: 'white' }}>Customer Care</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><Link href="/shipping" className="footer-link">Shipping & Delivery</Link></li>
                            <li><Link href="/returns" className="footer-link">Returns & Exchanges</Link></li>
                            <li><Link href="/safety" className="footer-link">Safety Standards</Link></li>
                            <li><Link href="/contact" className="footer-link">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ marginBottom: '30px', fontSize: '1.3rem', color: 'white' }}>The PlayNest Weekly</h4>
                        <p style={{ color: '#BDC3C7', marginBottom: '24px' }}>Join 15,000+ parents. Get play ideas and exclusive early access.</p>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                placeholder="parent@example.com"
                                style={{
                                    width: '100%',
                                    padding: '16px 24px',
                                    borderRadius: '35px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                            <button style={{
                                position: 'absolute',
                                right: '6px',
                                top: '6px',
                                bottom: '6px',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '30px',
                                padding: '0 24px',
                                fontWeight: '700',
                                boxShadow: '0 4px 15px rgba(255, 122, 89, 0.3)'
                            }}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <p style={{ color: '#7F8C8D', fontSize: '0.95rem' }}>© 2024 PlayNest Store. Crafted with ❤️ for curious kids.</p>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <Link href="#" style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Privacy Policy</Link>
                        <Link href="#" style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Terms of Service</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .footer-link {
          color: #BDC3C7;
          transition: all 0.2s;
          display: inline-block;
        }
        .footer-link:hover {
          color: var(--primary);
          transform: translateX(5px);
        }
        .social-link {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #BDC3C7;
        }
        .social-link:hover {
          background: var(--primary);
          transform: translateY(-5px);
          color: white;
        }
      `}</style>
        </footer>
    );
}
