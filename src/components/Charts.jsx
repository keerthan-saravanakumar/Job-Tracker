import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { format } from 'date-fns';
import './Charts.css';

const COLORS = {
  'Applied': '#3b82f6',
  'Interview Scheduled': '#f59e0b',
  'Offer Received': '#10b981',
  'Rejected': '#ef4444'
};

export function StatusPieChart({ data }) {
  const pieData = [
    { name: 'Applied', value: data.filter(a => a.status === 'Applied').length },
    { name: 'Interview Scheduled', value: data.filter(a => a.status === 'Interview Scheduled').length },
    { name: 'Offer Received', value: data.filter(a => a.status === 'Offer Received').length },
    { name: 'Rejected', value: data.filter(a => a.status === 'Rejected').length },
  ].filter(item => item.value > 0);

  return (
    <div className="chart-container">
      <h3>Application Stages</h3>
      {pieData.length > 0 ? (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="var(--surface-color)"
                strokeWidth={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px'}} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="no-data">No data available for chart</p>
      )}
    </div>
  );
}

export function MonthlyBarChart({ data }) {
  const grouped = data.reduce((acc, curr) => {
    if (!curr.appliedDate) return acc;
    const date = new Date(curr.appliedDate);
    if(isNaN(date)) return acc;

    const month = format(date, 'MMM yyyy');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(grouped).map(key => ({
    name: key,
    applications: grouped[key]
  })).sort((a,b) => new Date(a.name) - new Date(b.name));

  return (
    <div className="chart-container">
      <h3>Applications per Month</h3>
      {barData.length > 0 ? (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="var(--text-secondary)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
              <YAxis allowDecimals={false} stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
              <Tooltip cursor={{fill: 'var(--bg-color)'}} contentStyle={{backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px'}} />
              <Bar dataKey="applications" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="no-data">No data available for chart</p>
      )}
    </div>
  );
}
