import { useApp } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import InitiativeDashboard from './pages/InitiativeDashboard.jsx';
import ChangeSetup from './pages/ChangeSetup.jsx';
import AssessmentForm from './pages/AssessmentForm.jsx';
import PersonView from './pages/PersonView.jsx';

function PageContent() {
  const { state } = useApp();

  switch (state.page) {
    case 'home':
      return <Home />;
    case 'initiative':
      return <InitiativeDashboard />;
    case 'change-setup':
      return <ChangeSetup />;
    case 'add-assessment':
      return <AssessmentForm />;
    case 'edit-assessment':
      return <AssessmentForm />;
    case 'person-view':
      return <PersonView />;
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <PageContent />
      </main>
    </div>
  );
}
