import { Lang } from '../types/lang';
import './header.scss';
import Link from 'next/link';

const translations = {
  ru: {
    h1: 'HTML - форматирование, экранирование,минификация, нормализация и редактирование текста',
  },
  en: {
    h1: 'HTML - formatting, escaping, minification, normalization and text editing',
  },
} as const;

export default function Header({ lang }: { lang: Lang }) {
  const t = translations[lang];
  return (
    <header className="header">
      <Link href={`/${lang}`}>
        <svg
          version="1.1"
          className="header__logo"
          x="0px"
          y="0px"
          viewBox="0 0 1813.7 1748.7"
          width={25}
          height={25}
        >
          <g id="test.001">
            <path
              d="M838.3,762.4v224l901.5,644l74-275.8l-672.2-480.2l672.2-480.2l-74-275.8L838.3,762.4z M407.9,24.6l-56,29.9
		l-49.1,40.3l-40.3,49l-29.9,56l-18.4,60.7l-6.2,63.1v316l-3.5,26.3l-10.2,24.5l-16.2,21.1l-21.1,16.2l-24.5,10.2l-26.3,3.5H0v266
		h106.4l26.3,3.5l24.5,10.2l21.1,16.2l16.2,21.1l10.2,24.5l3.5,26.3v316l6.2,63.1l18.4,60.7l29.9,56l40.3,49l49.1,40.3l56,29.9
		l60.7,18.4l63.1,6.2h187.5v-264.9h-164l-20.8-2.7l-19.4-8l-16.7-12.8l-12.8-16.7l-8-19.4l-2.7-20.8V1104l-5.8-62.6l-17.2-60.5
		l-28-56.3l-37.9-50.2l37.9-50.2l28-56.3l17.2-60.5l5.8-62.6V345.4l2.7-20.8l8-19.4l12.8-16.7l16.7-12.8l19.4-8l20.8-2.7h164V0
		H531.7l-63.1,6.2L407.9,24.6z"
            />
          </g>
        </svg>
      </Link>

      <h1 className="header__title">{t.h1}</h1>
    </header>
  );
}
