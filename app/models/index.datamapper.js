import client from "../helpers/db.js";

// All of the datamappers
import BattleDatamapper from "./battle.datamapper.js";
import BattleUserDatamapper from "./battleUser.datamapper.js";
import CardDatamapper from "./card.datamapper.js";
import CardCategoryDatamapper from "./cardCategory.datamapper.js";
import CardUserDatamapper from "./cardUser.datamapper.js";
import CategoryDatamapper from "./category.datamapper.js";
import ReviewDatamapper from "./review.datamapper.js";
import ReviewUserDatamapper from "./reviewUser.datamapper.js";
import UserDatamapper from "./user.datamapper.js";

// Instanciation while passing client to the constructor
export const battleDatamapper = new BattleDatamapper(client);
export const battleUserDatamapper = new BattleUserDatamapper(client);
export const cardDatamapper = new CardDatamapper(client);
export const cardCategoryDatamapper = new CardCategoryDatamapper(client);
export const cardUserDatamapper = new CardUserDatamapper(client);
export const categoryDatamapper = new CategoryDatamapper(client);
export const reviewDatamapper = new ReviewDatamapper(client);
export const reviewUserDatamapper = new ReviewUserDatamapper(client);
export const userDatamapper = new UserDatamapper(client);
