import express from "express";
import { FindManyOptions } from "typeorm";
import { AppDataSource } from "../data-source";
import { Menu } from "../entity/Menu";
const router = express.Router();

/**
 * @param {boolean} all: Return all Menu if true
 * @param {number} limit: Number of menu gonna be taken
 * @param {number} page: Page, use with paganition
 *
 * @respone :
 *  - menus: Menu[]
 *  - totalPage: available pages count
 */
router.get("/", async (req, res) => {
  const query = req.query;

  const limit = Number(req.query.limit) || 15;
  const page = Number(req.query.page) || 0;

  const findOptions: FindManyOptions = query.all
    ? {}
    : {
        take: limit,
        skip: limit * (page - 1),
      };

  const [menus, pages] = await AppDataSource.manager.findAndCount(
    Menu,
    findOptions
  );

  return res.status(200).json({
    success: true,
    menus,
    totalPages: pages,
  });
});

export { router as menuRouter };
