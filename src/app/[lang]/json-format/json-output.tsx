'use client';

import { useState, useRef, useEffect } from 'react';
import './json-output.scss';
import { buttonIds, useJsonStore } from '@/store/json-store';
import { useParams } from 'next/navigation';
import { Lang } from '../../../types/lang';

const translation = {
  ru: {
    BUTTON_ACCEPT: 'отправить',
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
    BUTTON_ACCEPT: 'send',
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
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const {
    activeButtonId,
    original,
    result,
    fileName,
    isProcessing,
    jsonKeys,
    addKey,
    renameKey,
    moveKey,
    removeKey,
    format,
    resetToOriginal,
    minify,
    acceptResult,
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

  useEffect(() => {
    if (jsonKeys.length > 0) {
      setSelectedKey(jsonKeys[0]);
    }
  }, [jsonKeys]);

  useEffect(() => {
    setSelectedOption('removeKey');
  }, []);

  return (
    <div className="output-container">
      <div className="output-box">
        {result.trim() !== original.trim() && (
          <button className="output-accept" onClick={acceptResult}>
            <img src="/arrow_left.svg" alt="" />
            <p>{t.BUTTON_ACCEPT}</p>
          </button>
        )}
        <button
          className="output-reset"
          onClick={resetToOriginal}
          disabled={!result || isProcessing}
        >
          {t.button_reset}
        </button>
      </div>

      <div className="output-box">
        <div className="select-box">
          <span className="select-box-title">Опция</span>
          <select
            name="operations-select"
            id="operations-select"
            className="output-button"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="format">{t.button_format}</option>
            <option value="minify">{t.BUTTON_MINIFY}</option>
            <option value="removeKey">{t.button_remove_key}</option>
            <option value="addKey">{t.button_add_key}</option>
            <option value="renameKey">{t.button_rename_key}</option>
            {/* <option value="moveKey">{t.button_move_key}</option> */}
          </select>
        </div>

        {jsonKeys.length > 0 &&
          selectedOption !== 'format' &&
          selectedOption !== 'minify' &&
          selectedOption !== 'addKey' && (
            <div className="select-box">
              <span>Ключ</span>
              <select
                id="keys-select"
                className="output-button"
                name="keys-select"
                onChange={(e) => setSelectedKey(e.target.value)}
                value={selectedKey}
              >
                {jsonKeys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          )}

        {(selectedOption === 'addKey' || selectedOption === 'renameKey') && (
          <div className="select-box">
            <span>Новое значение</span>
            <input
              type="text"
              className="key-input"
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </div>
        )}

        {jsonKeys.length > 0 &&
          selectedOption !== 'format' &&
          selectedOption !== 'minify' && (
            <button className="output-button">ПРинять</button>
          )}
      </div>

      <div className="output-controls">
        <div className="output-controls-box">
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
