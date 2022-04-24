"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRouter = void 0;
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Menu_1 = require("../entity/Menu");
const router = express_1.default.Router();
exports.menuRouter = router;
router.get("/", async (req, res) => {
    const query = req.query;
    const limit = Number(req.query.limit) || 15;
    const page = Number(req.query.page) || 0;
    const findOptions = query.all
        ? {}
        : {
            take: limit,
            skip: limit * (page - 1),
        };
    const [menus, pages] = await data_source_1.AppDataSource.manager.findAndCount(Menu_1.Menu, findOptions);
    return res.status(200).json({
        success: true,
        menus,
        totalPages: pages,
    });
});
//# sourceMappingURL=menu.js.map