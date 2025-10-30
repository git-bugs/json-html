import { Lang } from '../../types/lang';
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
      link_text: 'перейти в JSON редактор',
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
      link_text: 'перейти в HTML редактор',
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
      link_text: 'open the JSON editor',
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
      link_text: 'open the HTML editor',
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
            <img src="/images/logo.svg" alt="" className="header-logo" />
            <a className="header-lang" href={`/${lang == 'en' ? 'ru' : 'en'}`}>
              <img src="/images/language.svg" alt="langusage" />
            </a>
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
                    src={`/images/${el.img_url}`}
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
                <a href={el.link} className="services-link">
                  {el.link_text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <img src="/images/mail.svg" alt="mail" />
            <div className="footer-mail">tutejsy.bot@gmail.com</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
