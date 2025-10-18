import { Lang } from '@/types/lang';
import Link from 'next/link';

const translations = {
  ru: {
    h1: 'Инструменты для анализа и обработки текста',
    h2_change: 'Обработка текста',
    p_change: 'Данный инструмент предлагает:',
    ul_change: ['Удаление HTML-тегов', 'Очистка HTML-аттрибутов'],
    description: 'описание',
    link: '/ru/format-html',
    link_text: 'Очистка HTML и нормализация текста',
  },
  en: {
    h1: 'Tools for text analysis and processing',
    h2_change: 'Text changer',
    p_change: 'This tool offers:',
    ul_change: ['Removing HTML Tags', 'Cleaning up HTML attributes'],
    link: '/en/format-html',
    link_text: 'HTML Cleanup and Text Normalization',
  },
} as const;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] || translations.ru;

  return (
    <div>
      <h1>{t.h1}</h1>
      <h2>{t.h2_change}</h2>
      <p>{t.p_change}</p>
      <ul>
        {t.ul_change.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
      <Link href={t.link}>{t.link_text}</Link>
    </div>
  );
}
