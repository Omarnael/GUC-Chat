const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
  email: {
      type:String,
      required: true
    },
    password: {
      type: String
    }
  }
);
module.exports = User = mongoose.model("GUC_USERS", userSchema);
