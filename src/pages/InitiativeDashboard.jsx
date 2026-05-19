import { useApp } from '../context/AppContext.jsx';
import { ADKAR_ELEMENTS, getBarrierPoint, getScoreStyle } from '../data/adkar.js';
import TeamHeatmap from '../components/TeamHeatmap.jsx';

function BarrierSummary({ assessments }) {
  const counts = {};
  ADKAR_ELEMENTS.forEach((el) => (counts[el.id] = 0));
  let onTrack = 0;

  assessments.forEach((a) => {
    const b = getBarrierPoint(a);
    if (b) counts[b.id]++;
    else onTrack++;
  });

  const total = assessments.length;
  if (total === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
      {ADKAR_ELEMENTS.map((el) => {
        const n = counts[el.id];
        const pct = total ? Math.round((n / total) * 100) : 0;
        return (
          <div
            key={el.id}
            className="rounded-xl p-4 border"
            style={{ backgroundColor: el.bg, borderColor: el.border }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: el.color }}
              >
                {el.letter}
              </span>
              <span className="font-medium text-sm text-gray-700">{el.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: el.color }}>
              {n}
            </div>
            <div className="text-xs text-gray-500">
              {n === 0
                ? 'No barriers here'
                : `${n} person${n !== 1 ? 's' : ''} (${pct}%) blocked`}
            </div>
          </div>
        );
      })}
      <div className="rounded-xl p-4 border border-green-200 bg-green-50">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500 text-white text-xs font-bold">
            ✓
          </span>
          <span className="font-medium text-sm text-gray-700">On track</span>
        </div>
        <div className="text-2xl font-bold text-green-600">{onTrack}</div>
        <div className="text-xs text-gray-500">
          {onTrack === 0 ? 'None fully on track yet' : `${onTrack} scoring 4+ on all elements`}
        </div>
      </div>
    </div>
  );
}

export default function InitiativeDashboard() {
  const { state, navigate, getInitiative, dispatch } = useApp();
  const { initiativeId } = state.params;
  const initiative = getInitiative(initiativeId);

  if (!initiative) return null;

  const hasChangeDetails =
    initiative.currentState || initiative.futureState || initiative.adoptionChallenge;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{initiative.emoji}</span>
            <h1 className="text-2xl font-bold text-gray-900">{initiative.name}</h1>
          </div>
          <p className="text-gray-500">{initiative.description}</p>
        </div>
        <button
          onClick={() => navigate('change-setup', { initiativeId })}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Edit change definition
        </button>
      </div>

      {hasChangeDetails ? (
        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ backgroundColor: initiative.themeBg, borderColor: initiative.themeColor + '30' }}
        >
          <h2 className="font-semibold text-gray-800 mb-3">Change at a glance</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {initiative.currentState && (
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Current state (From)
                </div>
                <p className="text-gray-700">{initiative.currentState}</p>
              </div>
            )}
            {initiative.futureState && (
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Future state (To)
                </div>
                <p className="text-gray-700">{initiative.futureState}</p>
              </div>
            )}
            {initiative.adoptionChallenge && (
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Adoption challenge
                </div>
                <p className="text-gray-700">{initiative.adoptionChallenge}</p>
              </div>
            )}
          </div>
          {initiative.risks && (
            <div className="mt-3 pt-3 border-t text-sm" style={{ borderColor: initiative.themeColor + '30' }}>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Risks of poor adoption:{' '}
              </span>
              <span className="text-gray-700">{initiative.risks}</span>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('change-setup', { initiativeId })}
          className="w-full mb-6 rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-medium text-gray-600 group-hover:text-indigo-600">
            Define the change
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Add the current state, future state, and adoption challenge
          </div>
        </button>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">
            Team overview
            {initiative.assessments.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                {initiative.assessments.length} member{initiative.assessments.length !== 1 ? 's' : ''}
              </span>
            )}
          </h2>
          <button
            onClick={() => navigate('add-assessment', { initiativeId })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: initiative.themeColor }}
          >
            + Add team member
          </button>
        </div>

        {initiative.assessments.length > 0 && (
          <BarrierSummary assessments={initiative.assessments} />
        )}

        <TeamHeatmap initiative={initiative} />
      </div>
    </div>
  );
}
