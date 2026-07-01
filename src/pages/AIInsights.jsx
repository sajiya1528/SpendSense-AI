import {
  FiCpu,
  FiTarget,
  FiBarChart2,
  FiZap,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { formatCurrency } from '../utils/formatters';
import { dummyAIInsights } from '../utils/dummyData';

const priorityColors = {
  high: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444', label: 'High Priority' },
  medium: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B', label: 'Medium Priority' },
  low: { bg: 'rgba(34,197,94,0.12)', color: '#22C55E', label: 'Low Priority' },
};

const AIInsights = () => {
  const { budgetSuggestions, expenseAnalysis, savingTips, monthlySummary } = dummyAIInsights;

  return (
    <>
      <PageHeader
        title="AI Insights"
        subtitle="Smart financial recommendations powered by AI"
      />

      <div className="card-custom p-4 mb-4 ai-insight-card">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FiCpu className="text-primary-custom" size={22} />
              <h5 className="fw-bold mb-0">Monthly AI Summary</h5>
            </div>
            <p className="text-secondary mb-3">{monthlySummary.summary}</p>
            <div className="d-flex flex-wrap gap-3">
              <div>
                <small className="text-secondary d-block">AI Score</small>
                <span className="fw-bold text-primary-custom fs-4">{monthlySummary.aiScore}/100</span>
              </div>
              <div>
                <small className="text-secondary d-block">Transactions</small>
                <span className="fw-bold">{monthlySummary.transactionCount}</span>
              </div>
              <div>
                <small className="text-secondary d-block">Top Category</small>
                <span className="fw-bold">{monthlySummary.topCategory}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-3 mt-md-0">
            <div className="row g-2 text-center">
              <div className="col-4">
                <div className="rounded p-2" style={{ background: 'rgba(34,197,94,0.08)' }}>
                  <small className="text-secondary d-block">Income</small>
                  <span className="fw-semibold text-success small">{formatCurrency(monthlySummary.totalIncome)}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="rounded p-2" style={{ background: 'rgba(239,68,68,0.08)' }}>
                  <small className="text-secondary d-block">Expense</small>
                  <span className="fw-semibold text-danger small">{formatCurrency(monthlySummary.totalExpense)}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="rounded p-2" style={{ background: 'rgba(37,99,235,0.08)' }}>
                  <small className="text-secondary d-block">Saved</small>
                  <span className="fw-semibold text-primary-custom small">{formatCurrency(monthlySummary.netSavings)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card-custom p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FiTarget className="text-primary-custom" />
              <h6 className="fw-semibold mb-0">Budget Suggestions</h6>
            </div>
            {budgetSuggestions.map((item) => {
              const priority = priorityColors[item.priority];
              return (
                <div key={item.id} className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-semibold mb-0 small">{item.title}</h6>
                    <span
                      className="badge small"
                      style={{ background: priority.bg, color: priority.color }}
                    >
                      {priority.label}
                    </span>
                  </div>
                  <p className="text-secondary small mb-0">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card-custom p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FiBarChart2 className="text-primary-custom" />
              <h6 className="fw-semibold mb-0">Expense Analysis</h6>
            </div>
            {expenseAnalysis.map((item) => (
              <div key={item.id} className="d-flex align-items-start gap-3 border rounded p-3 mb-3">
                <div
                  className="stat-card-icon flex-shrink-0"
                  style={{ width: 40, height: 40, background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}
                >
                  <FiTrendingUp size={18} />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-semibold mb-1 small">{item.title}</h6>
                    <span className="fw-bold text-primary-custom">{item.metric}</span>
                  </div>
                  <p className="text-secondary small mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card-custom p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FiZap className="text-warning" />
              <h6 className="fw-semibold mb-0">Saving Tips</h6>
            </div>
            {savingTips.map((tip, index) => (
              <div key={tip.id} className="d-flex align-items-start gap-3 mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    background: 'rgba(34,197,94,0.12)',
                    color: '#22C55E',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <h6 className="fw-semibold mb-1 small">{tip.title}</h6>
                  <p className="text-secondary small mb-0">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card-custom p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FiCheckCircle className="text-success" />
              <h6 className="fw-semibold mb-0">Financial Health</h6>
            </div>
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-1">
                <small className="text-secondary">Savings Rate</small>
                <small className="fw-semibold">{monthlySummary.savingsRate}%</small>
              </div>
              <div className="progress" style={{ height: 8 }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${monthlySummary.savingsRate}%` }}
                />
              </div>
            </div>
            <div className="border rounded p-3 mb-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FiAlertCircle className="text-warning" />
                <span className="fw-semibold small">Recommendation</span>
              </div>
              <p className="text-secondary small mb-0">
                Your savings rate of {monthlySummary.savingsRate}% is excellent. Consider investing
                30% of your savings in a diversified portfolio for long-term growth.
              </p>
            </div>
            <div className="border rounded p-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FiCheckCircle className="text-success" />
                <span className="fw-semibold small">Achievement</span>
              </div>
              <p className="text-secondary small mb-0">
                You&apos;ve maintained a savings rate above 50% for 3 consecutive months. Great job!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIInsights;
