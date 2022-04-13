const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log(DB);
mongoose.connect(DB, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
app.listen(process.env.PORT, () => {
  console.log("server started");
});
