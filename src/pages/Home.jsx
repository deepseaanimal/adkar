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

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Quick reference — ADKAR elements</h2>
        <div className="grid sm:grid-cols-5 gap-3">
          {ADKAR_ELEMENTS.map((el) => (
            <div
              key={el.id}
              className="rounded-xl p-3 text-center"
              style={{ backgroundColor: el.bg, borderColor: el.border, border: '1px solid' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-base mx-auto mb-2"
                style={{ backgroundColor: el.color }}
              >
                {el.letter}
              </div>
              <div className="font-semibold text-sm text-gray-800">{el.label}</div>
              <div className="text-xs text-gray-500 mt-1">{el.shortDesc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
