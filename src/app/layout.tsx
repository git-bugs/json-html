import { JetBrains_Mono, Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const open = Open_Sans({
  variable: '--font-open',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

const mono = JetBrains_Mono({
  variable: '--font-jet-mono',
  weight: ['400', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cook = await cookies();
  const lang = cook.get('lang')?.value;
  return (
    <html lang={lang}>
      <head>
        <meta
          name="google-site-verification"
          content="irAAMTPdzClNSHekbRKMYSPc1XPJPJR95Gj8lyGhocU"
        />
        <meta name="yandex-verification" content="6f6efeb610093273" />
      </head>
      <body className={`${mono.variable} ${inter.variable} ${open.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
