import { useApp } from '../context/AppContext.jsx';
import { ADKAR_ELEMENTS, getBarrierPoint } from '../data/adkar.js';
import AdkarBar from '../components/AdkarBar.jsx';

function ActionPlan({ barrier, element }) {
  if (!barrier) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl">
            ✓
          </div>
          <div>
            <h3 className="font-bold text-green-800 text-lg">On track — all elements at 4+</h3>
            <p className="text-sm text-green-600">
              Focus shifts to reinforcement — celebrate progress and sustain.
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-green-200">
          <p className="text-sm font-semibold text-green-700 mb-2">Sustaining actions:</p>
          <ul className="space-y-1.5">
            {ADKAR_ELEMENTS[4].interventions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ backgroundColor: element.bg, borderColor: element.color + '60' }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
          style={{ backgroundColor: element.color }}
        >
          {element.letter}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wide"
              style={{ backgroundColor: element.color }}
            >
              Barrier point
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg">{element.label}</h3>
          <p className="text-sm text-gray-600">{element.definition}</p>
        </div>
      </div>

      <div className="bg-white/70 rounded-xl p-4 border mb-4" style={{ borderColor: element.border }}>
        <p className="text-sm font-semibold text-gray-700 mb-1">Leader note</p>
        <p className="text-sm text-gray-600">{element.leaderNote}</p>
      </div>

      <div>
        <p className="text-sm font-bold text-gray-800 mb-3">
          Recommended actions for{' '}
          <span style={{ color: element.color }}>{element.label.toLowerCase()}</span>:
        </p>
        <ul className="space-y-2.5">
          {element.interventions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 bg-white/60 rounded-xl px-3 py-2.5 border" style={{ borderColor: element.border }}>
              <span
                className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: element.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-gray-700">{action}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 bg-white/70 rounded-xl p-4 border" style={{ borderColor: element.border }}>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          I-statements — check progress
        </p>
        <ul className="space-y-1.5">
          {element.iStatements.map((stmt, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-gray-300 bg-white" />
              {stmt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PersonView() {
  const { state, navigate, getInitiative, dispatch } = useApp();
  const { initiativeId, assessmentIndex } = state.params;
  const initiative = getInitiative(initiativeId);
  const assessment = initiative?.assessments[assessmentIndex];

  if (!assessment) return null;

  const barrier = getBarrierPoint(assessment);
  const barrierElement = barrier;

  function handleDelete() {
    if (!confirm(`Delete assessment for ${assessment.name}? This cannot be undone.`)) return;
    dispatch({ type: 'DELETE_ASSESSMENT', initiativeId, assessmentIndex });
    navigate('initiative', { initiativeId });
  }

  const lastUpdated = assessment.lastUpdated
    ? new Date(assessment.lastUpdated).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{assessment.name}</h1>
            {assessment.role && <p className="text-gray-500 mt-0.5">{assessment.role}</p>}
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-1">Last updated {lastUpdated}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate('edit-assessment', { initiativeId, assessmentIndex })
              }
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-2 rounded-lg border border-red-100 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h2 className="font-semibold text-gray-800">ADKAR Profile</h2>
        {ADKAR_ELEMENTS.map((el) => (
          <AdkarBar
            key={el.id}
            element={el}
            score={assessment[el.id].score}
            notes={assessment[el.id].notes}
            isBarrier={barrier?.id === el.id}
          />
        ))}
      </div>

      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Action plan</h2>
        <ActionPlan barrier={barrier} element={barrierElement} />
      </div>
    </div>
  );
}
