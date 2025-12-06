'use client';

import { useFileStore } from '@/store/file-store';
import './start.scss';
import { useEffect, useRef } from 'react';

export default function Start() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { checkFile } = useFileStore();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    checkFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      checkFile(file);
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

  return (
    <section
      className="start"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="start-box">
        <label className="start-button btn input-file">
          Import
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFile}
            className="hidden-input"
          />
        </label>
        <span>or drag and drop</span>
      </div>
    </section>
  );
}
