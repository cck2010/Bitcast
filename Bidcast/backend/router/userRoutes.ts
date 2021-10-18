import express from "express";
import { isLoggedIn } from "../guard";
import { userController } from "../server";

const userRoutes = express.Router();

userRoutes.post("/register", (req, res) => userController.register(req, res));
userRoutes.get("/user", (req, res) => userController.getUser(req, res));
userRoutes.get("/logout", (req, res) => userController.logout(req, res));
userRoutes.post("/login", (req, res) => userController.login(req, res));
userRoutes.post("/user/current", isLoggedIn, (req, res) => userController.getCurrentUser(req, res));

export default userRoutes;