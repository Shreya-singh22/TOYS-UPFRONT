import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import styles from './TrustBadgesSection.module.css';

const badges = [
    { icon: <Truck size={32} />, title: 'Free Delivery', desc: 'On all orders above ₹999' },
    { icon: <RefreshCw size={32} />, title: 'Easy Returns', desc: '7 days return policy' },
    { icon: <ShieldCheck size={32} />, title: 'Safe Toys', desc: '100% Non-toxic materials' },
    { icon: <Heart size={32} />, title: 'Trusted by Parents', desc: 'Over 10k happy families' },
];

const TrustBadgesSection = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {badges.map((badge, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>{badge.icon}</div>
                            <div className={styles.textWrapper}>
                                <h3 className={styles.title}>{badge.title}</h3>
                                <p className={styles.desc}>{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadgesSection;
