import express from "express";
import { telegramController } from "../server";

const telegramRoutes = express.Router();






telegramRoutes.post("/bidcast-bot/checkVerified", (req, res) => telegramController.checkVerified(req, res));


export default telegramRoutes;