import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientLayout } from "@/components/client-layout";
import ScrollToTop from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/json-ld";

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://timooothy.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Timothy Lee | ML Engineer & Software Developer",
    template: "%s | Timothy Lee",
  },
  description:
    "Timothy Lee is an aspiring ML Engineer and Software Developer specialising in machine learning, scalable applications, and modern web development. Currently studying at Nanyang Technological University (NTU).",
  keywords: [
    "Timothy Lee",
    "timooothy",
    "Timothy Lee NTU",
    "Timothy Lee Hongyi",
    "ML Engineer",
    "Machine Learning Engineer",
    "Software Developer",
    "Web Developer",
    "Nanyang Technological University",
    "NTU Singapore",
    "Portfolio",
    "Full Stack Developer",
    "Python Developer",
    "React Developer",
    "AI Engineer",
  ],
  authors: [{ name: "Timothy Lee", url: SITE_URL }],
  creator: "Timothy Lee",
  publisher: "Timothy Lee",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Timothy Lee | ML Engineer & Software Developer",
    description:
      "Timothy Lee is an aspiring ML Engineer and Software Developer specialising in machine learning, scalable applications, and modern web development.",
    url: SITE_URL,
    siteName: "Timothy Lee Portfolio",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Timothy Lee - ML Engineer & Software Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timothy Lee | ML Engineer & Software Developer",
    description:
      "Timothy Lee is an aspiring ML Engineer and Software Developer specialising in machine learning and scalable applications.",
    images: ["/og/home.png"],
    creator: "@timooothy",
  },
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
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body
        className={`${inter.className} ${instrumentSerif.variable} antialiased`}
      >
        <div className="mx-auto min-h-dvh bg-background">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={null}>
              <ClientLayout>
                {children}
                <Analytics />
                <ScrollToTop />
                <Toaster richColors />
              </ClientLayout>
            </Suspense>

            <Toaster richColors />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
