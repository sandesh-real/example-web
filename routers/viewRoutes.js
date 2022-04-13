const express = require("express");
const AllController = require("../controllers/AllController");
const UserController = require("../controllers/UserController");
const Router = express.Router();

Router.get("/", AllController.getHomePage);
Router.get("/career", AllController.getCareer);
Router.post(
  "/createTeam",
  UserController.protect,
  AllController.uploadTeamPhoto,
  AllController.resizeUserPhoto,
  AllController.createTeam
);
Router.patch(
  "/updateTeam",
  UserController.protect,
  AllController.uploadTeamPhoto,
  AllController.resizeUserPhoto,
  AllController.updateTeam
);
Router.post(
  "/createCareer",
  UserController.protect,
  AllController.createCareer
);
Router.patch(
  "/updateCareer",
  UserController.protect,
  AllController.updateCareer
);
// Router.post("/sendEmail", UserController.protect, AllController.sendEmail);
module.exports = Router;
