import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { getAllBooks } from "../src/routes/book/controller/get.js";
import { Book } from "../src/model/bookModel.js";

jest.mock("../src/model/bookModel.js");

describe("getAllBooks controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all books", async () => {
    const req = {} as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const mockBooks = [{ title: "Test Book", author: "Test Author", publishedYear: 2024 }];
    const mockSort = jest.fn<(arg: any) => Promise<any>>().mockResolvedValue(mockBooks);
    (Book.find as any) = jest.fn().mockReturnValue({ sort: mockSort });

    await getAllBooks(req, res);

    expect(Book.find).toHaveBeenCalled();
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Books retrieved successfully",
      status: 200,
      notify: true,
      data: mockBooks,
    });
  });
});
