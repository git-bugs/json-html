import { Lang } from '../../../types/lang';
import JsonInput from './json-input';
import { Metadata } from 'next';
import JsonOutput from './json-output';

import './format-json.scss';
import './json-media.scss';

import Header from '@/components/header';

const translations = {
  ru: {
    meta_title:
      'JSON: форматирование, минификация, удаление ключей, добавление ключей, переименование и перемещение ключей',
    meta_description:
      'Онлайн инструменты и методы редактирования JSON: форматирование, минификация, редактирование и минификация',
    header_title: 'JSON форматирование',
    schema_name: 'JSON форматирование',
    schema_description:
      'Онлайн-инструмент для форматирования и редактирования JSON-кода. Работает мгновенно в браузере и гарантирует полную конфиденциальность данных.',
  },
  en: {
    meta_title:
      'HTML: formatting, escaping, minification, normalization and text editing',
    meta_description:
      'HTML parsing tools and techniques: formatting, escaping, normalization, editing and minify',
    header_title: 'JSON formatting',
    schema_name: 'HTML форматирование',
    schema_description:
      'Онлайн-инструмент для форматирования и очистки HTML-кода. Работает мгновенно в браузере и гарантирует полную конфиденциальность данных.',
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
  const path = 'text-processor';
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
      canonical: `${baseUrl}/${lang}/`,
      languages: {
        ru: `${baseUrl}/${lang}/json-format`,
        en: `${baseUrl}/${lang}/json-format`,
      },
    },
  };
}

export default async function JsonProcessor({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const baseUrl = process.env.BASE_URL;
  const t = translations[lang] || translations.en;
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
            url: `${baseUrl}/${lang}/html-format`,
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
