import { useJsonStore } from '@/store/json-store';

export default function CommitButton() {
  const { original, result, commitProcessedToOriginal } = useJsonStore();

  const hasChanges = result.trim() !== original.trim();

  if (!hasChanges) return null;

  return (
    <button className="output-commit" onClick={commitProcessedToOriginal}>
      <img src="/arrow_left.svg" alt="" />
    </button>
  );
}
