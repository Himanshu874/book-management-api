import mongoose from "mongoose";

export const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connect DB");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log("Error", error);
  }
};
