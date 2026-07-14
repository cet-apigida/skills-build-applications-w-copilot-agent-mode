import { useEffect, useState } from 'react';

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

function Workouts() {
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchWorkouts() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Workouts request failed with ${response.status}`);
        }

        const payload = await response.json();

        if (!ignore) {
          setItems(normalizeItems(payload));
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to fetch workouts');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchWorkouts();

    return () => {
      ignore = true;
    };
  }, [apiEndpoint]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {loading && <p className="mb-0">Loading workouts...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Goal</th>
                  <th>Intensity</th>
                  <th>Scheduled For</th>
                </tr>
              </thead>
              <tbody>
                {items.map((workout) => (
                  <tr key={workout._id || `${workout.title}-${workout.scheduledFor}`}>
                    <td>{workout.title || 'N/A'}</td>
                    <td>{workout.goal || 'N/A'}</td>
                    <td>{workout.intensity || 'N/A'}</td>
                    <td>
                      {workout.scheduledFor ? new Date(workout.scheduledFor).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="mt-3 mb-0">No workouts found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
