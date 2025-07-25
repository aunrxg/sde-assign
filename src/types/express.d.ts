import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      validatedData?: {
        body?: any;
        query?: any;
        params?: any;
      };
    }
  }
}