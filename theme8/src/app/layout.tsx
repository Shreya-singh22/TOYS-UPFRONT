import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ToyWorld - Modern Playful E-commerce",
  description: "The best toys for parents and children.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
