import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { bookMetadata } from "@/data/book";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${bookMetadata.title} · ${bookMetadata.subtitle}`,
  description: bookMetadata.description,
  authors: [{ name: bookMetadata.author }],
  keywords: [
    "स्वामी विवेकानंद",
    "मराठी ग्रंथ",
    "आध्यात्मिक प्रेरणा",
    "रामकृष्ण मिशन",
    "वेदनांत",
    "भारतीय इतिहास",
    "प्रेरणा ग्रंथ",
  ],
  openGraph: {
    title: `${bookMetadata.title}`,
    description: bookMetadata.description,
    locale: "mr_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
