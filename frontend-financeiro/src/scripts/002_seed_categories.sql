-- Insert default expense categories
INSERT INTO categories (name, type, color) VALUES
('Food & Dining', 'expense', '#EF4444'),
('Groceries', 'expense', '#F97316'),
('Transportation', 'expense', '#EAB308'),
('Utilities', 'expense', '#22C55E'),
('Entertainment', 'expense', '#3B82F6'),
('Healthcare', 'expense', '#8B5CF6'),
('Shopping', 'expense', '#EC4899'),
('Travel', 'expense', '#06B6D4'),
('Education', 'expense', '#84CC16'),
('Other', 'expense', '#6B7280')
ON CONFLICT DO NOTHING;

-- Insert default income categories
INSERT INTO categories (name, type, color) VALUES
('Salary', 'income', '#10B981'),
('Freelance', 'income', '#059669'),
('Investment', 'income', '#047857'),
('Business', 'income', '#065F46'),
('Gift', 'income', '#064E3B'),
('Other', 'income', '#6B7280')
ON CONFLICT DO NOTHING;
