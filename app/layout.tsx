import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Montserrat } from "next/font/google";
import { meta } from "@/data/content";
import "./globals.css";

// Calligraphy script for names and headings.
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

// Elegant serif for questions, answers and the letter.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Clean, widely spaced sans for small labels and buttons.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  // This is a private message, so keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7b0c2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full font-serif text-ink">{children}</body>
    </html>
  );
}
