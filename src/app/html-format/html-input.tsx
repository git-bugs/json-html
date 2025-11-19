'use client';
import { useState, useRef, useEffect } from 'react';
import './html-input.scss';
import ErrorWidget from '@/components/errorWidget';
import { useHtmlStore } from '@/store/html-store';

const translation = {
  ru: {
    file_end_error: 'Пожалуйста, выберите текстовый файл',
    read_error: 'Ошибка при чтении файла',
    select_text: 'Пожалуйста, выберите текстовый файл',
    clear_button: 'Очистить',
    enter_button: 'Вставить из файла',
    textarea_placeholder:
      'Введите текст, перетащите файл, вставьте из буфера или выберите файл...',
  },
  en: {
    file_end_error: 'Please select a text file',
    read_error: 'Error reading file',
    select_text: 'Please select a text file',
    clear_button: 'Clear',
    enter_button: 'Paste from file',
    textarea_placeholder:
      'Enter text, drag and drop a file, paste from the clipboard, or select a file...',
  },
} as const;

export default function HtmlInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessege, setErrorMessage] = useState('');
  const { fileName, setFileName, original, setOriginal } = useHtmlStore();
  const [textSize, setTextSize] = useState('0 B');

  const t = translation.ru;

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
    if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {
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
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();

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

  useEffect(() => {
    const sizeInBytes = new TextEncoder().encode(original).length;
    if (sizeInBytes === 0) setTextSize('0 B');
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    setTextSize(
      parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  }, [original]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  return (
    <div className="input-container">
      <div className="input-box">
        <div className="button-panel">
          <button onClick={handleClear} className="input-button input-clear">
            {t.clear_button}
          </button>

          <label className="input-button input-file">
            {t.enter_button}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFile}
              className="hidden-input"
            />
          </label>
        </div>
        <div className="input-stats">
          {original && fileName && (
            <span className="input-name">{fileName}</span>
          )}
          {original && <span className="input-size">{textSize}</span>}
        </div>
      </div>
      <textarea
        id="input-textarea"
        value={original}
        onChange={(e) => setOriginal(e.target.value)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handleTextareaPaste}
        placeholder={t.textarea_placeholder}
        className="input-textarea"
      />
      <ErrorWidget errorMessage={errorMessege} onClose={handleCloseStatus} />
    </div>
  );
}
