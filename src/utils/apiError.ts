class ApiError extends Error {

  statusCode: number;
  data: any;
  success: boolean;
  errors: any[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack?: string,
  ) {
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.errors = errors
    this.success = false;

    if(stack) {
      this.stack = stack
    } else {
      Error?.captureStackTrace?.(this, this.constructor)
    }
  }
}

export { ApiError }