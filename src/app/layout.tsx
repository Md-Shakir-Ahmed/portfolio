import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// ─── Font Configuration ──────────────────────────────────
// Display: Clash Display (loaded locally from Fontshare CDN fallback)
// Body: Space Grotesk (Google Fonts, self-hosted by Next.js)
// Mono: JetBrains Mono (Google Fonts, self-hosted by Next.js)

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

// ─── SEO Metadata ────────────────────────────────────────
export const metadata: Metadata = {
  title: "Md. Shakir Ahmed — Backend-focused Software Engineer",
  description:
    "Portfolio of Md. Shakir Ahmed — Backend-focused Software Engineer building APIs, business systems, SaaS products, identity/SSO systems and microservice-oriented solutions.",
  keywords: [
    "Md. Shakir Ahmed",
    "Backend Software Engineer",
    "Laravel Developer",
    "PHP Developer",
    "FastAPI Developer",
    "API Developer",
    "SaaS Developer",
    "Identity SSO",
    "Microservices",
  ],
  authors: [{ name: "Md. Shakir Ahmed" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Md. Shakir Ahmed — Backend-focused Software Engineer",
    description:
      "APIs · Business Systems · SaaS · Identity · Microservices",
    siteName: "SHUV0 / SYSTEM",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Shakir Ahmed — Backend-focused Software Engineer",
    description:
      "APIs · Business Systems · SaaS · Identity · Microservices",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        {/* Clash Display from Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-clash-display: 'Clash Display', sans-serif; }`,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "#shakir",
                  name: "Md. Shakir Ahmed",
                  jobTitle: "Backend-focused Software Engineer",
                  description:
                    "Backend-focused Software Engineer building APIs, business systems, SaaS products, identity/SSO systems and microservice-oriented solutions, with applied ML experience.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Rajshahi",
                    addressCountry: "Bangladesh",
                  },
                  email: "shuvocsevu231@gmail.com",
                  sameAs: [
                    "https://www.linkedin.com/in/md-shakir-ahmed-shuvo-047129218/",
                    "https://github.com/Md-Shakir-Ahmed",
                  ],
                  worksFor: {
                    "@type": "Organization",
                    name: "Varendra University",
                  },
                  alumniOf: [
                    {
                      "@type": "CollegeOrUniversity",
                      name: "Varendra University",
                    },
                    {
                      "@type": "CollegeOrUniversity",
                      name: "Rajshahi University",
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "#website",
                  name: "SHUV0 / SYSTEM — Md. Shakir Ahmed",
                  description:
                    "The interactive engineering portfolio of Md. Shakir Ahmed.",
                  inLanguage: "en",
                },
                {
                  "@type": "ProfilePage",
                  "@id": "#profile",
                  mainEntity: { "@id": "#shakir" },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip to content — accessibility */}
        <a href="#hero" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
