import express from "express";
import bookRoute from "./book/routes.js";

const router = express.Router();

router.use("/book", bookRoute);
export default router;
