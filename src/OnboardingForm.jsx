import { useState } from 'react';
import { PLACES } from './places';
import { saveProfile, isLocationSupported } from './api';

export default function OnboardingForm({ onDone }) {
  const [f, setF] = useState({
    home: PLACES[0].name,
    dest: PLACES[1].name,
    mode: 'metro',
    departTime: '08:30',
    persona: 'adult',
    remoteDays: 0
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) =>
    setF({ ...f, [k]: e.target.value });

  const place = (n) =>
    PLACES.find((p) => p.name === n);

  async function submit(e) {
    e.preventDefault();

    if (f.home === f.dest) {
      return setError('Home and destination must be different.');
    }
    if (!isLocationSupported(place(f.home))) {
        return setError('Your home location is outside our supported Delhi-NCR coverage area.');
    }

    setBusy(true);
    setError('');

    try {
      const profile = {
        home: place(f.home),
        dest: place(f.dest),
        mode: f.mode,
        departTime: f.departTime,
        persona: f.persona,
        remoteDays: Number(f.remoteDays)
      };

      const { profileId } = await saveProfile(profile);

      const saved = { ...profile, profileId };

      localStorage.setItem('profile', JSON.stringify(saved));

      onDone(saved);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="card">

      <label>
        Home
        <select value={f.home} onChange={set('home')}>
          {PLACES.map((p) => (
            <option key={p.name}>{p.name}</option>
          ))}
        </select>
      </label>

      <label>
        Work / school
        <select value={f.dest} onChange={set('dest')}>
          {PLACES.map((p) => (
            <option key={p.name}>{p.name}</option>
          ))}
        </select>
      </label>

      <label>
        How do you travel?
        <select value={f.mode} onChange={set('mode')}>
          {['metro', 'bus', 'car', 'bike', 'walk', 'auto'].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      <label>
        Usual departure
        <input
          type="time"
          value={f.departTime}
          onChange={set('departTime')}
        />
      </label>

      <label>
        I am a
        <select value={f.persona} onChange={set('persona')}>
          <option value="adult">
            Working professional / college student
          </option>
          <option value="school">
            School student (parent / admin view)
          </option>
        </select>
      </label>

      <label>
        Days I can work remotely per week
        <input
          type="number"
          min="0"
          max="5"
          value={f.remoteDays}
          onChange={set('remoteDays')}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button disabled={busy}>
        {busy ? 'Saving...' : 'Get my air advice'}
      </button>

    </form>
  );
}