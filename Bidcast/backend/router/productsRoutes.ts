import express from "express";
import { productsController } from "../server";



const productsRoutes = express.Router();

productsRoutes.get("/categories",(req,res)=> productsController.getCategories(req,res));
// productsRoutes.get("/categories/:id/products",(req,res)=> productsController.getProducts(req,res));

productsRoutes.post("/createBids",(req,res)=>productsController.getCategories(req,res));

export default productsRoutes;