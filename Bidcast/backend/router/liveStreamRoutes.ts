import express from "express";
import { liveStreamController } from "../server";

const liveStreamRoutes = express.Router();

liveStreamRoutes.get("/room", (req, res) =>
    liveStreamController.getRoom(req, res)
);
liveStreamRoutes.get("/info", (req, res) =>
    liveStreamController.getInfo(req, res)
);

export default liveStreamRoutes;
