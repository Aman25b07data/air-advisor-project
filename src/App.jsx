import { useState } from 'react';
import './App.css';


import OnboardingForm from './OnboardingForm';
import TodayView from './TodayView';
import ReportView from './ReportView';

export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('profile') || 'null');
    } catch {
      return null;
    }
  });

  const [tab, setTab] = useState('today');

  if (!profile) {
    return (
      <div className="page">
        <h1>Air Advisor</h1>
        <OnboardingForm onDone={setProfile} />
      </div>
    );
  }

  return (
    <div className="page">
      <header>
        <h1>Air Advisor</h1>
        <p>Your daily guide to healthier travel decisions.</p>
      </header>

      <div className="card">
        <p>
          <strong>Home:</strong> {profile.home.name}
        </p>
        <p>
          <strong>Destination:</strong> {profile.dest.name}
        </p>
        <p>
          <strong>Travel mode:</strong> {profile.mode}
        </p>

        <button
          onClick={() => {
            localStorage.removeItem('profile');
            setProfile(null);
          }}
        >
          Edit travel profile
        </button>
      </div>

      <nav className="tabs">
        <button
          className={tab === 'today' ? 'active' : ''}
          onClick={() => setTab('today')}
        >
          Today
        </button>

        <button
          className={tab === 'report' ? 'active' : ''}
          onClick={() => setTab('report')}
        >
          Report
        </button>
      </nav>

      {tab === 'today' && <TodayView profile={profile} />}

      {tab === 'report' && <ReportView profile={profile} />}
    </div>
  );
}