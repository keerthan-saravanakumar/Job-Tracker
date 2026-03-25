import { useState, useMemo } from 'react';
import { useApplications } from '../context/ApplicationContext';
import { useDebounce } from '../hooks/useDebounce';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import './Applications.css';

export default function Applications() {
  const { applications } = useApplications();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Date Applied (Newest)');
  const [activeTab, setActiveTab] = useState('All');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const tabs = ['All', 'Applied', 'Interview Scheduled', 'Offer Received', 'Rejected', 'Bookmarked'];

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (activeTab === 'Bookmarked') {
      result = result.filter(app => app.bookmarked);
    } else if (activeTab !== 'All') {
      result = result.filter(app => app.status === activeTab);
    }

    if (statusFilter !== 'All') {
      result = result.filter(app => app.status === statusFilter);
    }

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(lowerSearch) || 
        app.role.toLowerCase().includes(lowerSearch)
      );
    }

    result.sort((a, b) => {
      if (sortOption === 'Date Applied (Newest)') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      } else if (sortOption === 'Date Applied (Oldest)') {
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      } else if (sortOption === 'Salary (High to Low)') {
        const salA = a.salary ? parseInt(a.salary.toString().replace(/\D/g, '')) || 0 : 0;
        const salB = b.salary ? parseInt(b.salary.toString().replace(/\D/g, '')) || 0 : 0;
        return salB - salA;
      } else if (sortOption === 'Company Name (A-Z)') {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });

    return result;
  }, [applications, activeTab, statusFilter, debouncedSearch, sortOption]);

  return (
    <div className="applications-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-subtitle">Track and manage your job search process.</p>
        </div>
        <Link to="/applications/new" className="btn-primary">
          <FiPlus /> Add Job
        </Link>
      </div>

      <div className="controls-section">
        <div className="search-filter-row">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Filters 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
            sortOption={sortOption} 
            setSortOption={setSortOption} 
          />
        </div>

        <div className="tabs-container">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredApplications.length > 0 ? (
        <div className="jobs-grid">
          {filteredApplications.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No applications found</h3>
          <p>Try adjusting your search or filters, or add a new job application.</p>
        </div>
      )}
    </div>
  );
}
