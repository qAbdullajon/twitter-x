import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.DATABASE_URL) {
    return console.log('DATABASE_URL not found');
  }

  if (isConnected) {
    return
  }

  try {
    const options = {
      dbName: 'twitter-x',
      autoCreate: true,
    }

    await mongoose.connect(process.env.DATABASE_URL, options);

    isConnected = true;
    console.log('Connected to database');

  } catch (error) {
    console.log('Error connecting to database');

  }
}