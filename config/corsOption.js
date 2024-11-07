// <================== file to set the cors policy ===============>

// importing the required modules
import dotenv from "dotenv";
dotenv.config();

// creating the cors-options
export const corsOptions = {
  origin: process.env.BASE_URL,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};
