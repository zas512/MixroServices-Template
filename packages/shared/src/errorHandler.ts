import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    "message" in err
  ) {
    const error = err as {
      statusCode: number;
      message: unknown;
    };
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
  logger.error({ err }, "Unhandled internal server error");
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
