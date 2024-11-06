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
  profile:{
    type:String,
    default:"https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"
  }
});

export const userModel = model("user", userSchema);
