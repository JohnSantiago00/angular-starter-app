# Angular Property Listing

A full-stack housing listings app built with Angular on the client and Express + MongoDB Atlas on the server.

## Overview

This project started as a tutorial-style Angular housing app and was restructured into a cleaner full-stack layout:

- **Client:** Angular
- **Server:** Express with TypeScript
- **Database:** MongoDB Atlas via Mongoose

The current app keeps the original user-facing behavior:

- browse housing locations
- search locations by city on the frontend
- view location details by numeric `id`
- submit the sample application form locally (currently logs only, no persistence)

## Tech Stack

### Client
- Angular 21
- TypeScript
- Standalone components
- Angular Router
- Reactive Forms

### Server
- Node.js
- Express 5
- TypeScript
- Mongoose
- dotenv
- cors

### Database
- MongoDB Atlas

## Project Structure

```text
angular-PropertyListing/
├── client/
│   ├── src/app/
│   │   ├── app.ts
│   │   ├── routes.ts
│   │   ├── housing.ts
│   │   ├── housing-location.ts
│   │   ├── home/
│   │   ├── details/
│   │   └── housing-location/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── app.ts
│   │   ├── config/database.ts
│   │   ├── models/housing-location.model.ts
│   │   ├── routes/locations.routes.ts
│   │   ├── scripts/seed-housing-locations.ts
│   │   ├── scripts/seed-data/housing-locations.ts
│   │   └── types/housing-location.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Local Development URLs

- **Angular client:** `http://localhost:4200`
- **Express API:** `http://localhost:3000`

## API Endpoints

The current API contract is intentionally small and unchanged:

- `GET /`
- `GET /locations`
- `GET /locations/:id`

### Example responses

#### `GET /`
```json
{ "message": "Housing API is running" }
```

#### `GET /locations`
Returns an array of housing locations.

#### `GET /locations/:id`
Returns one housing location by numeric `id`.

## Data Shape

Both client and server expect this shape:

```ts
interface HousingLocationInfo {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}
```

Numeric `id` is intentionally preserved so Angular detail routes continue to work.

## Environment Variables

Create `server/.env` from `server/.env.example`.

### `server/.env.example`
```env
PORT=3000
CLIENT_ORIGIN=http://localhost:4200
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### Notes
- Do not commit real credentials.
- If your MongoDB password contains special characters, URL-encode it.
- The server fails fast if MongoDB cannot be reached.

## Setup

## 1) Install client dependencies
```bash
cd client
npm install
```

## 2) Install server dependencies
```bash
cd ../server
npm install
```

## 3) Create the server env file
```bash
cp .env.example .env
```

Then edit `.env` and set your real `MONGODB_URI`.

## MongoDB Atlas Setup

Before seeding or starting the server, make sure Atlas is configured correctly:

1. Add your current public IP in **Security -> Network Access**
2. Create or confirm a database user in **Security -> Database Access**
3. Confirm the cluster URI and database name are correct
4. URL-encode the password if it contains special characters

## Running the App

Open two terminals.

### Terminal 1, seed the database
```bash
cd angular-PropertyListing/server
npm run seed
```

This loads the sample data from:

- `server/src/scripts/seed-data/housing-locations.ts`

into MongoDB.

### Terminal 2, start the server
```bash
cd angular-PropertyListing/server
npm run dev
```

Expected server behavior:
- connects to MongoDB first
- starts on `http://localhost:3000`
- allows CORS from `http://localhost:4200`

### Terminal 3, start the client
```bash
cd angular-PropertyListing/client
npm start
```

Then open:

- `http://localhost:4200`

## Build Commands

### Client build
```bash
cd angular-PropertyListing/client
npm run build
```

### Server build
```bash
cd angular-PropertyListing/server
npm run build
```

## Search Behavior

The search feature currently works on the **frontend**.

That means:
- Angular fetches all locations from `GET /locations`
- the `Home` component stores the full list locally
- filtering by city happens in the browser

This is intentional for the current project size and keeps the backend API simple.

## Seeding Strategy

MongoDB is the runtime data source, but the project still keeps a **seed-only data file** for initializing or resetting the database.

Important distinction:
- **Runtime reads:** come from MongoDB
- **Seed source:** `server/src/scripts/seed-data/housing-locations.ts`

This keeps sample data separate from app runtime logic and avoids confusing it with client-side mock data.

## Troubleshooting

### MongoDB Atlas connection failed
Common causes:
- your IP is not allowed in Atlas Network Access
- the connection string is wrong
- the database user/password is wrong
- the password needs URL encoding

### `npm run seed` fails
Check:
- `server/.env` exists
- `MONGODB_URI` is correct
- Atlas IP allowlist includes your current IP
- Atlas database user has access

### Client loads but shows no listings
Check:
- server is running on `http://localhost:3000`
- `GET /locations` returns data
- MongoDB has been seeded successfully

### Details page does not load
Check:
- `GET /locations/:id` returns a record
- the record in MongoDB still has a numeric `id`

## Current Scope

Included:
- Angular housing listings UI
- Express API
- MongoDB Atlas-backed reads
- seed script for sample data
- frontend city search

Not included:
- authentication
- file uploads
- application persistence
- Docker/deployment setup
- advanced backend filtering

## Future Improvements

Good next steps if you want to extend the app later:
- move search to backend query params for larger datasets
- add tests for routes and Angular components
- move API base URL to environment-based frontend config
- add loading and error states in the UI
- add create/update admin flows if needed

## Scripts Reference

### Client
```bash
npm start
npm run build
npm run watch
```

### Server
```bash
npm run dev
npm run build
npm run start
npm run seed
```

## Summary

This project is now a clean, small full-stack app where:

- Angular handles rendering, routing, and client-side search
- Express exposes a minimal API
- MongoDB Atlas stores the live listing data
- a dedicated seed script initializes sample records when needed
