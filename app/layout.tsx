import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandaruwan Bandara - Software Engineer",
  description: "I'm Sandaruwan Bandara, a Software Engineer. I specialize in Android development, API integrations, Odoo ERP, and web development. I build scalable, efficient applications to solve real-world problems.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.theme === 'light') {
              document.documentElement.classList.remove('dark')
            } else {
              document.documentElement.classList.add('dark')
            }
          } catch (_) {}
        ` }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
