class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

export class NotFoundError extends Error {
  constructor(message = "Not Found", statusCode = 400) {
    super(message);
    this.name = "NotFoundError";
    statusCode = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message = "Bad Request", statusCode = 400) {
    super(message);
    this.name = "BadRequestError";
    statusCode = 400;
  }
}

// You can define more custom exceptions if needed

export default AppError