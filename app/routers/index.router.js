import express from "express";
import controllerAuth from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(controllerAuth.signup);
router.route("/signin").post(controllerAuth.signin);

export default router;
