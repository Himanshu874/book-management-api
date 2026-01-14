import type { Request, Response } from "express";
import { sendError } from "../../../utils/sendError.js";
import { Book } from "../../../model/bookModel.js";
import { validateObjectId } from "../../../utils/validateObjectId.js";

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isValidId = validateObjectId(id, res);
    const existingBook = await Book.exists({ _id: isValidId });

    if (!existingBook) {
      return sendError(res, 400, "Book does not exist", false, null);
    }

    await Book.deleteOne({ _id: isValidId });

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", false, error.message);
  }
};
