import express from "express"
import { comingAuctionController } from "../server"

export const comingAuctionRoutes = express.Router()

comingAuctionRoutes.get("/comingAuction", (req, res) =>
    comingAuctionController.getComingAuction(req, res)
)
