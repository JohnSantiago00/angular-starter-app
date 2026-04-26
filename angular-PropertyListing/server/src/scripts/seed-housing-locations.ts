import 'dotenv/config';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { HousingLocationModel } from '../models/housing-location.model';
import { housingLocations } from './seed-data/housing-locations';

async function seedHousingLocations(): Promise<void> {
  // This script resets the collection and reloads known sample data into MongoDB.
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
