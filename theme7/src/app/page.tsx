'use client';

import HeroCarousel from '@/components/HeroCarousel';
import ProductGrid from '@/components/ProductGrid';
import TrustBadgesSection from '@/components/TrustBadgesSection';
import BrandGrid from '@/components/BrandGrid';
import { products } from '@/data/toysData';
import styles from './page.module.css';

export default function Home() {
  const newArrivals = products.filter(p => p.isNew);
  const topRated = products.filter(p => p.isTopRated);
  const educational = products.filter(p => p.category === 'Educational');
  const outdoor = products.filter(p => p.category === 'Outdoor');

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  return (
    <div className={styles.home}>
      <HeroCarousel />

      <div className="container" style={{ marginTop: '80px' }}>
        <section className={styles.section} onClick={handleSectionClick('newArrivals')}>
          <h2 className="section-title">New Arrivals</h2>
          <ProductGrid products={newArrivals} />
        </section>

        <section className={styles.section} onClick={handleSectionClick('bestSellers')}>
          <h2 className="section-title">Best Sellers</h2>
          <ProductGrid products={topRated} />
        </section>

        <section className={styles.section} onClick={handleSectionClick('educationalWonders')}>
          <h2 className="section-title">Educational Wonders</h2>
          <ProductGrid products={educational} />
        </section>

        <section className={styles.section} onClick={handleSectionClick('outdoorAdventure')}>
          <h2 className="section-title">Outdoor Adventure</h2>
          <ProductGrid products={outdoor} />
        </section>
      </div>

      <div onClick={handleSectionClick('brandsSection')}>
        <BrandGrid />
      </div>
      <div onClick={handleSectionClick('trustBadges')}>
        <TrustBadgesSection />
      </div>

      <section className={styles.newsletter} onClick={handleSectionClick('newsletter')}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2>Join the ToyWorld Family</h2>
            <p>Subscribe for exclusive deals, new arrival alerts, and parenting tips!</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
