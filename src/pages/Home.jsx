import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { ADKAR_ELEMENTS, getBarrierPoint } from '../data/adkar.js';

function InitiativeCard({ initiative }) {
  const { navigate } = useApp();
  const { assessments } = initiative;

  const barrierCounts = {};
  ADKAR_ELEMENTS.forEach((el) => (barrierCounts[el.id] = 0));
  let onTrack = 0;

  assessments.forEach((a) => {
    const barrier = getBarrierPoint(a);
    if (barrier) barrierCounts[barrier.id]++;
    else onTrack++;
  });

  const topBarrier = ADKAR_ELEMENTS.find((el) => barrierCounts[el.id] > 0);

  return (
    <button
      onClick={() => navigate('initiative', { initiativeId: initiative.id })}
      className="w-full text-left rounded-2xl border-2 p-6 bg-white hover:shadow-md transition-all duration-200 group"
      style={{ borderColor: initiative.themeColor + '40' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl mb-2">{initiative.emoji}</div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
            {initiative.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{initiative.description}</p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: initiative.themeColor }}
        >
          {assessments.length}
        </div>
      </div>

      {assessments.length > 0 ? (
        <>
          <div className="flex gap-1 mb-3">
            {ADKAR_ELEMENTS.map((el) => {
              const count = barrierCounts[el.id];
              if (!count) return null;
              return (
                <span
                  key={el.id}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white font-medium"
                  style={{ backgroundColor: el.color }}
                >
                  {el.letter} barrier: {count}
                </span>
              );
            })}
            {onTrack > 0 && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                ✓ On track: {onTrack}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            {assessments.length} team member{assessments.length !== 1 ? 's' : ''} assessed
            {topBarrier && ` · Focus area: ${topBarrier.label}`}
          </p>
        </>
      ) : (
        <p className="text-sm text-gray-400 italic">
          No assessments yet — click to get started
        </p>
      )}

      <div
        className="mt-4 text-sm font-medium flex items-center gap-1 transition-colors"
        style={{ color: initiative.themeColor }}
      >
        Open dashboard →
      </div>
    </button>
  );
}

function AdkarCard({ el }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={{ borderColor: el.border, backgroundColor: el.bg }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-5 text-left hover:brightness-95 transition-all"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: el.color }}
        >
          {el.letter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-base">{el.label}</div>
          <div className="text-sm text-gray-600 mt-0.5">{el.shortDesc}</div>
        </div>
        <svg
          viewBox="0 0 20 20"
          className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-5 pb-6 space-y-5 border-t" style={{ borderColor: el.border }}>

          {/* Definition */}
          <div className="pt-4">
            <p className="text-sm text-gray-700 leading-relaxed">{el.definition}</p>
            {el.leaderNote && (
              <p className="text-xs text-gray-500 mt-2 italic border-l-2 pl-3 mt-3" style={{ borderColor: el.color }}>
                {el.leaderNote}
              </p>
            )}
          </div>

          {/* Key points */}
          {el.keyPoints && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key points</div>
              <ul className="space-y-1.5">
                {el.keyPoints.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: el.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome questions */}
          {el.outcomeQuestions && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Questions to answer</div>
              <ul className="space-y-1.5">
                {el.outcomeQuestions.map((q, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 font-medium" style={{ color: el.color }}>Q{i + 1}</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* I-statements */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Check by I-statements
            </div>
            {el.primaryStatement && (
              <p className="text-sm font-medium text-gray-800 mb-2 italic">"{el.primaryStatement}"</p>
            )}
            <ol className="space-y-1.5 list-none">
              {el.iStatements.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-medium mt-0.5"
                    style={{ backgroundColor: el.color }}
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

function AdkarReference() {
  const [allOpen, setAllOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">ADKAR reference guide</h2>
        <button
          onClick={() => setAllOpen((o) => !o)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      <div className="space-y-3">
        {ADKAR_ELEMENTS.map((el) => (
          <AdkarCardControlled key={el.id} el={el} forceOpen={allOpen} />
        ))}
      </div>
    </div>
  );
}

function AdkarCardControlled({ el, forceOpen }) {
  const [open, setOpen] = useState(false);
  const isOpen = open || forceOpen;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: el.border, backgroundColor: el.bg }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-5 text-left hover:brightness-95 transition-all"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: el.color }}
        >
          {el.letter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-base">{el.label}</div>
          <div className="text-sm text-gray-600 mt-0.5">{el.shortDesc}</div>
        </div>
        <svg
          viewBox="0 0 20 20"
          className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 space-y-5 border-t" style={{ borderColor: el.border }}>
          <div className="pt-4">
            <p className="text-sm text-gray-700 leading-relaxed">{el.definition}</p>
            {el.leaderNote && (
              <p className="text-xs text-gray-500 italic border-l-2 pl-3 mt-3" style={{ borderColor: el.color }}>
                {el.leaderNote}
              </p>
            )}
          </div>

          {el.keyPoints && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key points</div>
              <ul className="space-y-1.5">
                {el.keyPoints.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: el.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {el.outcomeQuestions && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Questions to answer</div>
              <ul className="space-y-1.5">
                {el.outcomeQuestions.map((q, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 font-semibold" style={{ color: el.color }}>Q{i + 1}</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Check by I-statements</div>
            {el.primaryStatement && (
              <p className="text-sm font-medium text-gray-700 italic mb-3">"{el.primaryStatement}"</p>
            )}
            <ol className="space-y-2">
              {el.iStatements.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-semibold mt-0.5"
                    style={{ backgroundColor: el.color }}
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { state } = useApp();
  const { initiatives } = state.data;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Readiness Dashboard</h1>
        <p className="text-gray-500 max-w-2xl">
          Use the ADKAR model to assess where each team member is on their change journey, identify
          barrier points, and take targeted action to move the change forward.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>

      <AdkarReference />
    </div>
  );
}
