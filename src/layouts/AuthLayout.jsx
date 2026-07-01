import { Outlet } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

const AuthLayout = () => {
  return (
    <div className="auth-page">
      <div className="w-100" style={{ maxWidth: 480 }}>
        <div className="text-center mb-4">
          <div className="auth-logo mx-auto mb-3">S</div>
          <h4 className="fw-bold mb-1">{APP_NAME}</h4>
          <p className="text-secondary">{APP_TAGLINE}</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
