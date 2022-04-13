const express = require("express");
const path = require("path");
const viewRouter = require("./routers/viewRoutes");
const userRouter = require("./routers/userRouter");
const dashboardRouter = require("./routers/dashboardRouter");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", viewRouter);
app.use("/rominteach-admin-private", userRouter);
app.use("/rominteach-admin-private", dashboardRouter);
app.all("*", (req, res) => {
  res.status(404).render("Dashboard/error", {
    status: "error",
    msg: "No page found sorry",
  });
});

module.exports = app;
