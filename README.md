# Angular Starter App

A full-stack housing listings app built with **Angular** on the frontend and **Express + MongoDB Atlas** on the backend.

## Repository Layout

The app lives in the `angular-PropertyListing/` folder:

```text
angular-starter-app/
├── angular-PropertyListing/
│   ├── client/
│   ├── server/
│   └── README.md
└── README.md
```

## Stack

- Angular 21
- TypeScript
- Express 5
- MongoDB Atlas
- Mongoose

## Local Development URLs

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:3000`

## Quick Start

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

## Features

- Browse housing listings
- Filter listings by city on the frontend
- View listing details by numeric `id`
- MongoDB-backed API reads
- Seed script for loading sample data into MongoDB

## API

- `GET /`
- `GET /locations`
- `GET /locations/:id`

## Notes

- The frontend search is currently **client-side filtering**.
- MongoDB is the live runtime data source.
- Sample seed data is kept in the server seed script area, not in the frontend.

## More Documentation

For the full project README with architecture, troubleshooting, and workflow details, see:

- [`angular-PropertyListing/README.md`](./angular-PropertyListing/README.md)
