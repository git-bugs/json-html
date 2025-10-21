import { Lang } from '../../../types/lang';
import JsonInput from './json-input';
import { Metadata } from 'next';
// import Output from './output';

import './format-json.scss';

import Header from '@/components/header';

const translations = {
  ru: {
    meta_title:
      'HTML: форматирование, экранирование,минификация, нормализация и редактирование текста',
    meta_description:
      'Инструменты и методы анализа HTML: форматирование, экранирование, нормализация, редактирование и минификация',
  },
  en: {
    meta_title:
      'HTML: formatting, escaping, minification, normalization and text editing',
    meta_description:
      'HTML parsing tools and techniques: formatting, escaping, normalization, editing and minify',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] || translations.ru;
  const baseUrl = process.env.BASE_URL;
  const path = 'text-processor';
  return {
    title: t.meta_title,
    description: t.meta_description,
    openGraph: {
      title: t.meta_title,
      description: t.meta_description,
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
      canonical: `${baseUrl}/${lang}/`,
      languages: {
        ru: `${baseUrl}/${lang}/${path}`,
        en: `${baseUrl}/${lang}/${path}`,
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
  return (
    <section className="json-processor">
      <Header lang={lang} />
      <main>
        <JsonInput />
        {/* <Output /> */}
      </main>
    </section>
  );
}
