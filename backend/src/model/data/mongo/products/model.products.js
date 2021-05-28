const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testing = new Schema(
  {
    name: { type: String },
    category: { type: String },
    quantity: { type: Number },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

//export data schema
module.exports = mongoose.model("products_collection", testing); //define name of collection
