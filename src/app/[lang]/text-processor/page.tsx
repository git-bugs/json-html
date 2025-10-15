import { Lang } from '@/types/lang';
import TextInput from './input';
import { Metadata } from 'next';
import { Output } from './output';

const translations = {
  ru: {
    meta_title: 'Text Cleaner — Очистка HTML и нормализация текста',
    meta_description:
      'Удалите HTML, нормализуйте кодировку и очистите текст онлайн.',
  },
  en: {
    meta_title: 'Text Cleaner — HTML Cleanup and Text Normalization',
    meta_description:
      'Remove HTML, normalize encoding and clean up text online.',
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

export default function TextProcessor() {
  return (
    <section className="processor">
      <TextInput />
      {/* <Output/> */}
    </section>
  );
}
