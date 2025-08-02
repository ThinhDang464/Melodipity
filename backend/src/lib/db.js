import mongoose, { connection } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    process.exit(1);
    console.log("Failed to connect to mongoDB", error);
  }
};
