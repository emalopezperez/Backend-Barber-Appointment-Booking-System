import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }

  mongoose.connection.on("error", (error) => {
    console.error("Database connection error:", error);
  });
};

export default connectDB;
