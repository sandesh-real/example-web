const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connect successfully");
  });
const server = app.listen(process.env.PORT, () => {
  console.log("server started");
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
