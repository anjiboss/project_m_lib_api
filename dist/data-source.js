"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Menu_1 = require("./entity/Menu");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "anji",
    password: "password",
    database: "big_menu",
    synchronize: true,
    logging: false,
    entities: [Menu_1.Menu],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map