import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiCalendar, FiLock, FiCamera } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { getInitials, formatDate } from '../utils/formatters';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const newPassword = watch('newPassword');

  const onProfileSubmit = async (data) => {
    updateUser(data);
    toast.success('Profile updated successfully');
  };

  const onPasswordSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Password changed successfully');
    resetPassword();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
        toast.info('Profile picture preview updated. Backend upload pending.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <PageHeader title="Profile" subtitle="Manage your personal information and account settings" />

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card-custom p-4 text-center">
            <div className="position-relative d-inline-block mb-3">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className="profile-avatar" />
              ) : (
                <div className="profile-avatar-placeholder mx-auto">
                  {getInitials(user?.name)}
                </div>
              )}
              <button
                type="button"
                className="btn btn-primary btn-sm rounded-circle position-absolute"
                style={{ bottom: 4, right: 4, width: 32, height: 32, padding: 0 }}
                onClick={() => fileInputRef.current?.click()}
              >
                <FiCamera size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleAvatarChange}
              />
            </div>
            <h5 className="fw-bold mb-1">{user?.name}</h5>
            <p className="text-secondary small mb-3">{user?.email}</p>
            <div className="text-start">
              <div className="d-flex align-items-center gap-2 mb-2 text-secondary small">
                <FiMail size={14} />
                {user?.email}
              </div>
              <div className="d-flex align-items-center gap-2 mb-2 text-secondary small">
                <FiPhone size={14} />
                {user?.phone || 'Not provided'}
              </div>
              <div className="d-flex align-items-center gap-2 text-secondary small">
                <FiCalendar size={14} />
                Member since {formatDate(user?.memberSince)}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card-custom p-4 mb-4">
            <h6 className="fw-semibold mb-3">Personal Information</h6>
            <form onSubmit={handleSubmit(onProfileSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Phone Number</label>
                  <input type="tel" className="form-control" {...register('phone')} />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card-custom p-4">
            <h6 className="fw-semibold mb-3">
              <FiLock className="me-2" />
              Change Password
            </h6>
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label small fw-medium">Current Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordErrors.currentPassword ? 'is-invalid' : ''}`}
                    {...registerPassword('currentPassword', { required: 'Current password is required' })}
                  />
                  {passwordErrors.currentPassword && (
                    <div className="invalid-feedback">{passwordErrors.currentPassword.message}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">New Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordErrors.newPassword ? 'is-invalid' : ''}`}
                    {...registerPassword('newPassword', {
                      required: 'New password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                  />
                  {passwordErrors.newPassword && (
                    <div className="invalid-feedback">{passwordErrors.newPassword.message}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Confirm New Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordErrors.confirmPassword ? 'is-invalid' : ''}`}
                    {...registerPassword('confirmPassword', {
                      required: 'Please confirm password',
                      validate: (val) => val === newPassword || 'Passwords do not match',
                    })}
                  />
                  {passwordErrors.confirmPassword && (
                    <div className="invalid-feedback">{passwordErrors.confirmPassword.message}</div>
                  )}
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-outline-primary">
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
