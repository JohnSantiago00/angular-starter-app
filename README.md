# Angular Starter App

A beginner-friendly full-stack housing listings app built with **Angular** on the frontend and **Express + MongoDB Atlas** on the backend.

## Repository Layout

The app lives in the `angular-PropertyListing/` folder:

```text
angular-starter-app/
├── angular-PropertyListing/
│   ├── client/
│   ├── server/
│   └── docker-compose.yml
└── README.md
```

## Stack

- Angular 21
- TypeScript
- Express 5
- MongoDB Atlas
- Mongoose
- Docker Compose for local development

## Local Development URLs

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:3000`

## Quick Start Without Docker

### 1. Install client dependencies
```bash
cd angular-PropertyListing/client
npm install
```

### 2. Install server dependencies
```bash
cd ../server
npm install
```

### 3. Configure environment variables
Create `angular-PropertyListing/server/.env` from the example file:

```bash
cp .env.example .env
```

Expected shape:

```env
PORT=3000
CLIENT_ORIGIN=http://localhost:4200
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### 4. Seed MongoDB
```bash
cd /home/nick/Projects/angular-starter-app/angular-PropertyListing/server
npm run seed
```

### 5. Start the backend
```bash
cd /home/nick/Projects/angular-starter-app/angular-PropertyListing/server
npm run dev
```

### 6. Start the frontend
```bash
cd /home/nick/Projects/angular-starter-app/angular-PropertyListing/client
npm start
```

Open the app at:

- `http://localhost:4200`

## Docker Development

This project also includes a **development-only Docker Compose setup**.

### What Docker runs
- the Angular development server in a container
- the Express TypeScript development server in a container

### What Docker does not run
- MongoDB locally
- nginx
- production builds or deployment infrastructure

### How MongoDB still works
The server container still uses **MongoDB Atlas** through `server/.env`.
Docker does not replace Atlas here.

## Docker prerequisites

Before using Docker, make sure you have:
- Docker installed
- Docker Desktop or the Docker daemon running
- `angular-PropertyListing/server/.env` created locally
- a working Atlas `MONGODB_URI`
- your current IP added to Atlas Network Access if required

## Docker commands

Important: run Docker Compose from the app root, not from `client/` or `server/`.

```bash
cd /home/nick/Projects/angular-starter-app/angular-PropertyListing
```

### Run everything
```bash
docker compose up --build
```

### Run in background
```bash
docker compose up -d --build
```

### Stop containers
```bash
docker compose down
```

### Rebuild images
```bash
docker compose build
```

### Run the seed script from Docker
```bash
docker compose exec server npm run seed
```

### View logs
```bash
docker compose logs -f
```

### View only server logs
```bash
docker compose logs -f server
```

### View only client logs
```bash
docker compose logs -f client
```

## How Docker is wired

### Server container
- builds from `./server`
- exposes `3000`
- loads env vars from `./server/.env`
- mounts `./server:/app` for live development
- keeps container `node_modules` inside the container with `/app/node_modules`

### Client container
- builds from `./client`
- exposes `4200`
- mounts `./client:/app` for live development
- keeps container `node_modules` inside the container with `/app/node_modules`

### Important Docker note
The `.env` file is **not copied into the image**.
It is only loaded at runtime by Docker Compose through `env_file`.

## Test the app

### Test backend
```bash
curl http://localhost:3000/
curl http://localhost:3000/locations
curl http://localhost:3000/locations/0
```

### Open frontend
- `http://localhost:4200`

## Features

- Browse housing listings
- Filter listings by city on the frontend
- View listing details by numeric `id`
- MongoDB-backed API reads
- Seed script for loading sample data into MongoDB Atlas
- Docker Compose development workflow for the Angular client and Express server

## API

- `GET /`
- `GET /locations`
- `GET /locations/:id`

## Notes

- The frontend search is currently **client-side filtering**.
- MongoDB Atlas is the live runtime data source.
- Sample seed data is kept in the server seed script area, not in the frontend.
- The Docker setup runs only the Angular client and Express server.
- This Docker setup is for **local development learning only**.

## What we are not adding yet

- local MongoDB container
- production nginx
- deployment setup
- authentication
- application persistence

## Troubleshooting

### Docker starts but the server cannot connect to Atlas
Check:
- `server/.env` exists
- `MONGODB_URI` is correct
- Atlas IP allowlist includes your current IP
- Atlas user/password are valid

### Port 3000 is already in use
This usually means you already have the Express server running outside Docker.

Check what is using the port:
```bash
lsof -i :3000
```

Then stop the conflicting process and retry:
```bash
docker compose down
docker compose up
```

### Port 4200 is already in use
This usually means you already have Angular running outside Docker.

Check what is using the port:
```bash
lsof -i :4200
```

Then stop the conflicting process and retry:
```bash
docker compose down
docker compose up
```

### Angular cannot reach the backend
Check:
- server container is running
- `http://localhost:3000/` works
- frontend still points to `http://localhost:3000/locations`
- the server container actually started without an Atlas connection error

Useful log commands:
```bash
docker compose logs -f server
docker compose logs -f client
```

### Seed command fails in Docker
Check:
- server container is running
- env vars were loaded from `server/.env`
- Atlas is reachable from your machine/network
- your current IP is allowed in Atlas Network Access

Run the seed command again with:
```bash
docker compose exec server npm run seed
```
