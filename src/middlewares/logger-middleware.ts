import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: any): void {
    console.log("Logging...");
    next();
  }
}
