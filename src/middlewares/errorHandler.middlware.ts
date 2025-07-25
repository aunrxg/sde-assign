import { ApiError } from "@utils/apiError.js";
import { NextFunction, Request, Response } from "express";


export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if(err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
    });
  }

  console.error("Unexpected error: ", err);
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal server error",
  });
};