'use client';

import { useState, useRef } from 'react';
import './json-output.scss';
import { buttonIds, useJsonStore } from '@/store/json-store';
import CommitButton from './commit-button';
import { useParams } from 'next/navigation';
import { Lang } from '../../../types/lang';

const translation = {
  ru: {
    button_reset: 'Сбросить',
    button_format: 'форматирование',
    BUTTON_MINIFY: 'минифицировать',
    button_remove_key: 'удалить ключ',
    button_add_key: 'добавить ключ',
    button_rename_key: 'переименовать ключ',
    button_move_key: 'переместить ключ',

    textarea_placeholder: 'Здесь появится результат обработки...',
    stats_chars: 'символов',
    stats_words: 'слов',
    stats_lines: 'строк',
    processing: 'Обработка...',
    copy_button: 'копировать',
    copy_success: 'Скопировано',
    download_button: 'скачать',
  },
  en: {
    button_reset: 'reset',
    button_format: 'formatting',
    BUTTON_MINIFY: 'minify',
    button_remove_key: 'remove key',
    button_add_key: 'add key',
    button_rename_key: 'rename key',
    button_move_key: 'move key',

    textarea_placeholder: 'The processing result will appear here...',
    stats_chars: 'chars',
    stats_words: 'words',
    stats_lines: 'lines',
    processing: 'Processing ...',
    copy_button: 'copy',
    copy_success: 'Success',
    download_button: 'download',
  },
} as const;

export default function JsonOutput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const {
    activeButtonId,
    result,
    fileName,
    isProcessing,
    addKey,
    renameKey,
    moveKey,
    removeKey,
    format,
    resetToOriginal,
    minify,
  } = useJsonStore();

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
      // Fallback для старых браузеров
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
      `-${activeButtonId}.` +
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

  return (
    <div className="output-container">
      <div className="output-header">
        <button
          className="output-reset"
          onClick={resetToOriginal}
          disabled={!result || isProcessing}
        >
          {t.button_reset}
        </button>
        <button
          className={`output-button ${
            activeButtonId == buttonIds.BUTTON_1 ? 'active' : ''
          }`}
          onClick={format}
          disabled={
            !result || isProcessing || activeButtonId == buttonIds.BUTTON_1
          }
        >
          {t.button_format}
        </button>
        <button
          className={`output-button ${
            activeButtonId == buttonIds.BUTTON_2 ? 'active' : ''
          }`}
          onClick={minify}
          disabled={
            !result || isProcessing || activeButtonId == buttonIds.BUTTON_2
          }
        >
          {t.BUTTON_MINIFY}
        </button>
        <button
          className={`output-button ${
            activeButtonId == buttonIds.BUTTON_3 ? 'active' : ''
          }`}
          onClick={() => removeKey('id')}
          disabled={
            !result || isProcessing || activeButtonId == buttonIds.BUTTON_3
          }
        >
          {t.button_remove_key}
        </button>

        <button
          className={`output-button ${
            activeButtonId == buttonIds.BUTTON_4 ? 'active' : ''
          }`}
          onClick={addKey}
          disabled={
            !result || isProcessing || activeButtonId == buttonIds.BUTTON_4
          }
        >
          {t.button_add_key}
        </button>
        <button
          className={`output-button ${
            activeButtonId == buttonIds.BUTTON_5 ? 'active' : ''
          }`}
          onClick={renameKey}
          disabled={
            !result || isProcessing || activeButtonId == buttonIds.BUTTON_5
          }
        >
          {t.button_rename_key}
        </button>

        <button
          className={`output-button ${
            activeButtonId == buttonIds.BUTTON_6 ? 'active' : ''
          }`}
          onClick={moveKey}
          disabled={
            !result || isProcessing || activeButtonId == buttonIds.BUTTON_6
          }
        >
          {t.button_move_key}
        </button>
      </div>

      <div className="output-controls">
        <div className="output-controls-box">
          <CommitButton />
          <div className="output-buttons">
            <button
              onClick={handleCopy}
              disabled={!result || isProcessing}
              className={`output-button copy-btn ${
                copySuccess ? 'success' : ''
              }`}
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
