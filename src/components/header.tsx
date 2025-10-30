import { Lang } from '../types/lang';
import './header.scss';
import Link from 'next/link';

export default function Header({ lang, title }: { lang: Lang; title: string }) {
  return (
    <header className="service-header">
      <Link href={`/${lang}`}>
        <img src="/images/service-logo.svg" alt="service logo" />
      </Link>

      <h1 className="service-title">{title}</h1>
    </header>
  );
}
