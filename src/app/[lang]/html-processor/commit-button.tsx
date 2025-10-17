import { useTextStore } from '@/store/text-store';

export default function CommitButton() {
  const { originalText, processedText, commitProcessedToOriginal } =
    useTextStore();

  const hasChanges = processedText.trim() !== originalText.trim();

  if (!hasChanges) return null;

  return (
    <button className="output__commit" onClick={commitProcessedToOriginal}>
      <img src="/arrow_left.svg" alt="" />
    </button>
  );
}
