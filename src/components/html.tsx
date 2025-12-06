import { useFileStore } from '@/store/file-store';
import { useEffect, useMemo } from 'react';

export default function Html() {
  const { data, option, type, result, isProcessing, setOption } =
    useFileStore();
  const store = useMemo(() => useFileStore.getState(), []);

  useEffect(() => {
    if (!data) return;
    switch (option) {
      case 'formatHtml':
        store.formatHtml();
        break;
      case 'minifyHtml':
        store.minifyHtml();
        break;
      case 'removeHtmlTags':
        store.removeHtmlTags();
        break;
      case 'escapingHtml':
        store.escapingHtml();
        break;
      case 'removeHtmlAttributes':
        store.removeHtmlAttributes();
        break;
      default:
        break;
    }
  }, [option, data, store]);

  return (
    <div className="output-box">
      {option && type === 'html' && (
        <div className="select-box">
          <span>option</span>
          <select
            name="option"
            id="options-select"
            className="options-select output-button"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            disabled={!result || isProcessing}
            aria-label="select-option"
          >
            <option value="formatHtml">formatting</option>
            <option value="minifyHtml">minify</option>
            <option value="removeHtmlAttributes">remove attributes</option>
            <option value="removeHtmlTags">remove tags</option>
            <option value="escapingHtml">escaping</option>
          </select>
        </div>
      )}
    </div>
  );
}
