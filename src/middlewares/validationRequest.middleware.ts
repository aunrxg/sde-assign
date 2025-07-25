import { ApiError } from "@utils/apiError.js";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod/v4";
// import { AnyZodObject } from "zod/v3";


// middlware to validate routes
export const validationRequest =
  (schema: ZodObject<any>) => (req: Request, _res: Response, next: NextFunction) => {
    
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    
    if (!parsed.success) {
      const formattedError = formatZodErrors(parsed.error);
      return next(new ApiError(422, "Validation failed", formattedError));
    }

    (req as any).validatedData = parsed.data;
    next();
  };


const formatZodErrors = (error: ZodError) => {
  const { fieldErrors } = error.flatten();
  return Object.entries(fieldErrors).flatMap(([field, msgs]) =>
    (msgs as string[]).map((msg) => ({ field, message: msg }))
  );
};