export const APP_NAME = 'SpendSense AI';
export const APP_TAGLINE = 'AI Powered Personal Expense Tracker';

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Groceries',
  'Other',
];

export const INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Investment',
  'Business',
  'Rental',
  'Bonus',
  'Gift',
  'Other',
];

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'UPI',
  'Bank Transfer',
  'Wallet',
];

export const DATE_FILTERS = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Last 3 Months', value: '3months' },
  { label: 'This Year', value: 'year' },
];

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/expenses', label: 'Expenses', icon: 'expense' },
  { path: '/income', label: 'Income', icon: 'income' },
  { path: '/transactions', label: 'Transactions', icon: 'transactions' },
  { path: '/reports', label: 'Reports', icon: 'reports' },
  { path: '/ai-insights', label: 'AI Insights', icon: 'ai' },
  { path: '/profile', label: 'Profile', icon: 'profile' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const ITEMS_PER_PAGE = 10;

export const CURRENCY_SYMBOL = '₹';
