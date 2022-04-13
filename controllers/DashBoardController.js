const Team = require("../models/Team");
const Career = require("../models/Career");
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    const career = await Career.find();
    if (career.length > 0 && team.length > 0) {
      return res.status(200).render("Dashboard/team", {
        teams: team,
        careers: career,
      });
    } else if (career.length > 0 && team.length === 0) {
      res.status(200).render("Dashboard/team", {
        teams: [],
        careers: career,
      });
    } else if (career.length === 0 && team.length > 0) {
      res.status(200).render("Dashboard/team", {
        teams: team,
        careers: [],
      });
    } else {
      res.status(200).render("Dashboard/team", {
        teams: [],
        careers: [],
      });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.getAuth = (req, res) => {
  res.status(200).render("Dashboard/auth", {
    status: "login",
  });
};
