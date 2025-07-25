
// global error class for consistent error messages
export class ApiError extends Error {

  public readonly statusCode: number;
  public readonly success = false;
  public readonly errors?: { field?: string; message: string }[];
  public readonly cause?: unknown;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: { field?: string; message: string }[] = [],
    options?: { cause?: unknown },
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.cause = options?.cause;

    Error.captureStackTrace?.(this, this.constructor);
  }
}