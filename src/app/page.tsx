'use client';

import './style.scss';
import Input from '@/components/input';
import Start from '@/components/start';
import { useFileStore } from '@/store/file-store';
import Output from '@/components/output';
import ErrorWidget from '@/components/errorWidget';

export default function Page() {
  const { data } = useFileStore();

  return (
    <>
      {data && (
        <main className="main">
          <Input />
          <Output />
        </main>
      )}
      <section className="about">
        <h1 className="about-title">Online Code Editors: HTML, JSON</h1>
        <p className="about-text">
          Use our free online editors for HTML, JSON, CSS, and JavaScript
          coding. Write, test, validate, and format code directly in your
          browser with live preview, syntax highlighting, and instant error
          detection for efficient web development.
        </p>
      </section>
      {!data && <Start />}

      <ErrorWidget />
    </>
  );
}
