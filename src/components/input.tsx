'use client';

import {  useMemo,  useRef } from 'react';
import './input.scss';
import { useFileStore } from '@/store/file-store';

export default function Input() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { fileName, data, checkFile } = useFileStore();

  const textSize = useMemo(() => {
    if (data) {
      const sizeInBytes = new TextEncoder().encode(data).length;
      if (sizeInBytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

      return (
        parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
      );
    }
  }, [data]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    checkFile(file);
  };

  return (
    <section className="input">
      <div className="input-box">
        <label className="input-button btn input-file">
          Import
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFile}
            className="hidden-input"
          />
        </label>
        <div className="input-stats stats">
          {data && fileName && <span className="input-name">{fileName}</span>}
          {data && <span className="input-size">{textSize}</span>}
        </div>
      </div>
      {data && (
        <div className="textarea-box">
          <textarea
            id="input-textarea"
            value={data}
            className="input-textarea"
            readOnly
          />
        </div>
      )}
    </section>
  );
}
