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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sandaruwan-bandara.dev";

export const metadata: Metadata = {
  title: {
    default: "Sandaruwan Bandara - Senior Software Engineer | Portfolio",
    template: "%s | Sandaruwan Bandara"
  },
  description: "I'm Sandaruwan Bandara, a Senior Software Engineer at Cygnus One in Sri Lanka. I specialize in Android development, API integrations, Odoo ERP, and web development. I build scalable, efficient applications to solve real-world problems.",
  keywords: ["Sandaruwan Bandara", "Software Engineer", "Android Developer", "Web Developer", "API Development", "Odoo ERP", "Sri Lanka", "Cygnus One", "Portfolio", "Mobile Apps", "Full Stack Developer"],
  authors: [{ name: "Sandaruwan Bandara" }],
  creator: "Sandaruwan Bandara",
  publisher: "Sandaruwan Bandara",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Sandaruwan Bandara - Senior Software Engineer Portfolio",
    description: "Experienced Senior Software Engineer specializing in Android development, API integrations, Odoo ERP, and web development. Based in Sri Lanka.",
    siteName: "Sandaruwan Bandara Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sandaruwan Bandara - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandaruwan Bandara - Senior Software Engineer Portfolio",
    description: "Experienced Senior Software Engineer specializing in Android development, API integrations, Odoo ERP, and web development.",
    images: ["/og-image.jpg"],
    creator: "@sandaruwan_dev", // Replace with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add when you verify with Google Search Console
    // yandex: "your-yandex-verification-code", // Add if needed
    // yahoo: "your-yahoo-verification-code", // Add if needed
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sandaruwan Bandara',
  jobTitle: 'Senior Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Cygnus One',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: 'Sri Lanka'
    }
  },
  url: siteUrl,
  sameAs: [
    // 'https://linkedin.com/in/your-profile', // Add your social media links
    // 'https://github.com/your-username',
    // 'https://twitter.com/your-handle'
  ],
  knowsAbout: [
    'Android Development',
    'API Development',
    'Odoo ERP',
    'Web Development',
    'Mobile Applications',
    'Software Engineering'
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'Your University' // Add your educational background
  },
  birthPlace: {
    '@type': 'Place',
    name: 'Sri Lanka'
  }
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
