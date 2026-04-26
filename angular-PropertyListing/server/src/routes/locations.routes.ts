import { Router } from 'express';
import { HousingLocationModel } from '../models/housing-location.model';

const locationsRouter = Router();

locationsRouter.get('/', async (_req, res) => {
  const housingLocations = await HousingLocationModel.find({}, { _id: 0 })
    .sort({ id: 1 })
    .lean();

  res.json(housingLocations);
});

locationsRouter.get('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Location id must be a number' });
    return;
  }

  const housingLocation = await HousingLocationModel.findOne({ id }, { _id: 0 }).lean();

  if (!housingLocation) {
    res.status(404).json({ error: `Location with id ${id} was not found` });
    return;
  }

  res.json(housingLocation);
});

export { locationsRouter };
