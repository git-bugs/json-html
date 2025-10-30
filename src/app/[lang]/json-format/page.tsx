import { Lang } from '../../../types/lang';
import JsonInput from './json-input';
import { Metadata } from 'next';
import JsonOutput from './json-output';

import './format-json.scss';
import './json-media.scss';

import Header from '@/components/header';
import Script from 'next/script';

const translations = {
  ru: {
    meta_title:
      'JSON: форматирование, минификация, удаление ключей, добавление и переименование ключей',
    meta_description:
      'Онлайн инструменты и методы обработки JSON: форматирование, минификация, редактирование ключей.',
    header_title: 'JSON форматирование',
    schema_name: 'JSON форматирование',
    schema_description:
      'Онлайн-инструмент для форматирования и редактирования JSON-кода. Работает мгновенно в браузере и гарантирует полную конфиденциальность данных.',
  },
  en: {
    meta_title:
      'JSON: formatting, minification, deleting keys, adding and renaming keys',
    meta_description:
      'Online tools and methods for processing JSON: formatting, minification, editing keys.',
    header_title: 'JSON formatting',
    schema_name: 'JSON formatting',
    schema_description:
      'Online tool for formatting and editing JSON code. Works instantly in the browser and guarantees complete data confidentiality.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] || translations.en;
  const baseUrl = process.env.BASE_URL;
  return {
    title: t.meta_title,
    description: t.meta_description,
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
      url: `${baseUrl}/${lang}/json-format`,
      siteName: 'JSON HTML format',
      images: [
        {
          url: `${baseUrl}/json-${lang}-image.png`,
          width: 1200,
          height: 630,
          alt: 'JSON',
        },
      ],
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/json-format`,
      languages: {
        ru: `${baseUrl}/${lang}/json-format`,
        en: `${baseUrl}/${lang}/json-format`,
      },
    },
  };
}

export default async function JsonFormat({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const baseUrl = process.env.BASE_URL;
  const t = translations[lang] || translations.en;
  const htmlLnag = lang === 'ru' ? 'ru-RU' : 'en-EN';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: t.schema_name,
            applicationCategory: 'WebApplication',
            operatingSystem: 'All',
            url: `${baseUrl}/${lang}/json-format`,
            description: t.schema_description,
            inLanguage: lang,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      <section className="json-format-container">
        <Header lang={lang} title={translations[lang].header_title} />
        <main className="json-format">
          <JsonInput />
          <JsonOutput />
        </main>
      </section>
    </>
  );
}
