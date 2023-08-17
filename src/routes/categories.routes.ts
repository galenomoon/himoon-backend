import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.get("/", (_, res) => {});
categoriesRoutes.get("/:id", (_, res) => {});
categoriesRoutes.post("/", (_, res) => {});
categoriesRoutes.put("/:id", (_, res) => {});
categoriesRoutes.delete("/:id", (_, res) => {});

export default categoriesRoutes;
