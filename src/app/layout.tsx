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
          data-website-id="2e7612db-57b7-480b-a6f2-abea928a9f50"
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