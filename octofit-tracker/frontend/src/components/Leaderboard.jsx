import { useEffect, useState } from 'react';

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

function normalizeMeta(payload, items) {
  if (!payload || Array.isArray(payload)) {
    return { count: items.length, page: null, totalPages: null };
  }

  return {
    count: payload.count ?? items.length,
    page: payload.page ?? null,
    totalPages: payload.totalPages ?? null,
  };
}

function Leaderboard() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ count: 0, page: null, totalPages: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchLeaderboard() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`);
        }

        const payload = await response.json();
        const normalizedItems = normalizeItems(payload);

        if (!ignore) {
          setItems(normalizedItems);
          setMeta(normalizeMeta(payload, normalizedItems));
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to fetch leaderboard');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchLeaderboard();

    return () => {
      ignore = true;
    };
  }, [apiEndpoint]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <p className="text-body-secondary small">Total entries: {meta.count}</p>
        {meta.page && meta.totalPages && (
          <p className="text-body-secondary small">Page {meta.page} of {meta.totalPages}</p>
        )}
        {loading && <p className="mb-0">Loading leaderboard...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Scope</th>
                  <th>Points</th>
                  <th>Week Of</th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry) => (
                  <tr key={entry._id || `${entry.scope}-${entry.rank}-${entry.weekOf}`}>
                    <td>{entry.rank ?? 'N/A'}</td>
                    <td>{entry.scope || 'N/A'}</td>
                    <td>{entry.points ?? 'N/A'}</td>
                    <td>{entry.weekOf ? new Date(entry.weekOf).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="mt-3 mb-0">No leaderboard entries found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
