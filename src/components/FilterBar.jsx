import { DATE_FILTERS } from '../utils/constants';

const FilterBar = ({
  dateFilter,
  onDateFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories = [],
  typeFilter,
  onTypeFilterChange,
  showTypeFilter = false,
  onReset,
}) => {
  return (
    <div className="filter-bar">
      <div className="row g-3 align-items-end">
        <div className="col-md-3 col-sm-6">
          <label className="form-label small text-secondary mb-1">Date Range</label>
          <select
            className="form-select form-select-sm"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
          >
            {DATE_FILTERS.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 0 && (
          <div className="col-md-3 col-sm-6">
            <label className="form-label small text-secondary mb-1">Category</label>
            <select
              className="form-select form-select-sm"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {showTypeFilter && (
          <div className="col-md-3 col-sm-6">
            <label className="form-label small text-secondary mb-1">Type</label>
            <select
              className="form-select form-select-sm"
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        )}

        <div className="col-md-3 col-sm-6">
          <button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={onReset}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
