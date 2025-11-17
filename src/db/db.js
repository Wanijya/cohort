const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect("mongodb+srv://wanijyabisen:6ij4S9wGS8Zibt5O@cluster0.jephrjp.mongodb.net/cohort")
    .then(() => {
      console.log("MongoDB connected to DB");
    });
}

module.exports = connectToDB;
