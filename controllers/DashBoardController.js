const Team = require("../models/Team");
const Career = require("../models/Career");
const checkCareerAndTeam = (res, team, career) => {
  if (career.length > 0 && team.length > 0) {
    return res.status(200).render("Dashboard/team", {
      teams: team,
      careers: career,
    });
  } else if (career.length > 0 && team.length === 0) {
    return res.status(200).render("Dashboard/team", {
      teams: [],
      careers: career,
    });
  } else if (career.length === 0 && team.length > 0) {
    return res.status(200).render("Dashboard/team", {
      teams: team,
      careers: [],
    });
  } else {
    return res.status(200).render("Dashboard/team", {
      teams: [],
      careers: [],
    });
  }
};
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    const career = await Career.find();
    checkCareerAndTeam(team, career);
  } catch (e) {
    console.log(e);
  }
};
exports.getAuth = async (req, res) => {
  if (res.isLoggedIn) {
    try {
      const career = await Career.find();
      const team = await Team.find();

      checkCareerAndTeam(res, team, career);
    } catch (e) {}
  } else {
    res.status(200).render("Dashboard/auth", {
      status: "login",
    });
  }
};
