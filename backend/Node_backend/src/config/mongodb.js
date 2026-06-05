import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB database connected");
    });

    await mongoose.connect(ENV.MONGODB_URI);

  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDB;
