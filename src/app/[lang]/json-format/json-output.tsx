'use client';

import { useState, useRef, useEffect } from 'react';
import './json-output.scss';
import { useJsonStore } from '@/store/json-store';
import { useParams } from 'next/navigation';
import { Lang } from '../../../types/lang';

const translation = {
  ru: {
    button_accept: 'принять',
    button_reset: 'Сбросить',
    button_format: 'форматирование',
    button_minify: 'минифицировать',
    button_remove_key: 'удалить ключ',
    button_add_key: 'добавить ключ',
    button_rename_key: 'переименовать ключ',
    button_move_key: 'переместить ключ',
    button_send: 'отправить',
    textarea_placeholder: 'Здесь появится результат обработки...',
    stats_chars: 'символов',
    stats_words: 'слов',
    stats_lines: 'строк',
    stats_keys: 'ключей',
    processing: 'Обработка...',
    copy_button: 'копировать',
    copy_success: 'Скопировано',
    download_button: 'скачать',
    option: 'опция',
    key: 'ключ',
    new_key: 'новый ключ',
    new_key_value: 'значение',
    new_key_string_value: 'значение нового ключа',
  },
  en: {
    button_accept: 'accept',
    button_reset: 'reset',
    button_format: 'formatting',
    button_minify: 'minify',
    button_remove_key: 'remove key',
    button_add_key: 'add key',
    button_rename_key: 'rename key',
    button_move_key: 'move key',
    button_send: 'send',
    textarea_placeholder: 'The processing result will appear here...',
    stats_chars: 'chars',
    stats_words: 'words',
    stats_lines: 'lines',
    stats_keys: 'keys',
    processing: 'Processing ...',
    copy_button: 'copy',
    copy_success: 'Success',
    download_button: 'download',
    option: 'option',
    key: 'key',
    new_key: 'new key',
    new_key_value: 'value',
    new_key_string_value: 'new key value',
  },
} as const;

export default function JsonOutput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState('format');
  const [key, setKey] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('null');
  const [len, setLen] = useState(0);
  const [newKeyStringValue, setNewKeyStringValue] = useState('');

  const {
    original,
    result,
    fileName,
    isProcessing,
    jsonKeys,
    validJson,
    setRusultEmpty,
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
      `-${selectedOption}.` +
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
    keys: jsonKeys.length,
  };

  useEffect(() => {
    const store = useJsonStore.getState();
    if (
      (original && selectedOption === 'format') ||
      selectedOption === 'minify'
    ) {
      (store as Record<string, any>)[selectedOption]();
    }
    if (original && selectedOption === 'removeKey') {
      (store as Record<string, any>)[selectedOption](key);
    }
    if (original && selectedOption === 'addKey' && newKey) {
      (store as Record<string, any>)[selectedOption](
        newKey,
        newKeyValue,
        newKeyStringValue
      );
    }
    if (original && selectedOption === 'renameKey' && newKey) {
      (store as Record<string, any>)[selectedOption](key, newKey);
    }
  }, [selectedOption, key, len, newKey, newKeyValue, newKeyStringValue]);

  useEffect(() => {
    if (jsonKeys.length > 0) {
      setKey(jsonKeys[0]);
    }
    setLen(original.length);
    if (!original) setRusultEmpty();
  }, [original]);

  return (
    <div className="output-container">
      <div className="output-box output-head">
        <form id="json-options">
          <button
            className="output-accept"
            onClick={acceptResult}
            disabled={
              result.trim() === original.trim() || !result || !validJson
            }
          >
            <img src="/arrow_left.svg" alt="" />
          </button>

          <div className="select-box">
            <span className="select-box-title">{t.option}</span>
            <select
              name="option"
              id="option-select"
              className="output-button"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={!result || !validJson}
            >
              <option value="format">{t.button_format}</option>
              <option value="minify">{t.button_minify}</option>
              <option value="removeKey">{t.button_remove_key}</option>
              <option value="addKey">{t.button_add_key}</option>
              <option value="renameKey">{t.button_rename_key}</option>
            </select>
          </div>
          {jsonKeys.length > 0 &&
            selectedOption !== 'format' &&
            selectedOption !== 'minify' &&
            selectedOption !== 'addKey' && (
              <div className="select-box">
                <span>{t.key}</span>
                <select
                  id="keys-select"
                  className="output-button"
                  name="key"
                  onChange={(e) => setKey(e.target.value)}
                  value={key}
                  disabled={!result || !validJson}
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
              <span>{t.new_key}</span>
              <input
                id="new-key"
                name="new-value"
                type="text"
                className="output-button"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                disabled={!result || !validJson}
                placeholder="..."
                autoComplete="off"
              />
            </div>
          )}
          {selectedOption === 'addKey' && (
            <div className="select-box">
              <span className="select-box-title">{t.new_key_value}</span>
              <select
                name="new-key-value"
                id="new-key-value"
                className="output-button"
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                disabled={!result || !validJson}
              >
                <option value="null">null</option>
                <option value="true">True</option>
                <option value="false">False</option>
                <option value="string">String</option>
              </select>
            </div>
          )}
          {selectedOption === 'addKey' && newKeyValue === 'string' && (
            <div className="select-box">
              <span>{t.new_key_string_value}</span>
              <input
                name="newkey-string-value"
                type="text"
                id="newkey-string-value"
                className="output-button"
                value={newKeyStringValue}
                onChange={(e) => setNewKeyStringValue(e.target.value)}
                disabled={!result || !validJson}
                placeholder="..."
                autoComplete="off"
              />
            </div>
          )}
        </form>

        <div className="output-buttons">
          <button
            onClick={handleCopy}
            disabled={!result || isProcessing || !validJson}
            className={`output-button copy-btn ${copySuccess ? 'success' : ''}`}
          >
            {copySuccess ? `✓ ${t.copy_success}!` : t.copy_button}
          </button>

          <button
            onClick={handleDownload}
            disabled={!result || isProcessing || !validJson}
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
        <span>
          {stats.keys} {t.stats_keys}
        </span>
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
