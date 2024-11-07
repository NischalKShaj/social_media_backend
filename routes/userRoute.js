// <====================== file for creating the routes for the user ================>

// importing the required modules
import express from "express";
import userController from "../controller/userController.js";
import { validate } from "../middleware/validate.js";
import { authenticateUserJwt } from "../middleware/tokenValidation.js";
import { upload } from "../middleware/multer.js";

// setting route instance
const router = express.Router();

// setting the route for the homepage
router.get("/", userController.getHome);

// router for signup the user
router.post("/signup", validate, userController.postSignup);

// router for user login
router.post("/login", userController.postLogin);

// router for creating new post
router.post(
  "/create-post/:id",
  authenticateUserJwt,
  upload.single("image"),
  userController.postAddPost
);

// router for editing the post
router.put(
  "/edit-post/:id/:postId",
  authenticateUserJwt,
  upload.single("image"),
  userController.editPost
);

// router for deleting the post
router.delete(
  "/delete-post/:id/:postId",
  authenticateUserJwt,
  userController.deletePost
);

// exporting the router
export default router;
