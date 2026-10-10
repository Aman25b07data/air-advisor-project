import { useEffect, useState } from 'react';
import { getReport } from './api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function ReportView({ profile }) {
  const [state, setState] = useState({
    loading: true,
    error: '',
    data: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadReport() {
      setState({
        loading: true,
        error: '',
        data: null,
      });

      try {
        const data = await getReport(
          profile?.profileId,
          profile?.persona,
          profile?.home
        );

        if (!cancelled) {
          setState({
            loading: false,
            error: '',
            data,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            loading: false,
            error: error.message || 'Unable to load the report.',
            data: null,
          });
        }
      }
    }

    loadReport();

    return () => {
      cancelled = true;
    };
  }, [profile]);

  if (state.loading) {
    return <div className="card">Loading your exposure report...</div>;
  }

  if (state.error) {
    return (
      <div className="card">
        <h2>Report unavailable</h2>
        <p className="error">{state.error}</p>
        <p>
          The report uses demonstration data only when mock mode is enabled.
        </p>
      </div>
    );
  }

  const report = state.data;

  return (
    <div className="report-view">
      <h2>Your Exposure Report</h2>

      <div className="card">
        <h3>Total exposure</h3>
        <p className="big">{report.totalExposure}</p>
        <p>Sum of the estimated daily exposure values.</p>
      </div>

      <div className="card">
        <h3>Average daily exposure</h3>
        <p className="big">{report.averageDailyExposure}</p>
      </div>

      <div className="card">
        <h3>Best day</h3>
        <p>
          {report.bestDay.date} — exposure {report.bestDay.exposure}
        </p>
      </div>

      <div className="card">
        <h3>Worst day</h3>
        <p>
          {report.worstDay.date} — exposure {report.worstDay.exposure}
        </p>
      </div>

      <div className="card">
        <h3>Daily exposure</h3>

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={report.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exposure" fill="#64748b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Insights</h3>

        <ul>
          {report.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>

      <p className="note">
        This report contains illustrative estimates for demonstration purposes.
        It is not medical advice.
      </p>
    </div>
  );
}