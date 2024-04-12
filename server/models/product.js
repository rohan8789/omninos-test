const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Product", productSchema);
