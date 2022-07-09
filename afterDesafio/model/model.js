const mongoose = require("mongoose")

const ProductModel = new mongoose.Schema({
  name: String,
  img: String,
  precio: Number,
})

module.exports = ProductModel
