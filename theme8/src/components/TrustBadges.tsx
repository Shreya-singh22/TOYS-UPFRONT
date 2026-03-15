import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Lock } from 'lucide-react';
import styles from './TrustBadges.module.css';

const TrustBadges = () => {
    const badges = [
        { icon: <Truck size={24} />, title: 'Free Delivery', color: '#7AF5FF' },
        { icon: <RefreshCw size={24} />, title: '7 Day Returns', color: '#FF7EB9' },
        { icon: <ShieldCheck size={24} />, title: '1 Year Warranty', color: '#FFE66D' },
        { icon: <Lock size={24} />, title: 'Secure Payment', color: '#80FFDB' },
    ];

    return (
        <div className={styles.container}>
            {badges.map((badge, index) => (
                <div key={index} className={styles.badge} style={{ '--badge-bg': badge.color } as any}>
                    <div className={styles.iconWrapper}>
                        {badge.icon}
                    </div>
                    <span className={styles.title}>{badge.title}</span>
                </div>
            ))}
        </div>
    );
};

export default TrustBadges;
