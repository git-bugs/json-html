import Image from 'next/image';
import './header.scss';
import Link from 'next/link';

export default function Header({ title }: { title: string }) {
  return (
    <header className="service-header">
      <Link href="/">
        <Image
          src="/images/service-logo.svg"
          alt="service logo"
          width={25}
          height={25}
        />
      </Link>

      <h1 className="service-title">{title}</h1>
    </header>
  );
}
