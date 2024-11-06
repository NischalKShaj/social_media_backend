// <========================= file to ensure db connection =================>

// importing the required modules
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// establishing the connection
export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("database connected successfully.....🍃");
  } catch (error) {
    console.error("error while connecting", error);
  }
};
