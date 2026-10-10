export default function DecisionCard({ d, persona }) {
  return (
    <div className="card">
      <h2>Today's Air Advice</h2>

      <p className="big">
        AQI {d.naqi} · {d.band}
      </p>

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

      <p>
        Best option saves about {d.exposure.savedPct}% exposure.
      </p>

      {persona === 'school' && (
        <p>
          <b>School guidance:</b> Follow school and local
          air-quality advisories before outdoor activities.
        </p>
      )}
    </div>
  );
}