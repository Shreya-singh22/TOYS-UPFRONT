'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('ecoplay-wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (e) {
                console.error('Failed to parse wishlist', e);
            }
        }
    }, []);

    // Sync wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('ecoplay-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        setWishlist((prev) => {
            if (prev.some((p) => p.id === product.id)) {
                toast.info(`${product.name} is already in your wishlist`);
                return prev;
            }
            toast.success(`${product.name} added to wishlist`);
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist((prev) => prev.filter((p) => p.id !== productId));
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((p) => p.id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
