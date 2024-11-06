// <======================== file to create the user schema ================>

// importing the required modules
import { Schema, model } from "mongoose";

// creating the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModel = model("user", userSchema);
