import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { StoreProvider } from "@/contexts/store-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
    title: "EcoPlay ♻️ - Pre-Loved Toys, Endless Joy",
    description: "Curated, sanitized, and safety-checked premium pre-loved toys. Join the eco-conscious journey.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} ${dmSans.variable} antialiased`}>
                <StoreProvider>
                    <Providers>
                        <Header />
                        <CartDrawer />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </Providers>
                </StoreProvider>
            </body>
        </html>
    );
}
