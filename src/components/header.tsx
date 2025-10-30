import { Lang } from '../types/lang';
import './header.scss';

export default function Header({ lang, title }: { lang: Lang; title: string }) {
  return (
    <header className="service-header">
      <a href={`/${lang}`}>
        <img src="/images/service-logo.svg" alt="service logo" />
      </a>

      <h1 className="service-title">{title}</h1>
    </header>
  );
}
