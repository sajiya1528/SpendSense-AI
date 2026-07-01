import { formatCurrency, formatDate } from '../utils/formatters';

const TransactionCard = ({ transaction, onClick }) => {
  const isIncome = transaction.type === 'income';

  return (
    <div
      className="card-custom p-3 mb-2 cursor-pointer"
      onClick={() => onClick?.(transaction)}
      role={onClick ? 'button' : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div
            className="stat-card-icon"
            style={{
              width: 40,
              height: 40,
              fontSize: '0.875rem',
              background: isIncome ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              color: isIncome ? '#22C55E' : '#EF4444',
            }}
          >
            {isIncome ? '+' : '−'}
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">{transaction.title}</h6>
            <small className="text-secondary">
              {transaction.category} · {formatDate(transaction.date)}
            </small>
          </div>
        </div>
        <div className="text-end">
          <span className={`fw-semibold ${isIncome ? 'text-success' : 'text-danger'}`}>
            {isIncome ? '+' : '−'}{formatCurrency(transaction.amount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
