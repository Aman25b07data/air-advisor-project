import { useEffect, useState } from 'react';
import { getAdvice } from './api';
import DecisionCard from './DecisionCard';
import WindowChart from './WindowChart';

export default function TodayView({ profile }) {
  const [state, setState] = useState({
    loading: true,
    error: '',
    data: null,
  });

  // Remember the selected mode across page refreshes.
  const [persona, setPersona] = useState(() => {
    return (
      localStorage.getItem('airAdvisorPersona') ||
      profile.persona ||
      'adult'
    );
  });

  const load = async () => {
    setState({
      loading: true,
      error: '',
      data: null,
    });

    try {
      const data = await getAdvice(
        profile.profileId,
        persona,
        profile.home
      );

      setState({
        loading: false,
        error: '',
        data,
      });
    } catch (e) {
      setState({
        loading: false,
        error: e.message || 'Unable to load air-quality advice.',
        data: null,
      });
    }
  };

  // Reload advice whenever the profile or selected mode changes.
  useEffect(() => {
    load();
  }, [profile, persona]);

  // Update the mode and save it locally.
  const changePersona = (newPersona) => {
    setPersona(newPersona);
    localStorage.setItem('airAdvisorPersona', newPersona);
  };

  return (
    <section>
      <div className="card">
        <h2>Choose your advisory mode</h2>

        <div className="mode-toggle">
          <button
            type="button"
            className={persona === 'adult' ? 'active' : ''}
            onClick={() => changePersona('adult')}
          >
            General Mode
          </button>

          <button
            type="button"
            className={persona === 'school' ? 'active' : ''}
            onClick={() => changePersona('school')}
          >
            School Mode
          </button>
        </div>

        <p className="note">
          {persona === 'school'
            ? 'School Mode provides guidance for parents, teachers, and school administrators.'
            : 'General Mode provides daily air-quality and travel recommendations.'}
        </p>
      </div>

      {state.loading && (
        <div className="card">
          <p>Checking today's air...</p>
        </div>
      )}

      {!state.loading && state.error && (
        <div className="card">
          <p className="error">
            Couldn't load advice: {state.error}
          </p>

          <button type="button" onClick={load}>
            Try again
          </button>
        </div>
      )}

      {!state.loading && !state.error && state.data && (
        <>
          <DecisionCard
            d={state.data}
            persona={persona}
          />

          <h2>Best departure options</h2>

          <WindowChart windows={state.data.windows || []} />

          <p className="note">
            Lower is better. Values are estimates from forecast data.
          </p>
        </>
      )}
    </section>
  );
}