import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../constants';

export default function TaskFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  taskCounts
}) {
  return (
    <div className="filters-container">
      <div className="search-and-status">
        {/* Search Input */}
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks by title or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="status-tabs">
          <button
            type="button"
            className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All <span className="tab-count">{taskCounts.all}</span>
          </button>
          <button
            type="button"
            className={`status-tab ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            Active <span className="tab-count">{taskCounts.active}</span>
          </button>
          <button
            type="button"
            className={`status-tab ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed <span className="tab-count">{taskCounts.completed}</span>
          </button>
        </div>
      </div>

      <div className="category-and-sort">
        {/* Category Pills */}
        <div className="category-pills-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill ${categoryFilter === cat.id ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="sort-wrapper">
          <ArrowUpDown size={15} className="sort-icon" />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="title-asc">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
