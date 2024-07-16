export interface ServerConfig {
  server: {
    host: string;
    port: number;
  };
  database: {
    port: number;
    host: string;
    user: string;
    password: string;
    database: string;
  };
  swagger: {
    title: string;
    description: string;
  };
  security: {
    jwtSecret: string;
    corsPolicy: string;
  };
}
