import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from "routing-controllers";
import { useContainer as ormUseContainer } from "typeorm";

import { config } from "./common/env/environment";

//  Config container de typeorm
import { Container } from "typeorm-typedi-extensions";
//       ▲ Notice how we import container from this library, instead of TypeDI.
// import { Container } from "typedi";

async function boostrap(): //  Promise<express.Application>
Promise<express.Express> {
  const app = express();

  const PORT = config.server.port;
  const HOST = config.server.host;

  const middlewaresPath = path.join(__dirname + "/middlewares/*{.ts,.js}");
  const controllersPath = path.join(__dirname + "/controllers/*{.ts,.js}");
  const interceptorsPath = path.join(__dirname + "/interceptors/*{.ts,.js}");

  // Configurar TypeDI para routing-controllers
  routingUseContainer(Container);
  //   ▲ vanilla typedi

  // Configurar typeorm-typedi-extensions para routing-controllers
  /** Tell TypeORM to use the container provided by this lib to resolve it's dependencies. */
  ormUseContainer(Container);

  useExpressServer(app, {
    routePrefix: "/api",
    controllers: [controllersPath],
    middlewares: [middlewaresPath],
    interceptors: [interceptorsPath],
    validation: false,
    cors: true,
    classTransformer: false,
    classToPlainTransformOptions: {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
    },
    // defaultErrorHandler: false,
  }).listen(PORT, async () => {
    console.log(`El servidor se está ejecutando en ${HOST}:${PORT}`);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(helmet());

  // Manejo de errores
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (!res.headersSent) {
      res.status(500).send("¡Algo está roto!");
    }
  });

  return app;
}
boostrap();
