'use client';

import { useState, useRef } from 'react';
import './output.scss';

interface OutputProps {
  result: string;
  title?: string;
  fileName?: string;
  onClear?: () => void;
  onCopy?: (text: string) => void;
  isProcessing?: boolean;
}

export function Output({
  result,
  title = 'Результат',
  fileName = 'processed-text',
  onClear,
  onCopy,
  isProcessing = false,
}: OutputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (!result) return;

    try {
      if (textareaRef.current) {
        textareaRef.current.select();
        await navigator.clipboard.writeText(result);
        setCopySuccess(true);
        onCopy?.(result);
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
    a.download = `${fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    onClear?.();
  };

  const stats = {
    characters: result.length,
    words: result.trim() ? result.trim().split(/\s+/).length : 0,
    lines: result.split('\n').length,
    // sizeKB: Math.round((new Blob([result]).size / 1024) * 100) / 100
  };

  return (
    <div className="output-container">
      <div className="output-header">
        <h3>{title}</h3>
        <div className="output-stats">
          <span>{stats.characters} chars</span>
          <span>{stats.words} words</span>
          <span>{stats.lines} lines</span>
          {/* <span>{stats.sizeKB} KB</span> */}
        </div>
      </div>

      <div className="output-controls">
        <button
          onClick={handleCopy}
          disabled={!result || isProcessing}
          className={`copy-btn ${copySuccess ? 'success' : ''}`}
        >
          {copySuccess ? '✓ Скопировано!' : 'Копировать'}
        </button>

        <button
          onClick={handleDownload}
          disabled={!result || isProcessing}
          className="download-btn"
        >
          Скачать
        </button>

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

      <div className="output-content">
        {isProcessing ? (
          <div className="processing-indicator">
            <div className="spinner"></div>
            <span>Обработка...</span>
          </div>
        ) : result ? (
          <textarea
            ref={textareaRef}
            value={result}
            readOnly
            className="output-textarea"
            placeholder="Здесь появится результат обработки..."
            rows={12}
          />
        ) : (
          <div className="output-placeholder">
            <span>Результат обработки появится здесь</span>
          </div>
        )}
      </div>
    </div>
  );
}
