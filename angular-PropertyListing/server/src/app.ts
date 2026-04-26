import cors from 'cors';
import express from 'express';
import { locationsRouter } from './routes/locations.routes';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10);

app.use(
  cors({
    origin: 'http://localhost:4200',
  }),
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Housing API is running' });
});

app.use('/locations', locationsRouter);

app.listen(port, () => {
  console.log(`Housing API listening on port ${port}`);
});
