import { useEffect, useState } from 'react';

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

function Teams() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchTeams() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Teams request failed with ${response.status}`);
        }

        const payload = await response.json();

        if (!ignore) {
          setItems(normalizeItems(payload));
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to fetch teams');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchTeams();

    return () => {
      ignore = true;
    };
  }, [apiEndpoint]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {loading && <p className="mb-0">Loading teams...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>City</th>
                  <th>Captain</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {items.map((team) => (
                  <tr key={team._id || team.name}>
                    <td>{team.name || 'N/A'}</td>
                    <td>{team.city || 'N/A'}</td>
                    <td>{team.captainName || 'N/A'}</td>
                    <td>{Array.isArray(team.memberIds) ? team.memberIds.length : 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="mt-3 mb-0">No teams found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
