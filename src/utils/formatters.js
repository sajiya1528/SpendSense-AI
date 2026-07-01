import { CURRENCY_SYMBOL } from './constants';

export const formatCurrency = (amount) => {
  const value = Number(amount) || 0;
  return `${CURRENCY_SYMBOL}${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatMonthYear = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
};

export const getInitials = (name = '') => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text, maxLength = 40) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
