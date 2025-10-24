'use client';

import { useState, useRef, useEffect } from 'react';

import './json-input.scss';
import ErrorWidget from '@/components/errorWidget';
import { useParams } from 'next/navigation';
import { Lang } from '../../../types/lang';
import { useJsonStore } from '@/store/json-store';

const translation = {
  ru: {
    file_end_error: 'Пожалуйста, выберите json файл',
    read_error: 'Ошибка при чтении файла',
    select_text: 'Пожалуйста, выберите json файл',
    clear_button: 'Очистить',
    enter_button: 'Вставить из файла',
    textarea_placeholder:
      'Введите текст, перетащите файл, вставьте из буфера или выберите файл...',
  },
  en: {
    file_end_error: 'Please select a json file',
    read_error: 'Error reading file',
    select_text: 'Please select a json file',
    clear_button: 'Clear',
    enter_button: 'Paste from file',
    textarea_placeholder:
      'Enter text, drag and drop a file, paste from the clipboard, or select a file...',
  },
} as const;

export default function JsonInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessege, setErrorMessage] = useState('');
  const { fileName, setFileName, originalText, setOriginal } = useJsonStore();

  const params = useParams<{ lang: Lang }>();
  const { lang } = params;
  const t = translation[lang];

  const handleCloseStatus = () => {
    setErrorMessage('');
  };

  const handleClear = () => {
    setOriginal('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFile = (file: File) => {
    if (
      !file.type.startsWith('application/json') &&
      !file.name.endsWith('.json')
    ) {
      setErrorMessage(t.file_end_error);
      return;
    }
    const name = file.name;
    setFileName(name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setOriginal(content);
    };
    reader.onerror = () => {
      setErrorMessage(t.read_error);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      readFile(file);
    }
  };

  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };
    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
    return () => {
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  const handleTextareaPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            readFile(file);
            return;
          }
        }
      }
    }
  };

  function calculateTextSize(text: string) {
    const sizeInBytes = new TextEncoder().encode(originalText).length;
    if (sizeInBytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    return (
      parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  return (
    <div className="input__container">
      <div className="input__box">
        <div className="button__panel">
          <button onClick={handleClear} className="input__button input__clear">
            {t.clear_button}
          </button>

          <label className="input__button input__file">
            {t.enter_button}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFile}
              className="hidden__input"
            />
          </label>
        </div>
        <div className="input__stats">
          {originalText != '' && (
            <span className="input__name">{fileName}</span>
          )}
          <span className="input__size">{calculateTextSize(originalText)}</span>
        </div>
      </div>
      <textarea
        id="input__textarea"
        value={originalText}
        onChange={(e) => setOriginal(e.target.value)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handleTextareaPaste}
        placeholder={t.textarea_placeholder}
        className="input__textarea"
      />
      <ErrorWidget errorMessage={errorMessege} onClose={handleCloseStatus} />
    </div>
  );
}
