import { getScoreStyle, SCORE_LABELS } from '../data/adkar.js';

export default function ScoreBadge({ score, showLabel = false, size = 'md' }) {
  const style = getScoreStyle(score);
  const sizeClasses = size === 'lg' ? 'w-10 h-10 text-base font-bold' : 'w-7 h-7 text-sm font-semibold';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${sizeClasses}`}
      style={{ backgroundColor: style.bg, color: style.text }}
      title={SCORE_LABELS[score]}
    >
      {score}
      {showLabel && (
        <span className="ml-1.5 text-xs font-normal">{SCORE_LABELS[score]}</span>
      )}
    </span>
  );
}
