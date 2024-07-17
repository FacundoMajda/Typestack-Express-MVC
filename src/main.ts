import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { useContainer, useExpressServer } from "routing-controllers";
import { config } from "./common/env/environment";
import { initializeAndSynchronize } from "./config/database/data-source";
import { Container } from "typedi";
import { Logger } from "./config/logger/logger";

async function boostrap(): //  Promise<express.Application>
Promise<express.Express> {
  const app = express();
  const logger = new Logger();
  const PORT = config.server.port;
  const HOST = config.server.host;

  const controllersPath = path.join(__dirname + "/controllers/*{.ts,.js}");
  const middlewaresPath = path.join(__dirname + "/middlewares/*{.ts,.js}");
  const interceptorsPath = path.join(__dirname + "/interceptors/*{.ts,.js}");

  // Configurar TypeDI para routing-controllers
  useContainer(Container);

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
    await initializeAndSynchronize();
    logger.info(`El servidor se está ejecutando en ${HOST}:${PORT}`);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(helmet());

  // Manejo de errores
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    if (!res.headersSent) {
      res.status(500).send("¡Algo está roto!");
    }
  });

  return app;
}
boostrap();
