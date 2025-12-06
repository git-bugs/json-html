import Image from 'next/image';

import './header.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link href="/" style={{ lineHeight: '0' }}>
        <Image
          src="/images/logo.svg"
          width={32}
          height={30}
          alt="logo"
          className="logo"
        />
      </Link>
      <h1>Transform HTML & JSON</h1>
    </header>
  );
}
