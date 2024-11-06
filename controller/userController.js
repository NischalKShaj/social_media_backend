// <========================= file for setting the controller for the application ============>

// importing the required modules
import hash from "bcryptjs";
import { userModel } from "../models/userModel.js";

const userController = {
  // controller for getting the home-page
  getHome: async (req, res) => {
    try {
      res.send("home page");
    } catch (error) {
      console.error("error", error);
      res.send("error", error);
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
      console.log("new user", newUser);
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
      res.status(202).json({ user: user });
    } catch (error) {
      console.error("error", error);
      res.status(500).json("internal server error");
    }
  },
};

export default userController;
