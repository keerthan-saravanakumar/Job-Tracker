import { useApplications } from '../context/ApplicationContext';
import { StatusPieChart } from '../components/Charts';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard() {
  const { applications } = useApplications();

  const total = applications.length;
  const interviewing = applications.filter(a => a.status === 'Interview Scheduled').length;
  const offers = applications.filter(a => a.status === 'Offer Received').length;

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 3);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's an overview of your job search.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-left">
          <div className="stats-container">
            <div className="dash-stat">
              <div className="dash-stat-icon bg-blue"><FiBriefcase /></div>
              <div>
                <h4>Total Applied</h4>
                <p>{total}</p>
              </div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-icon bg-amber"><FiCalendar /></div>
              <div>
                <h4>Interviewing</h4>
                <p>{interviewing}</p>
              </div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-icon bg-emerald"><FiCheckCircle /></div>
              <div>
                <h4>Offers</h4>
                <p>{offers}</p>
              </div>
            </div>
          </div>

          <div className="recent-section">
            <div className="section-header">
              <h2>Recent Applications</h2>
              <Link to="/applications" className="view-all">View All <FiArrowRight /></Link>
            </div>
            {recentApplications.length > 0 ? (
              <div className="recent-list">
                {recentApplications.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
             <div className="empty-state">
                <p>No recent applications found.</p>
             </div>
            )}
          </div>
        </div>

        <div className="dashboard-right">
          <StatusPieChart data={applications} />
          
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <Link to="/applications/new" className="action-card">
              <div className="action-icon">+</div>
              <div className="action-content">
                <h4>Add New Job</h4>
                <p>Track a new application</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
