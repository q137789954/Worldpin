import type { Metadata } from "next";
// import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';

// const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worldpin",
  description: "The Ultimate AI Wearable for Web3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
} 