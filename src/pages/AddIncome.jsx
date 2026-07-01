import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FiInbox } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import IncomeCard from '../components/IncomeCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import ConfirmationModal from '../components/ConfirmationModal';
import { INCOME_SOURCES, PAYMENT_METHODS } from '../utils/constants';
import { dummyIncomes } from '../utils/dummyData';
import { usePagination } from '../hooks/usePagination';

const AddIncome = () => {
  const [incomes, setIncomes] = useState(dummyIncomes);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: 'Bank Transfer',
    },
  });

  const filteredIncomes = useMemo(() => {
    return incomes.filter((income) => {
      const matchesSearch =
        !search ||
        income.title.toLowerCase().includes(search.toLowerCase()) ||
        income.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || income.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [incomes, search, categoryFilter]);

  const { currentPage, totalPages, paginatedItems, goToPage, resetPage, totalItems, itemsPerPage } =
    usePagination(filteredIncomes);

  const handleResetFilters = () => {
    setSearch('');
    setDateFilter('all');
    setCategoryFilter('all');
    resetPage();
  };

  const openAddForm = () => {
    setEditTarget(null);
    reset({
      title: '',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: 'Bank Transfer',
    });
    setShowForm(true);
  };

  const onSubmit = (data) => {
    if (editTarget) {
      setIncomes((prev) =>
        prev.map((i) =>
          i.id === editTarget.id
            ? { ...i, ...data, amount: parseFloat(data.amount), type: 'income' }
            : i
        )
      );
      toast.success('Income updated successfully');
    } else {
      const newIncome = {
        id: Date.now(),
        type: 'income',
        ...data,
        amount: parseFloat(data.amount),
      };
      setIncomes((prev) => [newIncome, ...prev]);
      toast.success('Income added successfully');
    }
    setShowForm(false);
    reset();
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setIncomes((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      toast.success('Income deleted successfully');
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Income"
        subtitle="Track your earnings and income sources"
        actionLabel={showForm ? undefined : 'Add Income'}
        onAction={showForm ? undefined : openAddForm}
      >
        {showForm && (
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        )}
      </PageHeader>

      {showForm && (
        <div className="card-custom p-4 mb-4">
          <h6 className="fw-semibold mb-3">{editTarget ? 'Edit Income' : 'Add New Income'}</h6>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-medium">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="e.g. Monthly Salary"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-medium">Source</label>
                <select
                  className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  {...register('category', { required: 'Source is required' })}
                >
                  <option value="">Select source</option>
                  {INCOME_SOURCES.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-medium">Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                  placeholder="0.00"
                  {...register('amount', {
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' },
                  })}
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount.message}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-medium">Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-medium">Payment Method</label>
                <select className="form-select" {...register('paymentMethod')}>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small fw-medium">Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Add a note about this income..."
                  {...register('description')}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-success">
                  {editTarget ? 'Update Income' : 'Save Income'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-lg-4">
          <SearchBar
            value={search}
            onChange={(val) => { setSearch(val); resetPage(); }}
            placeholder="Search income..."
          />
        </div>
        <div className="col-lg-8">
          <FilterBar
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(val) => { setCategoryFilter(val); resetPage(); }}
            categories={INCOME_SOURCES}
            onReset={handleResetFilters}
          />
        </div>
      </div>

      {paginatedItems.length > 0 ? (
        <>
          <div className="row">
            {paginatedItems.map((income) => (
              <div key={income.id} className="col-lg-6">
                <IncomeCard
                  income={income}
                  onEdit={(item) => {
                    setEditTarget(item);
                    reset({
                      title: item.title,
                      category: item.category,
                      amount: item.amount,
                      date: item.date,
                      description: item.description,
                      paymentMethod: item.paymentMethod,
                    });
                    setShowForm(true);
                  }}
                  onDelete={setDeleteTarget}
                />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        <div className="card-custom">
          <EmptyState
            icon={FiInbox}
            title="No income records found"
            description="Start by adding your first income or adjust your filters."
            actionLabel="Add Income"
            onAction={openAddForm}
          />
        </div>
      )}

      <ConfirmationModal
        show={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Income"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
};

export default AddIncome;
