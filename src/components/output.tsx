'use client';

import { useFileStore } from '@/store/file-store';
import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import './output.scss';
import Json from './json';
import Html from './html';

export default function Output() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const { data, type, fileName, result, isProcessing, resultToData } =
    useFileStore();

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
    if (!result || !fileName) return;

    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${
      fileName.split('.').slice(0, -1).join('.') +
      `-${'option'}.` +
      fileName.split('.').pop()
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = useMemo(() => {
    if (!result) return;
    return {
      characters: result.length,
      words: result.trim() ? result.trim().split(/\s+/).length : 0,
      lines: result.split('\n').length,
    };
  }, [result]);

  return (
    <section className="output">
      {type === 'json' && <Json />}
      {type === 'html' && <Html />}
      <div className="output-buttons">
        <button
          onClick={handleCopy}
          disabled={!result || isProcessing}
          className={`output-button copy-btn ${copySuccess ? 'success' : ''}`}
        >
          {copySuccess ? `✓ COPYED` : 'COPY'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!result || isProcessing}
          className="output-button download-btn"
        >
          DOWNLOAD
        </button>
      </div>
      {stats && (
        <div className="output-stats stats">
          <span>{stats.characters} chars</span>
          <span>{stats.words} words</span>
          <span>{stats.lines} lines</span>
        </div>
      )}
      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      )}
      {!isProcessing && result && (
        <div className="output-content">
          <textarea
            ref={textareaRef}
            value={result}
            id="output"
            readOnly
            className="output-textarea"
            rows={12}
          />
          {data !== result && (
            <button
              className="output-accept"
              onClick={resultToData}
              aria-label="to-original"
            >
              <Image
                src="/images/arrow_left.svg"
                alt="arrow"
                width={23}
                height={23}
              />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
