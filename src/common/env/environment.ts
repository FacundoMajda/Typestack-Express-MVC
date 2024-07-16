import "dotenv/config";
import { ServerConfig } from "../interfaces/env-interface";

export const config: ServerConfig = {
  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT || 3000),
  },

  database: {
    host: String(process.env.DB_HOST || "localhost"),
    port: Number(process.env.DB_PORT || 3306),
    user: String(process.env.DB_USER || "root"),
    password: String(process.env.DB_PASSWORD || ""),
    database: String(process.env.DB_NAME || "test"),
  },

  swagger: {
    title: String(process.env.API_TITLE || "API Title"),
    description: String(process.env.API_DESCRIPTION || "API Description"),
  },

  security: {
    jwtSecret: String(process.env.JWT_SECRET || "jwtSecret"),
    corsPolicy: String(process.env.CORS_POLICY || "*"),
  },
};
