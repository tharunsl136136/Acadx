import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACADSHIELD X — Digital Trust Infrastructure for Education & Employment",
  description: "Tamper-proof verifiable credentials, decentralized identities (DID), and instant zero-login public verification anchored on Polygon Amoy blockchain.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#FAF7F2" />
      </head>
      <body className="bg-canvas-texture min-h-screen text-[#0B251D] antialiased selection:bg-[#E5B25D] selection:text-[#0B251D]">
        {children}
      </body>
    </html>
  );
}
