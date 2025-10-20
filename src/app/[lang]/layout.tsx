import type { Metadata } from 'next';
import {
  Montserrat,
  JetBrains_Mono,
  Inter,
  Space_Grotesk,
  Open_Sans,
} from 'next/font/google';
import '../globals.css';
import { Lang } from '../../types/lang';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  weight: ['400'],
  display: 'swap',
});

const space = Space_Grotesk({
  variable: '--font-space',
  display: 'swap',
  subsets: ['latin'],
});

const open = Open_Sans({
  variable: '--font-open',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

const mono = JetBrains_Mono({
  variable: '--font-jet-mono',
  weight: ['400'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '700'],
  display: 'swap',
});

const translations = {
  ru: {
    title: 'Сервис обработки и анализа текста',
    description:
      'Умный анализ и обработка текста онлайн. Извлекайте ключевые фразы, проводите семантический анализ, находите тональность, очищайте и форматируйте текст. Работа с любыми объемами данных.',
  },
  en: {
    title: 'Text processing and analysis service',
    description:
      'Smart analysis and text processing online. Extract key phrases, perform semantic analysis, find sentiment, clean and format text. Work with any amount of data.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] || translations.ru;
  const baseUrl = process.env.BASE_URL;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.description,
      description: t.description,
      // url: `${baseUrl}${currentPath}`,
      siteName: 'TextScope',
      images: [
        {
          url: `${baseUrl}/og/jg-${lang}.png`,
          width: 1200,
          height: 630,
          alt: 'Text Analysis Preview',
        },
      ],
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang === 'ru' ? 'ru-RU' : 'en-EN'}>
      <body
        className={`${montserrat.variable} ${mono.variable} ${inter.variable} ${space.variable} ${open.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
