import './Filters.css';

export default function Filters({ statusFilter, setStatusFilter, sortOption, setSortOption }) {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Status</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="Date Applied (Newest)">Date Applied (Newest)</option>
          <option value="Date Applied (Oldest)">Date Applied (Oldest)</option>
          <option value="Salary (High to Low)">Salary (High to Low)</option>
          <option value="Company Name (A-Z)">Company Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
}
