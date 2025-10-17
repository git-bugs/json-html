'use client';

import { useEffect, useState } from 'react';
import './error-widget.scss';

interface StatusWidgetProps {
  errorMessage?: string;
  onClose?: () => void;
}

export default function ErrorWidget({
  errorMessage,
  onClose,
}: StatusWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);

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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="status__widget">
      {isVisible && (
        <div className="status__widget-error">
          <span>{errorMessage || 'Error'}</span>
          <button
            className="status__widget-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_36_7"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="25"
                height="24"
              >
                <rect x="0.746269" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_36_7)">
                <path
                  d="M9.14627 17L7.74627 15.6L11.3463 12L7.74627 8.42502L9.14627 7.02502L12.7463 10.625L16.3213 7.02502L17.7213 8.42502L14.1213 12L17.7213 15.6L16.3213 17L12.7463 13.4L9.14627 17Z"
                  fill="#fff"
                />
              </g>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
