# MovieMatch

MovieMatch is a semantic movie discovery demo with a React/Vite frontend and an
Express API. The API uses OpenRouter embeddings to rank the movie vectors in
`backend/movieVectors.json`.

## Requirements

- Node.js 20.19+ or 22.12+
- An OpenRouter API key for semantic search

## Run locally

1. Install the backend dependencies and create its environment file:

   ```sh
   cd backend
   npm ci
   cp .env.example .env
   ```

   Add your `OPENROUTER_API_KEY` to `backend/.env`. Keep this file private.

2. Start the API:

   ```sh
   npm run dev
   ```

   The API listens on port 5000 by default and supports the `PORT` environment
   variable for hosting platforms.

3. In a second terminal, start the frontend:

   ```sh
   cd frontend
   npm ci
   npm run dev
   ```

   Open the URL printed by Vite. Its development proxy forwards `/api` requests
   to the API on port 5000.

## Validation

From `frontend`, run `npm run lint` and `npm run build`. From `backend`, run
`node --check server.js` to check the API entry point syntax.

## Hosting note

Pushing this project to GitHub publishes the source code; it does not run the
Express API. GitHub Pages can host only the static frontend, so a live deployment
also needs a separately hosted API and a frontend API URL configured for that
deployment. Never put `OPENROUTER_API_KEY` in frontend code or a `VITE_*` variable.
