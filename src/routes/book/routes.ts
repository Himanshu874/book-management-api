import express from "express";
import type { Request, Response } from "express";
import { bulkCreateBooks, createBook } from "./controller/post.js";
import { getAllBooks, getBookById } from "./controller/get.js";
import { editBook } from "./controller/put.js";
import { deleteBook } from "./controller/delete.js";
import { uploadFile } from "../../middleware/multer.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);
router.post("/import", uploadFile.single("file"), bulkCreateBooks);
export default router;
