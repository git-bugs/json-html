'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';

import './input.scss';
import ErrorWidget from '@/components/error';
import { useParams } from 'next/navigation';
import { Lang } from '@/types/lang';

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

export default function TextInput() {
  const [text, setText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessege, setErrorMessage] = useState('');

  const params = useParams<{ lang: Lang }>();
  const { lang } = params;
  const t = translation[lang];

  const handleCloseStatus = () => {
    setErrorMessage('');
  };

  const handleClear = () => {
    setText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {
      setErrorMessage(t.file_end_error);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.onerror = () => {
      setErrorMessage(t.read_error);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      readFile(file);
    }
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

  return (
    <div className="input__container">
      <div className="button-panel">
        <button onClick={handleClear} className="input__button">
          {t.clear_button}
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="input__button"
        >
          {t.enter_button}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".txt,text/*"
          className="file-input"
        />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
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
