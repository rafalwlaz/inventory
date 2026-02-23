Backend (Express + PostgreSQL)

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Create Postgres database and run migration (example using psql):

```bash
# create DB (run in a shell with psql available)
createdb inventory
# run migration
psql -d inventory -f migrations/init.sql
```

Or set `DATABASE_URL` in `.env` to a connection string and run the SQL via your client.

3. Copy `.env.example` to `.env` and adjust credentials if needed.

4. Start server

```bash
npm start
```

The API endpoints

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (JSON body: name, description, location, price, quantity)
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

Example create/update payload

```json
{
	"name": "Wireless Mouse",
	"description": "Ergonomic mouse",
	"location": "Aisle 2 - Bin 4",
	"price": 24.99,
	"quantity": 12
}
```

Notes

- Ensure PostgreSQL is installed and running locally. If you need, I can help install/start Postgres or run these steps for you.
