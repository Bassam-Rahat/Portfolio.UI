import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Hubot_Sans, Mona_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { themeInitScript } from "@/components/layout/theme";
import { profile } from "@/content/profile";
import { personJsonLd, serializeJsonLd } from "@/lib/seo";
import "./globals.css";

// Display: GitHub's Hubot Sans, used bold and slightly expanded for headings.
const hubot = Hubot_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-hubot",
  display: "swap",
});

// Reading and UI sans with a width axis, used narrower for small labels.
const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

// Data only: dates, stacks, figures.
const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en_GB",
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${hubot.variable} ${mona.variable} ${fragment.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
