import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlus, FiInbox } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import ConfirmationModal from '../components/ConfirmationModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../utils/constants';
import { dummyExpenses } from '../utils/dummyData';
import { usePagination } from '../hooks/usePagination';

const AddExpense = () => {
  const [expenses, setExpenses] = useState(dummyExpenses);
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
      paymentMethod: 'UPI',
    },
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        !search ||
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, categoryFilter]);

  const { currentPage, totalPages, paginatedItems, goToPage, resetPage, totalItems, itemsPerPage } =
    usePagination(filteredExpenses);

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
      paymentMethod: 'UPI',
    });
    setShowForm(true);
  };

  const openEditForm = (expense) => {
    setEditTarget(expense);
    reset({
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      description: expense.description,
      paymentMethod: expense.paymentMethod,
    });
    setShowForm(true);
  };

  const onSubmit = (data) => {
    if (editTarget) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === editTarget.id
            ? { ...e, ...data, amount: parseFloat(data.amount), type: 'expense' }
            : e
        )
      );
      toast.success('Expense updated successfully');
    } else {
      const newExpense = {
        id: Date.now(),
        type: 'expense',
        ...data,
        amount: parseFloat(data.amount),
      };
      setExpenses((prev) => [newExpense, ...prev]);
      toast.success('Expense added successfully');
    }
    setShowForm(false);
    reset();
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setExpenses((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      toast.success('Expense deleted successfully');
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Expenses"
        subtitle="Track and manage your spending"
        actionLabel={showForm ? undefined : 'Add Expense'}
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
          <h6 className="fw-semibold mb-3">{editTarget ? 'Edit Expense' : 'Add New Expense'}</h6>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-medium">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="e.g. Grocery Shopping"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-medium">Category</label>
                <select
                  className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select category</option>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
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
                  placeholder="Add a note about this expense..."
                  {...register('description')}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  {editTarget ? 'Update Expense' : 'Save Expense'}
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
            placeholder="Search expenses..."
          />
        </div>
        <div className="col-lg-8">
          <FilterBar
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(val) => { setCategoryFilter(val); resetPage(); }}
            categories={EXPENSE_CATEGORIES}
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
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th className="text-end">Amount</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <div className="fw-medium">{expense.title}</div>
                      <small className="text-secondary">{expense.description}</small>
                    </td>
                    <td><span className="badge badge-danger-custom">{expense.category}</span></td>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.paymentMethod}</td>
                    <td className="text-end text-danger fw-semibold">{formatCurrency(expense.amount)}</td>
                    <td className="text-end">
                      <button type="button" className="btn btn-sm btn-outline-secondary me-1" onClick={() => openEditForm(expense)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setDeleteTarget(expense)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={FiInbox}
            title="No expenses found"
            description="Start by adding your first expense or adjust your filters."
            actionLabel="Add Expense"
            onAction={openAddForm}
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

      <ConfirmationModal
        show={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
};

export default AddExpense;
