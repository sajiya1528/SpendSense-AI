import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '' } });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    toast.success(`Reset link sent to ${data.email}`);
  };

  return (
    <div className="auth-card">
      <Link to="/login" className="text-secondary text-decoration-none small d-inline-flex align-items-center mb-3">
        <FiArrowLeft className="me-1" /> Back to login
      </Link>

      {!submitted ? (
        <>
          <h5 className="fw-bold mb-1">Forgot Password</h5>
          <p className="text-secondary small mb-4">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="form-label small fw-medium">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FiMail className="text-secondary" /></span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                  })}
                />
              </div>
              {errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-3">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: 64, height: 64, background: 'rgba(34,197,94,0.12)' }}
          >
            <FiMail size={28} color="#22C55E" />
          </div>
          <h5 className="fw-bold mb-2">Check Your Email</h5>
          <p className="text-secondary small mb-4">
            We&apos;ve sent a password reset link to your email address. Please check your inbox.
          </p>
          <Link to="/login" className="btn btn-primary">
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
