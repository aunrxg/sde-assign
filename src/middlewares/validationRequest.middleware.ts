import { ApiError } from "@utils/apiError.js";
import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod/v4";
// import { AnyZodObject } from "zod/v3";

export const validationRequest =
  (schema: ZodObject) => (req: Request, _: Response, next: NextFunction) => {
    try {
      const parsed = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!parsed.success) {
        const { fieldErrors } = parsed.error.flatten();
        const errorMessages = Object.entries(fieldErrors).flatMap(
          ([field, msgs]) => (msgs || []).map((msg) => `${field}: ${msg}`)
        );

        return next(new ApiError(400, "Validation Error", errorMessages));
      }

      // replacing req object with parsed data
      (req as any).validatedData = parsed.data;

      next();
    } catch (error) {
      next(error);
      // const errorMsg = error instanceof Error ? error.message : "Task Request Failed";
      // throw new ApiError(401, errorMsg);
    }
  };
