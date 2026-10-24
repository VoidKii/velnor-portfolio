import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "VELNOR | Creative Developer & Digital Architect",
    template: "%s | VELNOR",
  },
  description: "Building immersive web experiences that blur the line between code and art. From interactive narratives to experimental interfaces, I craft digital worlds that leave a mark.",
  keywords: [
    "creative developer",
    "digital artist",
    "webgl",
    "generative art",
    "creative coding",
    "react",
    "nextjs",
    "typescript",
    "framer motion",
    "portfolio",
  ],
  authors: [{ name: "VELNOR", url: "https://velnor.dev" }],
  creator: "VELNOR",
  publisher: "VELNOR",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://velnor.dev",
    title: "VELNOR | Creative Developer & Digital Architect",
    description: "Building immersive web experiences that blur the line between code and art.",
    siteName: "VELNOR Portfolio",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "VELNOR Portfolio - Creative Developer & Digital Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELNOR | Creative Developer & Digital Architect",
    description: "Building immersive web experiences that blur the line between code and art.",
    images: ["/og-image.webp"],
    creator: "@velnor",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}