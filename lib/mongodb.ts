import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    console.log('🟢 Using existing MongoDB connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🧠 Creating new MongoDB connection...');
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: 'nextDashboard' })
      .then((mongoose) => {
        console.log('✅ New MongoDB connection established.');
        return mongoose;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

export default connectDB;
