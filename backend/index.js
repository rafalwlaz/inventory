const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

// List products
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create
app.post('/api/products', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO products(name, description, price, quantity) VALUES($1,$2,$3,$4) RETURNING *',
      [name, description || null, price || 0, quantity || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update
app.put('/api/products/:id', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE products SET name=$1, description=$2, price=$3, quantity=$4, updated_at = now() WHERE id=$5 RETURNING *',
      [name, description || null, price || 0, quantity || 0, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete
app.delete('/api/products/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id=$1', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
}

module.exports = app;
