import express from "express";
import { myLiveController } from "../server";

export const myLiveRoutes = express.Router()

// for getting live show in profile page

myLiveRoutes.get("/profilePage/myLive", (req, res) => myLiveController.getMyLive(req, res))
myLiveRoutes.get("/profilePage/myBidHistory", (req, res) => myLiveController.getMyBidHistory(req, res))
myLiveRoutes.get("/profilePage/myLiveProducts", (req, res) => myLiveController.getMyLiveProducts(req, res))
myLiveRoutes.put("/profilePage/liveIsEnded", (req, res) => myLiveController.changeLiveStatus(req, res))
myLiveRoutes.put("/profilePage/liveIsEnded", (req, res) => myLiveController.changeLiveStatus(req, res))
myLiveRoutes.put("/profilePage/openMyLive", (req, res) => myLiveController.openMyLive(req, res))