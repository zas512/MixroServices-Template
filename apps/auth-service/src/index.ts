import { config } from "dotenv";
import express from "express";
import { resolve } from "node:path";
import { errorHandler, logger, successResponse } from "shared";

config({
  path: [resolve(process.cwd(), ".env"), resolve(process.cwd(), "../../.env")],
});

const app = express();
const port = process.env.AUTH_PORT;

if (!port) {
  throw new Error("AUTH_PORT is not defined");
}

app.get("/health", (_req, res) => {
  successResponse(res, {
    service: "auth-service",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((_req, _res, next) => {
  next({
    statusCode: 404,
    message: "Route not found",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Auth service running on port ${port}`);
});
