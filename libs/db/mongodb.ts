/**
 * MongoDB Database Connection
 * 
 * Handles MongoDB connection and provides database client.
 * Uses singleton pattern to reuse connections.
 * 
 * NOTE: Connection is lazy - only initialized when MongoDB is actually used.
 * This module will NOT throw errors at import time if MONGODB_URI is not set.
 */

import { MongoClient, Db } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;

/**
 * Get MongoDB client promise (lazy initialization)
 */
function getClientPromise(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Please add it to .env.local or use Supabase instead.'
    );
  }

  if (clientPromise) {
    return clientPromise;
  }

  const uri: string = process.env.MONGODB_URI;
  const options = {};

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

/**
 * Get MongoDB database instance
 */
export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME || 'jumpstart');
}

/**
 * Export function that returns client promise
 * MongoDBAdapter expects a Promise<MongoClient>
 * This is called lazily, so it won't throw if MONGODB_URI is not set until actually used
 */
export default function(): Promise<MongoClient> {
  return getClientPromise();
}
