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
    if (req.body) {
      if (req.file) {
        req.body.photo = req.file.filename;
      }

      const team = await Team.create(req.body);

      res.status(201).json({
        status: "success",

        data: {
          team,
          message: "Team created successfully!!!",
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

      const team = await Team.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
      });

      res.status(201).json({
        status: "success",
        data: {
          team,
          message: "Team updated successfully!!!",
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
  try {
    const career = await Career.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        career,
        message: "Career created successfully!!!",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        career,
        message: "Career updated successfully!!!",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
exports.deleteTeam = async (req, res) => {
  try {
    console.log(req.body.id);
    const document = await Team.findByIdAndDelete(req.body.id);
    console.log(document);
    if (!document) {
      return res.status(404).json({
        status: "error",
        message: "No document found with tha ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: {
        message: "Career updated successfully!!!",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
exports.deleteCareer = async (req, res) => {
  const document = await Career.findByIdAndDelete(req.body.id);
  if (!document) {
    return res.status(404).json({
      status: "error",
      message: "No document found with tha ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
