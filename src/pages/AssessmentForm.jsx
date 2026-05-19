import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { ADKAR_ELEMENTS, SCORE_LABELS } from '../data/adkar.js';
import { createBlankAssessment } from '../data/storage.js';

function ScoreSelector({ element, value, onChange }) {
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`flex-1 min-w-0 py-2.5 px-1 rounded-xl border-2 text-sm font-semibold transition-all ${
                selected ? 'text-white shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
              style={
                selected
                  ? { backgroundColor: element.color, borderColor: element.color }
                  : {}
              }
            >
              <div className="text-base font-bold">{n}</div>
              <div className={`text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-gray-400'}`}>
                {SCORE_LABELS[n]}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 italic">{element.scoringGuide[value]}</p>
    </div>
  );
}

function ElementSection({ element, data, onChange }) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ backgroundColor: element.bg, borderColor: element.border }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
            style={{ backgroundColor: element.color }}
          >
            {element.letter}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{element.label}</h3>
            <p className="text-xs text-gray-500">{element.shortDesc}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowGuide((s) => !s)}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 whitespace-nowrap ml-4"
        >
          {showGuide ? 'Hide guide' : 'Show guide'}
        </button>
      </div>

      <div
        className="text-sm text-gray-600 mb-4 bg-white/60 rounded-lg px-3 py-2 border"
        style={{ borderColor: element.border }}
      >
        <strong className="text-gray-700">Key question:</strong> {element.keyQuestion}
      </div>

      {showGuide && (
        <div className="mb-4 bg-white/70 rounded-xl p-4 border" style={{ borderColor: element.border }}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            I-statements — check how many apply
          </p>
          <ul className="space-y-1.5">
            {element.iStatements.map((stmt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-gray-300 bg-white" />
                {stmt}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-3 italic">{element.leaderNote}</p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Score (1 = not started, 5 = fully achieved)</p>
        <ScoreSelector element={element} value={data.score} onChange={(v) => onChange({ ...data, score: v })} />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-1">
          Notes <span className="font-normal text-gray-400">(observations, evidence, context)</span>
        </label>
        <textarea
          className="w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
          style={{ borderColor: element.border, '--tw-ring-color': element.color }}
          rows={2}
          value={data.notes}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={`What have you observed about this person's ${element.label.toLowerCase()}?`}
        />
      </div>
    </div>
  );
}

export default function AssessmentForm() {
  const { state, dispatch, navigate, getInitiative } = useApp();
  const { initiativeId, assessmentIndex } = state.params;
  const initiative = getInitiative(initiativeId);

  const existing =
    assessmentIndex != null ? initiative.assessments[assessmentIndex] : null;

  const [form, setForm] = useState(
    existing ? JSON.parse(JSON.stringify(existing)) : createBlankAssessment()
  );

  const isEdit = existing != null;

  function updateElement(id, data) {
    setForm((f) => ({ ...f, [id]: data }));
  }

  function handleSave() {
    if (!form.name.trim()) {
      alert('Please enter a name for this team member.');
      return;
    }
    dispatch({
      type: 'SAVE_ASSESSMENT',
      initiativeId,
      assessmentIndex: isEdit ? assessmentIndex : null,
      assessment: form,
    });
    navigate('person-view', { initiativeId, assessmentIndex: isEdit ? assessmentIndex : initiative.assessments.length });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {isEdit ? 'Edit assessment' : 'Add team member'}
        </h1>
        <p className="text-sm text-gray-500">
          Rate each ADKAR element from 1–5 based on your observations and conversations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Alex Johnson"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role / title
            </label>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              placeholder="e.g. Account Manager"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {ADKAR_ELEMENTS.map((el) => (
          <ElementSection
            key={el.id}
            element={el}
            data={form[el.id]}
            onChange={(data) => updateElement(el.id, data)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: initiative.themeColor }}
        >
          {isEdit ? 'Save changes' : 'Save assessment'}
        </button>
        <button
          onClick={() => navigate('initiative', { initiativeId })}
          className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
