-- SpendSense AI Seed Data Script
USE `spendsense_db`;

-- Add a demo user (password is "password123" encrypted with BCrypt)
INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password`, `profile_image`, `role`, `created_at`) 
VALUES (1, 'John Doe', 'john.doe@spendsense.com', '+1234567890', '$2a$10$4G7m4uB7Q.gE6/xY1YhUle6/06V83bA2eO8m/yWdJ5Fj280zHkHNy', 'https://api.dicebear.com/7.x/adventurer/svg?seed=JohnDoe', 'ROLE_USER', NOW());

-- Add another admin user (password is "admin123" encrypted with BCrypt)
INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password`, `profile_image`, `role`, `created_at`) 
VALUES (2, 'System Admin', 'admin@spendsense.com', '+1999888777', '$2a$10$h97VzK93G7VvT83e3K2Oee3R9lB.eLg3XyI2o4pD6K8E9t0Q5YFp.', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin', 'ROLE_ADMIN', NOW());

-- Insert sample Income logs for John Doe (User 1)
INSERT INTO `income` (`title`, `amount`, `source`, `description`, `income_date`, `user_id`, `created_at`) VALUES
('Monthly Salary', 5000.00, 'Job', 'Full time software engineer salary payout', '2026-06-01', 1, NOW()),
('Freelance Writing', 450.00, 'Upwork', 'Blog post content writing fee', '2026-06-12', 1, NOW()),
('Dividend Payout', 120.00, 'Stocks', 'Quarterly index fund dividend stock credit', '2026-06-18', 1, NOW()),
('Monthly Salary', 5000.00, 'Job', 'Full time software engineer salary payout', '2026-07-01', 1, NOW()),
('eBay Store Sale', 85.00, 'Sales', 'Sold old mechanical keyboard', '2026-07-01', 1, NOW());

-- Insert sample Expense logs for John Doe (User 1)
INSERT INTO `expenses` (`title`, `amount`, `category`, `description`, `expense_date`, `user_id`, `created_at`) VALUES
('Apartment Rent', 1500.00, 'Housing', 'Monthly apartment rent check payment', '2026-06-02', 1, NOW()),
('Electricity Bill', 120.50, 'Utilities', 'Electric utility grid statement', '2026-06-05', 1, NOW()),
('Whole Foods Store', 184.20, 'Food & Dining', 'Weekly household groceries', '2026-06-07', 1, NOW()),
('Shell Gas Station', 45.00, 'Transportation', 'Gas tank refill', '2026-06-10', 1, NOW()),
('Netflix Premium', 19.99, 'Entertainment', 'Monthly streaming plan renewal', '2026-06-14', 1, NOW()),
('Dinner Date', 78.40, 'Food & Dining', 'Dinner at Italian Bistro', '2026-06-15', 1, NOW()),
('CVS Pharmacy', 34.10, 'Healthcare', 'Pain relievers and allergy pills', '2026-06-20', 1, NOW()),
('Gym Membership', 50.00, 'Healthcare', 'Monthly gym pass billing cycle', '2026-06-25', 1, NOW()),
('Starbucks Coffee', 6.75, 'Food & Dining', 'Iced latte morning coffee', '2026-07-01', 1, NOW()),
('Apartment Rent', 1500.00, 'Housing', 'Monthly apartment rent check payment', '2026-07-01', 1, NOW());
