import { Lang } from '@/types/lang';
import './header.scss';

const translations = {
  ru: {
    h1: 'HTML - форматирование, экранирование, нормализация, редактирование.',
  },
  en: {
    h1: 'HTML - formatting, escaping, normalization, editing.',
  },
} as const;

export default function Header({ lang }: { lang: Lang }) {
  const t = translations[lang];
  return (
    <header className="header">
      <h1 className="header__title">{t.h1}</h1>
    </header>
  );
}
