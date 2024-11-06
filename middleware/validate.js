// <============ file to validate the username, email and the password ==============>

// importing the required modules
import { body, validationResult } from "express-validator";

export const validate = [
  // username validation
  body("username")
    .isString()
    .withMessage("username should be string")
    .isLength({ min: 3 })
    .withMessage("username should contain minimum 3 letters")
    .trim()
    .escape(),

  // email validation
  body("email")
    .isEmail()
    .withMessage("please enter a valid email")
    .normalizeEmail(),

  // password validations
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain a special character"),

  // middleware for checking
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    next();
  },
];
