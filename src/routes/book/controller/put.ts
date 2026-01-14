import type { Request, Response } from "express";
import { send } from "node:process";
import { sendError } from "../../../utils/sendError.js";
import { Book } from "../../../model/bookModel.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { validateObjectId } from "../../../utils/validateObjectId.js";

export const editBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isValidId = validateObjectId(id, res);
    const { title, author, publishedYear } = req.body;

    const book = await Book.exists({ _id: isValidId });
    if (!book) {
      return sendError(res, 400, "Book not found", false, null);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      isValidId,
      { title, author, publishedYear },
      { new: true }
    );

    return sendResponse(
      res,
      200,
      "Book updated successfully",
      true,
      updatedBook
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", false, error.message);
  }
};
