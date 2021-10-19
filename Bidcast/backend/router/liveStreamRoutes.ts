import express from "express";
import { liveStreamController } from "../server";

const liveStreamRoutes = express.Router();

liveStreamRoutes.get("/room", (req, res) =>
    liveStreamController.getRoom(req, res)
);
liveStreamRoutes.get("/liveStream/Info", (req, res) =>
    liveStreamController.getInfo(req, res)
);
liveStreamRoutes.get("/liveStream/Products", (req, res) =>
    liveStreamController.getProducts(req, res)
);

export default liveStreamRoutes;
