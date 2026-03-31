# Smart URL Shortener with Analytics

A full-stack hackathon starter for **CodeVerse**.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Project Structure

```text
bms ieee web dev/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      index.js
    .env.example
    package.json
  frontend/
    src/
      api/
      components/
      pages/
      App.jsx
      main.jsx
      index.css
    .env.example
    package.json
  README.md
```

## Core Features Scaffolded

1. URL shortening with URL validation and unique short code generation.
2. Redirection endpoint using short code.
3. Analytics with click tracking per short URL.
4. Dashboard UI for creating links and viewing all links with stats.

## Environment Variables

### Backend

Copy `backend/.env.example` to `backend/.env` and fill values if needed.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_url_shortener
SERVER_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

### Frontend

Copy `frontend/.env.example` to `frontend/.env`.

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Install and Run Locally

Open two terminals from the project root.

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

- `POST /api/urls/shorten` - Create or return a short URL for a long URL.
- `GET /api/urls` - Fetch all created URLs and analytics.
- `GET /s/:shortCode` - Redirect to original URL and increment click count.
- `GET /health` - Health check.

## Example Create Request

```http
POST /api/urls/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/some/long/path"
}
```

## Notes

- This setup currently uses **MongoDB**.
- If you want, I can now scaffold an alternative **PostgreSQL + Prisma** backend variant in parallel so you can choose one stack before final submission.
