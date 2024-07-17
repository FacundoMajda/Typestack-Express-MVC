import { DataSource, DataSourceOptions } from "typeorm";
import { Container } from "typedi";
import { config } from "../../common/env/environment";

export class DbConfig {
  private static dataSource: DataSource;

  static getDataSourceOptions(): DataSourceOptions {
    return {
      type: "mysql",
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.database,
      entities: [__dirname + "/../../models/*.entity{.ts,.js}"],
      logging: true,
      synchronize: true,
      migrationsRun: true,
    };
  }

  static async initialize(): Promise<DataSource> {
    if (!this.dataSource) {
      const dataSourceOptions = this.getDataSourceOptions();
      this.dataSource = new DataSource(dataSourceOptions);
      await this.dataSource.initialize();
      console.log("Conexión a la base de datos inicializada");
      console.log(
        "Entidades cargadas:",
        this.dataSource.entityMetadatas.map((em) => em.name)
      );
    }
    return this.dataSource;
  }

  static getDataSource(): DataSource {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new Error(
        "DataSource no inicializado. Llama primero al método initialize."
      );
    }
    return this.dataSource;
  }
}

Container.set(DataSource, {
  factory: () => DbConfig.getDataSource(),
});
