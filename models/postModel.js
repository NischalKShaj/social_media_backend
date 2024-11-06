// <====================== file to create the post schema ==============>

// importing the required modules
import mongoose, { Schema, model } from "mongoose";

// creating the post
const postSchema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const postModel = model("post", postSchema);
