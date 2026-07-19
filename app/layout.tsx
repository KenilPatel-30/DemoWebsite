import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Syne } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import FloatingActions from "@/components/ui/FloatingActions";
import CustomCursor from "@/components/ui/CustomCursor";
import { LocalBusinessSchema } from "@/components/seo/JsonLd";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#8B4513",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Demo Cafe – Premium Coffee & Cuisine Template",
    template: "%s · Demo Cafe",
  },
  description: "A cinematic, editorial web experience for a premium cafe.",
  keywords: [
    "Demo Cafe",
    "Coffee",
    "Surat Cafe",
    "Best Coffee Surat",
    "Cafe Near Vesu",
    "Brunch Surat",
    "Coffee Shop Surat",
    "Premium Cafe Surat",
    "Catering Surat",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  applicationName: SITE.name,
  category: "Restaurant",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "Demo Cafe – Premium Coffee & Cuisine Template",
    description: "A cinematic, editorial web experience for a premium cafe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Cafe – Premium Coffee & Cuisine Template",
    description: "A cinematic, editorial web experience for a premium cafe.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${syne.variable}`}>
      <body className="font-sans antialiased paper-grain">
        <LocalBusinessSchema />
        <Loader />
        <ScrollProgress />
        <Navbar />
        <FloatingActions />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
