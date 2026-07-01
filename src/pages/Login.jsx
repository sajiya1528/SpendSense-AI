import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen message="Signing in..." />;

  return (
    <div className="auth-card">
      <h5 className="fw-bold mb-1">Sign In</h5>
      <p className="text-secondary small mb-4">Enter your credentials to access your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label small fw-medium">Email Address</label>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FiMail className="text-secondary" />
            </span>
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

        <div className="mb-3">
          <label className="form-label small fw-medium">Password</label>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FiLock className="text-secondary" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              className="input-group-text bg-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password.message}</div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" {...register('remember')} />
            <label className="form-check-label small" htmlFor="remember">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="small text-primary-custom text-decoration-none">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Sign In
        </button>

        <p className="text-center text-secondary small mb-0">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary-custom fw-medium text-decoration-none">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
