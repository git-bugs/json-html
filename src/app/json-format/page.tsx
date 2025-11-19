import JsonInput from './json-input';
import { Metadata } from 'next';
import JsonOutput from './json-output';

import './format-json.scss';
import './json-media.scss';

import Header from '@/components/header';

const translations = {
  ru: {
    meta_title:
      'JSON онлайн инструменты и методы для обработки и форматирования',
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

export async function generateMetadata(): Promise<Metadata> {
  const t = translations.ru;
  const baseUrl = process.env.BASE_URL;
  return {
    title: t.meta_title,
    description: t.meta_description,
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
      url: `${baseUrl}/json-format`,
      siteName: 'JSON HTML',
      images: [
        {
          url: `${baseUrl}/json-ru-image.png`,
          width: 1200,
          height: 630,
          alt: 'JSON preview',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/json-format`,
    },
  };
}

export default async function JsonFormat() {
  const baseUrl = process.env.BASE_URL;
  const t = translations.ru;
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
            url: `${baseUrl}/json-format`,
            description: t.schema_description,
            inLanguage: 'ru',
            headline: 'JSON HTML',
            image: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/og-ru-json.png`,
              width: 1200,
              height: 630,
            },
          }),
        }}
      />
      <section className="json-format-container">
        <Header title={translations.ru.header_title} />
        <main className="json-format">
          <JsonInput />
          <JsonOutput />
        </main>
      </section>
    </>
  );
}
