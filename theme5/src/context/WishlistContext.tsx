"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Use a flag to avoid hydration mismatch if needed, but for simplicity:
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load wishlist", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product: Product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item.id === productId);
    };

    const totalWishlistItems = wishlist.length;

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, totalWishlistItems }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
