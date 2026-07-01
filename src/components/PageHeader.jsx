const PageHeader = ({ title, subtitle, action, actionLabel, onAction, children }) => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
      <div>
        <h4 className="fw-bold mb-1">{title}</h4>
        {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
      </div>
      <div className="d-flex gap-2 align-items-center">
        {children}
        {actionLabel && onAction && (
          <button type="button" className="btn btn-primary" onClick={onAction}>
            {actionLabel}
          </button>
        )}
        {action}
      </div>
    </div>
  );
};

export default PageHeader;
