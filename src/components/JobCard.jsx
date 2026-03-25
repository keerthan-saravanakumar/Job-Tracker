import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { FiEdit, FiTrash2, FiBookmark, FiMapPin, FiDollarSign, FiCalendar, FiBriefcase } from 'react-icons/fi';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import './JobCard.css';
import { useState } from 'react';

export default function JobCard({ job }) {
  const { deleteApplication, toggleBookmark } = useApplications();
  const [imgError, setImgError] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(job.id);
      toast.success('Application deleted');
    }
  };

  const domain = job.company.replace(/\s+/g, '').toLowerCase() + '.com';
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-info">
          <div className="logo-container">
            {imgError ? (
              <div className="fallback-logo"><FiBriefcase /></div>
            ) : (
              <img src={logoUrl} alt={job.company} onError={() => setImgError(true)} className="company-logo" />
            )}
          </div>
          <div>
            <h3 className="job-role">{job.role}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <div className="job-actions">
          <button className={`action-btn bookmark-btn ${job.bookmarked ? 'active' : ''}`} onClick={() => toggleBookmark(job.id)} title="Bookmark">
            <FiBookmark className={job.bookmarked ? 'fill-current' : ''} />
          </button>
          <Link to={`/applications/${job.id}`} className="action-btn edit-btn" title="Edit">
            <FiEdit />
          </Link>
          <button className="action-btn delete-btn" onClick={handleDelete} title="Delete">
            <FiTrash2 />
          </button>
        </div>
      </div>
      
      <div className="job-details">
        {job.location && (
          <div className="detail-item">
            <FiMapPin /> <span>{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="detail-item">
            <FiDollarSign /> <span>{job.salary}</span>
          </div>
        )}
        {job.appliedDate && (
          <div className="detail-item">
            <FiCalendar /> <span>Applied: {format(new Date(job.appliedDate), 'MMM dd, yyyy')}</span>
          </div>
        )}
        {job.platform && (
          <div className="detail-item">
            <span className="platform-tag">{job.platform}</span>
          </div>
        )}
      </div>
      
      <div className={`status-badge status-${job.status.toLowerCase().replace(/\s+/g, '-')}`}>
        {job.status}
      </div>
    </div>
  );
}
