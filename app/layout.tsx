import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b2f63",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(host ? `${protocol}://${host}` : siteConfig.url);
  const socialImage = new URL(siteConfig.ogImage.path, metadataBase);

  return {
    metadataBase,
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Serviços residenciais",
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon-32.png",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
      canonical: "/",
      languages: {
        "pt-BR": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: "/",
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: socialImage,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.shortTitle,
      description: siteConfig.socialDescription,
      images: [socialImage],
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
    other: {
      "geo.region": "BR-PE",
      "geo.placename": "Recife, Olinda, Paulista",
      "format-detection": "telephone=no",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
        <head>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics">
            {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
          </Script>
        </head>
      ) : null}
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
