"use client";

import Link from 'next/link';
import { useStoreContext } from '@/contexts/store-context';
import { Recycle } from 'lucide-react';

const Footer = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (sectionId: string) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const storeName = customization?.footer?.storeName || 'EcoPlay';
  const description = customization?.footer?.description || 'Premium, safe, and sustainably crafted toys. Bringing joy to children since 2020.';

  return (
    <footer
      onClick={() => handleSectionClick('footer')}
      className="bg-slate-900 text-white/70 py-16 mt-16 cursor-pointer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#10B981] flex items-center justify-center text-white">
                <Recycle className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-black text-white tracking-tighter">{storeName}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">{description}</p>
          </div>

          <div>
            <h4 className="font-display font-black text-white mb-6 text-sm uppercase tracking-widest">Shop All</h4>
            <div className="flex flex-col gap-4 text-sm font-bold">
              <Link href="/shop" className="hover:text-[#0EA5E9] transition-colors">All Toys</Link>
              <Link href="/shop?category=Educational" className="hover:text-[#0EA5E9] transition-colors">Educational</Link>
              <Link href="/shop?category=Outdoor" className="hover:text-[#0EA5E9] transition-colors">Outdoor</Link>
              <Link href="/shop?category=Wooden%20Toys" className="hover:text-[#0EA5E9] transition-colors">Wooden Classic</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-white mb-6 text-sm uppercase tracking-widest">Company</h4>
            <div className="flex flex-col gap-4 text-sm font-bold">
              <span className="hover:text-[#0EA5E9] transition-colors cursor-pointer">About Us</span>
              <span className="hover:text-[#0EA5E9] transition-colors cursor-pointer">How it Works</span>
              <span className="hover:text-[#0EA5E9] transition-colors cursor-pointer">Sustainability</span>
              <span className="hover:text-[#0EA5E9] transition-colors cursor-pointer">Contact Us</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-black text-white mb-6 text-sm uppercase tracking-widest">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-6 font-medium">Join the circle and get 10% off your first pre-loved find.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-xs font-medium focus:outline-none focus:border-[#0EA5E9]"
              />
              <button className="bg-[#0EA5E9] text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            © 2026 {storeName}. Built with ❤️ for the Planet.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Refurbishment Process</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
