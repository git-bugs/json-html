'use client';

import { useState, useRef, useEffect } from 'react';
import './html-output.scss';
import { HtmlState, useHtmlStore } from '@/store/html-store';
import { useParams } from 'next/navigation';
import { Lang } from '../../../types/lang';
import Image from 'next/image';

const translation = {
  ru: {
    BUTTON_REMOVE_ATTR: 'удалить аттрибуты',
    BUTTON_REMOVE_TAGS: 'удалить теги',
    BUTTON_REMOVE_EMPTY: 'удалить пустые строки',
    BUTTON_FORMAT: 'форматирование',
    BUTTON_ESCAPING: 'экранирование',
    textarea_placeholder: 'Здесь появится результат обработки...',
    stats_chars: 'символов',
    stats_words: 'слов',
    stats_lines: 'строк',
    processing: 'Обработка...',
    copy_button: 'копировать',
    copy_success: 'Скопировано',
    download_button: 'скачать',
    BUTTON_MINIFY: 'минифицировать',
    BUTTON_OPTION: 'опция',
  },
  en: {
    BUTTON_REMOVE_ATTR: 'remove attributes',
    BUTTON_REMOVE_TAGS: 'remove tags',
    BUTTON_REMOVE_EMPTY: 'remove empty lines',
    BUTTON_FORMAT: 'formatting',
    BUTTON_ESCAPING: 'escaping',
    textarea_placeholder: 'The processing result will appear here...',
    stats_chars: 'chars',
    stats_words: 'words',
    stats_lines: 'lines',
    processing: 'Processing ...',
    copy_button: 'copy',
    copy_success: 'Success',
    download_button: 'download',
    BUTTON_MINIFY: 'minify',
    BUTTON_OPTION: 'option',
  },
} as const;

type NoArgKeys = {
  [K in keyof HtmlState]: HtmlState[K] extends () => void ? K : never;
}[keyof HtmlState];

export default function HtmlOutput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [option, setOption] = useState<NoArgKeys>('format');
  const { result, fileName, isProcessing, original, acceptResultToOriginal } =
    useHtmlStore();

  const params = useParams<{ lang: Lang }>();
  const { lang } = params;
  const t = translation[lang];

  const handleCopy = async () => {
    if (!result) return;
    try {
      if (textareaRef.current) {
        // textareaRef.current.select();
        await navigator.clipboard.writeText(result);
        setCopySuccess(true);
        // onCopy?.(result);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error(err);
      textareaRef.current?.select();
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${
      fileName.split('.').slice(0, -1).join('.') +
      `-${option}.` +
      fileName.split('.').pop()
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = {
    characters: result.length,
    words: result.trim() ? result.trim().split(/\s+/).length : 0,
    lines: result.split('\n').length,
  };

  useEffect(() => {
    const store: HtmlState = useHtmlStore.getState();
    if (typeof store[option] === 'function') {
      store[option]();
    }
  }, [option, original]);

  return (
    <div className="output-container">
      <div className="html-input-control">
        <div className="html-control-box">
          <button
            className="output-accept"
            onClick={acceptResultToOriginal}
            disabled={result.trim() == original.trim()}
          >
            <Image
              src="/images/arrow_left.svg"
              alt="arrow"
              width={25}
              height={25}
            />
          </button>

          <div className="select-box">
            <span>{t.BUTTON_OPTION}</span>
            <select
              name="option"
              id="options-select"
              className="options-select output-button"
              value={option}
              onChange={(e) => setOption(e.target.value as NoArgKeys)}
              disabled={!result || isProcessing}
              aria-label="select-option"
            >
              <option value="format">{t.BUTTON_FORMAT}</option>
              <option value="minify">{t.BUTTON_MINIFY}</option>
              <option value="removeAttributes">{t.BUTTON_REMOVE_ATTR}</option>
              <option value="removeTags">{t.BUTTON_REMOVE_TAGS}</option>
              <option value="removeEmptyLines">{t.BUTTON_REMOVE_EMPTY}</option>
              <option value="escaping">{t.BUTTON_ESCAPING}</option>
            </select>
          </div>
        </div>
        <div className="output-controls">
          <button
            onClick={handleCopy}
            disabled={!result || isProcessing}
            className={`output-button copy-btn ${copySuccess ? 'success' : ''}`}
          >
            {copySuccess ? `✓ ${t.copy_success}!` : t.copy_button}
          </button>

          <button
            onClick={handleDownload}
            disabled={!result || isProcessing}
            className="output-button download-btn"
          >
            {t.download_button}
          </button>
        </div>
      </div>

      <div className="output-box">
        <div className="output-stats">
          <span>
            {stats.characters} {t.stats_chars}
          </span>
          <span>
            {stats.words} {t.stats_words}
          </span>
          <span>
            {stats.lines} {t.stats_lines}
          </span>
        </div>
      </div>

      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <span>{t.processing}</span>
        </div>
      )}
      {!isProcessing && (
        <div className="output-content">
          <textarea
            ref={textareaRef}
            value={result}
            id="output"
            readOnly
            className="output-textarea"
            placeholder={t.textarea_placeholder}
            rows={12}
          />
        </div>
      )}
    </div>
  );
}
