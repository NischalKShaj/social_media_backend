// <=========================== file for the server for the application ==================>

// importing the required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/connection.js";
import userRouter from "./routes/userRoute.js";
import { corsOptions } from "./config/corsOption.js";
dotenv.config();

// configuring the app
const app = express();

// establishing the connection
connect();

// setting the parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting the cors policy
app.use(cors(corsOptions));

// setting the router
app.use("/", userRouter);

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
