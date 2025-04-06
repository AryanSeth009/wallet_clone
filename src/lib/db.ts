'use server';

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global variable declaration
declare global {
  var mongooseCache: MongooseCache;
}

// Initialize cache
let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cached;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      console.log('Attempting to connect to MongoDB:', MONGODB_URI?.substring(0, 30) + '...');
      cached.promise = mongoose.connect(MONGODB_URI!);
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
