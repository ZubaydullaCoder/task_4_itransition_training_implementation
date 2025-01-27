import mongoose from "mongoose";

declare global {
  // Extend the global namespace to cache the database connection
  // so we don't re-initialize mongoose on each request
  // in Next.js serverless environment
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Use the global cache (or create it if it doesn't exist)
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };
const cached = global.mongooseCache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
