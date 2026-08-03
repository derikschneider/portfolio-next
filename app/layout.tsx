import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorLab } from "@/components/dev/color-lab";
import "./globals.css";

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

const title = "Derik Schneider — Work Samples";
const description =
  "Next.js/TypeScript/Tailwind work-sample site demonstrating full-stack engineering, design systems, and CI/CD to AWS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://work.derikschneider.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteNav />
          <main className="flex flex-1 flex-col pt-[60px]">{children}</main>
          <SiteFooter />
          {process.env.NODE_ENV === "development" && <ColorLab />}
        </ThemeProvider>
      </body>
    </html>
  );
}
