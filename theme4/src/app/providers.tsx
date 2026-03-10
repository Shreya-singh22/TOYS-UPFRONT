"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/store-context";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <StoreProvider>
                    <CartProvider>
                        {children}
                        <Toaster />
                        <Sonner />
                    </CartProvider>
                </StoreProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}

