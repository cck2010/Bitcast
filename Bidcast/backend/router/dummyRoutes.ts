import express from "express";
import { dummyController } from "../server";

const dummyRoutes = express.Router();

dummyRoutes.get("/room", (req, res) => dummyController.findRoom(req, res));

export default dummyRoutes;
