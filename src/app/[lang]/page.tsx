import { Lang } from '@/types/lang';

const translations = {
  ru: {
    title: 'Инструменты для анализа и обработки текста',
    h2_change: 'Обработка текста',
    p_change: 'Данный инструмент предлагает:',
    ul_change: ['Удаление HTML-тегов', 'Очистка HTML-аттрибутов'],
    description: 'описание',
  },
  en: {
    title: 'Tools for text analysis and processing',
    h2_change: 'Text changer',
    p_change: 'This tool offers:',
    ul_change: ['Removing HTML Tags', 'Cleaning up HTML attributes'],
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
      <h1>{t.title}</h1>
      <h2>{t.h2_change}</h2>
      <p>{t.p_change}</p>
      <ul>
        {t.ul_change.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
}
