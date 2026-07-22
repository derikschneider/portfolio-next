import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Derik Schneider — Work Samples",
  description:
    "Next.js/TypeScript/Tailwind work-sample site demonstrating full-stack engineering, design systems, and CI/CD to AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <main className="flex flex-1 flex-col pt-[60px]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
