import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Opportunity Fabric",
  description:
    "Tell us your goals once—get a personalized, step-by-step plan for classes, jobs, and experiences with clear reasons behind every suggestion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <div className="fabric-bg fabric-grain relative z-0 flex min-h-full flex-1 flex-col">
          <div className="relative z-[1] flex min-h-full flex-1 flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
