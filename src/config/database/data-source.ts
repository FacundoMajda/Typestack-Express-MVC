import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "../../common/env/environment";

const DataSourceConfig: DataSourceOptions = {
  type: "mysql",
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  entities: [__dirname + "/../../models/*.entity{.ts,.js}"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migration/*{.ts,.js}"]
      : [__dirname + "/../../migration/*{.ts,.js}"],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  // dropSchema: true,
};

export const AppDataSource = new DataSource(DataSourceConfig);
AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión inicializada con la base de datos...");
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Error al crear la conexión con la base de datos");
    }, delay);
  });
};
