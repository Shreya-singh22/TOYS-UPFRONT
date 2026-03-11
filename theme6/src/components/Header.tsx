'use client';

import { ShoppingCart, Search, Menu, X, User, Recycle, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useStoreContext } from '@/contexts/store-context';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { customization } = useStoreContext();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const storeName = customization?.header?.storeName || 'EcoPlay';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'By Age', href: '#', hasDropdown: true },
    { name: 'Educational', href: '/shop?category=Educational' },
    { name: 'Outdoor', href: '/shop?category=Outdoor' },
    { name: 'New Arrivals', href: '/shop?filter=new' },
    { name: 'Top Rated', href: '/shop?filter=top' },
  ];

  return (
    <header
      onClick={() => handleSectionClick('header')}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm cursor-pointer"
    >
      {/* Top Row: Logo, Search, Actions */}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5FF] flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl">🧸</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Recycle className="w-3 h-3 text-[#4CAF50]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black text-slate-800 leading-none">{storeName}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Pre-Loved Toys for Happy Kids</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-[#0EA5E9] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search toys, brands, age..."
            className="w-full h-11 bg-slate-50 border border-slate-100 rounded-full pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9]/30 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            href="/wishlist"
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group relative"
          >
            <Heart className="w-5 h-5 text-slate-600 group-hover:text-rose-500 transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black min-w-[17px] h-[17px] rounded-full flex items-center justify-center border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
          >
            <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-[#0EA5E9] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0EA5E9] text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-slate-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Navigation (Desktop) */}
      <div className="hidden lg:block border-t border-slate-50 bg-slate-50/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-10 h-12">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group h-full flex items-center">
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#0EA5E9] transition-colors py-4"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {link.hasDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white border border-slate-100 shadow-2xl rounded-2xl p-3 min-w-[200px] grid gap-1">
                      {['0-12 Months', '1-2 Years', '3-4 Years', '5-7 Years', '8+ Years'].map((age) => (
                        <Link
                          key={age}
                          href={`/shop?age=${age}`}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors whitespace-nowrap"
                        >
                          {age}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search toys..."
                  className="w-full h-10 bg-slate-50 rounded-lg pl-10 pr-4 text-sm font-medium focus:outline-none"
                />
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl text-sm font-bold tracking-wide text-slate-600 hover:bg-slate-50 hover:text-[#0EA5E9] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
