import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandaruwan Bandara - Senior Software Engineer | Cygnus One, Sri Lanka",
  description: "I'm Sandaruwan Bandara, a Senior Software Engineer at Cygnus One in Sri Lanka. I specialize in Android development, API integrations, Odoo ERP, and web development. I build scalable, efficient applications to solve real-world problems.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
