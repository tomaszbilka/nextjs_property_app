import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  //only fields specified in schema will be saved in db
  mongoose.set("strictQuery", true);

  //if db is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  //connect do DB
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};

export default connectDB;
