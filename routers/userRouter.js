const express = require("express");
const UserController = require("../controllers/UserController");
const Router = express.Router();
Router.post("/signup", UserController.signup);
Router.post("/login", UserController.login);
Router.get("/logout", UserController.protect, UserController.logout);
module.exports = Router;
