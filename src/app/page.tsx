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
      {!data && <Start />}

      {data && (
        <main className="main">
          <Input />
          <Output />
        </main>
      )}

      <section className="about">
        <h2 className="about-title">Online JSON and HTML processing service</h2>
        <p className="about-text">
          Our service offers a full set of tools for working with JSON and HTML:
          minification, formatting, removing and adding keys, renaming keys in
          JSON, as well as HTML formatting, removing tags and attributes,
          clearing empty lines, escaping and minification. This is a convenient
          solution for developers who want to optimize code and speed up
          websites and applications.
        </p>
      </section>

      <ErrorWidget />
    </>
  );
}
