'use client';

import { useEffect, useState } from 'react';
import './error.scss';
import { useParams } from 'next/navigation';
import { Lang } from '@/types/lang';

interface StatusWidgetProps {
  errorMessage?: string;
  onClose?: () => void;
}

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

export default function ErrorWidget({
  errorMessage,
  onClose,
}: StatusWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);

  const params = useParams<{ lang: Lang }>();
  const { lang } = params;
  const t = translation[lang];

  useEffect(() => {
    if (errorMessage !== '') {
      setIsVisible(true);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (errorMessage !== '') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 5000); // Автоматически скрыть через 5 секунд

      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="status-widget">
      {/* {isLoading && (
        <div className="status-widget__loading">
          <div className="status-widget__spinner"></div>
          <span>Отправка статьи...</span>
        </div>
      )}

      {isSuccess && (
        <div className="status-widget__success">
          <div className="status-widget__icon">✅</div>
          <span>{successMessage}</span>
          <button 
            className="status-widget__close"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      )} */}

      {isVisible && (
        <div className="status-widget__error">
          <div className="status-widget__icon">❌</div>
          <span>{errorMessage || 'Произошла ошибка'}</span>
          <button
            className="status-widget__close"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
