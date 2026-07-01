import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { formatCurrency } from '../utils/formatters';

const DashboardCards = ({ stats }) => {
  return (
    <div className="card-custom p-4 mb-4">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h5 className="fw-bold mb-2">Quick Actions</h5>
          <p className="text-secondary mb-3">
            Your savings rate is <strong className="text-success">{stats.savingsRate}%</strong> this month.
            Keep tracking to reach your financial goals.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/expenses" className="btn btn-primary btn-sm">
              <FiPlus className="me-1" /> Add Expense
            </Link>
            <Link to="/income" className="btn btn-outline-success btn-sm">
              <FiPlus className="me-1" /> Add Income
            </Link>
            <Link to="/ai-insights" className="btn btn-outline-primary btn-sm">
              AI Insights <FiArrowRight className="ms-1" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4 mt-3 mt-lg-0">
          <div className="rounded p-3 text-center" style={{ background: 'rgba(37,99,235,0.08)' }}>
            <small className="text-secondary d-block mb-1">Net Savings This Month</small>
            <h4 className="fw-bold text-primary mb-0">
              {formatCurrency(stats.monthlyIncome - stats.monthlyExpense)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
