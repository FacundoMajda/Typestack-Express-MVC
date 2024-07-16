import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { config } from "./common/env/environment";
import { PaginationInterceptor } from "./common/pagination/interceptors/pagination-interceptor";
import { AppDataSource } from "./config/database/data-source";
import { LoggerMiddleware } from "./middlewares/logger-middleware";

async function boostrap() {
  const app = express();

  const PORT = config.server.port;
  const HOST = config.server.host;

  // Configurar TypeDI para routing-controllers
  useContainer(Container);

  // DataSource
  // async function initDb() {
  //   try {
  //     await AppDataSource.initialize();
  //     console.log("Database inicializada");
  //   } catch (error) {
  //     console.error("Falló inicializar database:", error);
  //   }
  // }

  useExpressServer(app, {
    defaults: {
      //with this option, null will return 404 by default
      nullResultCode: 404,

      //with this option, void or Promise<void> will return 204 by default
      undefinedResultCode: 204,

      paramOptions: {
        //with this option, argument wont be required by default
        required: false,
      },
    },
    routePrefix: "/api",
    // controllers: [UserController],
    controllers: [path.join(__dirname + "/controllers/*{.ts,.js}")],
    middlewares: [
      express.json(),
      express.urlencoded({ extended: true }),
      morgan("dev"),
      helmet(),
      LoggerMiddleware,
    ],
    interceptors: [PaginationInterceptor],
    validation: false,
    cors: true,
    classTransformer: false,
    classToPlainTransformOptions: {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
    },
    // defaultErrorHandler: false,
  }).listen(config.server.port, async () => {
    // await initDb();
    console.log(`Servidor ejecutandose en ${HOST}:${PORT}`);
  });

  // Error handling
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (!res.headersSent) {
      res.status(500).send("Algo está roto!");
    }
  });
}
boostrap();
