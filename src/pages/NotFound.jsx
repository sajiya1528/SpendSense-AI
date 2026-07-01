import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div>
        <h1 className="display-1 fw-bold text-primary-custom mb-0">404</h1>
        <h4 className="fw-semibold mb-2">Page Not Found</h4>
        <p className="text-secondary mb-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="d-flex gap-2 justify-content-center">
          <Link to="/dashboard" className="btn btn-primary">
            <FiHome className="me-2" />
            Go to Dashboard
          </Link>
          <button type="button" className="btn btn-outline-secondary" onClick={() => window.history.back()}>
            <FiArrowLeft className="me-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
