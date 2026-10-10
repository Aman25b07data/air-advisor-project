import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function WindowChart({ windows }) {
  const data = windows.map((w) => ({
    name: `${w.depart} ${w.mode}`,
    exposure: w.exposure
  }));

  return (
    <div style={{ height: 220, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" fontSize={11} />
          <YAxis fontSize={11} />
          <Tooltip />

          <Bar dataKey="exposure">
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? '#16a34a' : '#94a3b8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}