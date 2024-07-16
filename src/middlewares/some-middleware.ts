import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before" })
export class MyMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next?: (err?: any) => any): any {
    console.log("testing...");
    next();
  }
}
