import { Lang } from '../../types/lang';
import Link from 'next/link';

import './style.scss';
import Image from 'next/image';

const translations = {
  ru: {
    main_h1: 'Превратите необработанный HTML и JSON в полезную информацию',
    main_text:
      'DataForge — это мощная служба обработки и анализа данных, предназначенная для преобразования неструктурированного HTML, JSON и текста в четкую, структурированную и полезную информацию. Независимо от того, извлекаете ли вы данные со сложных веб-страниц или нормализуете беспорядочные ответы API, наша платформа предоставляет инструменты для автоматизации, уточнения и визуализации ваших данных, делая их доступными и полезными для принятия обоснованных решений',
  },
  en: {
    main_h1: 'Transform raw HTML & JSON into actionable insights',
    main_text:
      'DataForge is a powerful data processing and analysis service designed to transform unstructured HTML, JSON, and text into clean, structured, and actionable insights. Whether you`re extracting data from complex web pages or normalizing messy API responses, our platform provides the tools to automate, refine, and visualize your data, making it accessible and useful for informed decision-making',
  },
} as const;

const cards = {
  ru: [
    {
      h2: 'HTML Форматирование',
      img_url: 'services-image1.png',
      img_alt: 'HTML Форматирование картинка',
      list: [
        'Форматирование',
        'Удаление тегов',
        'Удаление аттрибутов',
        'Удаление пустых строк',
        'Экранирование',
        'Минификация',
      ],
      link: '/ru/format-html',
      link_text: 'перейти',
    },
    {
      h2: 'JSON Форматирование',
      img_url: 'services-image1.png',
      img_alt: 'JSON Форматирование картинка',
      list: [
        'Форматирование',
        'Минификация',
        'Удаление ключей',
        'Добавление ключей',
        'Переименование ключей',
      ],
      link: '/ru/format-json',
      link_text: 'перейти',
    },
  ],
  en: [
    {
      h2: 'HTML Форматирование',
      img_url: 'services-image1.png',
      img_alt: 'HTML Форматирование картинка',
      list: [
        'Форматирование',
        'Удаление тегов',
        'Удаление аттрибутов',
        'Удаление пустых строк',
        'Экранирование',
        'Минификация',
      ],
      link_text: 'перейти',
    },
    {},
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
              <svg width="25" height="25" viewBox="0 0 25 25">
                <path d="M12.5 25C10.7917 25 9.17708 24.6719 7.65625 24.0156C6.13542 23.3594 4.80729 22.4635 3.67188 21.3281C2.53646 20.1927 1.64063 18.8646 0.984375 17.3438C0.328125 15.8229 0 14.2083 0 12.5C0 10.7708 0.328125 9.15104 0.984375 7.64062C1.64063 6.13021 2.53646 4.80729 3.67188 3.67188C4.80729 2.53646 6.13542 1.64063 7.65625 0.984375C9.17708 0.328125 10.7917 0 12.5 0C14.2292 0 15.849 0.328125 17.3594 0.984375C18.8698 1.64063 20.1927 2.53646 21.3281 3.67188C22.4635 4.80729 23.3594 6.13021 24.0156 7.64062C24.6719 9.15104 25 10.7708 25 12.5C25 14.2083 24.6719 15.8229 24.0156 17.3438C23.3594 18.8646 22.4635 20.1927 21.3281 21.3281C20.1927 22.4635 18.8698 23.3594 17.3594 24.0156C15.849 24.6719 14.2292 25 12.5 25ZM12.5 22.4375C13.0417 21.6875 13.5104 20.9063 13.9062 20.0938C14.3021 19.2812 14.625 18.4167 14.875 17.5H10.125C10.375 18.4167 10.6979 19.2812 11.0938 20.0938C11.4896 20.9063 11.9583 21.6875 12.5 22.4375ZM9.25 21.9375C8.875 21.25 8.54688 20.5365 8.26562 19.7969C7.98438 19.0573 7.75 18.2917 7.5625 17.5H3.875C4.47917 18.5417 5.23438 19.4479 6.14062 20.2188C7.04688 20.9896 8.08333 21.5625 9.25 21.9375ZM15.75 21.9375C16.9167 21.5625 17.9531 20.9896 18.8594 20.2188C19.7656 19.4479 20.5208 18.5417 21.125 17.5H17.4375C17.25 18.2917 17.0156 19.0573 16.7344 19.7969C16.4531 20.5365 16.125 21.25 15.75 21.9375ZM2.8125 15H7.0625C7 14.5833 6.95312 14.1719 6.92188 13.7656C6.89062 13.3594 6.875 12.9375 6.875 12.5C6.875 12.0625 6.89062 11.6406 6.92188 11.2344C6.95312 10.8281 7 10.4167 7.0625 10H2.8125C2.70833 10.4167 2.63021 10.8281 2.57812 11.2344C2.52604 11.6406 2.5 12.0625 2.5 12.5C2.5 12.9375 2.52604 13.3594 2.57812 13.7656C2.63021 14.1719 2.70833 14.5833 2.8125 15ZM9.5625 15H15.4375C15.5 14.5833 15.5469 14.1719 15.5781 13.7656C15.6094 13.3594 15.625 12.9375 15.625 12.5C15.625 12.0625 15.6094 11.6406 15.5781 11.2344C15.5469 10.8281 15.5 10.4167 15.4375 10H9.5625C9.5 10.4167 9.45312 10.8281 9.42188 11.2344C9.39062 11.6406 9.375 12.0625 9.375 12.5C9.375 12.9375 9.39062 13.3594 9.42188 13.7656C9.45312 14.1719 9.5 14.5833 9.5625 15ZM17.9375 15H22.1875C22.2917 14.5833 22.3698 14.1719 22.4219 13.7656C22.474 13.3594 22.5 12.9375 22.5 12.5C22.5 12.0625 22.474 11.6406 22.4219 11.2344C22.3698 10.8281 22.2917 10.4167 22.1875 10H17.9375C18 10.4167 18.0469 10.8281 18.0781 11.2344C18.1094 11.6406 18.125 12.0625 18.125 12.5C18.125 12.9375 18.1094 13.3594 18.0781 13.7656C18.0469 14.1719 18 14.5833 17.9375 15ZM17.4375 7.5H21.125C20.5208 6.45833 19.7656 5.55208 18.8594 4.78125C17.9531 4.01042 16.9167 3.4375 15.75 3.0625C16.125 3.75 16.4531 4.46354 16.7344 5.20312C17.0156 5.94271 17.25 6.70833 17.4375 7.5ZM10.125 7.5H14.875C14.625 6.58333 14.3021 5.71875 13.9062 4.90625C13.5104 4.09375 13.0417 3.3125 12.5 2.5625C11.9583 3.3125 11.4896 4.09375 11.0938 4.90625C10.6979 5.71875 10.375 6.58333 10.125 7.5ZM3.875 7.5H7.5625C7.75 6.70833 7.98438 5.94271 8.26562 5.20312C8.54688 4.46354 8.875 3.75 9.25 3.0625C8.08333 3.4375 7.04688 4.01042 6.14062 4.78125C5.23438 5.55208 4.47917 6.45833 3.875 7.5Z" />
              </svg>
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
          <div className="services-inner">
            <span className="point point-circe"></span>
            <span className="point point-circe"></span>
            <span className="point point-circe"></span>
            {cards[lang].map((el) => (
              <div className="services-item">
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
                <Link href={`/${lang}/format-html`} className="services-link">
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
            <div className="footer-mail">test-mail@gmail.com</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
