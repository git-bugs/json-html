import { JetBrains_Mono, Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';

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
      <body className={`${mono.variable} ${inter.variable} ${open.variable}`}>
        {children}
      </body>
    </html>
  );
}
