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
      // `dark` is server-rendered on purpose, and only works because the
      // default theme below is a fixed value rather than "system" — the
      // server can state it without knowing anything about the visitor.
      //
      // Without it there is a visible flash on every first load: next-themes
      // injects its class-setting script into <body>, not <head>, so the CSS
      // has already painted `:root` (the light tokens) by the time `.dark`
      // lands, and the base-layer `*` colour transition then animates the
      // whole page light -> dark over 0.4s. Measured, not theorised.
      //
      // Trade-off, accepted: a returning visitor who explicitly chose Light
      // now gets that fade in reverse, once, on load. Preferable to every
      // first-time visitor getting it — and it's the site's own designed
      // cross-fade, not a raw white flash. `suppressHydrationWarning` above
      // already covers the class mismatch this creates for them.
      className={`dark ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Dark is the default, not "system" — the site was designed dark
            first (navy ground, gold accent, the reveal engine's blur-in all
            read against it), so a visitor whose OS happens to be in light
            mode should still land on the intended look rather than the
            alternate one.

            `enableSystem` deliberately stays on: it keeps System selectable
            in the nav toggle, and next-themes only falls back to the OS when
            that option is actively chosen. Note the explicit defaultTheme is
            required here — with enableSystem on and no defaultTheme,
            next-themes defaults to "system" regardless. A returning visitor's
            stored choice still wins over all of this. */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteNav />
          <main className="flex flex-1 flex-col pt-[60px]">{children}</main>
          <SiteFooter />
          {process.env.NODE_ENV === "development" && <ColorLab />}
        </ThemeProvider>
      </body>
    </html>
  );
}
