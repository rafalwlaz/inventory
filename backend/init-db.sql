-- Create inventory DB if not exists
CREATE DATABASE inventory;

-- Connect to inventory database and create table
\c inventory

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sample data
INSERT INTO products (name, description, price, quantity)
VALUES
('Sample Item A', 'Example description A', 9.99, 10),
('Sample Item B', 'Example description B', 19.5, 5)
ON CONFLICT DO NOTHING;
