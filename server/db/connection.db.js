import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoDbUrl = process.env.MONGODB_URL;
    const instance = await mongoose.connect(mongoDbUrl);
    console.log(
      `MongoDb Database connect successfully ${instance.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
