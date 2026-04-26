# Angular Starter App

A beginner-friendly full-stack housing listings app built with:

- **Angular** frontend
- **Express + TypeScript** backend
- **MongoDB Atlas** as the database
- **Docker Compose** for local development

This README teaches the project **only the Docker way**.

---

## What runs in Docker

Docker Compose starts:

- the Angular development server on `http://localhost:4200`
- the Express API server on `http://localhost:3000`

## What does not run in Docker

This project does **not** run MongoDB locally in Docker.
It still uses **MongoDB Atlas** through `server/.env`.

---

## Project structure

```text
angular-starter-app/
├── angular-PropertyListing/
│   ├── client/
│   ├── server/
│   └── docker-compose.yml
└── README.md
```

---

## Prerequisites

Before starting, make sure you have:

- Docker installed
- Docker running
- a local file at `angular-PropertyListing/server/.env`
- a valid `MONGODB_URI` in that `.env`
- your current IP added to MongoDB Atlas Network Access if required

Your `server/.env` should look like this:

```env
PORT=3000
CLIENT_ORIGIN=http://localhost:4200
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

Do **not** commit your real `.env` file.

---

## Run the project

Important: run Docker Compose from the app root:

```bash
cd /home/nick/Projects/angular-starter-app/angular-PropertyListing
```

### Start everything

```bash
docker compose up --build
```

### Start everything in the background

```bash
docker compose up -d --build
```

When it works, you should have:

- frontend at `http://localhost:4200`
- backend at `http://localhost:3000`

---

## Stop the project

```bash
docker compose down
```

---

## Rebuild the project

```bash
docker compose build
```

If you need a full rebuild without cache:

```bash
docker compose build --no-cache
```

---

## Seed the database

This project still uses MongoDB Atlas, but you can run the seed script from inside the server container.

```bash
docker compose exec server npm run seed
```

---

## View logs

### All logs

```bash
docker compose logs -f
```

### Server logs only

```bash
docker compose logs -f server
```

### Client logs only

```bash
docker compose logs -f client
```

---

## Test the backend

```bash
curl http://localhost:3000/
curl http://localhost:3000/locations
curl http://localhost:3000/locations/0
```

Expected:

- `GET /` returns health JSON
- `GET /locations` returns a list of housing locations
- `GET /locations/0` returns one housing location

---

## Open the frontend

Open this in your browser:

- `http://localhost:4200`

You should be able to:

- see housing cards
- search by city
- click into a details page

---

## Common problems

### Port 3000 is already in use

This usually means the Express server is already running outside Docker.

Check the port:

```bash
lsof -i :3000
```

Then stop the conflicting process and run:

```bash
docker compose down
docker compose up
```

### Port 4200 is already in use

This usually means Angular is already running outside Docker.

Check the port:

```bash
lsof -i :4200
```

Then stop the conflicting process and run:

```bash
docker compose down
docker compose up
```

### Server cannot connect to MongoDB Atlas

Check:

- `server/.env` exists
- `MONGODB_URI` is correct
- your Atlas username/password are correct
- your current IP is allowed in Atlas Network Access
- special characters in the password are URL-encoded if needed

Then inspect logs:

```bash
docker compose logs -f server
```

### Angular loads but listings do not appear

Check:

```bash
curl http://localhost:3000/
curl http://localhost:3000/locations
```

If those fail, the backend is the problem, not Angular.

### Seed fails

Run:

```bash
docker compose exec server npm run seed
```

If it fails, check:

- Atlas connectivity
- env vars
- IP whitelist settings

---

## Docker mental model

- your **browser** talks to the Angular container on port `4200`
- Angular talks to the Express container on port `3000`
- Express talks to **MongoDB Atlas** using `MONGODB_URI`
- Atlas is remote, not in Docker

---

## What this setup is for

This setup is for:

- local development
- learning Docker with a full-stack app
- running Angular and Express together easily

This setup is **not** adding:

- local MongoDB container
- nginx
- deployment
- auth
- application persistence
