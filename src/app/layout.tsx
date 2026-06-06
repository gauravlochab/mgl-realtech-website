import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-glare",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MGL Realtech | Premium Real Estate Developer | Kharkhoda, North NCR",
  description:
    "MGL Realtech Pvt. Ltd. 10+ delivered projects in the Kharkhoda-Sonipat corridor. Premium residential plots, villa floors, and commercial spaces near NH-344P. Now developing Mystical Meadows golf township.",
  keywords: [
    "MGL Realtech",
    "Kharkhoda real estate",
    "Sonipat property",
    "North NCR plots",
    "villa floors Kharkhoda",
    "Mystical Meadows",
    "NH-344P",
  ],
  authors: [{ name: "MGL Realtech Pvt. Ltd." }],
  openGraph: {
    title: "MGL Realtech | Premium Real Estate Developer",
    description:
      "10+ delivered projects in North NCR. Premium plots, villa floors & commercial spaces.",
    type: "website",
    locale: "en_IN",
    siteName: "MGL Realtech",
  },
  twitter: {
    card: "summary_large_image",
    title: "MGL Realtech | Premium Real Estate Developer",
    description: "10+ delivered projects in North NCR.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body className="mgl-site antialiased">{children}</body>
    </html>
  );
}
