export const dummyUser = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+91 98765 43210',
  avatar: null,
  memberSince: '2024-01-15',
  currency: 'INR',
};

export const dummyDashboardStats = {
  totalBalance: 85420.5,
  totalIncome: 125000,
  totalExpense: 39579.5,
  monthlyIncome: 85000,
  monthlyExpense: 28450.75,
  savingsRate: 66.5,
};

export const dummyTransactions = [
  {
    id: 1,
    type: 'expense',
    title: 'Grocery Shopping',
    category: 'Groceries',
    amount: 2450.0,
    date: '2026-06-28',
    description: 'Weekly groceries from BigBasket',
    paymentMethod: 'UPI',
  },
  {
    id: 2,
    type: 'income',
    title: 'Monthly Salary',
    category: 'Salary',
    amount: 85000.0,
    date: '2026-06-25',
    description: 'June salary credit',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 3,
    type: 'expense',
    title: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 649.0,
    date: '2026-06-24',
    description: 'Monthly streaming subscription',
    paymentMethod: 'Credit Card',
  },
  {
    id: 4,
    type: 'expense',
    title: 'Uber Ride',
    category: 'Transportation',
    amount: 385.0,
    date: '2026-06-23',
    description: 'Office commute',
    paymentMethod: 'UPI',
  },
  {
    id: 5,
    type: 'income',
    title: 'Freelance Project',
    category: 'Freelance',
    amount: 15000.0,
    date: '2026-06-20',
    description: 'Website design project payment',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 6,
    type: 'expense',
    title: 'Electricity Bill',
    category: 'Bills & Utilities',
    amount: 1850.0,
    date: '2026-06-18',
    description: 'Monthly electricity bill',
    paymentMethod: 'Debit Card',
  },
  {
    id: 7,
    type: 'expense',
    title: 'Restaurant Dinner',
    category: 'Food & Dining',
    amount: 2200.0,
    date: '2026-06-15',
    description: 'Dinner with friends',
    paymentMethod: 'Credit Card',
  },
  {
    id: 8,
    type: 'expense',
    title: 'Gym Membership',
    category: 'Healthcare',
    amount: 3500.0,
    date: '2026-06-10',
    description: 'Quarterly gym membership',
    paymentMethod: 'UPI',
  },
];

export const dummyExpenses = dummyTransactions.filter((t) => t.type === 'expense');

export const dummyIncomes = dummyTransactions.filter((t) => t.type === 'income');

export const incomeVsExpenseData = [
  { month: 'Jan', income: 78000, expense: 32000 },
  { month: 'Feb', income: 82000, expense: 28500 },
  { month: 'Mar', income: 79000, expense: 35000 },
  { month: 'Apr', income: 85000, expense: 31000 },
  { month: 'May', income: 88000, expense: 29500 },
  { month: 'Jun', income: 85000, expense: 28450 },
];

export const categoryExpenseData = [
  { name: 'Food & Dining', value: 8500, color: '#2563EB' },
  { name: 'Transportation', value: 4200, color: '#6366F1' },
  { name: 'Shopping', value: 6800, color: '#8B5CF6' },
  { name: 'Entertainment', value: 3200, color: '#EC4899' },
  { name: 'Bills & Utilities', value: 5500, color: '#F59E0B' },
  { name: 'Healthcare', value: 2500, color: '#22C55E' },
];

export const monthlySpendingData = [
  { week: 'Week 1', amount: 7200 },
  { week: 'Week 2', amount: 6800 },
  { week: 'Week 3', amount: 8100 },
  { week: 'Week 4', amount: 6350 },
];

export const dummyAIInsights = {
  budgetSuggestions: [
    {
      id: 1,
      title: 'Reduce Dining Out',
      description: 'You spent 30% more on dining this month. Consider cooking at home 2 more days per week to save approximately ₹2,500.',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Optimize Subscriptions',
      description: 'You have 4 active subscriptions totaling ₹1,800/month. Review unused services to cut costs.',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Transport Budget',
      description: 'Your transportation expenses are within the recommended 15% of income. Keep it up!',
      priority: 'low',
    },
  ],
  expenseAnalysis: [
    {
      id: 1,
      title: 'Top Spending Category',
      description: 'Food & Dining accounts for 28% of your total expenses this month.',
      metric: '28%',
    },
    {
      id: 2,
      title: 'Average Daily Spend',
      description: 'Your average daily spending is ₹948, which is 12% lower than last month.',
      metric: '₹948',
    },
    {
      id: 3,
      title: 'Largest Transaction',
      description: 'Your largest expense this month was Grocery Shopping at ₹2,450.',
      metric: '₹2,450',
    },
  ],
  savingTips: [
    {
      id: 1,
      title: 'Automate Savings',
      description: 'Set up an automatic transfer of 20% of your income to a savings account on payday.',
    },
    {
      id: 2,
      title: 'Use the 50/30/20 Rule',
      description: 'Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.',
    },
    {
      id: 3,
      title: 'Track Small Expenses',
      description: 'Small daily purchases add up. Track every expense, no matter how small.',
    },
  ],
  monthlySummary: {
    totalIncome: 85000,
    totalExpense: 28450.75,
    netSavings: 56549.25,
    savingsRate: 66.5,
    topCategory: 'Food & Dining',
    transactionCount: 42,
    aiScore: 82,
    summary:
      'Great month! You maintained a healthy savings rate of 66.5%. Your spending on entertainment decreased by 8% compared to last month. Consider setting a budget alert for dining expenses.',
  },
};

export const dummyReports = {
  monthlyReports: [
    { month: 'January 2026', income: 78000, expense: 32000, savings: 46000 },
    { month: 'February 2026', income: 82000, expense: 28500, savings: 53500 },
    { month: 'March 2026', income: 79000, expense: 35000, savings: 44000 },
    { month: 'April 2026', income: 85000, expense: 31000, savings: 54000 },
    { month: 'May 2026', income: 88000, expense: 29500, savings: 58500 },
    { month: 'June 2026', income: 85000, expense: 28450, savings: 56550 },
  ],
};
