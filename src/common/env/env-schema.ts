import Joi from "joi";
import { config } from "./environment";

const configSchema = Joi.object({
  server: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
  }).required(),

  database: Joi.object({
    host: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  }).required(),

  swagger: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),

  security: Joi.object({
    jwtSecret: Joi.string().required(),
    corsPolicy: Joi.string().required(),
  }).required(),
})
  .unknown(true)
  .validateAsync(config)
  .catch((error) => {
    console.error(
      "## La configuración no cumple con el esquema requerido: ",
      error.details
    );
    process.exit(1);
  });
