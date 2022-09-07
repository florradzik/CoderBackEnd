const { Schema, model } = require("mongoose")

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: null,
  },
})

module.exports = model("usuarios", UserSchema)
