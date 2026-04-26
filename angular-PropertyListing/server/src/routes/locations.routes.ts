import { Router } from 'express';
import { housingLocations } from '../data/housingLocations';

const locationsRouter = Router();

locationsRouter.get('/', (_req, res) => {
  res.json(housingLocations);
});

locationsRouter.get('/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Location id must be a number' });
    return;
  }

  const housingLocation = housingLocations.find((location) => location.id === id);

  if (!housingLocation) {
    res.status(404).json({ error: `Location with id ${id} was not found` });
    return;
  }

  res.json(housingLocation);
});

export { locationsRouter };
