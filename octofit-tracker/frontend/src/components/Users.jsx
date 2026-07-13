import { useEffect, useState } from 'react';

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

function Users({ apiBaseUrl }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${apiBaseUrl}/users/`);

        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`);
        }

        const payload = await response.json();

        if (!ignore) {
          setItems(normalizeItems(payload));
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to fetch users');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {loading && <p className="mb-0">Loading users...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Fitness Level</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {items.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>{user.name || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.fitnessLevel || 'N/A'}</td>
                    <td>{user.teamName || 'Independent'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="mt-3 mb-0">No users found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;
