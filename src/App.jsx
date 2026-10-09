import './App.css'

const mock = {
  naqi: 287,
  band: 'Poor',
  decision: { outdoor: 'Avoid', mask: 'N95/FFP2', remote: 'Recommended' },
  exposure: { plan: 412, best: 268, savedPct: 35 },
  windows: [
    { depart: '11:30', mode: 'Metro', exposure: 268 },
    { depart: '08:30', mode: 'Metro', exposure: 340 },
    { depart: '08:30', mode: 'Bike', exposure: 412 },
  ],
}

export default function App() {
  const d = mock
  return (
    <div className="page">
      <h1>Today's Air Advice</h1>
      <div className="card">
        <p className="big">AQI {d.naqi} · {d.band}</p>
        <ul>
          <li>Outdoor activities: <b>{d.decision.outdoor}</b></li>
          <li>Mask: <b>{d.decision.mask}</b></li>
          <li>Remote day: <b>{d.decision.remote}</b></li>
        </ul>
        <p>Best option saves about {d.exposure.savedPct}% exposure.</p>
      </div>
      <h2>Best departure options</h2>
      {d.windows.map((w, i) => (
        <div className="card" key={i}>
          {w.depart} · {w.mode} · exposure {w.exposure}
        </div>
      ))}
    </div>
  )
}