import express from "express";
import controllerAuth from "../controllers/auth.controller.js";
import authenticateToken from "../validation/authToken.middleware.js";

const router = express.Router();

router.route("/signup").post(controllerAuth.signup);
router.route("/signin").post(controllerAuth.signin);

router.route("/test").get(authenticateToken, controllerAuth.test);

export default router;
