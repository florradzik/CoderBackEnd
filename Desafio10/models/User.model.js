const mongoose = require("mongoose")

module.exports = new mongoose.model("usuarios", {
  username: String,
  password: String,
})
