const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testing = new Schema({
  name: String,
  lastName: String,
});

//export data schema
module.exports = mongoose.model("test_collection", testing); //define name of collection
