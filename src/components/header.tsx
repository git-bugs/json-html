import { Lang } from '../types/lang';
import Image from 'next/image';
import './header.scss';

export default function Header({ lang, title }: { lang: Lang; title: string }) {
  return (
    <header className="service-header">
      <a href={`/${lang}`}>
        <Image
          src="/images/service-logo.svg"
          alt="service logo"
          width={25}
          height={25}
        />
      </a>

      <h1 className="service-title">{title}</h1>
    </header>
  );
}
