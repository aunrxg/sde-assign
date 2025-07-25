import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "./apiError.js";


// Async function wrapper for controllers
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if(!(err instanceof ApiError)) {
        console.error("Unhandled error: ", err);
        return next(new ApiError(500, "Internal server error", [], { cause: err }));
      }
      return next(err);
    });
  };
};

export { asyncHandler };