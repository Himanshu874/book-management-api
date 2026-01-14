import type { Request, Response } from "express";
import { sendError } from "../../../utils/sendError.js";
import { Book } from "../../../model/bookModel.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { validateObjectId } from "../../../utils/validateObjectId.js";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, "Books retrieved successfully", true, books);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", false, error.message);
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isValidId = validateObjectId(id, res);
    const book = await Book.findById(isValidId);
    if (!book) {
      return sendError(res, 400, "Book not found", false, null);
    }
    return sendResponse(res, 200, "Book retrieved successfully", true, book);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", false, error.message);
  }
};
