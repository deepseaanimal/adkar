import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { fetchGist, pushGist, createGist } from '../data/githubSync.js';

export default function SyncModal({ onClose }) {
  const { state, dispatch } = useApp();
  const [token, setToken] = useState(state.syncConfig.token);
  const [gistId, setGistId] = useState(state.syncConfig.gistId);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function saveConfig() {
    dispatch({ type: 'SET_SYNC_CONFIG', config: { token, gistId } });
  }

  async function handlePull() {
    if (!token || !gistId) {
      setMessage('Enter your GitHub token and Gist ID first.');
      setMessageType('error');
      return;
    }
    setBusy(true);
    setMessage('');
    saveConfig();
    try {
      const data = await fetchGist(token, gistId);
      dispatch({ type: 'LOAD_REMOTE_DATA', data });
      setMessage('Data pulled from GitHub successfully.');
      setMessageType('success');
    } catch (err) {
      setMessage(`Pull failed: ${err.message}`);
      setMessageType('error');
    } finally {
      setBusy(false);
    }
  }

  async function handlePush() {
    if (!token || !gistId) {
      setMessage('Enter your GitHub token and Gist ID first.');
      setMessageType('error');
      return;
    }
    setBusy(true);
    setMessage('');
    saveConfig();
    try {
      await pushGist(token, gistId, state.data);
      setMessage('Data pushed to GitHub successfully.');
      setMessageType('success');
    } catch (err) {
      setMessage(`Push failed: ${err.message}`);
      setMessageType('error');
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate() {
    if (!token) {
      setMessage('Enter your GitHub token first.');
      setMessageType('error');
      return;
    }
    setBusy(true);
    setMessage('');
    try {
      const newGistId = await createGist(token, state.data);
      setGistId(newGistId);
      dispatch({ type: 'SET_SYNC_CONFIG', config: { token, gistId: newGistId } });
      setMessage(`Gist created! ID: ${newGistId}`);
      setMessageType('success');
    } catch (err) {
      setMessage(`Create failed: ${err.message}`);
      setMessageType('error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
            <h2 className="font-semibold text-gray-900">GitHub Gist Sync</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Sync your ADKAR data to a private GitHub Gist so it persists across devices. You need a{' '}
          <span className="font-medium text-gray-700">personal access token</span> with{' '}
          <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">gist</span> scope.
        </p>

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              GitHub Personal Access Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gist ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={gistId}
                onChange={(e) => setGistId(e.target.value)}
                placeholder="abc123... (leave blank to create new)"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {!gistId && (
                <button
                  onClick={handleCreate}
                  disabled={busy || !token}
                  className="text-sm px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`text-sm rounded-lg px-3 py-2 mb-4 ${
              messageType === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handlePull}
            disabled={busy}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors disabled:opacity-50"
          >
            {busy ? (
              <span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 6.414V13a1 1 0 11-2 0V6.414L7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z" clipRule="evenodd" />
                <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            )}
            Pull from GitHub
          </button>
          <button
            onClick={handlePush}
            disabled={busy}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {busy ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                <path fillRule="evenodd" d="M10 17a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L9 13.586V7a1 1 0 112 0v6.586l1.293-1.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 17z" clipRule="evenodd" />
                <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            )}
            Push to GitHub
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Your token is stored only in your browser's localStorage and never sent anywhere except the GitHub API.
        </p>
      </div>
    </div>
  );
}
