'use client';

import { useState, useRef } from 'react';
import './output.scss';
import { useTextStore } from '@/store/text-store';
import CommitButton from './commit-button';

export default function Output() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    processedText,
    removeAttributes,
    removeTags,
    removeEmptyLines,
    format,
    resetToOriginal,
    sanitizeHtml,
  } = useTextStore();

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
    const fileName = 'test';
    a.download = `${fileName}.txt`;
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
        <button onClick={resetToOriginal}>Сбросить</button>
        <button onClick={removeAttributes}>Удалить аттрибуты</button>
        <button onClick={removeTags}>Удалить теги</button>
        <button onClick={removeEmptyLines}>Удалить пустые строки</button>
        <button onClick={format}>Форматировать</button>
        <button onClick={sanitizeHtml}>Экранирование</button>
      </div>

      <div className="output__controls">
        <div className="output__stats">
          <span>{stats.characters} chars</span>
          <span>{stats.words} words</span>
          <span>{stats.lines} lines</span>
          {/* <span>{stats.sizeKB} KB</span> */}
        </div>
        <div className="output__buttons">
          <button
            onClick={handleCopy}
            disabled={!processedText || isProcessing}
            className={`copy__btn ${copySuccess ? 'success' : ''}`}
          >
            {copySuccess ? '✓ Скопировано!' : 'Копировать'}
          </button>

          <button
            onClick={handleDownload}
            disabled={!processedText || isProcessing}
            className="download__btn"
          >
            Скачать
          </button>
        </div>

        {/* {onClear && (
          <button 
            onClick={handleClear} 
            disabled={!result || isProcessing}
            className="clear-btn"
          >
            Очистить
          </button>
        )} */}
      </div>

      <div className="output__content">
        {isProcessing ? (
          <div className="processing__indicator">
            <div className="spinner"></div>
            <span>Обработка...</span>
          </div>
        ) : processedText ? (
          <textarea
            ref={textareaRef}
            value={processedText}
            id="output"
            readOnly
            className="output__textarea"
            placeholder="Здесь появится результат обработки..."
            rows={12}
          />
        ) : (
          <div className="output__placeholder">
            <span>Результат обработки появится здесь</span>
          </div>
        )}
      </div>
      <CommitButton />
    </div>
  );
}
