import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './config/database';
import { locationsRouter } from './routes/locations.routes';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const host = process.env.HOST ?? '0.0.0.0';
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:4200';
const serverUrl = `http://localhost:${port}`;

app.use(
  cors({
    origin: clientOrigin,
  }),
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Housing API is running' });
});

app.use('/locations', locationsRouter);

async function startServer(): Promise<void> {
  await connectToDatabase();

  app.listen(port, host, () => {
    console.log(`Housing API listening on ${serverUrl}`);
    console.log(`CORS enabled for ${clientOrigin}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start server');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
