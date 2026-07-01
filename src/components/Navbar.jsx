import { Link } from 'react-router-dom';
import { FiMenu, FiBell, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/formatters';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-custom d-flex align-items-center px-3 px-lg-4">
      <button
        type="button"
        className="btn btn-link text-dark p-0 me-3 d-lg-none"
        onClick={onMenuClick}
      >
        <FiMenu size={22} />
      </button>

      <div className="flex-grow-1">
        <span className="text-secondary small d-none d-md-inline">
          Welcome back, <strong className="text-dark">{user?.name?.split(' ')[0]}</strong>
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button type="button" className="btn btn-link text-secondary p-0 position-relative">
          <FiBell size={20} />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: '0.6rem' }}
          >
            3
          </span>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-link text-dark text-decoration-none dropdown-toggle d-flex align-items-center gap-2 p-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold"
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #2563EB, #6366F1)',
                fontSize: '0.8rem',
              }}
            >
              {getInitials(user?.name || 'U')}
            </div>
            <span className="small fw-medium d-none d-md-inline">{user?.name}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
            <li>
              <Link className="dropdown-item small" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item small" to="/settings">
                Settings
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button type="button" className="dropdown-item small text-danger" onClick={logout}>
                <FiLogOut className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
