import HtmlInput from './html-input';
import { Metadata } from 'next';
import HtmlOutput from './html-output';
import './html.scss';
import './html-media.scss';
import Header from '@/components/header';

const translations = {
  ru: {
    meta_title:
      'HTML онлайн инструменты и методы для обработки и форматирования',
    meta_description:
      'Инструменты и методы анализа HTML: форматирование, экранирование, нормализация, редактирование и минификация',
    header_title: 'HTML форматирование',
    schema_name: 'HTML форматирование',
    schema_description:
      'Онлайн-инструмент для форматирования и очистки HTML-кода. Работает мгновенно в браузере и гарантирует полную конфиденциальность данных.',
  },
  en: {
    meta_title:
      'HTML: formatting, escaping, minification, normalization and text editing',
    meta_description:
      'HTML parsing tools and techniques: formatting, escaping, normalization, editing and minify',
    header_title: 'HTML formatting',
    schema_name: 'HTML formatting',
    schema_description:
      'Online tool for formatting and cleaning HTML code. Works instantly in the browser and guarantees complete data confidentiality.',
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
      url: `${baseUrl}/html-format`,
      siteName: 'JSON HTML',
      images: [
        {
          url: `${baseUrl}/images/og-ru-html.png`,
          width: 1200,
          height: 630,
          alt: 'HTML preview',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/html-format`,
    },
  };
}

export default async function HtmlFormat() {
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
            url: `${baseUrl}/html-format`,
            description: t.schema_description,
            inLanguage: 'ru',
            headline: 'JSON HTML',
            image: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/og-ru-html.png`,
              width: 1200,
              height: 630,
            },
          }),
        }}
      />

      <section className="html-format-container">
        <Header title={translations.en.header_title} />
        <main className="html-format">
          <HtmlInput />
          <HtmlOutput />
        </main>
      </section>
    </>
  );
}
