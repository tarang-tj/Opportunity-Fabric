import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://opportunity-fabric.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Opportunity Fabric",
    template: "%s · Opportunity Fabric",
  },
  description:
    "Tell us your goals once. Get a personalized plan for classes, jobs, and experiences, with clear reasons behind every suggestion.",
  keywords: [
    "students",
    "career",
    "college",
    "roadmap",
    "internships",
    "planning",
  ],
  authors: [{ name: "Opportunity Fabric" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Opportunity Fabric",
    title: "Opportunity Fabric",
    description:
      "Your goals, one story, a plan that fits. Plain-English reasons on every step.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opportunity Fabric",
    description:
      "Your goals, one story, a plan that fits. Plain-English reasons on every step.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="fabric-bg fabric-grain relative z-0 flex min-h-full flex-1 flex-col">
            <div className="relative z-[1] flex min-h-full flex-1 flex-col">
              {children}
              <SiteFooter />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
