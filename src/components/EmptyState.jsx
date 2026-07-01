const EmptyState = ({
  icon: Icon,
  title = 'No data found',
  description = 'There is nothing to display here yet.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-5">
      {Icon && (
        <div className="empty-state-icon">
          <Icon />
        </div>
      )}
      <h5 className="fw-semibold mb-2">{title}</h5>
      <p className="text-secondary mb-3">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
