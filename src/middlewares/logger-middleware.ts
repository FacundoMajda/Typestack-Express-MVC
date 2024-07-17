import { Request, Response, NextFunction } from "express";
import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Service, Inject } from "typedi";
import { Logger } from "../config/logger/logger";

@Service()
@Middleware({ type: "before" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  constructor(@Inject("logger") private logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, url, ip, hostname, body: reqBody } = request;
    const reqTime = Date.now();

    response.on("finish", () => {
      const { statusCode, statusMessage } = response;
      const responseTime = Date.now() - reqTime;

      let body = { ...reqBody }; // Make a copy of reqBody
      delete body.signature;
      delete body.polygon;
      delete body.base64;
      delete body.web_image;
      delete body.mobile_image;
      delete body.image;
      delete body.file;
      delete body.attachments;
      delete body.attachment;

      this.logger.info(
        `Request Details:\n` +
          `IP: ${ip}\n` +
          `Hostname: ${hostname}\n` +
          `Method: ${method}\n` +
          `URL: ${url}\n` +
          `Body: ${JSON.stringify(body, null, 2)}\n` +
          `Response:\n` +
          `  StatusCode: ${statusCode}\n` +
          `  StatusMessage: ${statusMessage}\n` +
          `  ResponseTime: ${responseTime}ms`
      );
    });

    next();
  }
}
