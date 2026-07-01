import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
}) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-body p-4 text-center">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 56,
                  height: 56,
                  background: variant === 'danger' ? 'rgba(239,68,68,0.12)' : 'rgba(37,99,235,0.12)',
                }}
              >
                <FiAlertTriangle
                  size={24}
                  color={variant === 'danger' ? '#EF4444' : '#2563EB'}
                />
              </div>
              <h5 className="fw-semibold mb-2">{title}</h5>
              <p className="text-secondary mb-4">{message}</p>
              <div className="d-flex gap-2 justify-content-center">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  className={`btn btn-${variant}`}
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default ConfirmationModal;
