import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const MonthlySpendingChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border rounded shadow-sm p-2 small">
        <p className="fw-semibold mb-1">{label}</p>
        <p className="text-danger mb-0">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  };

  return (
    <div className="chart-container h-100">
      <h6 className="fw-semibold mb-3">Monthly Spending Trend</h6>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            strokeWidth={2}
            fill="url(#spendingGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySpendingChart;
