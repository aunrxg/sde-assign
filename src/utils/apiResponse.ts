class ApiResponse {

  statusCode: number;
  data: any;
  message: string;
  success: number;

  constructor(statusCode: number, data: any, message: string = "Success") {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode
  }
}

export { ApiResponse };