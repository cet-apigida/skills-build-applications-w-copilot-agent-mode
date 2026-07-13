import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const codespaceApiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`;
const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? codespaceApiUrl
  : 'http://localhost:8000/api';

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell container py-4 py-md-5">
      <header className="mb-4">
        <h1 className="display-6 fw-semibold mb-2">OctoFit Tracker</h1>
        <p className="text-body-secondary mb-2">React 19 presentation tier connected to the Express API.</p>
        <p className="small mb-1">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces.
          Example: <strong>VITE_CODESPACE_NAME=my-codespace-name</strong>
        </p>
        <p className="small mb-0">
          Active API base URL: <span className="api-url">{apiBaseUrl}</span>
        </p>
      </header>

      {!import.meta.env.VITE_CODESPACE_NAME && (
        <div className="alert alert-warning" role="alert">
          VITE_CODESPACE_NAME is not set. Using localhost fallback to avoid undefined Codespaces URLs.
        </div>
      )}

      <nav className="nav nav-pills gap-2 mb-4 flex-wrap">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : 'bg-light text-dark border'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
