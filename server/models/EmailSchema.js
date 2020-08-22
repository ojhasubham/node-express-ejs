const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Email: String,
  Contact:String,
  Position: Number,
  Code: String,
});

const collectionName = "userDetails";
module.exports = mongoose.model("userDetails", userSchema, collectionName);
