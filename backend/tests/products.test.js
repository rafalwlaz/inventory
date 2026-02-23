const request = require('supertest');
const app = require('../index');

describe('Products API', () => {
  let createdId;

  test('GET /api/products returns array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/products -> create product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'TEST ITEM', description: 'for tests', price: 3.33, quantity: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  test('GET /api/products/:id -> returns created product', async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.name).toBe('TEST ITEM');
  });

  test('PUT /api/products/:id -> updates product', async () => {
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .send({ name: 'TEST ITEM UPDATED', description: 'updated', price: 4.44, quantity: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('TEST ITEM UPDATED');
  });

  test('DELETE /api/products/:id -> deletes product', async () => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.statusCode === 204 || res.statusCode === 200).toBe(true);
    // confirm deletion
    const check = await request(app).get(`/api/products/${createdId}`);
    expect(check.statusCode).toBe(404);
  });
});

afterAll(async () => {
  const db = require('../db');
  try {
    await db.pool.end();
  } catch (e) {
    // ignore
  }
});
