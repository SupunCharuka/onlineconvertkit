import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Online File, Image & Unit Converter | OnlineConvertKit",
  description: "Free all-in-one online converter to convert files, images, videos & units instantly. Fast, secure, and works directly in your browser.",
  keywords: [
    "online converter",
    "free converter",
    "file converter",
    "image converter",
    "unit converter",
    "math converter",
    "convert online",
    "convert images",
    "convert units",
    "onlineconvertkit",
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Free Online File, Image & Unit Converter | OnlineConvertKit",
    description: "Free all-in-one online converter to convert files, images, videos & units instantly. Fast, secure, and works directly in your browser.",
    siteName: "OnlineConvertKit",
    type: "website",
    url: "https://onlineconvertkit.com/",
    images: [
      { url: "https://onlineconvertkit.com/og-1200x630.png", alt: "OnlineConvertKit" , width: 1200, height: 630},
      { url: "https://onlineconvertkit.com/og-600x600.png", alt: "OnlineConvertKit", width: 600, height: 600 },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to set theme early and avoid flash-of-unstyled (light->dark) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(t==='light'){document.documentElement.classList.remove('dark');}else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){} })();`,
          }}
        />
        {/* Google Analytics (gtag.js) - uses NEXT_PUBLIC_GA_ID env var */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
        {/* JSON-LD site metadata for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://onlineconvertkit.com/#website',
                  'url': 'https://onlineconvertkit.com/',
                  'name': 'OnlineConvertKit',
                  'description': 'Free all-in-one online converter to convert files, images, videos & units instantly. Fast, secure, and works directly in your browser.',
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://onlineconvertkit.com/#org',
                  'name': 'OnlineConvertKit',
                  'url': 'https://onlineconvertkit.com/',
                  'logo': [
                    {
                      '@type': 'ImageObject',
                      'url': 'https://onlineconvertkit.com/logo.svg',
                      'width': 600,
                      'height': 600,
                    },
                    {
                      '@type': 'ImageObject',
                      'url': 'https://onlineconvertkit.com/og-600x600.png',
                      'width': 600,
                      'height': 600,
                    },
                    {
                      '@type': 'ImageObject',
                      'url': 'https://onlineconvertkit.com/icon-512.png',
                      'width': 512,
                      'height': 512,
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-zinc-900 dark:text-zinc-50 bg-white dark:bg-black`}
      >
        <Header />
        <main className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
