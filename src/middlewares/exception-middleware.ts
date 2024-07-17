import { NextFunction, Request, Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Logger } from "../config/logger/logger";

@Service()
@Middleware({ type: "after" })
export class HttpExceptionFilter implements ExpressErrorMiddlewareInterface {
  constructor(@Inject("logger") private logger: Logger) {}

  error(error: any, request: Request, response: Response, next: NextFunction) {
    if (error.httpCode) {
      this.logger.error(`
        HTTP Request Error:
        Method: ${request.method}
        URL: ${request.url}
        Status Code: ${error.httpCode}
        Error Message: ${error.message}
      `);

      const errorDetails = error.message;
      response.status(error.httpCode).json({ error: true, errorDetails });
    } else {
      next(error);
    }
  }
}
