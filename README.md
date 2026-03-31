# Smart URL Shortener with Analytics

A full-stack URL shortener that includes authentication, click tracking, and a clean dashboard for managing links. The project ships with a React + Vite frontend and a Node.js + Express backend backed by MongoDB.

## Live Demo (Vercel)

- App: https://url-shortner-roan-seven.vercel.app/
- Login: https://url-shortner-1jolo9hpa-abhi8667s-projects.vercel.app/login

## Features

- 🔗 Shorten long URLs with unique short codes
- 🧭 Redirect using `/s/:shortCode` and track clicks automatically
- 📊 Analytics dashboard with totals and per-link stats
- 🔐 JWT-based authentication (register, login, protected routes)
- 🧹 URL validation and safe input handling

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Auth & Utils:** JWT, bcryptjs, nanoid, ua-parser-js

## Project Structure

```text
url_Shortner/
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

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or hosted instance)

### Environment Variables

#### Backend

Copy `backend/.env.example` to `backend/.env` and fill values.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_url_shortener
SERVER_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

#### Frontend

Copy `frontend/.env.example` to `frontend/.env`.

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Install & Run Locally

Open two terminals from the project root.

#### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

#### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/urls/shorten` | Create or return a short URL for a long URL |
| GET | `/api/urls` | Fetch all created URLs and analytics |
| GET | `/s/:shortCode` | Redirect to original URL and increment click count |
| GET | `/health` | Health check |

### Example Request

```http
POST /api/urls/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/some/long/path"
}
```

## Deployment Notes

- The frontend can be deployed to Vercel.
- Ensure the backend is reachable from the frontend `VITE_API_BASE_URL`.

## Contributing

Pull requests are welcome. If you plan major changes, please open an issue first to discuss scope.
