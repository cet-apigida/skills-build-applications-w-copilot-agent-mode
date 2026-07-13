import { useEffect, useState } from 'react';

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

function Activities({ apiBaseUrl }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchActivities() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${apiBaseUrl}/activities/`);

        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`);
        }

        const payload = await response.json();

        if (!ignore) {
          setItems(normalizeItems(payload));
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to fetch activities');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchActivities();

    return () => {
      ignore = true;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {loading && <p className="mb-0">Loading activities...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((activity) => (
                  <tr key={activity._id || `${activity.userId}-${activity.performedAt}`}>
                    <td>{activity.type || 'N/A'}</td>
                    <td>{activity.durationMinutes ?? 'N/A'}</td>
                    <td>{activity.caloriesBurned ?? 'N/A'}</td>
                    <td>
                      {activity.performedAt ? new Date(activity.performedAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="mt-3 mb-0">No activities found.</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
