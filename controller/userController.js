// <========================= file for setting the controller for the application ============>

// importing the required modules
import hash from "bcryptjs";
import dotenv from "dotenv";
import { userModel } from "../models/userModel.js";
import { postModel } from "../models/postModel.js";
import { generateToken } from "../middleware/generateToken.js";
dotenv.config;

const userController = {
  // controller for getting the home-page
  getHome: async (req, res) => {
    try {
      const posts = await postModel.find().populate("user", "username profile");
      res.status(202).json({ posts: posts });
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },

  // controller for signup
  postSignup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res.status(403).json("user already exists");
        return;
      }
      const hashedPassword = hash.hashSync(password, 10);
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json("user signed-up successfully");
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },

  // controller for login
  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        res.status(403).json("invalid user credentials");
        return;
      }
      const hashedPassword = hash.compare(password, user.password);
      if (!hashedPassword) {
        res.status(403).json("invalid user credentials");
        return;
      }
      const token = generateToken(email);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(202)
        .json({ user: user, token: token });
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },

  // controller for adding new post
  postAddPost: async (req, res) => {
    try {
      const userId = req.params.id;
      const { heading, description } = req.body;
      if (!req.file) {
        res.status(400).json("please provide a image for the post");
        return;
      }

      const newPost = new postModel({
        heading,
        description,
        image: `${process.env.BACKEND_URL}/uploads/img/${req.file.filename}`,
        user: userId,
      });
      await newPost.save();

      res.status(201).json("post created");
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },

  // controller for editing the post
  editPost: async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;
      const { heading, description } = req.body;
      const post = await postModel.findById(postId);
      if (!post) {
        res.status(403).json("post not found");
        return;
      }

      if (post.user.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You don't have permission to edit this post" });
      }

      const updatedData = {
        heading,
        description,
      };

      if (req.file) {
        updatedData.image = `${process.env.BACKEND_URL}/uploads/img/${req.file.filename}`;
      }

      const updatedPost = await postModel.findByIdAndUpdate(
        { _id: postId },
        { $set: updatedData },
        { new: true }
      );

      res.status(200).json({ post: updatedPost });
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },

  // controller for deleting the post
  deletePost: async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.params.postId;

      const post = await postModel.findById(postId);
      if (!post) {
        res.status(403).json("post not available");
      }
      if (post.user.toString() !== userId) {
        res
          .status(403)
          .json("You don't have the permission to delete the post");
        return;
      }

      await postModel.findByIdAndDelete(postId);
      res.status(200).json("post deleted successfully");
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },
};

export default userController;
