import express from "express";
import { liveStreamController } from "../server";

const liveStreamRoutes = express.Router();

liveStreamRoutes.get("/room", (req, res) =>
    liveStreamController.getRoom(req, res)
);
liveStreamRoutes.get("/liveStream/info", (req, res) =>
    liveStreamController.getInfo(req, res)
);
liveStreamRoutes.get("/liveStream/products", (req, res) =>
    liveStreamController.getProducts(req, res)
);

export default liveStreamRoutes;
