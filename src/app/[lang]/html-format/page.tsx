import { Lang } from '../../../types/lang';
import HtmlInput from './html-input';
import { Metadata } from 'next';
import HtmlOutput from './html-output';
import './html.scss';
import './html-media.scss';
import Header from '@/components/header';

const translations = {
  ru: {
    meta_title:
      'HTML: форматирование, экранирование, минификация, нормализация и редактирование текста',
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
      url: `${baseUrl}/${lang}/html-format`,
      siteName: 'JSON HTML format',
      images: [
        {
          url: `${baseUrl}/images/og-${lang}-html.png`,
          width: 1200,
          height: 630,
          alt: 'OG HTML',
        },
      ],
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/html-format`,
      languages: {
        ru: `${baseUrl}/${lang}/html-format`,
        en: `${baseUrl}/${lang}/html-format`,
      },
    },
  };
}

export default async function HtmlFormat({
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

      <section className="html-format-container">
        <Header lang={lang} title={translations[lang].header_title} />
        <main className="html-format">
          <HtmlInput />
          <HtmlOutput />
        </main>
      </section>
    </>
  );
}
