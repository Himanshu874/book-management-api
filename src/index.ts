import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
dotenv.config();

connectDB();


app.use(express.json());
app.use(cookieParser());

app.use(morgan("tiny"));

app.use("/api", router);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
