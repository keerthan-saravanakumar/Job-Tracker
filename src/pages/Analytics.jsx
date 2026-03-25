import { useApplications } from '../context/ApplicationContext';
import { StatusPieChart, MonthlyBarChart } from '../components/Charts';
import { FiBriefcase, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './Analytics.css';

export default function Analytics() {
  const { applications } = useApplications();

  const total = applications.length;
  const interviewing = applications.filter(a => a.status === 'Interview Scheduled').length;
  const offers = applications.filter(a => a.status === 'Offer Received').length;
  const rejections = applications.filter(a => a.status === 'Rejected').length;

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Job Search Analytics</h1>
          <p className="page-subtitle">Visualize your job hunt progress over time.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon"><FiBriefcase /></div>
          <div className="stat-info">
            <h3>Total Applications</h3>
            <p className="stat-value">{total}</p>
          </div>
        </div>
        <div className="stat-card stat-interview">
          <div className="stat-icon"><FiCalendar /></div>
          <div className="stat-info">
            <h3>Interviews Scheduled</h3>
            <p className="stat-value">{interviewing}</p>
          </div>
        </div>
        <div className="stat-card stat-offer">
          <div className="stat-icon"><FiCheckCircle /></div>
          <div className="stat-info">
            <h3>Offers Received</h3>
            <p className="stat-value">{offers}</p>
          </div>
        </div>
        <div className="stat-card stat-rejected">
          <div className="stat-icon"><FiXCircle /></div>
          <div className="stat-info">
            <h3>Rejections</h3>
            <p className="stat-value">{rejections}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <StatusPieChart data={applications} />
        <MonthlyBarChart data={applications} />
      </div>
    </div>
  );
}
