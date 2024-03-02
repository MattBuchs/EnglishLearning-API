import express from "express";
import controllerHome from "../controllers/home.controller.js";

const router = express.Router();

router.route("/").get(controllerHome.home);

export default router;
