import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    "message" in err
  ) {
    const error = err as {
      statusCode: number;
      message: string;
    };
    return res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
}
