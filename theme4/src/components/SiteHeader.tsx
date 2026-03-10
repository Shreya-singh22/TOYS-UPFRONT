"use client";

import { useState } from "react";
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react";


import { useCart } from "@/context/CartContext";
import { useStoreContext } from "@/context/store-context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "By Age", href: "/age", hasDropdown: true },
  { label: "Educational", href: "/educational" },
  { label: "Outdoor", href: "/outdoor" },
  { label: "New Arrivals", href: "/new" },
  { label: "Top Rated", href: "/top-rated" },
];

const ageRanges = ["0–2 Years", "3–5 Years", "6–8 Years", "9–12 Years"];

export default function SiteHeader() {
  const { totalItems, flyingItem } = useCart();
  const { customization } = useStoreContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ageDropdown, setAgeDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'headerSection' }, '*');
    }
  };

  const brandName = customization?.header?.brandName || "Play-Well";
  const announcement = customization?.header?.announcement || "Free shipping on orders over ₹999! Use code PLAYTIME";


  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-body">
        {announcement}
      </div>


      <header
        className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm cursor-pointer"
        onClick={handleSectionClick}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-extrabold text-foreground tracking-tight">
            {brandName}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setAgeDropdown(true)}
                onMouseLeave={() => link.hasDropdown && setAgeDropdown(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-display font-semibold text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {ageDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute top-full left-0 mt-1 bg-card rounded-lg shadow-lg border p-2 min-w-[160px] z-50"
                      >
                        {ageRanges.map((r) => (
                          <Link key={r} href="/age" className="block px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors">
                            {r}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="h-5 w-5 text-foreground" />
            </button>
            <Link href="/cart" className="relative p-2" id="cart-icon">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-display font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 hover:bg-muted rounded-full">
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3">
                <input
                  type="text"
                  placeholder="Search toys..."
                  className="w-full px-4 py-2.5 bg-muted rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flying item */}
        <AnimatePresence>
          {flyingItem && (
            <motion.img
              key={flyingItem.key}
              src={typeof flyingItem.product.image === 'string' ? flyingItem.product.image : (flyingItem.product.image as any).src}
              alt=""
              className="fixed w-16 h-16 rounded-lg object-cover z-[100] pointer-events-none shadow-lg"
              initial={{ top: "50%", left: "50%", scale: 1, rotate: 0, opacity: 1 }}
              animate={{ top: 60, right: 80, left: "auto", scale: 0.15, rotate: 12, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "fixed" }}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-card z-50 p-6 shadow-2xl"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2">
                <X className="h-5 w-5" />
              </button>
              <nav className="mt-12 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 font-display font-semibold text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

