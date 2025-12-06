'use client';

import { useFileStore } from '@/store/file-store';
import { useEffect, useMemo, useState } from 'react';

export default function Json() {
  const { data, option, result, jsonKeys, setOption } = useFileStore();
  const [key, setKey] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('null');
  const [newKeyStringValue, setNewKeyStringValue] = useState('');
  
  const store = useMemo(() => useFileStore.getState(), []);
  useEffect(() => {
    if (jsonKeys.length > 0) {
      setKey(jsonKeys[0]);
    }
  }, [jsonKeys]);

  useEffect(() => {
    if (!data) return;
    switch (option) {
      case 'formatJson':
        store.formatJson();
        break;
      case 'minifyJson':
        store.minifyJson();
        break;
      case 'removeJsonKey':
        store.removeJsonKey(key);
        break;
      case 'addJsonKey':
        if (newKey) {
          store.addJsonKey(newKey, newKeyValue, newKeyStringValue);
        }
        break;
      case 'renameJsonKey':
        if (newKey) {
          store.renameJsonKey(key, newKey);
        }
        break;
      default:
        break;
    }
  }, [option, key, newKey, newKeyValue, newKeyStringValue, data, store]);

  return (
    <div className="output-box">
      {option && (
        <div className="select-box">
          <span>option</span>
          <select
            name="option"
            id="option-select"
            className="output-button btn"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            aria-label="select-option"
          >
            <option value="formatJson">formatting</option>
            <option value="minifyJson">minify</option>
            <option value="removeJsonKey">remove key</option>
            <option value="addJsonKey">add key</option>
            <option value="renameJsonKey">rename key</option>
          </select>
        </div>
      )}
      {jsonKeys.length > 0 &&
        option !== 'formatJson' &&
        option !== 'minifyJson' &&
        option !== 'addJsonKey' && (
          <div className="select-box">
            <span>Key</span>
            <select
              id="keys-select"
              className="output-button"
              name="key"
              onChange={(e) => setKey(e.target.value)}
              value={key}
              disabled={!result}
              aria-label="key-select"
            >
              {jsonKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        )}
      {(option === 'addJsonKey' || option === 'renameJsonKey') && (
        <div className="select-box">
          <span>New Key name</span>
          <input
            id="new-key"
            name="new-value"
            type="text"
            className="output-button"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            disabled={!result}
            placeholder="new key name"
            autoComplete="off"
          />
        </div>
      )}
      {option === 'addJsonKey' && (
        <div className="select-box">
          <span className="select-box-title">New Key type</span>
          <select
            name="new-key-value"
            id="new-key-value"
            className="output-button"
            value={newKeyValue}
            onChange={(e) => setNewKeyValue(e.target.value)}
            disabled={!result}
            aria-label="key-type"
          >
            <option value="null">null</option>
            <option value="true">True</option>
            <option value="false">False</option>
            <option value="string">String</option>
          </select>
        </div>
      )}
      {option === 'addJsonKey' && newKeyValue === 'string' && (
        <div className="select-box">
          <span>new key value</span>
          <input
            name="newkey-string-value"
            type="text"
            id="newkey-string-value"
            className="output-button"
            value={newKeyStringValue}
            onChange={(e) => setNewKeyStringValue(e.target.value)}
            disabled={!result}
            placeholder="new key value"
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
