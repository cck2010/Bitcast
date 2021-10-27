import express from "express";
import { categoriesController } from "../server";


export const categoriesRoutes = express.Router()

categoriesRoutes.post("/product/categories", (req, res)=>
    categoriesController.categoriesFilter(req, res)
)