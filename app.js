// <=========================== file for the server for the application ==================>

// importing the required modules
import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/connection.js";
dotenv.config();

// configuring the app
const app = express();

// establishing the connection
connect();

// setting up the port
const port = process.env.PORT || 5000;

// checking the test route
app.get("/test", async (req, res) => {
  res.send("server running successfully");
});

// starting the server
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
