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
    title: 'Online JSON and HTML Processing Service',
    description:
      'Full set of tools for working with JSON and HTML: minification, formatting, key editing, HTML cleanup, escaping and optimization. Convenient solution for developers to speed up websites and applications.',
    openGraph: {
      title: 'Online JSON and HTML Processing Service',
      description:
        'Optimize JSON and HTML with minification, formatting, key editing, tag removal, escaping and more. Perfect for developers who want faster websites and applications.',
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
  const baseUrl = process.env.BASE_URL;
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${mono.variable} ${inter.variable} ${open.variable}`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
