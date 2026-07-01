import { Link, useLocation } from 'react-router-dom';
import {
  FiGrid,
  FiTrendingDown,
  FiTrendingUp,
  FiList,
  FiBarChart2,
  FiCpu,
  FiUser,
  FiSettings,
  FiX,
} from 'react-icons/fi';
import { APP_NAME, NAV_ITEMS } from '../utils/constants';

const iconMap = {
  dashboard: FiGrid,
  expense: FiTrendingDown,
  income: FiTrendingUp,
  transactions: FiList,
  reports: FiBarChart2,
  ai: FiCpu,
  profile: FiUser,
  settings: FiSettings,
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {isOpen && <div className="sidebar-overlay d-lg-none" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="p-4 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/dashboard" className="text-decoration-none d-flex align-items-center gap-2">
              <div className="auth-logo">S</div>
              <div>
                <h6 className="text-white mb-0 fw-bold">{APP_NAME}</h6>
                <small className="text-white-50">Expense Tracker</small>
              </div>
            </Link>
            <button
              type="button"
              className="btn btn-link text-white d-lg-none p-0"
              onClick={onClose}
            >
              <FiX size={22} />
            </button>
          </div>
        </div>

        <nav className="p-3">
          <ul className="list-unstyled mb-0">
            {NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path} className="mb-1">
                  <Link
                    to={item.path}
                    className={`d-flex align-items-center gap-3 px-3 py-2 rounded text-decoration-none ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-white-50 hover-bg-secondary'
                    }`}
                    style={!isActive ? { transition: 'all 0.2s' } : {}}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {Icon && <Icon size={18} />}
                    <span className="small fw-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <div className="rounded p-3" style={{ background: 'rgba(37,99,235,0.15)' }}>
            <p className="text-white small mb-1 fw-semibold">AI Powered Insights</p>
            <p className="text-white-50 small mb-2">Get smart budget suggestions</p>
            <Link to="/ai-insights" className="btn btn-primary btn-sm w-100" onClick={onClose}>
              View Insights
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
