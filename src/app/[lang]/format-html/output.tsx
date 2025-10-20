'use client';

import { useState, useRef } from 'react';
import './output.scss';
import { buttonIds, useTextStore } from '@/store/text-store';
import CommitButton from './commit-button';
import { useParams } from 'next/navigation';
import { Lang } from '../../../types/lang';

const translation = {
  ru: {
    button_reset: 'Сбросить',
    button_delete_attr: 'удалить аттрибуты',
    button_delete_tags: 'удалить теги',
    button_delete_empty: 'удалить пустые строки',
    button_format: 'форматирование',
    button_escaping: 'экранирование',
    textarea_placeholder: 'Здесь появится результат обработки...',
    stats_chars: 'символов',
    stats_words: 'слов',
    stats_lines: 'строк',
    processing: 'Обработка...',
    copy_button: 'копировать',
    copy_success: 'Скопировано',
    download_button: 'скачать',
    minify_button: 'минифицировать',
  },
  en: {
    button_reset: 'reset',
    button_delete_attr: 'remove attributes',
    button_delete_tags: 'remove tags',
    button_delete_empty: 'remove empty lines',
    button_format: 'formatting',
    button_escaping: 'escaping',
    textarea_placeholder: 'The processing result will appear here...',
    stats_chars: 'chars',
    stats_words: 'words',
    stats_lines: 'lines',
    processing: 'Processing ...',
    copy_button: 'copy',
    copy_success: 'Success',
    download_button: 'download',
    minify_button: 'minify',
  },
} as const;

export default function Output() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const {
    activeButtonId,
    processedText,
    fileName,
    isProcessing,
    removeAttributes,
    removeTags,
    removeEmptyLines,
    format,
    resetToOriginal,
    escaping,
    minify,
  } = useTextStore();

  const params = useParams<{ lang: Lang }>();
  const { lang } = params;
  const t = translation[lang];

  const handleCopy = async () => {
    if (!processedText) return;
    try {
      if (textareaRef.current) {
        // textareaRef.current.select();
        await navigator.clipboard.writeText(processedText);
        setCopySuccess(true);
        // onCopy?.(processedText);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      // Fallback для старых браузеров
      textareaRef.current?.select();
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!processedText) return;

    const blob = new Blob([processedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${
      fileName.split('.').slice(0, -1).join('.') +
      `-${activeButtonId}.` +
      fileName.split('.').pop()
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = {
    characters: processedText.length,
    words: processedText.trim() ? processedText.trim().split(/\s+/).length : 0,
    lines: processedText.split('\n').length,
  };

  return (
    <div className="output__container">
      <div className="output__header">
        <button
          className="output__reset"
          onClick={resetToOriginal}
          disabled={!processedText || isProcessing}
        >
          {t.button_reset}
        </button>
        <button
          className={`output__button ${
            activeButtonId == buttonIds.BUTTON_1 ? 'active' : ''
          }`}
          onClick={removeAttributes}
          disabled={
            !processedText ||
            isProcessing ||
            activeButtonId == buttonIds.BUTTON_1
          }
        >
          {t.button_delete_attr}
        </button>
        <button
          className={`output__button ${
            activeButtonId == buttonIds.BUTTON_2 ? 'active' : ''
          }`}
          onClick={removeTags}
          disabled={
            !processedText ||
            isProcessing ||
            activeButtonId == buttonIds.BUTTON_2
          }
        >
          {t.button_delete_tags}
        </button>
        <button
          className={`output__button ${
            activeButtonId == buttonIds.BUTTON_3 ? 'active' : ''
          }`}
          onClick={removeEmptyLines}
          disabled={
            !processedText ||
            isProcessing ||
            activeButtonId == buttonIds.BUTTON_3
          }
        >
          {t.button_delete_empty}
        </button>
        <button
          className={`output__button ${
            activeButtonId == buttonIds.BUTTON_4 ? 'active' : ''
          }`}
          onClick={format}
          disabled={
            !processedText ||
            isProcessing ||
            activeButtonId == buttonIds.BUTTON_4
          }
        >
          {t.button_format}
        </button>
        <button
          className={`output__button ${
            activeButtonId == buttonIds.BUTTON_5 ? 'active' : ''
          }`}
          onClick={escaping}
          disabled={
            !processedText ||
            isProcessing ||
            activeButtonId == buttonIds.BUTTON_5
          }
        >
          {t.button_escaping}
        </button>
        <button
          className={`output__button ${
            activeButtonId == buttonIds.BUTTON_6 ? 'active' : ''
          }`}
          onClick={minify}
          disabled={
            !processedText ||
            isProcessing ||
            activeButtonId == buttonIds.BUTTON_6
          }
        >
          {t.minify_button}
        </button>
      </div>

      <div className="output__controls">
        <div className="output__stats">
          <CommitButton />
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
        <div className="output__buttons">
          <button
            onClick={handleCopy}
            disabled={!processedText || isProcessing}
            className={`output__button copy__btn ${
              copySuccess ? 'success' : ''
            }`}
          >
            {copySuccess ? `✓ ${t.copy_success}!` : t.copy_button}
          </button>

          <button
            onClick={handleDownload}
            disabled={!processedText || isProcessing}
            className="output__button download__btn"
          >
            {t.download_button}
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="processing__indicator">
          <div className="spinner"></div>
          <span>{t.processing}</span>
        </div>
      )}
      {!isProcessing && (
        <div className="output__content">
          <textarea
            ref={textareaRef}
            value={processedText}
            id="output"
            readOnly
            className="output__textarea"
            placeholder={t.textarea_placeholder}
            rows={12}
          />
        </div>
      )}
    </div>
  );
}
