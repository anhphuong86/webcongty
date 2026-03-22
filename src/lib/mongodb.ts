import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (!MONGODB_URI) {
        console.warn("MONGODB_URI is not defined in .env. Falling back to local JSON storage.");
        return null; // Signals fallback to caller
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("🔥 Successfully connected to MongoDB Cloud Database!");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error("MongoDB connection failed:", e);
        return null;
    }

    return cached.conn;
}

export default dbConnect;
