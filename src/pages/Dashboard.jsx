import { Link } from 'react-router-dom';
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import StatisticsCard from '../components/StatisticsCard';
import DashboardCards from '../components/DashboardCards';
import TransactionCard from '../components/TransactionCard';
import IncomeExpenseChart from '../components/charts/IncomeExpenseChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlySpendingChart from '../components/charts/MonthlySpendingChart';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import {
  dummyDashboardStats,
  dummyTransactions,
  incomeVsExpenseData,
  categoryExpenseData,
  monthlySpendingData,
} from '../utils/dummyData';

const Dashboard = () => {
  const { user } = useAuth();
  const stats = dummyDashboardStats;
  const recentTransactions = dummyTransactions.slice(0, 5);

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] || 'User'}!`}
        subtitle="Here's an overview of your financial activity"
      />

      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <StatisticsCard
            title="Total Balance"
            value={formatCurrency(stats.totalBalance)}
            icon={FiDollarSign}
            color="primary"
            trend={5.2}
            trendLabel="vs last month"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsCard
            title="Total Income"
            value={formatCurrency(stats.totalIncome)}
            icon={FiTrendingUp}
            color="success"
            trend={8.1}
            trendLabel="vs last month"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsCard
            title="Total Expense"
            value={formatCurrency(stats.totalExpense)}
            icon={FiTrendingDown}
            color="danger"
            trend={-3.4}
            trendLabel="vs last month"
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatisticsCard
            title="Monthly Savings"
            value={formatCurrency(stats.monthlyIncome - stats.monthlyExpense)}
            icon={FiArrowUp}
            color="success"
            subtitle={`${stats.savingsRate}% savings rate`}
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <StatisticsCard
            title="Monthly Income"
            value={formatCurrency(stats.monthlyIncome)}
            icon={FiArrowUp}
            color="success"
          />
        </div>
        <div className="col-md-6">
          <StatisticsCard
            title="Monthly Expense"
            value={formatCurrency(stats.monthlyExpense)}
            icon={FiArrowDown}
            color="danger"
          />
        </div>
      </div>

      <DashboardCards stats={stats} />

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <IncomeExpenseChart data={incomeVsExpenseData} />
        </div>
        <div className="col-lg-4">
          <CategoryPieChart data={categoryExpenseData} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <MonthlySpendingChart data={monthlySpendingData} />
        </div>
        <div className="col-lg-6">
          <div className="card-custom p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">Recent Transactions</h6>
              <Link to="/transactions" className="small text-primary-custom text-decoration-none">
                View All
              </Link>
            </div>
            {recentTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
