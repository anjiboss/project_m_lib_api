import "reflect-metadata";
import { DataSource } from "typeorm";
import { Menu } from "./entity/Menu";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "anji",
  password: "password",
  database: "big_menu",
  synchronize: true,
  logging: false,
  entities: [Menu],
  migrations: [],
  subscribers: [],
});
