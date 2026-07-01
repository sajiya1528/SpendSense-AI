const LoadingSpinner = ({ fullScreen = false, size = 'md', message = 'Loading...' }) => {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';

  const spinner = (
    <div className="text-center">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      {message && <p className="text-secondary mt-3 mb-0 small">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-overlay">{spinner}</div>;
  }

  return <div className="py-5">{spinner}</div>;
};

export default LoadingSpinner;
