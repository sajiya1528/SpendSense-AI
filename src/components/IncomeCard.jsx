import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../utils/formatters';

const IncomeCard = ({ income, onEdit, onDelete }) => {
  return (
    <div className="card-custom p-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h6 className="mb-0 fw-semibold">{income.title}</h6>
            <span className="badge badge-success-custom">{income.category}</span>
          </div>
          <p className="text-secondary small mb-1">{income.description}</p>
          <small className="text-secondary">{formatDate(income.date)} · {income.paymentMethod}</small>
        </div>
        <div className="text-end">
          <h5 className="text-success fw-bold mb-2">+{formatCurrency(income.amount)}</h5>
          <div className="d-flex gap-1 justify-content-end">
            {onEdit && (
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(income)}>
                <FiEdit2 size={14} />
              </button>
            )}
            {onDelete && (
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(income)}>
                <FiTrash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
