import { Lang } from '../../types/lang';
import Link from 'next/link';

import './style.scss';
import Image from 'next/image';

const translations = {
  ru: {
    main_h1: 'Онлайн форматирование и преобразование JSON и HTML',
    main_text:
      'Бесплатные онлайн-инструменты для форматирования, проверки и преобразования HTML и JSON-кода в реальном времени.',
  },
  en: {
    main_h1: 'JSON and HTML online formatting and conversion',
    main_text:
      'Free online tools for working with JSON and HTML. Format, validate, transform and clean up code in real time.',
  },
} as const;

const cards = {
  ru: [
    {
      h2: 'JSON',
      img_url: 'json-image.webp',
      img_alt: 'JSON Форматирование картинка',
      list: [
        'Форматирование',
        'Минификация',
        'Удаление ключей',
        'Добавление ключей',
        'Переименование ключей',
        'Перемещение ключа',
      ],
      link: '/ru/json-format',
      link_text: 'перейти',
    },
    {
      h2: 'HTML',
      img_url: 'html-image.webp',
      img_alt: 'HTML Форматирование картинка',
      list: [
        'Форматирование',
        'Удаление тегов',
        'Удаление аттрибутов',
        'Удаление пустых строк',
        'Экранирование',
        'Минификация',
      ],
      link: '/ru/html-format',
      link_text: 'перейти',
    },
  ],
  en: [
    {
      h2: 'JSON',
      img_url: 'json-image.webp',
      img_alt: 'JSON format image',
      list: [
        'Format',
        'Minify',
        'Remove key',
        'Add key',
        'Rename key',
        'Move key',
      ],
      link: '/en/json-format',
      link_text: 'open',
    },
    {
      h2: 'HTML',
      img_url: 'html-image.webp',
      img_alt: 'HTML format image',
      list: [
        'Format',
        'Minify',
        'Remove tags',
        'Remove attributes',
        'Remove empty lines',
        'Escaping',
      ],
      link: '/en/html-format',
      link_text: 'open',
    },
  ],
} as const;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const t = translations[lang] || translations.en;

  return (
    <main className="main-content">
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <span className="point point-circe"></span>
            <span className="point point-circe"></span>
            <span className="point point-circe"></span>
            <svg
              version="1.1"
              className="header-logo"
              x="0px"
              y="0px"
              viewBox="0 0 1813.7 1748.7"
              width={37}
              height={35}
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
            <Link
              className="header-lang"
              href={`/${lang == 'en' ? 'ru' : 'en'}`}
            >
              <img src="/language.svg" alt="langusage" />
            </Link>
          </div>
        </div>
      </header>
      <section className="main">
        <div className="container">
          <div className="main-inner">
            <span className="point"></span>
            <span className="point"></span>
            <span className="point"></span>
            <h1 className="main-title">{t.main_h1}</h1>
            <div className="main-line">
              <span></span>
              <span></span>
            </div>
            <p className="main-text">{t.main_text}</p>
          </div>
        </div>
      </section>
      <section className="services">
        <div className="services-container">
          <span className="point point-circe"></span>
          <span className="point point-circe"></span>
          <span className="point point-circe"></span>
          <div className="services-inner">
            {cards[lang].map((el, i) => (
              <div className="services-item" key={i}>
                <div className="services-box">
                  <h2 className="services-title">{el.h2}</h2>

                  <Image
                    src={`/${el.img_url}`}
                    alt={el.img_alt}
                    width={0}
                    height={0}
                    sizes="100%"
                    className="services-img"
                  />

                  <ul className="services-list">
                    {el.list.map((item) => (
                      <li className="services-list-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={el.link} className="services-link">
                  {el.link_text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <img src="/mail.svg" alt="mail" />
            <div className="footer-mail">json-html@gmail.com</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
