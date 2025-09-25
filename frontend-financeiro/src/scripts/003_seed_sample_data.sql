-- Insert a sample user (password is 'password123' hashed)
INSERT INTO users (name, email, password_hash) VALUES
('John Doe', 'john@example.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ')
ON CONFLICT (email) DO NOTHING;

-- Get the user ID for sample transactions
DO $$
DECLARE
    sample_user_id INTEGER;
    salary_category_id INTEGER;
    groceries_category_id INTEGER;
    transport_category_id INTEGER;
    utilities_category_id INTEGER;
    dining_category_id INTEGER;
BEGIN
    -- Get user ID
    SELECT id INTO sample_user_id FROM users WHERE email = 'john@example.com';
    
    -- Get category IDs
    SELECT id INTO salary_category_id FROM categories WHERE name = 'Salary' AND type = 'income';
    SELECT id INTO groceries_category_id FROM categories WHERE name = 'Groceries' AND type = 'expense';
    SELECT id INTO transport_category_id FROM categories WHERE name = 'Transportation' AND type = 'expense';
    SELECT id INTO utilities_category_id FROM categories WHERE name = 'Utilities' AND type = 'expense';
    SELECT id INTO dining_category_id FROM categories WHERE name = 'Food & Dining' AND type = 'expense';
    
    -- Insert sample transactions for the current month
    INSERT INTO transactions (user_id, category_id, amount, description, transaction_date, type) VALUES
    -- Income
    (sample_user_id, salary_category_id, 5200.00, 'Monthly Salary', '2024-01-15', 'income'),
    
    -- Expenses
    (sample_user_id, groceries_category_id, 127.50, 'Whole Foods Market', '2024-01-15', 'expense'),
    (sample_user_id, transport_category_id, 45.20, 'Gas Station', '2024-01-14', 'expense'),
    (sample_user_id, utilities_category_id, 89.30, 'Electric Bill', '2024-01-13', 'expense'),
    (sample_user_id, dining_category_id, 12.50, 'Coffee Shop', '2024-01-13', 'expense'),
    (sample_user_id, groceries_category_id, 89.75, 'Supermarket', '2024-01-12', 'expense'),
    (sample_user_id, transport_category_id, 35.00, 'Uber Ride', '2024-01-11', 'expense'),
    (sample_user_id, dining_category_id, 45.80, 'Restaurant Dinner', '2024-01-10', 'expense'),
    (sample_user_id, groceries_category_id, 156.20, 'Weekly Groceries', '2024-01-08', 'expense'),
    (sample_user_id, transport_category_id, 28.50, 'Public Transport', '2024-01-07', 'expense'),
    (sample_user_id, dining_category_id, 23.75, 'Lunch', '2024-01-06', 'expense'),
    (sample_user_id, utilities_category_id, 67.40, 'Internet Bill', '2024-01-05', 'expense'),
    (sample_user_id, groceries_category_id, 98.60, 'Grocery Store', '2024-01-04', 'expense'),
    (sample_user_id, dining_category_id, 34.20, 'Fast Food', '2024-01-03', 'expense'),
    (sample_user_id, transport_category_id, 52.30, 'Gas Fill-up', '2024-01-02', 'expense')
    ON CONFLICT DO NOTHING;
END $$;
