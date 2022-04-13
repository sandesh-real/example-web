const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { findOne, findById } = require("../models/User");
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSignToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user: user,
    },
  });
};
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    createSignToken(newUser, 201, res);
  } catch (e) {
    console.log(e);
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect email or password",
      });
    }
    createSignToken(user, 200, res);
  } catch (e) {}
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).render("Dashboard/error", {
      status: "error",
      msg: "you are not logged in! please log in to access",
    });
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return res.status(401).json({
      status: "error",
      message: "The user beloging to this token does no longer exist",
    });
  }

  req.user = freshUser;
  next();
};
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const freshUser = await User.findById(decode.id);
      if (!freshUser) {
        return next();
      }
      res.isLoggedIn = true;
      return next();
    } catch (e) {
      return next();
    }
  }
  next();
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "Success" });
};
