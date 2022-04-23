import express from "express";
import { AppDataSource } from "../data-source";
import { Menu } from "../entity/Menu";
const router = express.Router();

router.get("/", async (req, res) => {
  const { limit, page, all } = req.query;
  const findOptions = {};

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
