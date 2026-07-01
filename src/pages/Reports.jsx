import { FiDownload, FiFileText, FiFile } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import IncomeExpenseChart from '../components/charts/IncomeExpenseChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import { formatCurrency } from '../utils/formatters';
import { dummyReports, incomeVsExpenseData, categoryExpenseData } from '../utils/dummyData';

const Reports = () => {
  const handleExport = (format) => {
    toast.info(`Export to ${format.toUpperCase()} will be available when backend is connected.`);
  };

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Analyze your financial data with detailed reports"
      >
        <div className="d-flex flex-wrap gap-2">
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleExport('pdf')}>
            <FiFileText className="me-1" /> Export PDF
          </button>
          <button type="button" className="btn btn-outline-success btn-sm" onClick={() => handleExport('excel')}>
            <FiFile className="me-1" /> Export Excel
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleExport('csv')}>
            <FiDownload className="me-1" /> Export CSV
          </button>
        </div>
      </PageHeader>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <IncomeExpenseChart data={incomeVsExpenseData} />
        </div>
        <div className="col-lg-4">
          <CategoryPieChart data={categoryExpenseData} />
        </div>
      </div>

      <div className="card-custom overflow-hidden">
        <div className="p-4 border-bottom">
          <h6 className="fw-semibold mb-0">Monthly Reports</h6>
        </div>
        <div className="table-responsive">
          <table className="table table-custom table-hover mb-0">
            <thead>
              <tr>
                <th>Month</th>
                <th className="text-end">Income</th>
                <th className="text-end">Expense</th>
                <th className="text-end">Savings</th>
                <th className="text-end">Savings Rate</th>
              </tr>
            </thead>
            <tbody>
              {dummyReports.monthlyReports.map((report) => {
                const savingsRate = ((report.savings / report.income) * 100).toFixed(1);
                return (
                  <tr key={report.month}>
                    <td className="fw-medium">{report.month}</td>
                    <td className="text-end text-success">{formatCurrency(report.income)}</td>
                    <td className="text-end text-danger">{formatCurrency(report.expense)}</td>
                    <td className="text-end fw-semibold">{formatCurrency(report.savings)}</td>
                    <td className="text-end">
                      <span className="badge badge-primary-custom">{savingsRate}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;
