"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const menu_1 = require("./routes/menu");
const data_source_1 = require("./data-source");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const origins = ["http://localhost:*"];
const PORT = process.env.PORT || 5000;
data_source_1.AppDataSource.initialize()
    .catch(() => {
    console.log("database connection error!!");
    process.abort();
})
    .then(() => {
    app.use((0, cors_1.default)({
        origin: origins,
    }));
    app.use("/v1/api/menu", menu_1.menuRouter);
    app.get("*", (_, res) => {
        res.json({
            server: "is running",
        });
    });
    app.listen(PORT, () => {
        console.log("�� server running on ", PORT);
    });
});
//# sourceMappingURL=server.js.map