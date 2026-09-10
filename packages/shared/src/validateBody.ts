import type { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod/v3";

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error?.issues.map((i) => i.message);
      return next({
        statusCode: 400,
        message
      });
    }
    req.body = result.data;
    next();
  };
}
