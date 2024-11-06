// <=========================== file to create the token for the user ==============>

// importing the required modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// function for creating the token
export const generateToken = (email) => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("no secret key provided", error);
  }

  const payload = {
    email: email,
  };

  return jwt.sign(payload, secret, { expiresIn: "72h" });
};
