import {
  Lang,
  getEnv,
  Logger,
  OrmFacade,
  CustomLogger,
  ServiceProvider,
  getConnectionConfig,
  logCatchedException,
  SnakeCaseNamingStrategy,
} from "@ant/framework";
import path from "path";
import { DataSource } from "typeorm";

export default class DatabaseProvider extends ServiceProvider {
  boot(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dataSource = new DataSource(
        getConnectionConfig(getEnv("DB_TYPE", "postgres") as any, {
          entities: [path.join(__dirname, "../", "database/models/**/**.*")],
          migrations: [path.join(__dirname, "../", "database/migrations/**/**.*")],
          namingStrategy: new SnakeCaseNamingStrategy(),
          logger: getEnv("BD_DEBUG") === "true" ? new CustomLogger() : undefined,
        })
      );

      dataSource
        .initialize()
        .then(
          async (connection) => {
            OrmFacade.orm = connection;

            Logger.info(
              Lang.__("Connected to [{{driver}}] server on [{{host}}:{{port}}/{{database}}].", {
                host: getEnv("DB_HOST", "localhost"),
                port: getEnv("DB_PORT", "5432"),
                driver: getEnv("DB_TYPE", "postgres"),
                database: getEnv("DB_DATABASE", "ant"),
              })
            );

            resolve();
          },
          (error) => {
            Logger.error(
              Lang.__(
                "Error connecting to [{{driver}}] server on [{{host}}:{{port}}/{{database}}].",
                {
                  host: getEnv("DB_HOST", "localhost"),
                  port: getEnv("DB_PORT", "5432"),
                  driver: getEnv("DB_TYPE", "postgres"),
                  database: getEnv("DB_DATABASE", "ant"),
                }
              )
            );

            reject(error);
          }
        )
        .catch((error) => {
          logCatchedException(error);
        });
    });
  }
}
