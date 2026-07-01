import { useState, useMemo } from 'react';
import { FiInbox } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { formatCurrency, formatDate } from '../utils/formatters';
import { EXPENSE_CATEGORIES, INCOME_SOURCES } from '../utils/constants';
import { dummyTransactions } from '../utils/dummyData';
import { usePagination } from '../hooks/usePagination';

const TransactionHistory = () => {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_SOURCES];

  const filteredTransactions = useMemo(() => {
    return dummyTransactions.filter((tx) => {
      const matchesSearch =
        !search ||
        tx.title.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, categoryFilter, typeFilter]);

  const { currentPage, totalPages, paginatedItems, goToPage, resetPage, totalItems, itemsPerPage } =
    usePagination(filteredTransactions);

  const handleResetFilters = () => {
    setSearch('');
    setDateFilter('all');
    setCategoryFilter('all');
    setTypeFilter('all');
    resetPage();
  };

  return (
    <>
      <PageHeader
        title="Transaction History"
        subtitle="View all your income and expense transactions"
      />

      <div className="row g-3 mb-4">
        <div className="col-lg-4">
          <SearchBar
            value={search}
            onChange={(val) => { setSearch(val); resetPage(); }}
            placeholder="Search transactions..."
          />
        </div>
        <div className="col-lg-8">
          <FilterBar
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(val) => { setCategoryFilter(val); resetPage(); }}
            categories={allCategories}
            typeFilter={typeFilter}
            onTypeFilterChange={(val) => { setTypeFilter(val); resetPage(); }}
            showTypeFilter
            onReset={handleResetFilters}
          />
        </div>
      </div>

      <div className="card-custom overflow-hidden">
        {paginatedItems.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-custom table-hover mb-0">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="fw-medium">{tx.title}</div>
                      <small className="text-secondary">{tx.description}</small>
                    </td>
                    <td>
                      <span className={`badge ${tx.type === 'income' ? 'badge-success-custom' : 'badge-danger-custom'}`}>
                        {tx.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td>{tx.category}</td>
                    <td>{formatDate(tx.date)}</td>
                    <td>{tx.paymentMethod}</td>
                    <td className={`text-end fw-semibold ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                      {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={FiInbox}
            title="No transactions found"
            description="Try adjusting your search or filter criteria."
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default TransactionHistory;
