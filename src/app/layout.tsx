import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientLayout } from "@/components/client-layout";
import ScrollToTop from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Timothy's Portfolio",
  description: "Bits and bytes of my life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <ClientLayout>
              {children}
              <Analytics />
              <ScrollToTop />
              <Toaster richColors />
            </ClientLayout>
            <Toaster richColors />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
