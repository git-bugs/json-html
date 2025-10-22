import type { Metadata } from 'next';
import { JetBrains_Mono, Inter, Open_Sans } from 'next/font/google';
import '../globals.css';
import { Lang } from '../../types/lang';

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
    meta_title:
      'HTML и JSON онлайн — форматирование, валидация и преобразование кода',
    meta_description:
      'Бесплатные онлайн-инструменты для форматирования, проверки и преобразования HTML и JSON. Редактируйте и очищайте код прямо в браузере.',
    meta_keywords:
      'HTML форматирование, JSON валидация, онлайн инструменты, форматирование кода, HTML в JSON, JSON в HTML, валидатор синтаксиса, beautify код, очистка HTML, минификация JSON, инструменты разработчика, веб-инструменты',
  },
  en: {
    meta_title:
      'HTML and JSON Online — Formatting, Validation, and Code Conversion',
    meta_description:
      'Free online tools to format, validate, and convert HTML and JSON code. Edit, clean, and beautify your code instantly in the browser.',
    meta_keywords:
      'HTML formatting, JSON validation, online tools, code formatter, HTML to JSON, JSON to HTML, syntax validator, beautify code, clean HTML, minify JSON, developer tools, web tools',
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
    title: t.meta_title,
    description: t.meta_description,
    keywords: t.meta_keywords,
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
      url: `${baseUrl}/${lang}`,
      siteName: 'JSON HTML format',
      images: [
        {
          url: `${baseUrl}/og-${lang}-image.png`,
          width: 1200,
          height: 630,
          alt: 'JSON HTML format',
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
    icons: {
      icon: {
        url: '/favicon.svg',
        type: 'image/svg+xml',
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
      <body className={`${mono.variable} ${inter.variable} ${open.variable}`}>
        {children}
      </body>
    </html>
  );
}
