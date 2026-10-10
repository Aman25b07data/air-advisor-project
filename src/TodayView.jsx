import { useEffect, useState } from 'react';
import { getAdvice } from './api';
import DecisionCard from './DecisionCard';
import WindowChart from './WindowChart';

export default function TodayView({ profile }) {
  const [state, setState] = useState({
    loading: true,
    error: '',
    data: null
  });

  const load = () => {
    setState({
      loading: true,
      error: '',
      data: null
    });

    getAdvice(profile.profileId, profile.persona, profile.home)
      .then((data) =>
        setState({
          loading: false,
          error: '',
          data
        })
      )
      .catch((e) =>
        setState({
          loading: false,
          error: e.message,
          data: null
        })
      );
  };

  useEffect(load, [profile]);

  if (state.loading) {
    return <p>Checking today's air...</p>;
  }

  if (state.error) {
    return (
      <div className="card">
        <p className="error">
          Couldn't load advice: {state.error}
        </p>
        <button onClick={load}>Try again</button>
      </div>
    );
  }

  return (
    <>
      <DecisionCard
        d={state.data}
        persona={profile.persona}
      />

      <h2>Best departure options</h2>

      <WindowChart windows={state.data.windows} />

      <p className="note">
        Lower is better. Values are estimates from forecast data.
      </p>
    </>
  );
}