// <=========================== file for the server for the application ==================>

// importing the required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
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

// enabling the cookie-parser
app.use(cookieParser());

// Configure bodyParser for large files
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// setting the cors policy
app.use(cors(corsOptions));

// setting up the static folders
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(join(__dirname, "uploads")));

// setting the router
app.use("/", userRouter);

// setting up the port
const port = process.env.PORT || 5000;

// checking the test route
app.get("/test", async (req, res) => {
  res.send("server running successfully");
});

// // 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// starting the server
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
