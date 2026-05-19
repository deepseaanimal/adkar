import { ADKAR_ELEMENTS, getBarrierPoint, getScoreStyle } from '../data/adkar.js';
import { useApp } from '../context/AppContext.jsx';

export default function TeamHeatmap({ initiative }) {
  const { navigate } = useApp();
  const { assessments } = initiative;

  if (assessments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No team members assessed yet.</p>
        <p className="text-sm mt-1">Add your first team member to see the heatmap.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-600 w-48">Team member</th>
            {ADKAR_ELEMENTS.map((el) => (
              <th key={el.id} className="py-3 px-3 text-center">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: el.color }}
                  title={el.label}
                >
                  {el.letter}
                </span>
              </th>
            ))}
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Barrier</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((a, idx) => {
            const barrier = getBarrierPoint(a);
            return (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() =>
                  navigate('person-view', {
                    initiativeId: initiative.id,
                    assessmentIndex: idx,
                  })
                }
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{a.name}</div>
                  {a.role && <div className="text-xs text-gray-400">{a.role}</div>}
                </td>
                {ADKAR_ELEMENTS.map((el) => {
                  const score = a[el.id].score;
                  const style = getScoreStyle(score);
                  const isBarrier = barrier?.id === el.id;
                  return (
                    <td key={el.id} className="py-3 px-3 text-center">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: style.bg,
                          color: style.text,
                          outline: isBarrier ? `2px solid ${el.color}` : 'none',
                          outlineOffset: isBarrier ? '2px' : '0',
                        }}
                      >
                        {score}
                      </span>
                    </td>
                  );
                })}
                <td className="py-3 px-4">
                  {barrier ? (
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: barrier.color }}
                    >
                      <span className="font-bold">{barrier.letter}</span>
                      {barrier.label}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      ✓ On track
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
