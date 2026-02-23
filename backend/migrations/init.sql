-- Run this in psql against the `inventory` database
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE products
ADD COLUMN IF NOT EXISTS location TEXT;

-- sample data
INSERT INTO products (name, description, location, price, quantity)
VALUES
('Sample Item A', 'Example description A', 'Warehouse A', 9.99, 10),
('Sample Item B', 'Example description B', 'Warehouse B', 19.5, 5)
ON CONFLICT DO NOTHING;
