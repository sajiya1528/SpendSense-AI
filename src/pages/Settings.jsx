import { useForm } from 'react-hook-form';
import { FiBell, FiGlobe, FiDollarSign, FiShield, FiMoon } from 'react-icons/fi';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  const [settings, setSettings] = useLocalStorage('spendsense_settings', {
    currency: 'INR',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      budgetAlerts: true,
      weeklyReport: false,
    },
    privacy: {
      twoFactor: false,
      sessionTimeout: 30,
    },
    appearance: {
      darkMode: false,
      compactView: false,
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: settings,
  });

  const onSubmit = (data) => {
    setSettings(data);
    toast.success('Settings saved successfully');
  };

  const toggleNotification = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
    toast.success('Setting updated');
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="Customize your app preferences and account settings" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card-custom p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FiGlobe className="text-primary-custom" />
                <h6 className="fw-semibold mb-0">General</h6>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-medium">Currency</label>
                <select className="form-select" {...register('currency')}>
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-medium">Language</label>
                <select className="form-select" {...register('language')}>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card-custom p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FiBell className="text-primary-custom" />
                <h6 className="fw-semibold mb-0">Notifications</h6>
              </div>
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                { key: 'budgetAlerts', label: 'Budget Alerts', desc: 'Alert when exceeding budget limits' },
                { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly spending summary' },
              ].map((item) => (
                <div key={item.key} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <div className="fw-medium small">{item.label}</div>
                    <small className="text-secondary">{item.desc}</small>
                  </div>
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.notifications[item.key]}
                      onChange={() => toggleNotification(item.key)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card-custom p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FiShield className="text-primary-custom" />
                <h6 className="fw-semibold mb-0">Privacy & Security</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
                <div>
                  <div className="fw-medium small">Two-Factor Authentication</div>
                  <small className="text-secondary">Add an extra layer of security</small>
                </div>
                <div className="form-check form-switch mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.privacy.twoFactor}
                    onChange={() =>
                      setSettings((prev) => ({
                        ...prev,
                        privacy: { ...prev.privacy, twoFactor: !prev.privacy.twoFactor },
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className="form-label small fw-medium">Session Timeout (minutes)</label>
                <select
                  className="form-select"
                  value={settings.privacy.sessionTimeout}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, sessionTimeout: Number(e.target.value) },
                    }))
                  }
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card-custom p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FiMoon className="text-primary-custom" />
                <h6 className="fw-semibold mb-0">Appearance</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
                <div>
                  <div className="fw-medium small">Dark Mode</div>
                  <small className="text-secondary">Switch to dark theme</small>
                </div>
                <div className="form-check form-switch mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.appearance.darkMode}
                    onChange={() =>
                      setSettings((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, darkMode: !prev.appearance.darkMode },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                <div>
                  <div className="fw-medium small">Compact View</div>
                  <small className="text-secondary">Reduce spacing in lists and tables</small>
                </div>
                <div className="form-check form-switch mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={settings.appearance.compactView}
                    onChange={() =>
                      setSettings((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, compactView: !prev.appearance.compactView },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card-custom p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <FiDollarSign className="text-primary-custom" />
                <h6 className="fw-semibold mb-0">Budget Defaults</h6>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-medium">Monthly Budget (₹)</label>
                  <input type="number" className="form-control" defaultValue={50000} />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-medium">Savings Goal (%)</label>
                  <input type="number" className="form-control" defaultValue={20} min={0} max={100} />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-medium">Alert Threshold (%)</label>
                  <input type="number" className="form-control" defaultValue={80} min={0} max={100} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Save All Settings
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Settings;
