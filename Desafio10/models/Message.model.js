const { Schema, model } = require("mongoose")
const MessageSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "usuarios", //Con esto creamos una relacion entre las 2 colecciones.
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

module.exports = model("mensajes", MessageSchema)
