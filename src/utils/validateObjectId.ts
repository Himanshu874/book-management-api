import mongoose from "mongoose";
import type { Response } from "express";
import { sendError } from "./sendError.js";

export const validateObjectId = (id: any, res: Response): string => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return sendError(res, 400, "Invalid Object ID", false);
  }
  return id;
};
