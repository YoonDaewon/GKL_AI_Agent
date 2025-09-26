import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/providers/app-provider";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sevenluck Concierge",
  description: "ai powered Sevenluck Concierge",
  icons: {
    icon: "/favicon/seven_luck.ico",
    apple: "/logo/seven_luck.png",
  },
  manifest: "/site.webmanifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://platform.twitter.com" />
      <link rel="preconnect" href="https://syndication.twitter.com" />
      <link rel="preconnect" href="https://cdn.syndication.twimg.com" />
      <link rel="preconnect" href="https://abs-0.twimg.com" />
      <link rel="preconnect" href="https://pbs.twimg.com" />
      <link
        rel="preload"
        href="https://platform.twitter.com/widgets.js"
        as="script"
      />
      {/* NOTE(@obrian): reduces the DOM drawing finish time from 4.8 to 3.5 secs, but over time, it may miss the cache. For the next few months, it will remain unchanged. Check the url updates from https://thirdpartyscriptwatch.com/?q=twitter */}
      <link
        rel="preload"
        href="https://platform.twitter.com/js/tweet.d7aeb21a88e025d2ea5f5431a103f586.js"
        as="script"
      />

      <body
        className={`${inter.variable} h-svh !w-dvw overflow-hidden font-inter antialiased`}
      >
        <AppContextProvider>
          <AppLayout>
            {children}

            <Toaster />
          </AppLayout>
        </AppContextProvider>
      </body>
    </html>
  );
}
