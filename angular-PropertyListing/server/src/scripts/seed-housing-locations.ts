import 'dotenv/config';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { housingLocations } from '../data/housingLocations';
import { HousingLocationModel } from '../models/housing-location.model';

async function seedHousingLocations(): Promise<void> {
  try {
    await connectToDatabase();

    await HousingLocationModel.deleteMany({});
    await HousingLocationModel.insertMany(housingLocations);

    console.log(`Seeded ${housingLocations.length} housing locations`);
  } finally {
    await mongoose.connection.close();
  }
}

seedHousingLocations().catch((error: unknown) => {
  console.error('Failed to seed housing locations', error);
  process.exitCode = 1;
});
