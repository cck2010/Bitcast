import express from "express";
import { myLiveController } from "../server";

export const myLiveRoutes = express.Router()

// for getting live show in profile page

myLiveRoutes.get("/profilePage/myLive", (req, res) => myLiveController.getMyLive(req, res))