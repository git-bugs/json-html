import { useHtmlStore } from '@/store/html-store';

export default function CommitButton() {
  const { originalText, processedText, commitProcessedToOriginal } =
    useHtmlStore();

  const hasChanges = processedText.trim() !== originalText.trim();

  if (!hasChanges) return null;

  return (
    <button className="output-commit" onClick={commitProcessedToOriginal}>
      <img src="/arrow_left.svg" alt="" />
    </button>
  );
}
