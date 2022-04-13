const mongoose = require("mongoose");
const careerSchema = new mongoose.Schema({
  jobtitle: String,

  jobdescription: String,
  joblevel: String,
  offeredSalary: String,
  applybefore: Date,
  education: String,
  experience: String,
  opening: String,
});
const Career = mongoose.model("Career", careerSchema);
module.exports = Career;
