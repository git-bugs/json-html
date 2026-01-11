import { JetBrains_Mono, Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import Header from '@/components/header';

const open = Open_Sans({
  variable: '--font-open',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

const mono = JetBrains_Mono({
  variable: '--font-jet',
  weight: ['400', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '700'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.BASE_URL;
  return {
    title: 'Online Code Editors: HTML & JSON Editors with Live Preview',
    description:
      'Free online code editors for HTML and JSON. Real-time preview, validation, formatting, and debugging tools for web development and data processing.',
    openGraph: {
      title: 'Online Code Editors: HTML & JSON Editors with Live Preview',
      description:
        'Free online code editors for HTML and JSON. Real-time preview, validation, formatting, and debugging tools for web development and data processing.',
      url: baseUrl,
      siteName: 'Transform HTML & JSON',
      images: [
        {
          url: `${baseUrl}/images/og-en-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Transform HTML & JSON',
        },
      ],
      locale: 'en_EN',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body className={`${mono.variable} ${inter.variable} ${open.variable}`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
