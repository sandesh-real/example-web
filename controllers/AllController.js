const Team = require("../models/Team");
const Career = require("../models/Career");
const multer = require("multer");
const sharp = require("sharp");
const Email = require("../utils/email");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: multerStorage,
  filefilter: multerFilter,
});

exports.uploadTeamPhoto = upload.single("photo");
exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `team-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(300, 250)
    .toFormat("jpeg")
    .jpeg(90)
    .toFile(`public/img/team/${req.file.filename}`);
  next();
};
exports.createTeam = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body) {
      if (req.file) {
        req.body.photo = req.file.filename;
      }
      console.log(req.body);
      const team = await Team.create(req.body);
      console.log(team);
      res.status(201).json({
        status: "success",
        data: {
          team,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.updateTeam = async (req, res) => {
  try {
    if (req.body) {
      if (req.file) {
        req.body.photo = req.file.filename;
      }
      console.log(req.body);
      const team = await Team.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
      });
      console.log(team);
      res.status(201).json({
        status: "success",
        data: {
          team,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
exports.getHomePage = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).render("home", {
      teams,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getCareer = async (req, res) => {
  try {
    const careers = await Career.find();
    res.render("career", {
      careers,
    });
  } catch (e) {
    console.log(e);
  }
};
exports.createCareer = async (req, res) => {
  console.log(req.body);
  try {
    const career = await Career.create(req.body);
    console.log(career);
    res.status(201).json({
      status: "success",
      data: {
        career,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateCareer = async (req, res) => {
  console.log(req.body);
  try {
    const career = await Career.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    console.log(career);
    res.status(201).json({
      status: "success",
      data: {
        career,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
exports.sendEmail = async (req, res) => {
  console.log(req.body);
  await new Email({
    firstname: req.body.firstname,
    email: req.body.email,
  }).sendWelcome();
};
