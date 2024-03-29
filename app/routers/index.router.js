import express from "express";
import controllerAuth from "../controllers/auth.controller.js";
import controllerCards from "../controllers/cards.controller.js";
import controllerCategory from "../controllers/category.controller.js";
import controllerUser from "../controllers/user.controller.js";
import authenticateToken from "../validation/authToken.middleware.js";

const router = express.Router();

router.route("/signup").post(controllerAuth.signup);
router.route("/signin").post(controllerAuth.signin);

router.route("/test").get(authenticateToken, controllerAuth.test);
router.route("/all-public-cards").get(controllerCards.getAllPublicCards);

router
    .route("/card")
    .get(authenticateToken, controllerCards.getMyCards)
    .post(authenticateToken, controllerCards.createCard);
router.route("/categories").get(controllerCategory.getCategories);

router
    .route("/user/:username")
    .get(authenticateToken, controllerUser.getUserProfile);

export default router;
