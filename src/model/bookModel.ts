import mongoose from "mongoose";

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

const bookSchema = new mongoose.Schema<Book>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model<Book>("Book", bookSchema);
