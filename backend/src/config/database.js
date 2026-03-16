import { config } from "./config.js";
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
