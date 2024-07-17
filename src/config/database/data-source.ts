import "dotenv/config";
import { Container } from "typedi";
import { DataSource, Repository } from "typeorm";
import * as path from "path";
import * as fs from "fs";
import { DbConfig } from "./db.config";

export class RepositoryManager {
  static async registerRepositories() {
    const dataSource = await DbConfig.initialize();
    const repositoriesPath = path.join(__dirname, "../../repositories");
    const repositoryFiles = fs
      .readdirSync(repositoriesPath)
      .filter(
        (file) =>
          file.endsWith(".repository.ts") || file.endsWith(".repository.js")
      );

    for (const file of repositoryFiles) {
      const repositoryModule = await import(path.join(repositoriesPath, file));
      const RepositoryClass = Object.values(repositoryModule)[0] as any;

      if (RepositoryClass.prototype instanceof Repository) {
        const instance = new RepositoryClass(dataSource);
        Container.set(RepositoryClass, instance);
        console.log(`Registered repository: ${RepositoryClass.name}`);
      }
    }
  }
}

export const AppDataSource = DbConfig.initialize();

export async function initializeAndSynchronize() {
  try {
    const dataSource = await AppDataSource;
    console.log("Conexión inicializada con la base de datos...");
    await dataSource.synchronize();
    console.log("Sincronización con la base de datos completada...");
  } catch (error) {
    console.error(
      "Error al inicializar o sincronizar la base de datos:",
      error
    );
  }
}
