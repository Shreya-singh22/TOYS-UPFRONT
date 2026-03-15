import React from 'react';
import Link from 'next/link';
import styles from './CategoryCards.module.css';
import { Brain, Rocket, Bike, Heart } from 'lucide-react';

const categories = [
    { title: 'Educational Toys', icon: <Brain size={40} />, count: '120+ Items', color: '#ff4fd8', href: '/educational' },
    { title: 'STEM Toys', icon: <Rocket size={40} />, count: '85+ Items', color: '#7a5cff', href: '/stem' },
    { title: 'Outdoor Toys', icon: <Bike size={40} />, count: '50+ Items', color: '#00e5ff', href: '/outdoor' },
    { title: 'Plush Toys', icon: <Heart size={40} />, count: '200+ Items', color: '#ffbd3f', href: '/plush' },
];

const CategoryCards = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className="section-title">Shop By Category</h2>
                <div className={styles.grid}>
                    {categories.map((cat, index) => (
                        <Link href={cat.href} key={index} className={styles.card}>
                            <div className={styles.iconWrapper} style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                                {cat.icon}
                            </div>
                            <h3 className={styles.title}>{cat.title}</h3>
                            <p className={styles.count}>{cat.count}</p>
                            <div className={styles.arrow}>→</div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCards;
