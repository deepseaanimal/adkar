import { useApp } from '../context/AppContext.jsx';

export default function Header() {
  const { state, navigate, getInitiative } = useApp();
  const { page, params } = state;

  const crumbs = [{ label: 'Home', page: 'home', params: {} }];

  if (params.initiativeId) {
    const initiative = getInitiative(params.initiativeId);
    crumbs.push({
      label: `${initiative.emoji} ${initiative.name}`,
      page: 'initiative',
      params: { initiativeId: params.initiativeId },
    });
  }

  if (page === 'change-setup') crumbs.push({ label: 'Change Definition', page: null });
  if (page === 'add-assessment') crumbs.push({ label: 'Add Team Member', page: null });
  if (page === 'edit-assessment') crumbs.push({ label: 'Edit Assessment', page: null });
  if (page === 'person-view') {
    const initiative = getInitiative(params.initiativeId);
    const person = initiative?.assessments[params.assessmentIndex];
    if (person) crumbs.push({ label: person.name, page: null });
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="font-semibold text-gray-900 text-sm sm:text-base">
            ADKAR Change Navigator
          </span>
        </button>

        {crumbs.length > 1 && (
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 overflow-x-auto">
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                {i > 0 && <span className="text-gray-300">›</span>}
                {crumb.page && i < crumbs.length - 1 ? (
                  <button
                    onClick={() => navigate(crumb.page, crumb.params)}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className={i === crumbs.length - 1 ? 'text-gray-800 font-medium' : ''}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
