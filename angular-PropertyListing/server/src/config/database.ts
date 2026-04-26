import 'dotenv/config';
import mongoose from 'mongoose';

function buildMongoHelpMessage(error: unknown): string {
  const details = error instanceof Error ? error.message : String(error);
  const lower = details.toLowerCase();

  if (!process.env.MONGODB_URI) {
    return 'MongoDB connection failed: MONGODB_URI is not set. Add it to server/.env.';
  }

  if (lower.includes('whitelist') || lower.includes('network access') || lower.includes('ip') || lower.includes('econnrefused') || lower.includes('querysrv')) {
    return [
      'MongoDB Atlas connection failed.',
      'Likely causes:',
      '- your current IP is not added in Atlas Network Access',
      '- the cluster URL is wrong',
      '- your network cannot reach Atlas',
      `Details: ${details}`,
    ].join('\n');
  }

  if (lower.includes('authentication failed') || lower.includes('bad auth') || lower.includes('auth')) {
    return [
      'MongoDB Atlas authentication failed.',
      'Likely causes:',
      '- username or password is wrong',
      '- the database user does not have permission',
      '- special characters in the password need URL encoding',
      `Details: ${details}`,
    ].join('\n');
  }

  return [
    'MongoDB connection failed.',
    'Check these items:',
    '- MONGODB_URI is correct',
    '- Atlas Network Access includes your current IP',
    '- the database user has the right permissions',
    '- the cluster URI and database name are correct',
    `Details: ${details}`,
  ].join('\n');
}

async function connectToDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(buildMongoHelpMessage(new Error('MONGODB_URI is not set')));
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    throw new Error(buildMongoHelpMessage(error));
  }
}

export { connectToDatabase };
