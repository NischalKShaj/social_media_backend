// <====================== file for creating the routes for the user ================>

// importing the required modules
import express from "express";
import userController from "../controller/userController.js";
import { validate } from "../middleware/validate.js";

// setting route instance
const router = express.Router();

// setting the route for the homepage
router.get("/", userController.getHome);

// router for signup the user
router.post("/signup", validate, userController.postSignup);

// exporting the router
export default router;
