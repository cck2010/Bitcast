import express from "express";
import { dummyController } from "../server";

const dummyRoutes = express.Router();

dummyRoutes.get("/SellerChecking", (req, res) =>
    dummyController.SellerChecking(req, res)
);

export default dummyRoutes;
