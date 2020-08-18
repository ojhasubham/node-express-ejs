const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Email: String,
  Position: String,
  Code: String,
});

const collectionName = "user";
module.exports = mongoose.model("user", UserSchema, collectionName);
