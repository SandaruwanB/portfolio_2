import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandaruwan Bandara — Software Architect & Principal Systems Engineer",
  description: "Architecting high-throughput, fault-tolerant distributed systems, enterprise platforms, and cloud performance.",
  keywords: [
    "Software Architect",
    "Principal Software Engineer",
    "Distributed Systems",
    "Java",
    "Node.js",
    "Microservices",
    "Enterprise Architecture",
    "Odoo ERP",
    "IoT Solutions",
    "Business Process Automation",
    "High Throughput Backend"
  ],
  authors: [{ name: "Sandaruwan Bandara" }],
  openGraph: {
    title: "Sandaruwan Bandara — Software Architect & Principal Systems Engineer",
    description: "Architecting high-throughput, fault-tolerant distributed systems, enterprise platforms, and cloud performance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 min-h-screen antialiased transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
