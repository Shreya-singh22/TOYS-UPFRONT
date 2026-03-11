"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CategoryCardProps {
    title: string;
    icon: string;
    color: string;
    age?: string;
}

export default function CategoryCard({ title, icon, color, age }: CategoryCardProps) {
    const searchParam = age ? `?age=${encodeURIComponent(age)}` : `?category=${encodeURIComponent(title)}`;

    return (
        <Link href={`/shop${searchParam}`} style={{ textDecoration: 'none' }}>
            <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.98 }}
                className="card"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px',
                    cursor: 'pointer',
                    borderLeft: `6px solid ${color}`,
                    transition: 'all 0.3s ease',
                    background: 'white',
                    height: '100%'
                }}
            >
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${color}15`,
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                    {(icon.startsWith('/') || (arguments[0] as any).image) ? (
                        <img
                            src={(arguments[0] as any).image || icon}
                            alt={title}
                            style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                        />
                    ) : (
                        <span style={{ fontSize: '32px' }}>{icon}</span>
                    )}
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text)', fontWeight: '800' }}>{title}</h4>
                    {age && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>{age}</span>}
                </div>
                <div style={{ color: color, fontWeight: '900', fontSize: '1.2rem' }}>→</div>
            </motion.div>
        </Link>
    );
}
