import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ChangeSetup() {
  const { state, dispatch, navigate, getInitiative } = useApp();
  const { initiativeId } = state.params;
  const initiative = getInitiative(initiativeId);

  const [form, setForm] = useState({
    description: initiative.description || '',
    currentState: initiative.currentState || '',
    futureState: initiative.futureState || '',
    adoptionChallenge: initiative.adoptionChallenge || '',
    risks: initiative.risks || '',
  });

  function handleSave() {
    dispatch({ type: 'SAVE_CHANGE_SETUP', initiativeId, changeData: form });
    navigate('initiative', { initiativeId });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{initiative.emoji}</span>
          <h1 className="text-2xl font-bold text-gray-900">Define the change</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Describe the change you are trying to implement. This context will guide your team
          assessments.
        </p>
      </div>

      <div className="space-y-5">
        <Field
          label="Change description"
          hint="A short description of the change being implemented."
          value={form.description}
          onChange={(v) => setForm((f) => ({ ...f, description: v }))}
          placeholder={`e.g. "Implementation of the new ${initiative.name}"`}
        />

        <Field
          label="Current state (From)"
          hint="Describe what things look like now — the 'before' state."
          value={form.currentState}
          onChange={(v) => setForm((f) => ({ ...f, currentState: v }))}
          placeholder="e.g. Teams are managing vendors using spreadsheets and manual email processes."
          multiline
        />

        <Field
          label="Future state (To)"
          hint="Describe what the world looks like after the change is fully adopted."
          value={form.futureState}
          onChange={(v) => setForm((f) => ({ ...f, futureState: v }))}
          placeholder="e.g. All vendor activity is managed through the Vendor 2.0 platform with automated workflows."
          multiline
        />

        <div>
          <Field
            label="Adoption challenge"
            hint={
              <>
                Describe what <em>fully adopted</em> looks like. Use the syntax:{' '}
                <strong>how/when/where + what to do + to what end.</strong>
              </>
            }
            value={form.adoptionChallenge}
            onChange={(v) => setForm((f) => ({ ...f, adoptionChallenge: v }))}
            placeholder="e.g. Confidently use Vendor 2.0 daily to manage all supplier interactions and improve procurement efficiency."
            multiline
          />
          <div className="mt-2 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            <strong>Examples:</strong> "Accurately sort recycled trash to minimise environmental
            impact" · "Confidently use AI to improve productivity" · "Successfully complete the
            degree programme to qualify for new opportunity"
          </div>
        </div>

        <Field
          label="Risks of poor adoption"
          hint="What are the costs or risks if this change is poorly adopted or not used?"
          value={form.risks}
          onChange={(v) => setForm((f) => ({ ...f, risks: v }))}
          placeholder="e.g. Loss of data integrity, wasted investment, failure to meet compliance requirements, rework..."
          multiline
        />
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={handleSave}
          className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: initiative.themeColor }}
        >
          Save change definition
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

function Field({ label, hint, value, onChange, placeholder, multiline }) {
  return (
    <div>
      <label className="block font-semibold text-gray-800 mb-1">{label}</label>
      {hint && <p className="text-sm text-gray-500 mb-2">{hint}</p>}
      {multiline ? (
        <textarea
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
