const express = require("express");
const DashBoardController = require("../controllers/DashBoardController");
const UserController = require("../controllers/UserController");
const Router = express.Router();
Router.get("/", UserController.isLoggedIn, DashBoardController.getAuth);
// Router.get("/team", UserController.protect, DashBoardController.getTeam);

module.exports = Router;
