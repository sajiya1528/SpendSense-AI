import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CategoryPieChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return (
      <div className="bg-white border rounded shadow-sm p-2 small">
        <p className="fw-semibold mb-0">{item.name}</p>
        <p className="mb-0" style={{ color: item.payload.color }}>
          {formatCurrency(item.value)}
        </p>
      </div>
    );
  };

  return (
    <div className="chart-container h-100">
      <h6 className="fw-semibold mb-3">Expense by Category</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
