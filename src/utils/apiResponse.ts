
// custom api response class for consistent api response formate
export class ApiResponse<T = any> {

  public readonly statusCode: number;
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T;
  public readonly meta?: Record<string, any>;

  constructor(statusCode: number, data: T, message: string = "Success", meta?: Record<string, any>) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 400;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}