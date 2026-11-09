import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandaruwan Bandara — Software Architect & Principal Systems Engineer",
  description: "Architecting high-throughput, fault-tolerant distributed systems, enterprise ERP platforms, IoT & AI solutions that scale under load.",
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
    description: "Architecting high-throughput, fault-tolerant distributed systems, enterprise platforms, IoT & AI solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#08090d] text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
