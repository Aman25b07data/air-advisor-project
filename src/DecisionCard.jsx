export default function DecisionCard({ d, persona }) {
  const isSchool = persona === 'school';

  // Convert the API recommendations into simple school-friendly labels.
  const outdoorAdvice =
    d.decision.outdoor === 'Avoid' ? 'No-go' : 'Go';

  const schoolRemoteAdvice =
    d.decision.remote === 'Recommended'
      ? 'Consider remote learning'
      : 'Normal school day, subject to local guidance';

  return (
    <div className="card">
      <h2>
        {isSchool ? 'School Day Advisory' : "Today's Air Advice"}
      </h2>

      <p className="big">
        AQI {d.naqi} · {d.band}
      </p>

      {isSchool ? (
        <>
          <ul>
            <li>
              Outdoor activities:{' '}
              <b>{outdoorAdvice}</b>
            </li>

            <li>
              Mask / protection:{' '}
              <b>{d.decision.mask}</b>
            </li>

            <li>
              School arrangements:{' '}
              <b>{schoolRemoteAdvice}</b>
            </li>
          </ul>

          <p>
            <b>Guidance for schools:</b> Consider moving outdoor
            activities indoors when air quality is poor. Follow
            official local advisories and school health policies.
          </p>
        </>
      ) : (
        <ul>
          <li>
            Outdoor activities: <b>{d.decision.outdoor}</b>
          </li>

          <li>
            Mask: <b>{d.decision.mask}</b>
          </li>

          <li>
            Remote day: <b>{d.decision.remote}</b>
          </li>
        </ul>
      )}

      <p>
        Best option saves about {d.exposure.savedPct}% exposure.
      </p>

      <p className="note">
        These recommendations are based on the available API data.
        Follow official health and local air-quality advisories.
      </p>
    </div>
  );
}