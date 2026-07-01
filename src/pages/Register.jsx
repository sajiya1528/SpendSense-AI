import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen message="Creating account..." />;

  return (
    <div className="auth-card">
      <h5 className="fw-bold mb-1">Create Account</h5>
      <p className="text-secondary small mb-4">Start tracking your expenses with AI insights</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label small fw-medium">Full Name</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><FiUser className="text-secondary" /></span>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="John Doe"
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
            />
          </div>
          {errors.name && <div className="invalid-feedback d-block">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
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

        <div className="mb-3">
          <label className="form-label small fw-medium">Phone Number</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><FiPhone className="text-secondary" /></span>
            <input
              type="tel"
              className="form-control"
              placeholder="+91 98765 43210"
              {...register('phone')}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium">Password</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><FiLock className="text-secondary" /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Create a password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button type="button" className="input-group-text bg-white" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
        </div>

        <div className="mb-4">
          <label className="form-label small fw-medium">Confirm Password</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><FiLock className="text-secondary" /></span>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
          </div>
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">{errors.confirmPassword.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Create Account
        </button>

        <p className="text-center text-secondary small mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-custom fw-medium text-decoration-none">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
