const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  profession: {
    type: String,
    require: [true, "Profession is required"],
  },
  photo: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
