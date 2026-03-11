"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products, categories, ageCategories, testimonials, blogPosts } from "@/data/products";
import { Brain, Palette, Users, Wrench, Star } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

export default function Home() {
  const { customization } = useStoreContext();

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const isEditor = typeof window !== "undefined" && window.parent !== window;
  const sectionStyle = { cursor: isEditor ? 'pointer' : 'default' };

  // Dynamic Data
  const bestSellersTitle = customization?.bestSellers?.title || "Best Selling Toys";
  const trendingTitle = customization?.trending?.title || "Trending Now 🔥";
  const philosophyTitle = customization?.philosophy?.title || "Learning Should Be Adventure";
  const philosophyBody = customization?.philosophy?.text || "We believe every toy is a tool for discovery. Our collection is designed by educational experts to develop critical motor skills and curiosity through the joy of play.";
  const testimonialsTitle = customization?.testimonials?.title || "From the Parents";
  const benefits = [
    { title: "Cognitive Skills", icon: <Brain size={40} />, color: "#FF7A59", text: "Enhance brain development and thinking abilities through strategic play." },
    { title: "Creativity", icon: <Palette size={40} />, color: "#6BCBFF", text: "Spark imagination and artistic expression with our creative toolkits." },
    { title: "Social Skills", icon: <Users size={40} />, color: "#FFD93D", text: "Encourage teamwork and communication through interactive games." },
    { title: "Problem Solving", icon: <Wrench size={40} />, color: "#FF7A59", text: "Develop critical thinking and logic with challenging puzzles." }
  ];

  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* Trust Bar */}
      <section
        onClick={handleSectionClick('trustBar')}
        style={{ ...sectionStyle, padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'white' }}
      >
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            textAlign: 'center'
          }}>
            {[
              { icon: <Users />, title: "10,000+", text: "Happy Parents" },
              { icon: <Brain />, title: "Montessori", text: "Approved Toys" },
              { icon: <Palette />, title: "Child-Safe", text: "Non-Toxic Materials" },
              { icon: <Wrench />, title: "Free Returns", text: "7-Day Policy" }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '150px' }}>
                <div style={{ color: 'var(--primary)', background: 'rgba(255, 122, 89, 0.1)', padding: '10px', borderRadius: '12px' }}>
                  {React.cloneElement(item.icon as any, { size: 20 })}
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500' }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Age */}
      <section
        onClick={handleSectionClick('ageSection')}
        style={{ ...sectionStyle, backgroundColor: '#fdfbf7', position: 'relative', overflow: 'hidden' }}
      >
        <div className="bg-toy-box" style={{ opacity: 0.03 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-title">
            <h2>Shop by Age</h2>
            <p>Expertly curated toys for every developmental milestone</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {ageCategories.map((cat, i) => (
              <CategoryCard key={i} {...cat} />
            ))}
          </div>
        </div>

        {/* Bottom Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', lineHeight: 0, transform: 'rotate(180deg)' }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '40px', fill: 'white' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Best Sellers */}
      <section
        onClick={handleSectionClick('bestSellers')}
        style={{ ...sectionStyle, backgroundColor: 'white', position: 'relative' }}
      >
        <div className="container">
          <div className="section-title">
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '10px' }}>Top Picks</div>
            <h2>{bestSellersTitle}</h2>
            <p>Our community's most loved and highly-rated products</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {products.filter(p => p.featured).slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/shop">
              <button className="btn btn-primary" style={{ padding: '16px 48px' }}>Explore All Products</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section style={{ backgroundColor: '#fff5f2', position: 'relative', overflow: 'hidden', padding: '40px 0' }}>
        <div className="squiggle-pattern" style={{ opacity: 0.05 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
            <div>
              <div style={{ color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '20%', fontSize: '0.8rem', marginBottom: '8px' }}>Don't Miss Out</div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{trendingTitle}</h2>
            </div>
            <Link href="/shop" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none', marginBottom: '8px' }}>View All →</Link>
          </div>

          <div
            className="horizontal-scroll"
            style={{
              display: 'flex',
              gap: '30px',
              overflowX: 'auto',
              padding: '20px 0 60px',
              scrollPaddingLeft: '20px',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {products.filter(p => p.trending).map((product) => (
              <div key={product.id} style={{ minWidth: '200px', flexShrink: 0, scrollSnapAlign: 'start' }}>
                <ProductCard {...product} isSmall={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Through Play Feature */}
      <section style={{ padding: '0', overflow: 'hidden', backgroundColor: '#fdfbf7' }}>
        {/* Top Wave */}
        <div style={{ width: '100%', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '40px', fill: 'white' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
        <div className="container responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', gap: '40px', padding: '60px 0 100px' }}>
          <div style={{ padding: '40px 60px 40px 0' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '15px' }}>Our Philosophy</div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '30px', lineHeight: '1.1', fontWeight: '900' }}>{philosophyTitle}</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '45px', lineHeight: '1.8', maxWidth: '500px' }}>
              {philosophyBody}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              {benefits.slice(0, 4).map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '15px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  <div style={{ color: b.color === '#FF7A59' ? 'var(--primary)' : 'var(--secondary)', flexShrink: 0 }}>
                    {/* Size down the benefit icons for density */}
                    {React.cloneElement(b.icon as any, { size: 24 })}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{b.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: '600px', position: 'relative' }}>
            <img
              src="/images/lifestyle/kids_playing.png"
              alt="Kids playing"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '40px' }}
            />
            {/* Float badge */}
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'white', padding: '25px', borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '15px', maxWidth: '250px' }}>
              <div style={{ background: 'var(--primary)', color: 'white', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✨</div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Expert Approved</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Montessori methodology focused</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        onClick={handleSectionClick('testimonials')}
        style={{ ...sectionStyle, backgroundColor: 'white' }}
      >
        <div className="container">
          <div className="section-title">
            <h2>{testimonialsTitle}</h2>
            <p>Trusted by a community of over 10,000 happy families</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{
                padding: '40px',
                position: 'relative',
                backgroundColor: i % 2 === 0 ? '#FFF7F3' : '#F7F9FF',
                border: 'none',
                borderRadius: '32px'
              }}>
                <div style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '100px', opacity: 0.1, color: 'var(--primary)', fontFamily: 'serif', lineHeight: 1 }}>"</div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '25px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FDCB6E" color="#FDCB6E" />)}
                </div>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '35px', color: 'var(--text)', fontWeight: '500', fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', padding: '2px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', overflow: 'hidden', padding: '2px' }}>
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '800', background: 'rgba(255, 122, 89, 0.1)' }}>
                        {t.author[0]}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>{t.author}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t.location} — Verified Parent</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section
        onClick={handleSectionClick('newsletter')}
        style={{ ...sectionStyle, padding: '40px 0', background: 'white' }}
      >
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #FF9070 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            padding: '80px 40px',
            borderRadius: '40px',
            boxShadow: '0 20px 50px rgba(255, 122, 89, 0.3)'
          }}>
            <div className="bg-toy-box" style={{ opacity: 0.1 }}></div>
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>Join the PlayNest Family</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Get expert play tips, developmental guides, and exclusive offers delivered to your inbox.
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    padding: '18px 30px',
                    borderRadius: '20px',
                    border: 'none',
                    flex: 1,
                    minWidth: '280px',
                    outline: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <button className="btn btn-secondary" style={{ background: '#2D3436', color: 'white', borderRadius: '20px', padding: '18px 40px' }}>Subscribe Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
