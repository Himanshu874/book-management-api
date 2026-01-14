import fs from "fs";
import type { Request, Response } from "express";
import { sendError } from "../../../utils/sendError.js";
import { Book } from "../../../model/bookModel.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { parseCSV, validateBookRow } from "../../../utils/handleCsv.js";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return sendError(res, 400, "All fields are required", false);
    }

    const existingBook = await Book.findOne({ title, author, publishedYear });
    if (existingBook) {
      return sendError(res, 400, "Book already exists", false);
    }

    const newBook = new Book({ title, author, publishedYear });
    await newBook.save();

    return sendResponse(res, 200, "Book created successfully", true, newBook);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", false, error.message);
  }
};

export const bulkCreateBooks = async (req: Request, res: Response) => {
  try {
    const books = req.file;
    if (!books) {
      return sendError(res, 400, "CSV file is requuired", false);
    }
    const csvText = fs.readFileSync(books.path, "utf-8");

    const rows = parseCSV(csvText);

    let addedBooks = 0;
    const errorRows: any[] = [];

    for (const row of rows) {
      const errors = validateBookRow(row.data);

      if (errors.length > 0) {
        errorRows.push({ rowNumber: row.rowNumber, errors, data: row.data });
        continue;
      }

      await Book.create({
        title: row.data.title,
        author: row.data.author,
        publishedYear: Number(row.data.publishedYear),
      });
      addedBooks++;
    }

    fs.unlinkSync(books.path);

    return sendResponse(res, 200, "Books imported successfully", true, {
      addedBooks,
      totalRows: rows.length,
      errorRows: errorRows.length > 0 ? errorRows : undefined,
    });
  } catch (error: any) {
    console.log(error.message);
    return sendError(res, 500, "Internal Server Error", false, error.message);
  }
};
