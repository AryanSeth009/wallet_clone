'use server';

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the global type to include mongoose property
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      console.log('Attempting to connect to MongoDB:', MONGODB_URI?.substring(0, 30) + '...');
      cached.promise = mongoose.connect(MONGODB_URI!, opts);
      console.log('MongoDB connection promise created');
    } catch (e) {
      console.error('MongoDB connection error:', e);
      throw e;
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connection established successfully');
    return cached.conn;
  } catch (e) {
    console.error('Error establishing MongoDB connection:', e);
    cached.promise = null;
    throw e;
  }
}
