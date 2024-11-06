// <===================file to create the JWT for the user ===================>

// importing the required modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// creating the authentication middleware
export const authenticateUserJwt = async (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers["authorization"] || null;

  console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const actualToken = token.startsWith("Bearer ")
    ? token.slice(7, token.length)
    : token;

  console.log("act", actualToken);

  try {
    const decoded = jwt.verify(actualToken, process.env.SECRET);
    console.log("dec", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
