import express from "express";
import { myLiveController } from "../server";

const myLiveRoutes = express.Router()

// for getting live show in profile page

myLiveRoutes.get("/profile-page/my-live", (req, res) => myLiveController.getMyLive(req, res))