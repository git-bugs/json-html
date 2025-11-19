import { JetBrains_Mono, Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';

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

const translations = {
  ru: {
    meta_title: 'JSON и HTML онлайн форматирование, валидация и преобразование',
    meta_description:
      'Бесплатные онлайн-инструменты для форматирования и преобразования JSON и HTML. Редактируйте и очищайте код прямо в браузере.',
    schema_name: 'JSON HTML форматирование',
    schema_description:
      'Набор веб-инструментов для работы с кодом: форматирование HTML и JSON с настраиваемыми параметрами, преобразование между различными форматами данных. Сервис работает полностью в браузере без загрузки файлов на сервер, обеспечивая безопасность и конфиденциальность данных пользователей.',
  },
  en: {
    meta_title:
      'JSON and HTML Online — Formatting, Validation, and Code Conversion',
    meta_description:
      'Free online tools to format, validate, and convert JSON and HTML code. Edit, clean, and beautify your code instantly in the browser.',
    schema_name: 'JSON HTML format',
    schema_description:
      'Comprehensive set of web tools for working with code: HTML and JSON formatting with customizable parameters, conversion between different data formats. The service works entirely in the browser without uploading files to the server, ensuring the security and confidentiality of user data.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = translations.ru;
  const baseUrl = process.env.BASE_URL;
  return {
    title: t.meta_title,
    description: t.meta_description,
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
      url: `${baseUrl}`,
      siteName: 'JSON HTML',
      images: [
        {
          url: `${baseUrl}/images/og-ru-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'JSON HTML',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}`,
    },
    icons: {
      icon: {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
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
    <html lang="ru">
      <head>
        <link rel="image_src" href={`${baseUrl}/images/og-ru-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${baseUrl}/images/og-ru-image.jpg`}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              headline: 'JSON HTML',
              image: {
                '@type': 'ImageObject',
                url: `${baseUrl}/images/og-ru-image.jpg`,
                width: 1200,
                height: 630,
              },
              publisher: {
                '@type': 'Organization',
                name: 'JSON HTML',
                logo: {
                  '@type': 'ImageObject',
                  url: `${baseUrl}/images/logo.svg`,
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${mono.variable} ${inter.variable} ${open.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
