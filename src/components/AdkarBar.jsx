import { getScoreStyle, SCORE_LABELS } from '../data/adkar.js';

export default function AdkarBar({ element, score, notes, isBarrier }) {
  const style = getScoreStyle(score);
  const pct = (score / 5) * 100;

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${isBarrier ? 'ring-2 ring-offset-1' : ''}`}
      style={{
        borderColor: isBarrier ? element.color : element.border,
        backgroundColor: element.bg,
        ringColor: isBarrier ? element.color : 'transparent',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-sm font-bold"
            style={{ backgroundColor: element.color }}
          >
            {element.letter}
          </span>
          <span className="font-semibold text-gray-800">{element.label}</span>
          {isBarrier && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: element.color }}
            >
              Barrier point
            </span>
          )}
        </div>
        <span
          className="text-lg font-bold"
          style={{ color: style.text }}
        >
          {score}/5
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: element.color }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{element.shortDesc}</span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          {SCORE_LABELS[score]}
        </span>
      </div>

      {notes && (
        <p className="mt-2 text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-2 border border-white/80">
          {notes}
        </p>
      )}
    </div>
  );
}
