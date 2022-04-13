const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Db connected");
});
app.listen(process.env.PORT, () => {
  console.log("server started");
});
