import React from 'react';
import styles from './BrandGrid.module.css';

const brands = [
    'LEGO',
    'Fisher-Price',
    'Mattel',
    'Hot Wheels',
    'Hasbro',
    'Nerf'
];

const BrandGrid = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Brands We Love</h2>
                <div className={styles.grid}>
                    {brands.map((brand, index) => (
                        <div key={index} className={styles.brandCard}>
                            <span className={styles.brandName}>{brand}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandGrid;
