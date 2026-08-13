import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartea Vie",
  description: "transformă poveștile în experiențe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === 'production' && (
        <Script
          src="https://analytics.my-lab.ro/script.js"
          data-website-id="913d0974-e2ef-4e12-b384-c8c03b84ce2e"
          strategy="afterInteractive"
        />
      )}
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
