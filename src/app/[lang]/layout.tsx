import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { Lang } from '@/types/lang';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
