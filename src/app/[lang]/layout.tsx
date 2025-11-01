import type { Metadata } from 'next';
import { Lang } from '../../types/lang';
import { notFound } from 'next/navigation';

const translations = {
  ru: {
    meta_title:
      'JSON и HTML онлайн — форматирование, валидация и преобразование кода',
    meta_description:
      'Бесплатные онлайн-инструменты для форматирования, проверки и преобразования JSON и HTML. Редактируйте и очищайте код прямо в браузере.',
    schema_name: 'JSON HTML формат',
    schema_description:
      'Комплексный набор веб-инструментов для работы с кодом: форматирование HTML и JSON с настраиваемыми параметрами, преобразование между различными форматами данных. Сервис работает полностью в браузере без загрузки файлов на сервер, обеспечивая безопасность и конфиденциальность данных пользователей.',
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
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
      url: `${baseUrl}/${lang}`,
      siteName: 'JSON HTML format',
      images: [
        {
          url: `${baseUrl}/images/og-${lang}-image.jpg`,
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
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!['ru', 'en'].includes(lang)) {
    notFound();
  }
  const t = translations[lang as 'ru' | 'en'] || translations.en;
  const baseUrl = process.env.BASE_URL;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                name: 'JSON HTML format',
                url: `${baseUrl}/${lang}`,
                logo: `${baseUrl}/logo.svg`,
                sameAs: [],
              },
              {
                '@type': 'WebSite',
                name: t.schema_name,
                url: `${baseUrl}/${lang}`,
                inLanguage: lang,
              },
              {
                '@type': 'WebPage',
                name: 'Home',
                url: `${baseUrl}/${lang}`,
                description: t.schema_description,
                inLanguage: lang,
                mainEntity: {
                  '@type': 'ItemList',
                  name: 'Available Services',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      url: `${baseUrl}/${lang}/html-format`,
                      name:
                        lang == 'en'
                          ? 'HTML formatting'
                          : 'HTML форматирование',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      url: `${baseUrl}/${lang}/json-format`,
                      name:
                        lang == 'en'
                          ? 'JSON formatting'
                          : 'JSON форматирование',
                    },
                  ],
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
