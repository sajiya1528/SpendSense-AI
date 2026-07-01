const StatisticsCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'primary', subtitle }) => {
  const colorMap = {
    primary: { bg: 'rgba(37,99,235,0.12)', text: '#2563EB' },
    success: { bg: 'rgba(34,197,94,0.12)', text: '#22C55E' },
    danger: { bg: 'rgba(239,68,68,0.12)', text: '#EF4444' },
    warning: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B' },
    secondary: { bg: 'rgba(15,23,42,0.08)', text: '#0F172A' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <div className="card-custom p-4 h-100">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="text-secondary small mb-1 fw-medium">{title}</p>
          <h4 className="fw-bold mb-1">{value}</h4>
          {subtitle && <p className="text-secondary small mb-0">{subtitle}</p>}
          {trend !== undefined && (
            <span
              className={`small fw-medium ${trend >= 0 ? 'text-success' : 'text-danger'}`}
            >
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
            </span>
          )}
        </div>
        {Icon && (
          <div className="stat-card-icon" style={{ background: colors.bg, color: colors.text }}>
            <Icon />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;
